export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: { page: number; limit: number; total: number };
}
