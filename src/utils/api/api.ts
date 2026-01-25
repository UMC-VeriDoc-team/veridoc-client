import { baseApi, authApi } from ".";

// baseApi (쿠키 미포함)
export const api = {
  get: async <T>(url: string, config = {}) => (await baseApi.get<T>(url, config)).data,

  post: async <T>(url: string, data = {}, config = {}) =>
    (await baseApi.post<T>(url, data, config)).data,

  put: async <T>(url: string, data = {}, config = {}) =>
    (await baseApi.put<T>(url, data, config)).data,

  patch: async <T>(url: string, data = {}, config = {}) =>
    (await baseApi.patch<T>(url, data, config)).data,

  delete: async <T>(url: string, config = {}) => (await baseApi.delete<T>(url, config)).data,
};

// authApi (쿠키 포함)
export const authApiWrapper = {
  get: async <T>(url: string, config = {}) => (await authApi.get<T>(url, config)).data,

  post: async <T>(url: string, data = {}, config = {}) =>
    (await authApi.post<T>(url, data, config)).data,

  put: async <T>(url: string, data = {}, config = {}) =>
    (await authApi.put<T>(url, data, config)).data,

  patch: async <T>(url: string, data = {}, config = {}) =>
    (await authApi.patch<T>(url, data, config)).data,

  delete: async <T>(url: string, config = {}) => (await authApi.delete<T>(url, config)).data,
};
