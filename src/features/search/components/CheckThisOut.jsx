import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StoreCard from "@/features/home/components/StoreCard";
import { filterStoresByCategory } from "@/shared/api/store";

export default function CheckThisOut() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function loadStores() {
      try {
        const res = await filterStoresByCategory("Restaurants");

        const marketNameMap = {
          1: "흑석시장",
          2: "상도시장",
          3: "노량진수산시장",
        };

        const formatted = (res.data || []).map((s) => ({
          id: s.store_id,
          title: s.store_name,
          desc: s.most_liked_review?.comment || "등록된 리뷰가 없습니다.",
          imageUrl: s.store_image,
          marketName: marketNameMap[s.market_id] || "알 수 없음",
          likes: s.most_liked_review?.likes_count || 0,
        }));

        const shuffled = [...formatted];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        setStores(shuffled.slice(0, 5));
      } catch (err) {
        console.error("❌ CheckThisOut 가게 불러오기 실패:", err);
      }
    }
    loadStores();
  }, []);

  return (
    <Wrap>
      <Title>Check this place out</Title>
      <CardOverride>
        <StoreCard items={stores} />
      </CardOverride>
    </Wrap>
  );
}

/* === styled === */
const Wrap = styled.section`
  margin: 20px 0;
`;

const Title = styled.div`
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 125%;
  letter-spacing: -0.4px;
`;

const CardOverride = styled.div`
  /* StoreCard > Wrapper에 적용된 좌우 padding 무효화 */
  & > div {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
`;
