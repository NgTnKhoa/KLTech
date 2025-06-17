import {fetchApi} from "@/utils/fetch-api";
import {User, UserRequest} from "@/models/user.model.ts";

export const userService = {
  getUsers: async (
      // limit = 10,
      // offset = 0
  ) => {
    try {
      return await fetchApi.get<User[]>(
          `/auth/users`,
          // {
          //   params: {limit, offset},
          // },
      );
    } catch (error) {
      console.error(error);
    }
  },
  getUserById: async (userId: string) => {
    try {
      return await fetchApi.get<User>(
          `/auth/users/${userId}`,
      );
    } catch (error) {
      console.error(error);
    }
  },

  updateUser: async (userId: string, data: UserRequest) => {
    try {
      return await fetchApi.put<User>(
          `/auth/users/${userId}`,
          data,
      );
    } catch (error) {
      console.error(error);
    }
  },

  deleteUser: async (userId: string) => {
    try {
      return await fetchApi.delete(`/auth/users/${userId}`);
    } catch (error) {
      console.error(error);
    }
  }
};
