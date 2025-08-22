// src/shared/api/storage.js
import { api } from "./apiClient";

// 1) presign 발급 요청
export async function getPresign({ filename, contentType, folder = "profiles" }) {
  const { data } = await api.post("/storage/presign", { filename, contentType, folder });
  // data = { uploadURL, fileURL, key }
  return data;
}

// 2) presigned URL로 실제 업로드(PUT)
export async function putFileToS3(uploadURL, file, contentType) {
  const res = await fetch(uploadURL, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body: file,
  });
  if (!res.ok) throw new Error("S3 업로드 실패");
}
