import {fetchApi} from "@/utils/fetch-api";
import {handleApiError} from "@/utils/exception-handler";
import {Review, ReviewRequest} from "@/models/review.model.ts";

export const reviewService = {
  getReviewsByProductId: async (
      productId: string,
      // limit = 10,
      // offset = 0
  ) => {
    try {
      return await fetchApi.get<Review>(
          `/products/${productId}/reviews`,
          // {
          //   params: {limit, offset},
          // },
      );
    } catch (error) {
      return handleApiError(error, null);
    }
  },

  createReview: async (review: ReviewRequest) => {
    try {
      return await fetchApi.post<Review>(
          '/reviews',
          review
      );
    } catch (error) {
      return handleApiError(error, null);
    }
  },

  updateReview: async (id: string, review: ReviewRequest) => {
    try {
      return await fetchApi.put<Review>(
          `/reviews/${id}`,
          review
      );
    } catch (error) {
      return handleApiError(error, null);
    }
  },

  deleteReview: async (id: string) => {
    try {
      return await fetchApi.delete(`/reviews/${id}`);
    } catch (error) {
      return handleApiError(error, null);
    }
  }
};
