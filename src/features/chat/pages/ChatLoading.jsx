// src/features/chat/pages/ChatLoading.jsx
import React, { useEffect } from "react";
import styled from "styled-components";
import Layout from "@/components/common/Layout";
import LeftHeader from "@/components/common/header/LeftHeader";

// PNG 아이콘 import
import BackImg from "@/assets/icons/header_back.png";
import LocationImg from "@/assets/icons/location.png";

// SVG 아이콘 import (svgr 활용)
import StarSvg from "@/assets/icons/star.svg?react";
import SpinnerSvg from "@/assets/icons/spinner.svg?react";

/* =========================
   StoreItem (PNG 아이콘 버전)
   ========================= */
const StoreItem = ({ store }) => {
  const primary = store?.menus?.[0];

  return (
    <SI_Card>
      {/* 왼쪽 위치 아이콘 */}
      <SI_Left>
        <SI_Icon src={LocationImg} alt="위치" />
      </SI_Left>

      {/* 가운데 텍스트 */}
      <SI_Text>
        <SI_Title>
          {store?.nameKo ?? "-"} {store?.nameEn && store.nameEn}
        </SI_Title>
        <SI_Sub>
          {primary?.name ?? "-"} ·{" "}
          {primary?.price != null ? `₩ ${primary.price.toLocaleString()}` : "-"}
        </SI_Sub>
      </SI_Text>

      {/* 오른쪽 화살표 (BackImg 회전) */}
      <SI_Right>
        <SI_Arrow src={BackImg} alt="더보기" />
      </SI_Right>
    </SI_Card>
  );
};

/* =========================
   ChatLoading Page
   ========================= */
export default function ChatLoading({ store }) {
  useEffect(() => {
    const prev = document.title;
    document.title = "AI Chat Simulator - Loading";
    return () => (document.title = prev);
  }, []);

  return (
    <Layout>
      <LeftHeader
        title="AI Chat Simulator"
        leftIcon={BackImg}
        onLeftClick={() => window.history.back()}
      />

      {/* Where You Chat */}
      <Section>
        <SectionTitle>Where You Chat</SectionTitle>
        <StoreItem store={store} />
      </Section>

      {/* 구분선 */}
      <Divider />

      {/* 설명 */}
      <Section>
        <SectionTitle>Here’s How a Chat Might Go</SectionTitle>
        <Subcopy>Improve your skills in real-time with an AI partner.</Subcopy>
      </Section>

      {/* 로딩 영역 */}
      <LoadingWrap aria-live="polite" aria-busy="true">
        <LoadingCard>
          <Loader>
            {/* 중앙 고정 별 */}
            <StarWrapper>
              <StarSvg />
            </StarWrapper>

            {/* 회전하는 점 */}
            <SpinnerWrapper>
              <SpinnerSvg />
            </SpinnerWrapper>
          </Loader>
          <LoadingText>Generating sample conversation...</LoadingText>
        </LoadingCard>
      </LoadingWrap>
    </Layout>
  );
}

/* =========================
   styled-components (Page)
   ========================= */
   const Section = styled.section`
   padding: 16px;
 `;
 
 const SectionTitle = styled.h2`
   font-size: 18px;
   font-weight: 800;
   margin-bottom: 12px;
 `;
 
 const Subcopy = styled.p`
   font-size: 14px;
   color: #6b6b6b;
 `;
 
 const Divider = styled.div`
   width: 375px;
   height: 12px;
   background-color: #efefef;
   flex-shrink: 0;
 `;
 
 /* =========================
    styled-components (로딩)
    ========================= */
 const LoadingWrap = styled.section`
   padding: 12px 16px 24px;
 `;
 
 const LoadingCard = styled.div`
   border: 1px solid #eee;
   background: #fafafa;
   border-radius: 12px;
   height: 420px;
 
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   position: relative;
 `;
 
 const Loader = styled.div`
 position: relative;
 width: 120px;
 height: 120px;
 display: flex;
 align-items: center;
 justify-content: center;
`;
 
const StarWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  svg {
    width: 100px;
    height: 100px;
  }
  `;
 
  const SpinnerWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    z-index: 1;

    svg {
      width: 100%;
      height: 100%;
      animation: spin 2.5s linear infinite;
      transform-origin: center center;
    }

    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
  `;
 
 const LoadingText = styled.p`
  position: absolute;
  bottom: 80px;   /* ⬇️ 글자를 더 밑으로 */
  font-size: 16px;
  color: #222;
`;
 
 /* =========================
    styled-components (StoreItem)
    ========================= */
 const SI_Card = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 12px 16px;
   border-radius: 12px;
   border: 1px solid #e5e5e5;
   background: #fff;
 `;
 
 const SI_Left = styled.div`
   width: 28px;
   height: 28px;
   flex-shrink: 0;
 `;
 
 const SI_Icon = styled.img`
   width: 100%;
   height: 100%;
   object-fit: contain;
   filter: brightness(0) saturate(100%) invert(53%) sepia(0%) saturate(0%)
     hue-rotate(163deg) brightness(95%) contrast(90%);
 `;
 
 const SI_Text = styled.div`
   flex: 1;
   margin: 0 12px;
   display: flex;
   flex-direction: column;
   gap: 4px;
 `;
 
 const SI_Title = styled.div`
   font-size: 16px;
   font-weight: 600;
 `;
 
 const SI_Sub = styled.div`
   font-size: 13px;
   color: #666;
 `;
 
 const SI_Right = styled.div`
   width: 20px;
   height: 20px;
   flex-shrink: 0;
   display: flex;
   align-items: center;
   justify-content: center;
 `;
 
 const SI_Arrow = styled.img`
   width: 20px;
   height: 20px;
   transform: rotate(180deg); /* BackImg → 오른쪽 화살표 */
   filter: brightness(0) saturate(100%) invert(53%) sepia(0%) saturate(0%)
     hue-rotate(163deg) brightness(95%) contrast(90%);
 `;
 