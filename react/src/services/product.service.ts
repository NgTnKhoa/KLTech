import {fetchApi} from "@/utils/fetch-api";
import {handleApiError} from "@/utils/exception-handler";
import {Product} from "@/models/product.model.ts";

export const productService = {
  getProducts: async (
      // limit = 10,
      // offset = 0
  ) => {
    try {
      return await fetchApi.get<Product>(
          `/api/v1/products`,
          // {
          //   params: {limit, offset},
          // },
      );
    } catch (error) {
      return handleApiError(error, null);
    }
  },
  getProductById: async (productId: string) => {
    try {
      return await fetchApi.get<Product>(
          `/api/v1/products/${productId}`,
      );
    } catch (error) {
      return handleApiError(error, null);
    }
  },
  getProductByCategoryId: async (categoryId: string) => {
    try {
      return await fetchApi.get<Product>(
          `/api/v1/products?categoryId=${categoryId}`,
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
