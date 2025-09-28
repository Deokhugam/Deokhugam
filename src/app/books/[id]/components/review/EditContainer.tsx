import { getReviews, putReview } from "@/api/reviews";
import { textareaStyle } from "@/app/books/styles";
import Button from "@/components/common/Buttons/Button";
import { useTooltipStore } from "@/store/tooltipStore";
import { Review } from "@/types/reviews";
import clsx from "clsx";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from "react";

export default function EditContainer({
  reviewId,
  bookId,
  data,
  setData,
  prevValue,
  setEditingReviewId,
  rating,
  prevRating
}: {
  reviewId: string;
  bookId: string;
  data: Review[];
  setData: Dispatch<SetStateAction<Review[]>>;
  prevValue: string;
  setEditingReviewId: Dispatch<SetStateAction<string | null>>;
  rating: number;
  prevRating: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { showTooltip } = useTooltipStore();

  const handleCancel = () => {
    setEditingReviewId(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reviewId) return;

    const content = textareaRef.current?.value ?? "";
    setIsLoading(true);
    try {
      await putReview(reviewId, { content, rating });

      const refreshed = await getReviews(bookId, { limit: data.length });
      setData(refreshed.content);
      setEditingReviewId(null);
      showTooltip("리뷰 수정이 완료되었습니다!");
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const value = textareaRef.current?.value ?? "";
    setIsDirty(
      value.trim() !== "" && (value !== prevValue || rating !== prevRating)
    );
  }, [rating, prevRating, prevValue]);

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="mt-[10px]">
        <textarea
          ref={textareaRef}
          defaultValue={prevValue}
          className={clsx(textareaStyle, "w-full")}
          placeholder="리뷰를 수정해주세요."
          onChange={() => {
            const value = textareaRef.current?.value ?? "";
            setIsDirty(
              value.trim() !== "" &&
                (value !== prevValue || rating !== prevRating)
            );
          }}
        />
        <div className="flex justify-end gap-[12px]">
          <Button type="button" variant="secondary" onClick={handleCancel}>
            취소
          </Button>
          <Button variant="primary" disabled={!isDirty || isLoading}>
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-50 mx-auto" />
            ) : (
              "등록"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
