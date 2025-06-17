export interface RegisterRequest {
  name: string;
  email: string;
  username: string;
  password: string;
  phoneNumber: string;
  role: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  message?: string;
  accessToken: string;
  refreshToken: string;
  id: string;
  username: string;
  role: string;
}
