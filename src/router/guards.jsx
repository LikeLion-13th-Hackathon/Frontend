import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasAccessToken } from '@/shared/api/auth';

export function ProtectedRoute({ children }) {
  return hasAccessToken() ? children : <Navigate to="/login" replace />;
}

// 로그인 페이지 등 "로그인 안 한 사람만" 접근 가능
export function PublicOnlyRoute({ children }) {
  return hasAccessToken() ? <Navigate to="/home" replace /> : children;
}
