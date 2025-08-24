// src/components/receipt/ReceiptMatchModal.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import CommonButton from '@/components/common/CommonButton';

import StarImg from '@/assets/icons/star.png'

//
const FALLBACK_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect width="100%" height="100%" fill="#D9D9D9"/></svg>');

export default function ReceiptMatchModal({
  open,
  onClose,
  onRetake,
  receipt,
  candidates = [],
  onSelect,
}) {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  // 모달 열릴 때 초기화
  useEffect(() => { if (open) setSelectedId(null); }, [open]);

  if (!open) return null;

  // 항상 Top 3만 사용 (뷰올 X)
  const list = candidates.slice(0, 3);
  const selected = candidates.find((c) => c.id === selectedId) || null;

  const modal = (
    <Overlay role="dialog" aria-modal="true" onClick={onClose}>
      <Wrap onClick={(e) => e.stopPropagation()}>
        {/* 맨위 영역 */}
        {/* <HeaderBar> */}
          <HeaderCol>
            <Title>Select the store for your review</Title>
            {receipt?.store_address && <Sub>Detected: {receipt.store_address}</Sub>}
          </HeaderCol>
        {/* </HeaderBar> */}

        {/* 리스트 큰 배경 */}
        <ListWrap>
          {list.map((c, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === list.length - 1;
            const imgSrc = c.store_image || c.image_url || '';

            return (
              <StoreItem
                key={c.id}
                type="button"
                $selected={c.id === selectedId}
                $isFirst={isFirst}
                $isLast={isLast}
                onClick={() => setSelectedId(c.id)}
                onKeyDown={(e)=> (e.key==='Enter'||e.key===' ') && setSelectedId(c.id)}
              >
              
              <Thumb
                src = {imgSrc || FALLBACK_IMG}
                alt={`${c.store_name} thumbnail`}
                onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }} 
              />

                {/* 텍스트 영역 */}
                <ItemRight>
                  <NameRow>
                    <Name $selected={c.id === selectedId}>{c.store_name}</Name>
                    <Score>{Math.round(c.score)}%</Score>
                  </NameRow>
                  <Addr>{c.road_address || c.street_address}</Addr>
                </ItemRight>
              </StoreItem>
            );
          })}

          {list.length === 0 && (
            <Empty>No candidates found. Try a clearer photo.</Empty>
          )}
        </ListWrap>

        <SubDes>
            <StarIcon src={StarImg} />
            <SubDesText>AI matched these from your receipt.</SubDesText>
        </SubDes>

        <MainDesBox>
            <MainDesTitle>Choose the store to review.</MainDesTitle>
            <MainDesSub>
                Make sure the info is correct— <br />
                rewards may be taken back if it’s wrong.
            </MainDesSub>
        </MainDesBox>

        {/* 하단 버튼 */}
        <ButtonRow>
          <GhostButton
            as="button"
            type="button"
            onClick={() => (onRetake ? onRetake() : onClose?.())}
          >
            Retake photo
          </GhostButton>

          <StartButton
            as="button"
            type="button"
            $enabled={!!selected}
            onClick={() => selected && onSelect?.(selected)}
            aria-disabled={!selected}
          >
            Start review
          </StartButton>
        </ButtonRow>
      </Wrap>
    </Overlay>
  );

  return createPortal(modal, document.body);
}

/* ===== styles ===== */
const Overlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center;
  z-index: 9999;
`;

const Wrap = styled.div`
  width: 334px; max-width: calc(100vw - 32px);
  border-radius: 12px; background: #FFF;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  display: flex; flex-direction: column; gap: 12px;
  padding: 20px; padding-bottom: 96px; position: relative;
`;

const HeaderBar = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

const HeaderCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
    color: #000;
    text-align: center;

    /* head/head 3-em */
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 125%; /* 22.5px */
    letter-spacing: -0.36px;
`;

const Sub = styled.div`
  color: #6D6D6D;
  font-size: 12px; 
  margin-top: 4px;
  text-align: center;
`;

/* 큰 리스트 배경 */
const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 8px;
  background: #F1F1F1;
  /* padding: 8px; */
`;

/* 각 가게 행: 레이아웃 고정, 선택 시 '배경색만' 변경 + 라운드 조건부 */
const StoreItem = styled.button`
  display: flex;
  padding: 10px;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  width: 100%;
  border: 0;
  background: ${({ $selected }) => ($selected ? '#CFCFCF' : 'transparent')};
  border-radius: ${({ $selected, $isFirst, $isLast }) => {
    if (!$selected) return '0';
    if ($isFirst && $isLast) return '8px';           // 한 개만 있을 때
    if ($isFirst) return '8px 8px 0 0';               // 첫 번째 선택
    if ($isLast) return '0 0 8px 8px';                // 마지막 선택
    return '0';                                       // 가운데 선택
  }};
  cursor: pointer;
  text-align: left;

  & + & { margin-top: 8px; } /* 아이템 간 세로 간격 */
`;

const Thumb = styled.img`
  width: 72px; height: 72px; border-radius: 8px; object-fit: cover;
  background: #D9D9D9;
`;

const ItemRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  flex: 1;
`;

const NameRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const Name = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
  line-height: 150%;
  letter-spacing: -0.32px;
`;

const Score = styled.div`
  font-size: 12px; color: #FF6900; font-weight: 700;
`;

const Addr = styled.div`
  margin-top: 2px;
  color: #858585;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.24px;
`;

const Empty = styled.div`
  font-size: 12px; color: #999; text-align: center; padding: 10px 0; width: 100%;
`;

const ButtonRow = styled.div`
  position: absolute; left: 0; right: 0; bottom: 15px;
  display: flex; justify-content: center; gap: 16px;
`;

const GhostButton = styled(CommonButton)`
  width: 144px;
  height: 44px;
  border-radius: 8px;
  background-color: #E5E7EB;

  color: #8D8D8D;
    text-align: center;

    /* body/body 2 */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;
`;

const StartButton = styled(CommonButton)`
    width: 144px; height: 44px;
    border-radius: ${(p) => (p.$enabled ? '8px' : '8px 8px 0 0')};
    background: ${(p) => (p.$enabled ? 'var(--orange-500, #FF6900)' : '#CFCFCF')};
    color: #fff;
    pointer-events: ${(p) => (p.$enabled ? 'auto' : 'none')};
    text-align: center;

    /* body/body 2 */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;
`;

const SubDes = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
`

const StarIcon = styled.img`
    width: 20px;
    height: 20px;
`

const SubDesText = styled.div`
    color: #7F7F7F;

    /* caption/caption 2 */
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 15px */
    letter-spacing: -0.2px;
    text-align: center;
`

const MainDesBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
`

const MainDesTitle = styled.div`
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

const MainDesSub = styled.div`
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