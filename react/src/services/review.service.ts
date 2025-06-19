import {fetchApi} from "@/utils/fetch-api";
import {Review, ReviewRequest} from "@/models/review.model.ts";
import {ApiListResponse, ApiResponse} from "@/models/response.model.ts";

export const reviewService = {
  getReviewsByProductId: async (
      productId: string,
      // limit = 10,
      // offset = 0
  ) => {
    try {
      return await fetchApi.get<ApiListResponse<Review>>(
          `/products/${productId}/reviews`,
          // {
          //   params: {limit, offset},
          // },
      );
    } catch (error) {
      console.error(error);
    }
  },

  createReview: async (review: ReviewRequest) => {
    try {
      return await fetchApi.post<ApiResponse<Review>>(
          '/reviews',
          review
      );
    } catch (error) {
      console.error(error);
    }
  },

  updateReview: async (id: string, review: ReviewRequest) => {
    try {
      return await fetchApi.put<ApiResponse<Review>>(
          `/reviews/${id}`,
          review
      );
    } catch (error) {
      console.error(error);
    }
  },

  deleteReview: async (id: string) => {
    try {
      return await fetchApi.delete(`/reviews/${id}`);
    } catch (error) {
      console.error(error);
    }
  }
};
