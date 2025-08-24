// src/shared/api/storage.js
import { api } from './apiClient';

// presign 받기 (백 스펙: POST /images/ { filename, content_type })
export async function getPresign(filename, contentType) {
  const { data } = await api.post('/images/', {
    filename,
    content_type: contentType,
  });
  const uploadURL = data.presigned_url; // S3에 PUT할 URL
  const fileURL   = data.s3_url;        // 공개 접근 URL
  if (!uploadURL || !fileURL) {
    throw new Error('presign 응답에 URL이 없습니다.');
  }
  return { uploadURL, fileURL };
}

// S3로 PUT 업로드 (인터셉터 영향 없게 fetch 사용)
export async function putFileToS3(uploadURL, file) {
  const res = await fetch(uploadURL, {
    method: 'PUT',
    headers: { 'Content-Type': file.type || 'application/octet-stream' },
    body: file,
  });
  if (!res.ok) throw new Error(`S3 업로드 실패 (${res.status})`);
}