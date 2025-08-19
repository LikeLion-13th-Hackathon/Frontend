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
