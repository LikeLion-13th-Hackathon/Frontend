// src/shared/api/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://oyes-hackathon.o-r.kr",
  headers: { "Content-Type": "application/json" },
});

// 요청 시 토큰 자동 첨부
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 에러 메시지 통일
apiClient.interceptors.response.use(
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

// 토큰 자동 첨부
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token'); // saveAuth 기준 키
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// export 방식 2가지 지원
export const api = apiClient;   // named export
export default apiClient;       // default export
