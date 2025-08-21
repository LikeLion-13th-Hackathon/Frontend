// src/features/search/components/CheckThisOut.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchDiscover } from "@/shared/api/searchAll";
import StoreCard from "@/features/home/components/StoreCard";


/* --- 모의데이터(API 전용 placeholder) --- */
const MOCK = Array.from({ length: 6 }).map((_, i) => ({
  id: `mock-${i}`,
  title: "가게명",
  desc: "리뷰내용리뷰내용리뷰내...",
  imageUrl: "",                 // 스켈레톤(회색 배경)으로 표시
  MarketName: "흑석시장",
  likes: 4,
}));

/* 응답 → StoreCard 형태로 매핑 */
const mapToStoreCard = (x = {}) => ({
  id: x.id,
  title: x.name || x.title || "-",
  desc: x.desc || x.subtitle || "",
  imageUrl: x.thumbnailUrl || x.image || "",
  MarketName: x.marketName || "흑석시장",
  likes: x.likes ?? 0,
});

export default function CheckThisOut({ onClickItem }) {
  const [items, setItems] = useState(MOCK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetchDiscover({ limit: 10 }); // 백엔드 준비되면 실제 데이터
        if (!mounted) return;
        const list = (res || []).map(mapToStoreCard);
        setItems(list.length ? list : MOCK);            // 비었으면 MOCK 사용
      } catch {
        setItems(MOCK);                                 // 오류 시 MOCK
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <Wrap>
      <Title>Check this place out</Title>
      {/* 페이지 padding이 이미 있으니 바깥 패딩은 0으로 */}
      <Bleed>
        <StoreCard
            items={items}
            onCardClick={onClickItem}
            outerPadding="0"
        />
      </Bleed>
    </Wrap>
  );
}

/* styled — 제목만 유지 */
const Wrap = styled.section`
  margin: 20px 0;
`;

const Title = styled.div`
  color:#000;
  font-size: 20px;
  font-weight:600;
  line-height:125%;
  letter-spacing:-0.4px;
  padding-bottom:12px;
`;

/* 페이지 좌우 padding이 20px일 때 첫 카드가 딱 붙게 하는 래퍼 */
const Bleed = styled.div`
  margin-left: -20px;   /* 페이지 패딩 무시 */
  margin-right: -20px;
  /* StoreCard가 기본적으로 좌우 padding 20px을 갖고 있어서
     검색 페이지에서는 제거해줘야 함 */
  & > div {
    padding-left: 10;
    padding-right: 10;
  }
`;