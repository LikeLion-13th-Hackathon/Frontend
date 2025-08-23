// src/shared/api/receipt.js
import { api } from './base';

/**
 * JPG 파일을 FormData("file")로 업로드
 * - file.type === "image/jpeg"
 * - file.size <= 1MB
 * 성공 시 서버 응답(data) 그대로 반환
 */
export async function uploadReceiptFile(file) {
  const fd = new FormData();
  fd.append('file', file); // 반드시 'file' 키

  const { data } = await api.post(
    '/receipt/',
    fd,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return data;
}

// 영수증 후보 매칭 조회
export async function getReceiptMatches(receiptId) {
  const { data } = await api.get('/receipt/match/', {
    params: { receipt_id: receiptId },
  });
  return data; // { receipt, normalized, candidates, message }
}