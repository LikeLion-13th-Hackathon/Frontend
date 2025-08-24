// src/features/market/components/MarketInfo.jsx
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import DropDwonIcon from '@/assets/icons/dropdown.png';
import MarketDropdown from './MarketDropdown';
import { fetchMarkets } from '@/shared/api/market';
import { useSearchParams } from 'react-router-dom';

/** 이미지 1장: 깨지면 회색 박스 */
function ImgWithFallback({ src, alt }) {
  const [err, setErr] = useState(false);
  const safe = (src && String(src).trim()) || '';
  if (!safe || err) return null;
  return (
    <StyledImg
      src={safe}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setErr(true)}
    />
  );
}

// (선택) 설명 유지
const MARKET_SUB = {
  흑석시장: 'Traditional market in Dongjak-gu, Seoul',
  상도전통시장: 'Community market loved by locals in Sangdo-dong',
  노량진수산시장: 'The most famous fish market in Seoul',
};
const MARKET_DESC = {
  흑석시장: 'A cozy neighborhood market known for friendly vendors and everyday essentials.',
  상도전통시장: 'A traditional community market offering fresh produce and daily goods.',
  노량진수산시장: 'Korea’s iconic seafood market with lively auctions and freshest catches.',
};

const MarketInfo = () => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const [params, setParams] = useSearchParams();
  const initialId = Number(params.get('market')) || 1;

  const [markets, setMarkets] = useState([]);         // /market/list/ 결과
  const [selected, setSelected] = useState(null);     // 선택된 market 객체
  const [images, setImages] = useState(null);           // market_image 1~3

  // 드롭다운 밖 클릭 시 닫기
  useEffect(() => {
    const close = (e) => {
      if (!open) return;
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  // 1) 시장 리스트 로드
  useEffect(() => {
    (async () => {
      try {
        const list = await fetchMarkets();
        setMarkets(list);
        // URL 쿼리의 id로 선택, 없으면 첫 번째
        const found = list.find(m => Number(m.market_id) === initialId) || list[0] || null;
        setSelected(found || null);
      } catch (e) {
        console.error('시장 목록 불러오기 실패:', e);
        setMarkets([]);
        setSelected(null);
      }
    })();
  }, []); // 최초 1회

  // 2) 선택 변경 시 이미지 2~3 세팅
  useEffect(() => {
    if (!selected) { setImages(null); return; }
    const urls = [
      selected.market_image2,
      selected.market_image3,
    ]
      .filter(Boolean)
      .map((s) => String(s).trim())
      .filter((s) => s.length > 0);
    setImages(urls);
  }, [selected]);

  // 드롭다운에서 이름 선택
  const handleChangeMarket = (name) => {
    const found = markets.find((m) => m.market_name === name);
    if (found) {
      setSelected(found);
      setParams({ market: String(found.market_id) }); // /?market=2 로 URL 반영
    }
    setOpen(false);
  };

  const marketNames = markets.map((m) => m.market_name);
  const title = selected?.market_name ?? '시장 선택';

  return (
    <Wrapper>
      <Container ref={rootRef}>
        <MarketTitle onClick={() => setOpen((v) => !v)}>
          <Title>{title}</Title>
          <Icon src={DropDwonIcon} alt="드롭다운" />

        {open && (
          <Popover>
            <MarketDropdown
              markets={marketNames}
              value={selected?.market_name}
              onChange={handleChangeMarket}
            />
          </Popover>
        )}
        </MarketTitle>
      </Container>

      {/* 설명 (옵션) */}
      <DescContainer>
        <SubDescription>{selected ? (MARKET_SUB[selected.market_name] || '') : ''}</SubDescription>
        <Description>{selected ? (MARKET_DESC[selected.market_name] || '') : ''}</Description>
      </DescContainer>

      {/* 이미지들 */}
      <ImgContainer>
        {Array.isArray(images) && images.length > 0 &&
           images.map((url, idx) => (
              <ImgWithFallback
                key={`${selected.market_id}-${idx}`}
                src={url}
                alt={`${title} ${idx + 1}`}
              />
            ))
        }
      </ImgContainer>
    </Wrapper>
  );
};

export default MarketInfo;

const Wrapper = styled.div`
  display: flex;
  width: 637px;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  margin: 20px 23px;
`;
const Container = styled.div`
  display: flex;
  width: 334px;
  justify-content: space-between;
  align-items: center;
`;
const MarketTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  //
  position: relative;
  cursor: pointer;
`;

const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
  line-height: 125%;
  letter-spacing: -0.48px;
`;
const Icon = styled.img`
  width: 16px;
  height: 16px;
`;
const Popover = styled.div`
  /* position: absolute;
  top: 110px;
  left: 80px; */
  position: absolute;
  top: calc(100% + 8px);
  left:0;

  z-index: 1000;
  border: 1px solid #d5d5d5;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
`;
const DescContainer = styled.div`
  display: flex;
  width: 334px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;
const SubDescription = styled.div`
  align-self: stretch;
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.24px;
`;
const Description = styled.div`
  align-self: stretch;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.32px;
`;
const ImgContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  flex-wrap: wrap;
`;
const StyledImg = styled.img`
  width: 160px;
  height: 276px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
`;
