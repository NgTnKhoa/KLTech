import type {
  AuthResponse, ChangePassword,
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
      return error;
    }
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
      return await fetchApi.post<AuthResponse>("/auth/register", data);
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  validateToken: async (accessToken: string) => {
    try {
      return await fetchApi.post<boolean>(`/auth/validate-token?token=${accessToken}`, null);
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  forgotPassword: async (email: string) => {
    try {
      return await fetchApi.post<AuthResponse>(
          `/auth/forgot-password/verify/${email}`,
          null
      );
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  verifyOTP: async (otp: number, email: string) => {
    try {
      return await fetchApi.post(`/auth/forgot-password/verify-otp/${otp}/${email}`, null);
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  changePassword: async (changePassword: ChangePassword, email: string) => {
    try {
      return await fetchApi.post(`/auth/forgot-password/change-password/${email}`, changePassword);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
};
