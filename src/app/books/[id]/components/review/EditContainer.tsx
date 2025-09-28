import { getReviews } from "@/api/reviews";
import { textareaStyle } from "@/app/books/styles";
import Button from "@/components/common/Buttons/Button";
import { useTooltipStore } from "@/store/tooltipStore";
import { Review } from "@/types/reviews";
import clsx from "clsx";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";

export default function EditContainer({
  reviewId,
  bookId,
  data,
  setData,
  defaultValue,
  setEditingReviewId
}: {
  reviewId: string;
  bookId: string;
  data: Review[];
  setData: Dispatch<SetStateAction<Review[]>>;
  defaultValue: string;
  setEditingReviewId: Dispatch<SetStateAction<string | null>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  let selectedRating = 1;

  const { showTooltip } = useTooltipStore();

  const handleChange = () => {
    const value = textareaRef.current?.value ?? "";
    setIsDirty(value.trim() !== "" && value !== defaultValue);
  };

  const handleCancel = () => {
    setEditingReviewId(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reviewId) return;

    const content = textareaRef.current?.value ?? "";
    setIsLoading(true);
    try {
      await putReview(reviewId, { content, rating: selectedRating });

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

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="mt-[10px]">
        <textarea
          ref={textareaRef}
          defaultValue={defaultValue}
          className={clsx(textareaStyle, "w-full")}
          placeholder="리뷰를 수정해주세요."
          onChange={handleChange}
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
