// src/components/receipt/ReceiptMatchModal.jsx
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import CommonButton from '@/components/common/CommonButton';
import { useNavigate } from 'react-router-dom';

import StarImg from '@/assets/icons/star.png';

// 가게 세부 정보
import { fetchStoreDetail } from '@/shared/api/store';

const FALLBACK_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72"><rect width="100%" height="100%" fill="#D9D9D9"/></svg>');

export default function ReceiptMatchModal({
  open,
  onClose,
  onRetake,
  receipt,
  candidates = [],
}) {
  const normalizeDetail = (d) => (d && d.data) ? d.data : d;

  // 카테고리 → 라우트 경로 고정 매핑 (라우터와 정확히 맞춰야 함)
  const categoryToPath = (raw) => {
    const s = String(raw || '').toLowerCase();
    if (s.includes('snack')) return 'snack';
    if (s.includes('restaurant')) return 'restaurant';
    if (s.includes('fresh')) return 'fresh';
    if (s.includes('goods') || s.includes('product')) return 'goods';
    return null;
  };

  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  // const [catById, setCatById] = useState({});   // { [storeId]: "Snacks" }
  const [detailById, setDetailById] = useState({}); // { [id]: { category, store_english, store_name } }
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  // 모달 열릴 때 초기화
  useEffect(() => { if (open) setSelectedId(null); }, [open]);

  // 항상 Top 3만 사용
  const list = candidates.slice(0, 3);

  // 탑3 가게 카테고리 조회
  useEffect(() => {
    if (!open || list.length === 0) return;
    let aborted = false;
    (async () => {
      try {
        setDetailLoading(true);
        const results = await Promise.all(
          list.map(async (c) => {
            try {
              const d = await fetchStoreDetail(c.id);
              const detail = normalizeDetail(d);
              return [
                c.id, 
                 { 
                  category: detail?.category ?? null,
                  store_english: detail?.store_english ?? '',
                  store_name: detail?.store_name ?? c.store_name ?? '',
                 },
              ];
            } catch {
              return [c.id,
                {
                  category: null,
                  store_english: '',
                  store_name: c.store_name ?? '',
                }
              ];
            }
          })
        );
        if (!aborted) {
          setDetailById((prev) => ({ ...prev, ...Object.fromEntries(results) }));
        }
      } finally {
        if (!aborted) setDetailLoading(false);
      }
    })();
    return () => { aborted = true; };
  }, [open, list]);

  const selected = candidates.find((c) => c.id === selectedId) || null;

  if (!open) return null;

  // Start review 클릭 -> 카테고리 확인 후 해당 리뷰 페이지로 이동
  const handleStart = async () => {
    if (!selected) return;
    const storeId = selected.id;
    let detail = detailById[storeId];
    let category = detail?.category ?? null;
    let english = detail?.store_english ?? '';

    // 아직 못 받아왔으면 단건 조회로 보강
    if (!category) {
      try {
        const d = await fetchStoreDetail(storeId);
        const detail = normalizeDetail(d);
        category = detail?.category ?? null;
        english = detail?.store_english || selected?.store_english;

        setDetailById((prev) => ({
          ...prev,
          [storeId]: {
            category,
            store_english: english,
            store_name: detail?.store_name ?? selected.store_name ?? '',
        }
      }));
      } catch {}
    }

    if (!category) {
      console.warn('No category. Cannot route to review.');
      return;
    }

    const path = categoryToPath(category);
    if (!path) {
      console.warn('Unknown category:', category);
      return;
    }

    sessionStorage.setItem('flow', 'receipt');

    navigate(`/review/${path}`, {
      state: {
        source: 'receipt',
        storeId,                               // 리뷰를 해당 가게에 연결할 핵심 값
        category,                              // 원본 카테고리(표시용)
        storeName: selected.store_name || '',
        address: selected.road_address || selected.street_address || '',
        storeEnglish: english,
      },
      replace: false,
    });
  };

  const modal = (
    <Overlay role="dialog" aria-modal="true" onClick={onClose}>
      <Wrap onClick={(e) => e.stopPropagation()}>
        <HeaderCol>
          <Title>Select the store for your review</Title>
          {receipt?.store_address && <Sub>Detected: {receipt.store_address}</Sub>}
        </HeaderCol>

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
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedId(c.id)}
              >
                <Thumb
                  src={imgSrc || FALLBACK_IMG}
                  alt={`${c.store_name} thumbnail`}
                  onError={(e) => { e.currentTarget.src = FALLBACK_IMG; }}
                />

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
            onClick={handleStart}
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
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 125%;
  letter-spacing: -0.36px;
`;

const Sub = styled.div`
  color: #6D6D6D;
  font-size: 12px;
  margin-top: 4px;
  text-align: center;
`;

const ListWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 8px;
  background: #F1F1F1;
`;

const StoreItem = styled.button`
  display: flex;
  padding: 10px;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  width: 100%;
  border: 0;
  background: ${({ $selected }) => ($selected ? '#FFEDD4' : 'transparent')};
  border-radius: ${({ $selected, $isFirst, $isLast }) => {
    if (!$selected) return '0';
    if ($isFirst && $isLast) return '8px';
    if ($isFirst) return '8px 8px 0 0';
    if ($isLast) return '0 0 8px 8px';
    return '0';
  }};
  cursor: pointer;
  text-align: left;

  & + & { margin-top: 8px; }
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

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.28px;
`;

const StartButton = styled(CommonButton)`
  width: 144px; height: 44px;
  border-radius: ${(p) => (p.$enabled ? '8px' : '8px 8px 0 0')};
  background: ${(p) => (p.$enabled ? 'var(--orange-500, #FF6900)' : '#CFCFCF')};
  color: #fff;
  pointer-events: ${(p) => (p.$enabled ? 'auto' : 'none')};
  text-align: center;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.28px;
`;

const SubDes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const StarIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const SubDesText = styled.div`
  color: #7F7F7F;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.2px;
  text-align: center;
`;

const MainDesBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const MainDesTitle = styled.div`
  color: #000;
  text-align: center;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.32px;
`;

const MainDesSub = styled.div`
  color: #858585;
  text-align: center;

  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.24px;
`;
