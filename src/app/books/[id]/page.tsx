"use client";

import { useAuthGuard } from "@/hooks/auth/useAuthRedirect";
import LoadingScreen from "@/components/common/LoadingScreen";
import { useParams } from "next/navigation";
import BookThumbnail from "./components/overview/BookThumbnail";
import BookInfo from "./components/overview/BookInfo";
import OverviewContainer from "./components/overview/OverviewContainer";
import ReviewContainer from "./components/review/ReviewContainer";
import ReviewForm from "./components/review/ReviewForm";
import ReviewList from "./components/review/ReviewList";
import clsx from "clsx";

export default function BookDetailPage() {
  const params = useParams();
  const parmasId = params.id;
  const id = String(parmasId);

  const { shouldShowContent } = useAuthGuard();

  if (!shouldShowContent) {
    return <LoadingScreen />;
  }

  return (
    <div
      className={clsx(
        "pt-[50px] pb-[150px] h-[inherit] min-h-[inherit] flex flex-col gap-[40px]",
        "max-lg900:pt-0"
      )}
    >
      <OverviewContainer id={id}>
        {({ data }) => (
          <>
            <BookThumbnail data={data} />
            <BookInfo id={id} data={data} />
          </>
        )}
      </OverviewContainer>
      <ReviewContainer id={id}>
        {({ data, setData, isLoading, totalElements, setTotalElements }) => (
          <>
            <ReviewForm
              data={data}
              setData={setData}
              totalElements={totalElements}
              setTotalElements={setTotalElements}
              bookId={id}
            />
            <ReviewList
              data={data}
              setData={setData}
              isLoading={isLoading}
              setTotalElements={setTotalElements}
              bookId={id}
            />
          </>
        )}
      </ReviewContainer>
    </div>
  );
}
