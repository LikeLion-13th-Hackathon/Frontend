import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import DropDwonIcon from '@/assets/icons/dropdown.png';
import MarketDropdown from "./MarketDropdown";

// 시장별 짧은 소개 (SubDescription)
const MARKET_SUB = {
  "흑석시장": "Traditional market in Dongjak-gu, Seoul",
  "상도전통시장": "Community market loved by locals in Sangdo-dong",
  "노량진수산시장": "The most famous fish market in Seoul"
};

// 시장별 긴 소개 (Description)
const MARKET_DESC = {
  "흑석시장": "A cozy neighborhood market known for friendly vendors and everyday essentials.",
  "상도전통시장": "A traditional community market offering fresh produce and daily goods.",
  "노량진수산시장": "Korea’s iconic seafood market with lively auctions and freshest catches."
};

// 컴포넌트 상단에 추가 (외부 의존 X 플레이스홀더)
const PLACEHOLDER_DATA = `data:image/svg+xml;utf8,` + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="160" height="276">
    <rect width="100%" height="100%" fill="#e5e7eb"/>
    <text x="50%" y="50%" text-anchor="middle" fill="#6b7280" font-size="14" font-family="Arial">No Image</text>
  </svg>
`);


const MarketInfo = () => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);

    const [markets, setMarkets] = useState([]);
    const [selected, setSelected] = useState(null);

    // 드롭다운 밖 클릭 시 닫기
    useEffect(() => {
        const handleOutside = (e) => {
            if (!open) return;
            if (rootRef.current && !rootRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutside); // 또는 'click'
        return () => document.removeEventListener('mousedown', handleOutside);
    }, [open]);

    // 최초 마켓 리스트 불러오기
    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
    (async () => {
        try {
        const res = await fetch(`${API_BASE}/market/list/`, {
            headers: { Accept: 'application/json' },
            // credentials: 'include', // 쿠키 쓰면 활성화
        });
        const ct = res.headers.get('content-type') || '';
        const text = await res.text();

        if (!res.ok) throw new Error(`HTTP ${res.status} ${text.slice(0,200)}`);
        if (!ct.includes('application/json')) {
            throw new Error(`Expected JSON but got ${ct}. Body: ${text.slice(0,200)}`);
        }

        const data = JSON.parse(text);
        setMarkets(Array.isArray(data) ? data : []);
        if (data?.length) setSelected(data[0]);
        } catch (err) {
        console.error('시장 목록 불러오기 실패:', err);
        }
    })();
    }, []);


    // 드롭다운에서 이름을 선택하면 해당 객체로 교체
    const handleChangeMarket = (name) => {
        const found = markets.find(m => m.market_name === name);
        if (found) setSelected(found);
        setOpen(false);
    };

    // 드롭다운에 넘길 표시용 이름 배열
    const marketNames = markets.map(m => m.market_name);

  return (
    <Wrapper>
        <Container ref={rootRef}>
            <MarketTitle onClick={() => setOpen((v) => !v)}>
                <Rectangle />
                <Title>{selected?.market_name ?? '시장 선택'}</Title>
                <Icon src={DropDwonIcon} alt="드롭다운" />
            </MarketTitle>

            {open && (
                <Popover>
                    <MarketDropdown
                        markets={marketNames}
                        value={selected?.market_name}
                        onChange={handleChangeMarket}
                    />
                </Popover>
            )}
        </Container>

        <DescContainer>
            <SubDescription>
                {selected ? (MARKET_SUB[selected.market_name] || "") : ""}
            </SubDescription>
            <Description>
                {selected ? (MARKET_DESC[selected.market_name] || "") : ""}
            </Description>
        </DescContainer>

        {selected?.market_image && (
            <ImgContainer>
                {console.log('[MARKET IMG URL]', selected.market_image)}
                <StyledImg
                src={selected.market_image?.trim()}     // 혹시 모를 공백 제거
                alt={selected.market_name}
                onLoad={() => console.log('[IMG] loaded')}
                onError={(e) => {
                    console.error('[IMG] load failed:', selected.market_image);
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = PLACEHOLDER_DATA; // 외부 도메인 문제여도 화면은 뜨게
                }}
                />
            </ImgContainer>
            )}

    </Wrapper>
  )
}

export default MarketInfo

const Wrapper = styled.div`
    display: flex;
    width: 637px;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    margin: 20px 23px;
`
const Container = styled.div`
    display: flex;
    width: 334px;
    justify-content: space-between;
    align-items: center;
`

const MarketTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`

const Rectangle = styled.div`
    width: 32px;
    height: 32px;
    background: #D9D9D9;
`

const Title = styled.div`
    color: #000;

    /* head/head 1-em */
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 125%; /* 30px */
    letter-spacing: -0.48px;
`
const Icon = styled.img`
    display: flex;
    width: 16px;
    height: 16px;
    justify-content: center;
    align-items: center;
`

const DescContainer = styled.div`
    display: flex;
    width: 334px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
`

const SubDescription = styled.div`
    align-self: stretch;
    color: #000;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`

const Description = styled.div`
    align-self: stretch;
    color: #000;

    /* body/body 1 */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
`

const Popover = styled.div`
  position: absolute;
  top: 110px; /* 제목줄 아래로 높이 조절 */
  left: 100px; /* 오른쪽 방향 조절*/
  z-index: 1000;

  border: 1px solid #d5d5d5;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
`;

const ImgContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 14px;
`

const StyledImg = styled.img`
    width: 160px;
    height: 276px;
    object-fit: cover;
    border-radius: 8px;
    display: block;
`