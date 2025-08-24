// src/shared/api/base.js
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://oyes-hackathon.o-r.kr",
  headers: { "Content-Type": "application/json" },
});

// 응답 에러 통일(디버깅 편하게 status/data도 달아둠)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const e = new Error(
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message || "Network error"
    );
    e.status = err.response?.status;
    e.data   = err.response?.data;
    return Promise.reject(e);
  }
);

// 요청 시 토큰 자동/제외
api.interceptors.request.use((config) => {
  const base = config.baseURL || api.defaults.baseURL || window.location.origin;

  let urlPath = "";
  try {
    urlPath = new URL(config.url ?? "", base).pathname; //urlPath를 먼저 만든다
  } catch {
    urlPath = String(config.url || "");
  }
  if (urlPath && !urlPath.startsWith("/")) urlPath = `/${urlPath}`;

  const NO_AUTH =
    urlPath.startsWith("/account/join/")  ||
    urlPath.startsWith("/account/check/");

  if (NO_AUTH) {
    if (config.headers?.Authorization) delete config.headers.Authorization;
  } else {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
