// src/features/reward/components/VoucherModal.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import CommonButton from '@/components/common/CommonButton';

//바코드 이미지
import BarImg from '@/assets/icons/barcode.png'

export default function VoucherModal({ open, onClose, amount, code }) {
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
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  const modal = (
    <Overlay role="dialog" aria-modal="true" onClick={onClose}>
      <Wrap onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{fmt(amount)} KRW Gift Card</Title>
        </Header>

        <BarcodeArea>
          <Rectangle>
            <BarcodeImg src={BarImg} alt="voucher barcode" />
            <CodeCaption aria-label="voucher code">{code}</CodeCaption>
          </Rectangle>
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
          <OrangeButton
            fullWidth={false}
            onClick={onCopy}
            disabled={!code}
          >
            {copied ? 'Copied!' : 'Copy'}
          </OrangeButton>
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

const OrangeButton = styled(SizedButton)`
  background: #FF6900;
  color: #FFF;
  border: none;

  &:hover {
    filter: brightness(0.95);
  }
`;

const Rectangle = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 280px;
  height: 98px;
  padding: 4px 14px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: #D9D9D9;
  border-radius: 8px;
  overflow: hidden;
`;



const CodeCaption = styled.div`
  color: #000;
  text-align: center;

  /* caption/caption 2 */
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 15px */
  letter-spacing: -0.2px;
`;

const BarcodeImg = styled.img`
  width: 252px;
  height: 65px;
  flex-shrink: 0;
`;
