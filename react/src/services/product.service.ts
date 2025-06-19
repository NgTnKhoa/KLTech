import {fetchApi} from "@/utils/fetch-api";
import {Product, ProductRequest} from "@/models/product.model.ts";
import {ApiListResponse, ApiResponse} from "@/models/response.model.ts";

export const productService = {
  getProducts: async (
      // limit = 10,
      // offset = 0
  ) => {
    try {
      return await fetchApi.get<ApiListResponse<Product>>(
          `/products`,
          // {
          //   params: {limit, offset},
          // },
      );
    } catch (error) {
      console.error(error);
    }
  },
  getProductById: async (productId: string) => {
    try {
      return await fetchApi.get<ApiResponse<Product>>(
          `/products/${productId}`,
      );
    } catch (error) {
      console.error(error);
    }
  },

  updateProduct: async (productId: string, data: Product) => {
    try {
      return await fetchApi.put<ApiResponse<Product>>(
          `/products/${productId}`,
          data,
      );
    } catch (error) {
      console.error(error);
    }
  },

  getAllFeaturedProducts: async () => {
    try {
      return await fetchApi.get<ApiListResponse<Product>>(
          `/products/featured`,
      );
    } catch (error) {
      console.error(error);
    }
  },

  createProduct: async (product: ProductRequest) => {
    try {
      return await fetchApi.post<ApiResponse<Product>>(
          `/products`,
          product,
      );
    } catch (error) {
      console.error(error);
    }
  },
  deleteProduct: async (productId: string) => {
    try {
      return await fetchApi.delete(`/products/${productId}`);
    } catch (error) {
      console.error(error);
    }
  }
};
