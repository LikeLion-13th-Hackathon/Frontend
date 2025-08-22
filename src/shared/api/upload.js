// src/shared/api/upload.js
import { api } from './apiClient';

// S3에 올린 뒤, 해당 공개 URL을 서버에 저장할 때 사용
export async function saveS3ImageUrl(s3Url) {
  const { data } = await api.post('/images/save/', { s3_url: s3Url });
  // 백이 어떤 키로 돌려주는지에 맞춰서 우선순위로 고름
  return data.profile_image || data.s3_url || data.url || s3Url;
}
