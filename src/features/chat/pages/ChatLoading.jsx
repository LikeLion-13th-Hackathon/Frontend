// src/features/chat/pages/ChatLoading.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Layout from "@/components/common/Layout";
import LeftHeader from "@/components/common/header/LeftHeader";

// API 함수 및 아이콘 import
import { fetchAiTopics } from "@/shared/api/ai";
import BackImg from "@/assets/icons/header_back.png";
import LocationImg from "@/assets/icons/location.png";
import StarSvg from "@/assets/icons/star.svg?react";
import SpinnerSvg from "@/assets/icons/spinner.svg?react";
import ChevronDown from "@/assets/icons/chevron_down.png";


// 추가 컴포넌트 import
import StoreSignatureMenu from "@/features/store/components/StoreSignatureMenu";
import StoreTag from "@/features/store/components/StoreTag";
import StoreLocation from "@/features/store/components/StoreLocation";
import TopicIcon from "@/features/chat/components/TopicIcon";

const StoreItem = ({ store, open, onToggle }) => {
  if (!store) return null;

  const { store_name, store_english, menu_list = [], road_address } = store;
  const firstMenu = menu_list.length > 0 ? menu_list[0] : null;

  return (
    <SI_Card $open={open} onClick={onToggle}>
      {/* 접혔을 때 */}
      {!open && (
        <>
          <SI_Left>
            <SI_Icon src={LocationImg} alt="위치" />
          </SI_Left>

          <SI_Text>
            <SI_Title>
              {store_name ?? "-"}
              {store_english && <span className="en"> {store_english}</span>}
            </SI_Title>

            {/* 첫 메뉴는 접었을 때만 */}
            {firstMenu && (
              <SI_Sub>
                <span>{firstMenu.korean || firstMenu.english}</span>
                <Price>{firstMenu.price ?? "-"}</Price>
              </SI_Sub>
            )}
          </SI_Text>

          <SI_Right>
            <SI_Arrow
              src={ChevronDown}
              alt="펼치기"
              className={open ? "" : "open"}
            />
          </SI_Right>
        </>
      )}

      {/* 펼쳤을 때 */}
      {open && (
        <>
          <SI_Body>
            <StoreTag store={store} />

            <SI_Title>
              {store_name ?? "-"}
              {store_english && <span className="en"> {store_english}</span>}
            </SI_Title>

            <StoreSignatureMenu items={menu_list.slice(0, 3)} />

            <StoreLocation roadAddress={road_address} />
          </SI_Body>

          {/* 우상단 화살표 */}
          <SI_Arrow
            src={ChevronDown}
            alt="펼치기"
            className={open ? "" : "open"}
          />
        </>
      )}


    </SI_Card>
  );
};

// --- Topic Item ---
const formatTopicTitle = (text) => {
  if (!text) return "";
  return text
    .split(/[\s_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// --- Topic Item ---
const TopicItem = ({ topic, onClick }) => {
  return (
    <TI_Card onClick={onClick}>
      <TI_Icon>
        <TopicIcon id={topic.topic} size={27} />
      </TI_Icon>
      <TI_Text>
        <TI_Title>{formatTopicTitle(topic.topic)}</TI_Title>
        <TI_Subtitle>
          {topic.caption || "Select to start conversation"}
        </TI_Subtitle>
      </TI_Text>
      <TI_Arrow src={BackImg} alt=">" />
    </TI_Card>
  );
};


// --- 로딩 애니메이션 ---
const LoadingAnimation = () => (
  <LoadingWrap aria-live="polite" aria-busy="true">
    <LoadingCard>
      <Loader>
        <StarWrapper>
          <StarSvg />
        </StarWrapper>
        <SpinnerWrapper>
          <SpinnerSvg />
        </SpinnerWrapper>
      </Loader>
      <LoadingText>Generating sample conversation...</LoadingText>
    </LoadingCard>
  </LoadingWrap>
);

// --- 메인 ---
export default function ChatLoading() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const store = state?.store;

  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false); // ▼ 펼침 여부 상태

  useEffect(() => {
    async function loadTopics() {
      try {
        const category = store?.category;
        if (!category) {
          console.warn("Store category is missing. Cannot fetch topics.");
          setIsLoading(false);
          return;
        }
        const topicsData = await fetchAiTopics(category);
        console.log("[ChatLoading] topicsData:", topicsData);
        setTopics(topicsData.all || []);   // ✅ 이렇게 배열만 세팅
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (store) {
      loadTopics();
    } else {
      console.warn("Store data is not provided to ChatLoading component.");
      setIsLoading(false);
    }
  }, [store]);


  const handleTopicSelect = (topic) => {
    const storeWithId = { 
      ...store, 
      id: store.store_id, 
      store_id: store.store_id 
    };
    
    navigate("/chat/simulator", {
      state: {
        store: storeWithId,
        topic: {
          id: topic.id,          // 내부 클라에서 필요하면 사용
          topic: topic.topic,    // 서버 전송용 (텍스트)
          caption: topic.caption // 화면 표시용
        },
        topics,
      },
    });
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
        <StoreItem store={store} open={open} onToggle={() => setOpen(!open)} />
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
              <TopicItem
                key={topic.id || topic.topic}
                topic={topic}
                onClick={() => handleTopicSelect(topic)}
              />
            ))}
          </TopicListContainer>
        ) : (
          <EmptyMessage>대화 가능한 주제가 없습니다.</EmptyMessage>
        )}
      </Section>
    </Layout>
  );
}



