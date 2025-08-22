// src/features/chat/pages/ChatLoading.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "@/components/common/Layout";
import LeftHeader from "@/components/common/header/LeftHeader";

// API 함수 및 아이콘 import
import { fetchAiTopics } from "@/shared/api/ai";
import BackImg from "@/assets/icons/header_back.png";
import LocationImg from "@/assets/icons/location.png";
import StarSvg from "@/assets/icons/star.svg?react";
import SpinnerSvg from "@/assets/icons/spinner.svg?react";
import TopicIconPlaceholder from "@/assets/icons/topic_placeholder.png";

// --- UI 컴포넌트들 ---

const StoreItem = ({ store }) => {
  const primary = store?.menus?.[0];
  return (
    <SI_Card>
      <SI_Left>
        <SI_Icon src={LocationImg} alt="위치" />
      </SI_Left>
      <SI_Text>
        <SI_Title>
          {store?.nameKo ?? "-"} {store?.nameEn && store.nameEn}
        </SI_Title>
        <SI_Sub>
          {primary?.name ?? "-"} ·{" "}
          {primary?.price != null ? `₩ ${primary.price.toLocaleString()}` : "-"}
        </SI_Sub>
      </SI_Text>
      <SI_Right>
        <SI_Arrow src={BackImg} alt="더보기" />
      </SI_Right>
    </SI_Card>
  );
};

