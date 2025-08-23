import React, { useEffect } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import CommonButton from '@/components/common/CommonButton';

import GiftCardImg from '@/assets/icons/giftcard.png'

export default function InfoModal({ open, onClose, onOpenApp }) {
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
          <ModalTitle>What is 온누리상품권?</ModalTitle>
        </Header>

        <TitleBox>
          <SubTitle>온누리상품권 (Onnuri gift certificates)</SubTitle>
        </TitleBox>

        <ContentBox>
            <GiftCardBox src={GiftCardImg} />
            <TextBox>
                <ContentText>
                    - You can use it just like cash at traditional markets, local shops, and restaurants.
                </ContentText>
                <ContentText>
                    - 5-10% Bonus when purchasing certificates.
                </ContentText>
            </TextBox>
        </ContentBox>

        <ButtonRow>
          <SizedButton
            variant="secondary" // 회색 배경
            fullWidth={false}
            onClick={onClose}
          >
            Close
          </SizedButton>

          <SizedButton
            variant="primary"
            fullWidth={false}
            onClick={() => {
              if (onOpenApp) onOpenApp();
              else window.open('https://play.google.com/', '_blank'); // 필요 시 교체
            }}
          >
            Open App
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
  height: 488px;
  border-radius: 12px;
  background: #FFF;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-bottom: 96px; /* 버튼 영역 확보: 44px + 15px + 여유 */
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 8px;
`;

const TitleBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const ModalTitle = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 125%;
  letter-spacing: -0.36px;
`;

const SubTitle = styled.div`
  color: #858585;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
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

const ContentBox = styled.div`
  width: 100%;           
  height: 276px;
  display: flex;
  flex-direction: column;         
  align-items: center;
  justify-content: center;
  margin-top: 12px; 
  gap: 12px;
`;

const ContentText = styled.div`
    color: #6D6D6D;

    /* caption/caption 2 */
    font-family: Pretendard;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 15px */
    letter-spacing: -0.2px;
    padding: 5px;
`

const GiftCardBox = styled.img`
    width: 254px;
    height: 252px;
    flex-shrink: 0;
    aspect-ratio: 127/126;
    margin-top: 30px;
`

const TextBox = styled.div`
    width: 252px;
`