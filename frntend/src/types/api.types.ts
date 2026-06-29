export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginationResponse {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface SortParams {
  field: string;
  direction: 'asc' | 'desc';
}
