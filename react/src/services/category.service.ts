import {fetchApi} from "@/utils/fetch-api";
import {handleApiError} from "@/utils/exception-handler";
import {Category} from "@/models/category.model.ts";

export const categoryService = {
  getCategories: async (
      // limit = 10,
      // offset = 0
  ) => {
    try {
      return await fetchApi.get<Category>(
          `/api/v1/categories`,
          // {
          //   params: {limit, offset},
          // },
      );
    } catch (error) {
      return handleApiError(error, null);
    }
  },
  getCategoryById: async (categoryId: string) => {
    try {
      return await fetchApi.get<Category>(
          `/api/v1/categories/${categoryId}`,
      );
    } catch (error) {
      return handleApiError(error, null);
    }
  }

  // writeComment: async (newsId: string, content: string) => {
  //   try {
  //     const response = await fetchApi.post<Comment>(
  //         `/news/${newsId}/comments`,
  //         {
  //           content,
  //         },
  //     );
  //     return response;
  //   } catch (error) {
  //     return handleApiError(error, null);
  //   }
  // },
  //
  // putReaction: async (
  //     commentId: string,
  //     reaction: "like" | "dislike" | "reward",
  // ) => {
  //   try {
  //     const response = await fetchApi.put<Comment>(
  //         `/comments/${commentId}/reactions`,
  //         {reaction},
  //     );
  //     return response;
  //   } catch (error) {
  //     return handleApiError(error, null);
  //   }
  // },
};
