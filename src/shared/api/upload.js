// src/shared/api/upload.js
import { api } from "./apiClient";

/** 프로필 이미지 업로드: 서버가 { url: "..." } 반환한다고 가정 */
export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("profile_image", file);

  const { data } = await api.post("/upload/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  // 백엔드 응답 키 확인 후 필요시 수정
  return data.profile_image ?? data.url ?? "";
};
