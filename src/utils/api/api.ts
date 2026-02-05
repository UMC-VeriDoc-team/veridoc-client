import { baseApi, authApi } from ".";

export type ApiResponse<T> = {
  code: number;
  data: T;
  message?: string;
};

export const api = {
  get: async <T>(url: string, config = {}) => (await baseApi.get<ApiResponse<T>>(url, config)).data,

  post: async <T>(url: string, data: unknown = {}, config = {}) =>
    (await baseApi.post<ApiResponse<T>>(url, data, config)).data,

  put: async <T>(url: string, data: unknown = {}, config = {}) =>
    (await baseApi.put<ApiResponse<T>>(url, data, config)).data,

  patch: async <T>(url: string, data: unknown = {}, config = {}) =>
    (await baseApi.patch<ApiResponse<T>>(url, data, config)).data,

  delete: async <T>(url: string, config = {}) =>
    (await baseApi.delete<ApiResponse<T>>(url, config)).data,
};

// authApi (쿠키 포함)
export const authApiWrapper = {
  get: async <T>(url: string, config = {}) => (await authApi.get<ApiResponse<T>>(url, config)).data,

  post: async <T>(url: string, data: unknown = {}, config = {}) =>
    (await authApi.post<ApiResponse<T>>(url, data, config)).data,

  put: async <T>(url: string, data: unknown = {}, config = {}) =>
    (await authApi.put<ApiResponse<T>>(url, data, config)).data,

  patch: async <T>(url: string, data: unknown = {}, config = {}) =>
    (await authApi.patch<ApiResponse<T>>(url, data, config)).data,

  delete: async <T>(url: string, config = {}) =>
    (await authApi.delete<ApiResponse<T>>(url, config)).data,
};
