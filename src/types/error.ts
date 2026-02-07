import type { AxiosError } from "axios";

export type ApiErrorBody = {
  status: string;
  error: string;
  message: string;
};

export type ApiError<T = ApiErrorBody> = AxiosError<T>;
