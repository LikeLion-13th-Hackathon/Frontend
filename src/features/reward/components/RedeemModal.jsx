// src/features/reward/components/RedeemModal.jsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import CommonButton from '@/components/common/CommonButton';

export default function RedeemModal({ open, onClose, amount, onConfirm }) {
  // ESC로 닫기
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const modal = (
    <Overlay role="dialog" aria-modal="true" onClick={onClose}>
      <Wrap onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Redeem gift certificate</Title>
        </Header>

        <ButtonRow>
          <SizedButton variant="secondary" fullWidth={false} onClick={onClose}>
            Close
          </SizedButton>
          <SizedButton
            variant="primary"
            fullWidth={false}
            onClick={() => onConfirm?.(amount)}
          >
            Redeem
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
  height: 380px;                /* InfoModal보다 낮게 */
  border-radius: 12px;
  background: #FFF;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-bottom: 96px;          /* 하단 버튼 공간 확보 */
  position: relative;
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

const Body = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const Desc = styled.p`
  margin: 0;
  color: #333;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  strong { font-weight: 700; }
`;

const Hint = styled.p`
  margin: 0;
  color: #6D6D6D;
  font-size: 12px;
  letter-spacing: -0.24px;
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
