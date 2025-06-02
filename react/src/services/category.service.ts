import {fetchApi} from "@/utils/fetch-api";
import {handleApiError} from "@/utils/exception-handler";
import {Category, CategoryRequest} from "@/models/category.model.ts";

export const categoryService = {
  getCategories: async (
      // limit = 10,
      // offset = 0
  ) => {
    try {
      return await fetchApi.get<Category>(
          `/categories`,
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
          `/categories/${categoryId}`,
      );
    } catch (error) {
      return handleApiError(error, null);
    }
  },
  updateCategory: async (categoryId: string, data: Category) => {
    try {
      return await fetchApi.put<Category>(
          `/categories/${categoryId}`,
          data,
      );
    } catch (error) {
      return handleApiError(error, null);
    }
  },
  getAllProducts: async (categoryId: string) => {
    try {
      return await fetchApi.get<Category>(
          `/categories/${categoryId}/products`,
      );
    } catch (error) {
      return handleApiError(error, null);
    }
  },
  getAllColors: async (categoryId: string) => {
    try {
      return await fetchApi.get<string[]>(
          `/categories/${categoryId}/colors`,
      );
    } catch (error) {
      return handleApiError(error, null);
    }
  },
  createCategory: async (category: CategoryRequest) => {
    try {
      return await fetchApi.post<Category>(
          `/categories`,
          category,
      );
    } catch (error) {
      return handleApiError(error, null);
    }
  }
};
