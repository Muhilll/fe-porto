export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

export type WriteResult = {
  id: number | string;
};
