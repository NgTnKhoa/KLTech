import {fetchApi} from "@/utils/fetch-api";
import {Category, CategoryRequest} from "@/models/category.model.ts";
import {ApiListResponse, ApiResponse} from "@/models/response.model.ts";
import {Product} from "@/models/product.model.ts";

export const categoryService = {
  getCategories: async (
      // limit = 10,
      // offset = 0
  ) => {
    try {
      return await fetchApi.get<ApiListResponse<Category>>(
          `/categories`,
          // {
          //   params: {limit, offset},
          // },
      );
    } catch (error) {
      console.error(error);
    }
  },
  getCategoryById: async (categoryId: string) => {
    try {
      return await fetchApi.get<ApiResponse<Category>>(
          `/categories/${categoryId}`,
      );
    } catch (error) {
      console.error(error);
    }
  },
  updateCategory: async (categoryId: string, data: Category) => {
    try {
      return await fetchApi.put<ApiResponse<Category>>(
          `/categories/${categoryId}`,
          data,
      );
    } catch (error) {
      console.error(error);
    }
  },
  getAllProducts: async (categoryId: string) => {
    try {
      return await fetchApi.get<ApiListResponse<Product>>(
          `/categories/${categoryId}/products`,
      );
    } catch (error) {
      console.error(error);
    }
  },
  getAllColors: async (categoryId: string) => {
    try {
      return await fetchApi.get<ApiListResponse<string>>(
          `/categories/${categoryId}/colors`,
      );
    } catch (error) {
      console.error(error);
    }
  },
  createCategory: async (category: CategoryRequest) => {
    try {
      return await fetchApi.post<ApiResponse<Category>>(
          `/categories`,
          category,
      );
    } catch (error) {
      console.error(error);
    }
  },
  deleteCategory: async (categoryId: string) => {
    try {
      return await fetchApi.delete(`/categories/${categoryId}`);
    } catch (error) {
      console.error(error);
    }
  }
};
