import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://54.180.214.201:8000",
  headers: { "Content-Type": "application/json" },
});

// 응답 에러 메시지 통일
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      "Network error";
    return Promise.reject(new Error(msg));
  }
);

// 요청 시 토큰 자동 첨부 (로컬스토리지 보관 가정)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
