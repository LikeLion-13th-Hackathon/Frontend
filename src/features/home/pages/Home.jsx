// src/features/home/pages/Home.jsx
import { useState } from 'react';

// 별칭(@) 기반 경로
import Layout from '@/components/common/Layout';
import ImageSlider from '@/features/home/components/ImageSlider';
import SearchBar from '@/features/home/components/SearchBar';
import Category from '@/features/home/components/Category';
import StoreCard from '@/features/home/components/StoreCard';
import Divider from '@/components/common/Divider';
import MarketInfo from '@/features/home/components/MarketInfo';
import TabBar from '../../../components/common/TabBar';

export default function Home() {
  const [selectedId, setSelectedId] = useState(1);

  return (
    <Layout overlapHeader>
      <ImageSlider />
      <SearchBar />
      <Category selectedId={selectedId} onSelect={setSelectedId} />
      <StoreCard />
      <Divider />
      <MarketInfo />
      <TabBar />
    </Layout>
  );
}
