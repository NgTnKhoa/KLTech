import {fetchApi} from "@/utils/fetch-api";
import {handleApiError} from "@/utils/exception-handler";
import {Product, ProductRequest} from "@/models/product.model.ts";

export const productService = {
  getProducts: async (
      // limit = 10,
      // offset = 0
  ) => {
    try {
      return await fetchApi.get<Product>(
          `/products`,
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
          `/products/${productId}`,
      );
    } catch (error) {
      return handleApiError(error, null);
    }
  },

  updateProduct: async (productId: string, data: Product) => {
    try {
      return await fetchApi.put<Product>(
          `/products/${productId}`,
          data,
      );
    } catch (error) {
      return handleApiError(error, null);
    }
  },

  getAllFeaturedProducts: async () => {
    try {
      return await fetchApi.get<Product>(
          `/products/featured`,
      );
    } catch (error) {
      return handleApiError(error, null);
    }
  },

  createProduct: async (product: ProductRequest) => {
    try {
      return await fetchApi.post<Product>(
          `/products`,
          product,
      );
    } catch (error) {
      return handleApiError(error, null);
    }
  }
};