const formatTopicTitle = (text) => {
  if (!text) return '';
  return text.split(/[\s_]+/) // 공백이나 언더스코어로 단어 분리
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const TopicItem = ({ topic, onClick }) => (
  <TI_Card onClick={onClick}>
    <TI_Icon src={TopicIconPlaceholder} alt="" />
    <TI_Text>
      {/* topic.title -> topic.topic 으로 변경하고, 형식 변환 함수를 적용 */}
      <TI_Title>{formatTopicTitle(topic.topic)}</TI_Title>
      
      {/* topic.subtitle -> topic.caption 으로 변경하고, 없을 경우 기본 문구 표시 */}
      <TI_Subtitle>{topic.caption || "Select to start conversation"}</TI_Subtitle>
    </TI_Text>
    <TI_Arrow src={BackImg} alt=">" />
  </TI_Card>
);

const LoadingAnimation = () => (
  <LoadingWrap aria-live="polite" aria-busy="true">
    <LoadingCard>
      <Loader>
        <StarWrapper><StarSvg /></StarWrapper>
        <SpinnerWrapper><SpinnerSvg /></SpinnerWrapper>
      </Loader>
      <LoadingText>Generating sample conversation...</LoadingText>
    </LoadingCard>
  </LoadingWrap>
);


// --- 메인 컴포넌트 ---
export default function ChatLoading({ store }) {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTopics() {
      try {
        // 부모로부터 받은 store 객체에서 category를 가져옵니다.
        const category = store?.category;
        if (!category) {
          console.warn("Store category is missing. Cannot fetch topics.");
          setIsLoading(false);
          return;
        }

        const topicsData = await fetchAiTopics(category);
        setTopics(topicsData);
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    // store 정보가 있을 때만 토픽을 불러옵니다.
    if (store) {
      loadTopics();
    } else {
      console.warn("Store data is not provided to ChatLoading component.");
      setIsLoading(false);
    }
  }, [store]);

  const handleTopicSelect = (topic) => {
    // 선택한 가게(store) 정보와 주제(topic) 정보를 함께 전달
    // 이전 AIChatSimulator.jsx에서 state를 받도록 설정했으므로 그 화면으로 이동
    navigate('/chat/simulator', { state: { store, topic } });
  };
  
  return (
    <Layout>
      <LeftHeader
        title="AI Chat Simulator"
        leftIcon={BackImg}
        onLeftClick={() => window.history.back()}
      />

      <Section>
        <SectionTitle>Where You Chat</SectionTitle>
        <StoreItem store={store} />
      </Section>

      <Divider />

      <Section>
        <SectionTitle>Here’s How a Chat Might Go</SectionTitle>
        <Subcopy>Improve your skills in real-time with an AI partner.</Subcopy>

        {isLoading ? (
          <LoadingAnimation />
        ) : topics.length > 0 ? (
          <TopicListContainer>
            {topics.map((topic) => (
              <TopicItem key={topic.id || topic.topic} topic={topic} onClick={() => handleTopicSelect(topic)} />
            ))}
          </TopicListContainer>
        ) : (
          <EmptyMessage>
            대화 가능한 주제가 없습니다.
          </EmptyMessage>
        )}
      </Section>
    </Layout>
  );
}

// --- Styled-components ---
const Section = styled.section` padding: 16px; `;
const SectionTitle = styled.h2` font-size: 18px; font-weight: 800; margin-bottom: 12px; `;
const Subcopy = styled.p` font-size: 14px; color: #6b6b6b; margin-bottom: 16px;`;
const Divider = styled.div` width: 100%; height: 12px; background-color: #f0f0f0; `;

const TopicListContainer = styled.div` display: flex; flex-direction: column; gap: 8px; `;
const TI_Card = styled.div` display: flex; align-items: center; padding: 16px; background-color: #f8f8f8; border-radius: 12px; cursor: pointer; transition: background-color 0.2s; &:hover { background-color: #f0f0f0; } `;
const TI_Icon = styled.img` width: 40px; height: 40px; margin-right: 16px; border-radius: 8px; background-color: #e0e0e0; `;
const TI_Text = styled.div` flex: 1; `;
const TI_Title = styled.div` font-size: 16px; font-weight: 600; `;
const TI_Subtitle = styled.div` font-size: 13px; color: #666; margin-top: 2px; `;
const TI_Arrow = styled.img` width: 20px; height: 20px; transform: rotate(180deg); opacity: 0.5; `;
const EmptyMessage = styled.div` padding: 40px 20px; text-align: center; color: #888; background-color: #f8f8f8; border-radius: 12px; `;

// Loading Animation Styles
const LoadingWrap = styled.div` padding: 12px 0; `;
const LoadingCard = styled.div` border: 1px solid #eee; background: #fafafa; border-radius: 12px; height: 320px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; `;
const Loader = styled.div` position: relative; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; `;
const StarWrapper = styled.div` position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 2; svg { width: 100px; height: 100px; } `;
const SpinnerWrapper = styled.div` position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; transform: translate(-50%, -50%); z-index: 1; svg { width: 100%; height: 100%; animation: spin 2.5s linear infinite; transform-origin: center center; } @keyframes spin { 100% { transform: rotate(360deg); } } `;
const LoadingText = styled.p` position: absolute; bottom: 60px; font-size: 16px; color: #222; `;

// Store Item Styles
const SI_Card = styled.div` display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-radius: 12px; border: 1px solid #e5e5e5; background: #fff; `;
const SI_Left = styled.div` width: 28px; height: 28px; flex-shrink: 0; `;
const SI_Icon = styled.img` width: 100%; height: 100%; object-fit: contain; filter: brightness(0) saturate(100%) invert(53%) sepia(0%) saturate(0%) hue-rotate(163deg) brightness(95%) contrast(90%); `;
const SI_Text = styled.div` flex: 1; margin: 0 12px; display: flex; flex-direction: column; gap: 4px; `;
const SI_Title = styled.div` font-size: 16px; font-weight: 600; `;
const SI_Sub = styled.div` font-size: 13px; color: #666; `;
const SI_Right = styled.div` width: 20px; height: 20px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; `;
const SI_Arrow = styled.img` width: 20px; height: 20px; transform: rotate(180deg); filter: brightness(0) saturate(100%) invert(53%) sepia(0%) saturate(0%) hue-rotate(163deg) brightness(95%) contrast(90%); `;