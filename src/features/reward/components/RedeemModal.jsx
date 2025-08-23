// src/features/reward/components/RedeemModal.jsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import CommonButton from '@/components/common/CommonButton';

export default function RedeemModal({ open, onClose, amount, onConfirm }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const fmt = (n) => (typeof n === 'number' ? n.toLocaleString('ko-KR') : '')

  const modal = (
    <Overlay role="dialog" aria-modal="true" onClick={onClose}>
      <Wrap onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Redeem for Gift Card</Title>
        </Header>

        <ContentBox>
          <ContentTitle>
            Would you like to exchange<br />
            {fmt(amount)} points for a {fmt(amount)} KRW voucher?
          </ContentTitle>

          <ContentDesc>
            You can’t convert a voucher back into points<br />
            once it’s redeemed.
          </ContentDesc>
        </ContentBox>

        <ButtonRow>
          <SizedButton variant="secondary" fullWidth={false} onClick={onClose}>
            Close
          </SizedButton>
          <SizedButton
            variant="primary"
            fullWidth={false}
            onClick={() => onConfirm?.(amount)}
          >
            Yes, I'd like to
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
  width: 334px;
  max-width: calc(100vw - 32px);
  border-radius: 12px;
  background: #FFF;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  padding-bottom: 96px; /* 버튼 영역 만큼 공간 확보 (44 + 15 + 여유) */
  position: relative;  /* ← absolute 기준 */
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

const Title = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 125%;
  letter-spacing: -0.36px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`

const ContentTitle = styled.div`
  color: #000;
  text-align: center;

  /* body/body 1 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`

const ContentDesc = styled.div`
  color: #858585;
  text-align: center;

  /* caption/caption 1 */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
  letter-spacing: -0.24px;
`

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
