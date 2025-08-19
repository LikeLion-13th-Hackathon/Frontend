import React from 'react'
import Layout from "@/features/home/components/Layout.jsx";
import styled from 'styled-components'
import BackImg from "@/assets/icons/header_back.png";
import SeachImg from '../../src/assets/icons/header_search.png';
import MarketInfo from '../components/marketPage/MarketInfo';
import StoreList from '../components/marketPage/StoreList';
import SortButtons from '../components/marketPage/SortButtons';

const MarketDetail = () => {
  return (
    <Layout overlapHeader>
        <Header>
            <Icon src={BackImg} alt="뒤로가기" />
            <HeaderTitle>Market</HeaderTitle>
            <Icon src={SeachImg} alt="검색" />
        </Header>

        <MarketInfo />

        <StoreList />
    </Layout>
  )
}

export default MarketDetail

const Header = styled.div`
    display: flex;
    width: 375px;
    height: 56px;
    padding: 0 20px;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;

    border-bottom: 1px solid #E8E8E8;
    background: #FFF;
`

const HeaderTitle = styled.div`
    flex: 1 0 0;
    color: #000;

    /* body/body 1-em */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
`

const Icon = styled.img`
    width: 24px;
    height: 24px;
    flex-shrink: 0;
`