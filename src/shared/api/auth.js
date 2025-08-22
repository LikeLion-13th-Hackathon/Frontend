// src/shared/api/auth.js
import apiClient from "./apiClient";

// 로그인
export const loginRequest = ({ email, password }) =>
  apiClient.post("/account/login/", { email, password }).then((r) => r.data);

// 회원가입
export const joinRequest = (payload) =>
  apiClient.post("/account/join/", payload).then((r) => r.data);

// 로그아웃
export const logoutRequest = () =>
  apiClient.post("/account/logout/").then((r) => r.data);
