import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../models/auth.model";
import {fetchApi} from "@/utils/fetch-api.ts";

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      return await fetchApi.post<AuthResponse>("/auth/authenticate", data);
    } catch (error) {
      console.error(error);
    }
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
      return await fetchApi.post<AuthResponse>("/auth/register", data);
    } catch (error) {
      console.error(error);
    }
  },

  validateToken: async (accessToken: string) => {
    try {
      return await fetchApi.post<boolean>(`/auth/validate-token?token=${accessToken}`, null);
    } catch (error) {
      console.error(error);
    }
  },
};
