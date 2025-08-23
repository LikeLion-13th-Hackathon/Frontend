import { api } from "./base";

// 사용자 정보 
export const fetchMyPage = () => api.get('account/mypage/');