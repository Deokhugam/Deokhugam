"use client";

import { memo } from "react";
import Link from "next/link";
import ReviewImage from "./ReviewImage";
import ReviewContent from "./ReviewContent";
import type { PopularReview, Review } from "@/types/reviews";

interface ReviewCardProps {
  review: PopularReview | Review;
  maxTitleWidth?: number;
}

const ReviewCard = memo(function ReviewCard({
  review,
  maxTitleWidth
}: ReviewCardProps) {
  const getReviewData = (review: PopularReview | Review) => {
    if ("reviewContent" in review) {
      return {
        id: review.id,
        reviewId: review.reviewId,
        content: review.reviewContent,
        rating: review.reviewRating,
        bookTitle: review.bookTitle,
        bookThumbnailUrl: review.bookThumbnailUrl,
        userNickname: review.userNickname,
        likeCount: review.likeCount,
        commentCount: review.commentCount,
        createdAt: review.createdAt
      };
    } else {
      return {
        id: review.id,
        reviewId: review.id,
        content: review.content,
        rating: review.rating,
        bookTitle: review.bookTitle,
        bookThumbnailUrl: review.bookThumbnailUrl,
        userNickname: review.userNickname,
        likeCount: review.likeCount,
        commentCount: review.commentCount,
        createdAt: review.createdAt
      };
    }
  };

  const reviewData = getReviewData(review);

  if ("isEmpty" in review && review.isEmpty) {
    return (
      <div className="flex-1">
        <div className="py-[24px] px-[30px] rounded-[16px] bg-gray-0 border-[1.5px] border-gray-200">
          <div className="flex gap-[20px]">
            <ReviewImage bookThumbnailUrl="" bookTitle="" isEmpty={true} />
            <ReviewContent
              userNickname=""
              bookTitle=""
              reviewRating={0}
              reviewContent=""
              likeCount={0}
              commentCount={0}
              createdAt=""
              isEmpty={true}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <Link href={`/reviews/${reviewData.reviewId}`} className="block">
        <div className="py-[24px] px-[30px] rounded-[16px] bg-gray-0 border-[1.5px] border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex gap-[20px]">
            <ReviewImage
              bookThumbnailUrl={reviewData.bookThumbnailUrl}
              bookTitle={reviewData.bookTitle}
            />
            <ReviewContent
              userNickname={reviewData.userNickname}
              bookTitle={reviewData.bookTitle}
              reviewRating={reviewData.rating}
              reviewContent={reviewData.content}
              likeCount={reviewData.likeCount}
              commentCount={reviewData.commentCount}
              createdAt={reviewData.createdAt}
              maxTitleWidth={maxTitleWidth}
            />
          </div>
        </div>
      </Link>
    </div>
  );
});

export default ReviewCard;
