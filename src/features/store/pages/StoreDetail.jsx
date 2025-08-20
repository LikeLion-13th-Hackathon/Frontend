import React from 'react'
import Layout from '../../../components/common/Layout'
import BackImg from "@/assets/icons/header_back.png";
import SearchImg from '@/assets/icons/search.png';
import LeftHeader from '@/components/common/header/LeftHeader';
import styled from 'styled-components';
import StoreInfo from '../components/StoreInfo';
import Divider from '../../../components/common/Divider';
import StoreReview from '../components/review/StoreReview';

const StoreDetail = () => {
  return (
    <Layout>
        <LeftHeader
            title="Store"
            leftIcon={BackImg}
            rightIcon={SearchImg}
            onLeftClick={() => window.history.back()}
            onRightClick={() => console.log("검색 클릭")}
        />

        <StoreImg />

        <StoreInfo />

        <Divider />

        <StoreReview/>
    </Layout>
  )
}

export default StoreDetail

const StoreImg = styled.div` //추후 이미지 태그로 변경
    width: 375px;
    height: 146px;
    flex-shrink: 0;
    background: #EAEAEA;
`