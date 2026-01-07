export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
}

export interface ApiError {
  statusCode?: number;
  success?: boolean;
  message?: string;
}
