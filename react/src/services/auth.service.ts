import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../models/auth.model";
import {fetchApi} from "@/utils/fetch-api.ts";
import {handleApiError} from "@/utils/exception-handler";

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      return await fetchApi.post<AuthResponse>("/auth/authenticate", data);
    } catch (error) {
      return handleApiError(error, null);
    }
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
      return await fetchApi.post<AuthResponse>("/auth/register", data);
    } catch (error) {
      return handleApiError(error, null);
    }
  },

  oauth: async (): Promise<AuthResponse> => {
    try {
      return await fetchApi.get<AuthResponse>("/auth/oauth");
    } catch (error) {
      return handleApiError(error, null);
    }
  },
};
