// src/features/store/pages/StoreDetail.jsx

import React, { useEffect, useState } from 'react';
// useNavigate 훅을 import 합니다.
import { useParams, useNavigate } from "react-router-dom"; 
import styled from 'styled-components';

import Layout from '../../../components/common/Layout';
import LeftHeader from '@/components/common/header/LeftHeader';
import BackImg from "@/assets/icons/header_back.png";
import SearchImg from '@/assets/icons/search.png';

import StoreInfo from '../components/StoreInfo';
import Divider from '../../../components/common/Divider';
import StoreReview from '../components/review/StoreReview';

import { fetchStoreDetail, fetchStores } from "@/shared/api/store";
import StoreLocation from '../components/StoreLocation';

const StoreDetail = () => {
  const { id } = useParams();
  const nav = useNavigate(); // nav 변수에 useNavigate를 할당합니다.

  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchStoreDetail(id)
        .then((res) => {
          setStore(res.data);
        })
        .catch((err) => {
          console.error("[StoreDetail] 가게 상세 조회 실패:", err);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p>로딩중...</p>;
  if (!store) return <p>가게 정보를 불러올 수 없습니다.</p>;

  
  return (
    <Layout>
      <LeftHeader
        title="Store" 
        leftIcon={BackImg}
        rightIcon={SearchImg}
        onLeftClick={() => window.history.back()}
        onRightClick={() => console.log("검색 클릭")}
      />

      {/* 대표 이미지 */}
      {store.store_image ? (
        <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
          <img
            src={store.store_image}
            alt={store.store_name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ) : (
        <div style={{ width: "100%", height: "200px", background: "#ddd" }} />
      )}

      <StoreInfo store={store} />

      <Divider />
      <StoreReview storeId={store.store_id} store={store} />
    </Layout>
  );
};

export default StoreDetail;

const StoreImg = styled.div`
  width: 100%;
  height: 180px;
  background: #EAEAEA;
  background-size: cover;
  background-position: center;
`;
