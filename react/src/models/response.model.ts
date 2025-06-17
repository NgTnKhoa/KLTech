export interface ApiResponse<T> {
  message: string;
  status: boolean;
  statusCode: number;
  data: T;
}

export interface ApiListResponse<T> {
  message: string;
  status: boolean;
  statusCode: number;
  data: T[];
}
