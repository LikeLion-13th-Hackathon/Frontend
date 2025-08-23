import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { uploadReceiptFile } from '@/shared/api/receipt';
import UploadImg from '@/assets/icons/upload.png';

export default function ReceiptUploader({
  onUploaded,          // (savedReceipt) => void
  buttonText = '',     // 아이콘만 쓰면 공백 유지
  className,           // 스타일 오버라이드용
}) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const clickInput = () => {
    if (uploading) return;
    fileRef.current?.click();
  };

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ 클라 검증: JPG + 1MB 이하
    const isJpg = file.type === 'image/jpeg' || /\.jpe?g$/i.test(file.name);
    if (!isJpg) {
      alert('JPG 파일만 업로드할 수 있어요.');
      e.target.value = '';
      return;
    }
    if (file.size > 1024 * 1024) {
      alert('파일 크기는 1MB 이하만 가능합니다.');
      e.target.value = '';
      return;
    }

    try {
      setUploading(true);
      const data = await uploadReceiptFile(file);

      if (Array.isArray(data?.saved) && data.saved.length > 0) {
        const saved = data.saved[0]; // { id, store_name, ... }
        alert(`저장 완료!\n상호: ${saved.store_name}\n금액: ${saved.total_amount}\nID: ${saved.id}`);
        onUploaded?.(saved);
      } else {
        alert('저장 결과가 비어있어요. 다시 시도해 주세요.');
      }
    } catch (err) {
      alert(err?.message || '업로드 실패');
    } finally {
      setUploading(false);
      e.target.value = ''; // 동일 파일 재업로드 대비 초기화
    }
  };

  return (
    <>
      <Button className={className} onClick={clickInput} disabled={uploading} aria-busy={uploading}>
        <Icon src={UploadImg} alt="upload" />
        {buttonText}
      </Button>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg"     // 🔒 JPG만
        capture="environment"   // 📸 모바일에서 후면 카메라 힌트
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
    </>
  );
}

/* ===== styles =====
   Reward 페이지의 기존 UploadBlock과 동일한 크기/룩앤필 유지
*/
const Button = styled.button`
  display: flex;
  width: 72px;
  height: 63px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  border-radius: 8px;
  background: var(--pri, #6D6D6D);
  border: 0;
  cursor: pointer;

  &:disabled {
    opacity: .6;
    cursor: not-allowed;
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;
