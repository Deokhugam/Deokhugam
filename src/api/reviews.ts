import { apiClient } from "./client";
import { useAuthStore } from "@/store/authStore";
import type {
  PopularReviewsResponse,
  PopularReviewsParams,
  ReviewsResponse,
  ReviewsParams,
  Review
} from "@/types/reviews";

export const getPopularReviews = async (
  params: PopularReviewsParams = {}
): Promise<PopularReviewsResponse> => {
  const {
    period = "DAILY",
    direction = "ASC",
    cursor,
    after,
    limit = 10
  } = params;

  const queryParams = new URLSearchParams();

  queryParams.append("period", period);
  queryParams.append("direction", direction);
  queryParams.append("limit", limit.toString());

  if (cursor) {
    queryParams.append("cursor", cursor);
  }

  if (after) {
    queryParams.append("after", after);
  }

  if (typeof window !== "undefined") {
    const authState = useAuthStore.getState();
    if (authState.user?.id) {
      queryParams.append("requestUserId", authState.user.id);
    } else {
      console.log("사용자 ID 없음");
    }
  }

  return await apiClient.get<PopularReviewsResponse>(
    `/api/reviews/popular?${queryParams.toString()}`
  );
};

export const getReviews = async (
  bookId?: string,
  params: ReviewsParams = {}
): Promise<ReviewsResponse> => {
  const {
    orderBy = "createdAt",
    direction = "DESC",
    cursor,
    after,
    limit = 5,
    search
  } = params;

  const queryParams = new URLSearchParams();

  queryParams.append("orderBy", orderBy);
  queryParams.append("direction", direction);
  queryParams.append("limit", limit.toString());

  if (bookId) {
    queryParams.append("bookId", bookId);
  }

  if (cursor) {
    queryParams.append("cursor", cursor);
  }

  if (after) {
    queryParams.append("after", after);
  }

  if (search) {
    queryParams.append("keyword", search);
  }

  if (typeof window !== "undefined") {
    const authState = useAuthStore.getState();
    if (authState.user?.id) {
      queryParams.append("requestUserId", authState.user.id);
    }
  }

  return await apiClient.get<ReviewsResponse>(
    `/api/reviews?${queryParams.toString()}`
  );
};

export const postReview = async (body: {
  bookId: string;
  userId: string;
  content: string;
  rating: number;
}): Promise<Review> => {
  return await apiClient.post<Review>(`/api/reviews`, body, {
    skipInterceptor: true
  });
};

export const getReviewDetail = async (reviewId: string): Promise<Review> => {
  return await apiClient.get<Review>(`/api/reviews/${reviewId}`);
};

export const toggleReviewLike = async (
  reviewId: string
): Promise<{ reviewId: string; userId: string; liked: boolean }> => {
  return await apiClient.post<{
    reviewId: string;
    userId: string;
    liked: boolean;
  }>(`/api/reviews/${reviewId}/like`, {});
};

export const putReview = async (
  reviewId: string,
  body: { content: string; rating: number }
): Promise<Review> => {
  return await apiClient.patch(`/api/reviews/${reviewId}`, body);
};

export const deleteReview = async (reviewId: string) => {
  await apiClient.delete(`/api/reviews/${reviewId}`);
};
