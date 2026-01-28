import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";

// 쿠키 미포함
export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { accept: "application/json" },
});

// 쿠키 포함
export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { accept: "application/json" },
  withCredentials: true,
});

// 공통 토큰 로직
const addAuthHeader = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    // headers가 AxiosHeaders인 경우
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      // fallback: 일반 객체일 경우
      config.headers = new AxiosHeaders(config.headers);
      config.headers.set("Authorization", `Bearer ${token}`);
    }
  }

  return config;
};

baseApi.interceptors.request.use(addAuthHeader);
authApi.interceptors.request.use(addAuthHeader);
