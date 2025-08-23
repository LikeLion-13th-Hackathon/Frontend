import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StoreCard from "@/features/home/components/StoreCard";
import apiClient from "@/shared/api/apiClient";

export default function TrendingNow() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function loadTrendingStores() {
      try {
        // 🔥 전체 가게 불러오기
        const res = await apiClient.get("/store/list/?limit=60");

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
          reviewCount: s.review_count || 0, // ✅ 댓글(리뷰) 수
        }));

        // ✅ 리뷰 수 기준 내림차순 정렬
        const sorted = formatted.sort((a, b) => b.reviewCount - a.reviewCount);

        // ✅ 상위 4개만 선택
        setStores(sorted.slice(0, 4));
      } catch (err) {
        console.error("❌ TrendingNow 가게 불러오기 실패:", err);
      }
    }
    loadTrendingStores();
  }, []);

  return (
    <Wrap>
      <Title>Trending Now</Title>
      <StoreCard items={stores} />
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
  padding-bottom: 12px;
`;
