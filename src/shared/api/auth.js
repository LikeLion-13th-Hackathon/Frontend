// src/shared/api/auth.js
import { api } from './apiClient';

// 로그인
export const loginRequest = ({ email, password }) =>
  api.post('/account/login/', { email, password }).then(r => r.data);

// 회원가입
export const joinRequest = (payload) =>
  api.post('/account/join/', payload).then(r => r.data);

// 로그아웃
export const logoutRequest = () =>
  api.post('/account/logout/').then(r => r.data);

// 로그인 응답 { user, token }을 로컬스토리지에 저장
export function saveAuth({ user, token }) {
  if (token?.access_token) localStorage.setItem('access_token', token.access_token);
  if (token?.refresh_token) localStorage.setItem('refresh_token', token.refresh_token);
  if (user) localStorage.setItem('user', JSON.stringify(user));
}

// 저장된 유저 불러오기
export function loadUser() {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
}

// 저장된 토큰/유저 비우기
export function clearAuth() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
}