// src/features/reward/components/VoucherModal.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import CommonButton from '@/components/common/CommonButton';

export default function VoucherModal({ open, onClose, amount, code, barcodeUrl }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const fmt = (n) => {
    const v = Number(n);
    return Number.isFinite(v) ? v.toLocaleString('ko-KR') : '';
  };

  const onCopy = async () => {
    try {
        await navigator.clipboard.writeText(code || '');
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    } catch {}
        console.error('Copy failed', e);
  };

  const modal = (
    <Overlay role="dialog" aria-modal="true" onClick={onClose}>
      <Wrap onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{fmt(amount)} KRW Gift Card</Title>
        </Header>

        <BarcodeArea>
          {barcodeUrl ? (
            <BarcodeImg src={barcodeUrl} alt="voucher barcode" />
          ) : (
            // 임시 바코드(플레이스홀더). 실제 바코드 이미지를 받으면 barcodeUrl로 교체!
            <FakeBarcode aria-label="barcode placeholder" />
          )}
          <CodeText aria-label="voucher code">{code}</CodeText>
        </BarcodeArea>

        <Sub>
            Please open the Onnuri Gift Certificate app and <br />
            enter the above code to use your voucher.
        </Sub>

        <VoucherDetail>
            Amount: ₩5,000<br />
            Expires: 2025-12-31
        </VoucherDetail>

        <ButtonRow>
          <SizedButton variant="secondary" fullWidth={false} onClick={onClose}>
            Close
          </SizedButton>
          <SizedButton
            variant="primary"
            fullWidth={false}
            onClick={onCopy}
            disabled={!code}
          >
            {copied ? 'Copied!' : 'Copy'}
          </SizedButton>
        </ButtonRow>
      </Wrap>
    </Overlay>
  );

  return createPortal(modal, document.body);
}


const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Wrap = styled.div`
    display: inline-flex;
    padding: 15px;
    flex-direction: column;
    align-items: center;
    gap: 32px;

    width: 334px;
    max-width: calc(100vw - 32px);
    border-radius: 12px;
    background: #FFF;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    padding-bottom: 96px; /* 하단 버튼 영역 */
    position: relative;
`;

const Header = styled.div`
  text-align: center;
`;

const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 125%;
  letter-spacing: -0.36px;
`;

const Sub = styled.div`
    color: #000;
    text-align: center;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`;

const VoucherDetail = styled.div`
    color: #000;

    /* caption/caption 2 */
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 15px */
    letter-spacing: -0.2px;
`

const BarcodeArea = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
`;

const BarcodeImg = styled.img`
  width: 220px;
  height: 80px;
  object-fit: contain;
`;

const FakeBarcode = styled.div`
  width: 220px;
  height: 80px;
  border: 1px solid #000;
  border-radius: 6px;
  background:
    repeating-linear-gradient(
      to right,
      #000 0,
      #000 2px,
      #fff 2px,
      #fff 4px
    );
`;

const CodeText = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 2px;
`;

const CopyBtn = styled.button`
  border: 1px solid #e5e7eb;
  background: #f5f5f5;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
`;

const ButtonRow = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 15px;
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const SizedButton = styled(CommonButton).attrs({ fullWidth: false })`
  width: 144px;
  height: 44px;
  border-radius: 8px;
`;
