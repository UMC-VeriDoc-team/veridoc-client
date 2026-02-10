import type { AxiosError } from "axios";

export type ApiErrorBody = {
  status: string;
  error: string;
  message: string;
};

export type ApiError<T = ApiErrorBody> = AxiosError<T>;

export interface ApiErrorDetail {
  message?: string;
  code?: string;
}

export interface ActionResult {
  ok: boolean;
  message?: string;
  error?: unknown;
}