// --- Styled-components ---
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
  margin-bottom: 16px;
`;
const Divider = styled.div` 
  width: 100%; 
  height: 12px; 
  background-color: #f0f0f0; 
`;

/* --- 토픽 리스트 --- */
const TopicListContainer = styled.div` 
  display: flex; 
  flex-direction: column; 
  gap: 8px; 
`;

const TI_Card = styled.div` 
  display: flex; 
  align-items: center; 
  padding: 16px; 
  background-color: #f8f8f8; 
  border-radius: 12px; 
  cursor: pointer; 
  transition: background-color 0.2s; 
  &:hover { background-color: #f0f0f0; } 
`;

const TI_Icon = styled.div`
  width: 27px;
  height: 27px;
  margin-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const TI_Text = styled.div` flex: 1; `;
const TI_Title = styled.div` font-size: 15px; font-weight: 600; `;
const TI_Subtitle = styled.div` font-size: 13px; color: #666; margin-top: 2px; `;
const TI_Arrow = styled.img` 
  width: 20px; 
  height: 20px; 
  transform: rotate(180deg); 
  opacity: 0.5; 
`;
const EmptyMessage = styled.div` 
  padding: 40px 20px; 
  text-align: center; 
  color: #888; 
  background-color: #f8f8f8; 
  border-radius: 12px; 
`;

/* --- 로딩 애니메이션 --- */
const LoadingWrap = styled.div` padding: 12px 0; `;
const LoadingCard = styled.div` 
  border: 1px solid #eee; 
  background: #fafafa; 
  border-radius: 12px; 
  height: 320px; 
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
  svg { width: 100px; height: 100px; } 
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
  @keyframes spin { 100% { transform: rotate(360deg); } } 
`;
const LoadingText = styled.p` 
  position: absolute; 
  bottom: 60px; 
  font-size: 16px; 
  color: #222; 
`;

/* --- 가게 정보 카드 --- */
const SI_Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${({ $open }) => ($open ? "column" : "row")}; 
  align-items: ${({ $open }) => ($open ? "flex-start" : "center")};
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  background: #fff;
`;


const SI_Left = styled.div` width: 28px; height: 28px; flex-shrink: 0; `;
const SI_Icon = styled.img` 
  width: 100%; 
  height: 100%; 
  object-fit: contain; 
  filter: brightness(0) saturate(100%) invert(53%) sepia(0%) saturate(0%) hue-rotate(163deg) brightness(95%) contrast(90%); 
`;

const SI_Text = styled.div`
  flex: 1;
  margin: ${({ $open }) => ($open ? "0" : "0 12px")}; 
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const SI_Title = styled.div` 
  font-size: 16px; 
  font-weight: 600; 
  .en { 
    margin-left: 4px; 
    font-weight: 400; 
    font-size: 14px; 
    color: #555; 
  } 
`;
const SI_Sub = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #444;
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
  position: absolute;   
  top: 12px;            /* 카드 안쪽 위 여백 */
  right: 12px;          /* 카드 안쪽 오른쪽 여백 */
  width: 20px;
  height: 20px;
  transition: transform 0.25s ease;

  &.open {
    transform: rotate(180deg);
  }
`;

const SI_Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-top: 1px;
`;

const Price = styled.span`
  color: #666;
  font-size: 13px;
`;
