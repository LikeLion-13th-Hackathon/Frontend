import React from 'react'
import styled from 'styled-components'
import BackImg from "@/assets/icons/header_back.png";
import SearchImg from '@/assets/icons/search.png';
import StoreList from '../components/StoreList';
import MarketInfo from '../components/MarketInfo';
import Layout from '@/components/common/Layout';
import LeftHeader from '@/components/common/header/LeftHeader';

const MarketDetail = () => {
  return (
    <Layout overlapHeader>
        <LeftHeader
            title="Market"
            leftIcon={BackImg}
            rightIcon={SearchImg}
            onLeftClick={() => window.history.back()}
            onRightClick={() => console.log("검색 클릭")}
        />

        <MarketInfo />

        <StoreList />
    </Layout>
  )
}

export default MarketDetail