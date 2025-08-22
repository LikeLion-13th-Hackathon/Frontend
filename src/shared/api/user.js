import { api } from "./base"; // axios 인스턴스

// 단일 유저 정보 불러오기
export const fetchUserDetail = (userId) => {
  return api.get(`/account/${userId}/`);
};
