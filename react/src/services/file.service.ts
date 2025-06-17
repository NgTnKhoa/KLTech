import {fetchApi} from "@/utils/fetch-api.ts";

export const fileService = {
  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      return await fetchApi.post<string>(
          `/files`,
          formData,
      );
    } catch (error) {
      console.error(error);
    }
  },
};
