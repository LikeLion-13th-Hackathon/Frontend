import { useState, useEffect } from 'react';
import Layout from '@/components/common/Layout';
import ImageSlider from '@/features/home/components/ImageSlider';
import Category from '@/features/home/components/Category';
import StoreCard from '@/features/home/components/StoreCard';
import Divider from '@/components/common/Divider';
import MarketInfo from '@/features/home/components/MarketInfo';
import TabBar from '../../../components/common/TabBar';
import HomeHeader from "@/features/home/components/HomeHeader";

import { filterStoresByCategory } from '@/shared/api/store';
import apiClient from '@/shared/api/apiClient';

export default function Home() {
  const [selectedId, setSelectedId] = useState("Fresh");
  const [markets, setMarkets] = useState([]);
  const [stores, setStores] = useState([]);

  // 페이지 진입 시 탭 제목 변경
  useEffect(() => {
    document.title = "mapin | Home"; 
  }, []);

  // 시장 리스트 불러오기
  useEffect(() => {
    apiClient.get("/market/list/").then(res => {
      setMarkets(res.data);
    });
  }, []);

  // 카테고리별 가게 불러오기
  useEffect(() => {
    async function loadStores() {
      try {
        const res = await filterStoresByCategory(selectedId);

        const marketNameMap = {
          1: "흑석시장",
          2: "상도시장",
          3: "노량진수산시장",
        };

        const formatted = res.data.map((s) => ({
          id: s.store_id,
          title: s.store_english,
          desc: s.most_liked_review?.comment || null, 
          imageUrl: s.store_image,
          marketName: marketNameMap[s.market_id] || "알 수 없음",
          likes: s.most_liked_review?.likes_count || 0, 
        }));

        setStores(formatted);
      } catch (err) {
        console.error("❌ 가게 불러오기 실패:", err);
      }
    }
    loadStores();
  }, [selectedId]);

  return (
    <Layout overlapHeader bottomPadding={88}>
      <HomeHeader />
      <ImageSlider markets={markets} />
      <Category selectedId={selectedId} onSelect={setSelectedId} />
      <StoreCard items={stores} />
      <Divider />
      <MarketInfo infos={markets} />
      <TabBar />
    </Layout>
  );
}
