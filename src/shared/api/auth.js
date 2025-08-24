// src/shared/api/auth.js
import apiClient from "./apiClient";

const USER_KEY = 'user';
const AT_KEY   = 'access_token';
const RT_KEY   = 'refresh_token';

export const loginRequest = ({ email, password }) =>
  apiClient.post("/account/login/", { email, password }).then((r) => r.data);

export const joinRequest = (payload) =>
  apiClient.post("/account/join/", payload).then((r) => r.data);

export const logoutRequest = () =>
  apiClient.post('/account/logout/').then(r => r.data);

// export const checkEmailDup = (email) =>
//   apiClient.post("/account/check/", { email }).then((r) => r.data);

// ---- 내부 유틸: 서버에 저장된 내 프로필 이미지 가져와 로컬에 캐시
export async function fetchAndMergeProfileImage() {
  try {
    const { data } = await api.get('/images/profile/');
    const url = data.profile_image || data.s3_url || data.url || '';
    if (url) {
      const raw = localStorage.getItem(USER_KEY);
      const user = raw ? JSON.parse(raw) : {};
      localStorage.setItem(USER_KEY, JSON.stringify({ ...user, profile_image: url }));
    }
    return url;
  } catch {
    // 이미지가 아직 없거나 에러여도 앱은 계속 동작
    return '';
  }
}

// 로그인/회원가입 저장: 토큰+유저 저장 후 프로필 이미지 보장
export async function saveAuth({ user, token } = {}) {
  // 토큰 저장
  if (token?.access_token) localStorage.setItem(AT_KEY, token.access_token);
  if (token?.refresh_token) localStorage.setItem(RT_KEY, token.refresh_token);

  // 유저 저장
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));

  // 아바타 비어있으면 서버에서 가져옴
  const hasAvatar = !!user?.profile_image || !!loadUser()?.profile_image;
  if (!hasAvatar) {
    await fetchAndMergeProfileImage().catch(() => {});
  }
}

// 200 => 사용 가능 / 400 => 이미 사용 중
export const checkEmailDup = async (email) => {
  try {
    const { data } = await apiClient.post("/account/check/", { email });
    return { exists: false, ...data }; // 성공이면 사용 가능
  } catch (e) {
    const status = e?.response?.status;
    if (status === 400) return { exists: true }; // 백 규칙 반영
    throw e; // 그 외 에러는 그대로 올림
  }
}

// 불러오기/비우기
export function loadUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem(AT_KEY);
  localStorage.removeItem(RT_KEY);
  localStorage.removeItem(USER_KEY);
}
