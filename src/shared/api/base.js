// src/shared/api/base.js
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://oyes-hackathon.o-r.kr",
  headers: { "Content-Type": "application/json" },
});

// 응답 에러 통일
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

// 요청 시 토큰 자동 첨부
api.interceptors.request.use((config) => {
  // const token = localStorage.getItem("access_token");
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  const url = new URL(config.url, api.defaults.baseURL).pathname;
  const JOIN_NO_AUTH = url.startsWith('/account/join/');

  if (JOIN_NO_AUTH) {
    if (config.headers?.Authorization) delete config.headers.Authorization;
  } else {
    const token = localStorage.getItem('access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
