import React, { useEffect, useState } from 'react';
import BackImg from "@/assets/icons/header_back.png";
import SearchImg from '@/assets/icons/search.png';
import StoreList from '../components/StoreList';
import MarketInfo from '../components/MarketInfo';
import Layout from '@/components/common/Layout';
import LeftHeader from '@/components/common/header/LeftHeader';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TabBar from '../../../components/common/TabBar';

const MarketDetail = () => {
    // 브라우저 탭 제목 설정
    useEffect(() => {
      document.title = "mapin | Market";  // 원하는 제목
    }, []);
    const [searchParams] = useSearchParams();
    const marketId = Number(searchParams.get('market')) || 1;

    const navigate = useNavigate();
    

  return (
    <Layout overlapHeader bottomPadding={66}>
        <LeftHeader
            title="Market"
            leftIcon={BackImg}
            rightIcon={SearchImg}
            onLeftClick={() => window.history.back()}
            onRightClick={() => navigate("/search")}
        />

        <MarketInfo />

        <StoreList marketId={marketId}/>

        <TabBar />
    </Layout>
  )
}

export default MarketDetail