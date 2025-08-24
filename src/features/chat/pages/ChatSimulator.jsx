// src/features/chat/pages/ChatSimulator.jsx

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Layout from '../../../components/common/Layout';
import LeftHeader from '../../../components/common/header/LeftHeader';
import BackImg from "@/assets/icons/header_back.png";
import { postChatMessage } from "@/shared/api/ai";
import styled from "styled-components";

import TopicIcon from "@/features/chat/components/TopicIcon";

export default function AIChatSimulatorChat() {
  const { state } = useLocation();   // ChatLoading에서 받은 값
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const chatBottomRef = useRef(null);

  // state 기반 설정
  const category = state?.store?.category?.toLowerCase() || "restaurants";
  const storeId = state?.store?.store_id;


  // topic을 state로 관리
  const [topic, setTopic] = useState(state?.topic?.topic || "default_topic");
  const [topicCaption, setTopicCaption] = useState(state?.topic?.caption || topic);

  const threadId = useMemo(() => topic, [topic]);

  const [dialogue, setDialogue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentTurnRole, setCurrentTurnRole] = useState("store");
  const [lastRequest, setLastRequest] = useState(null); // 새로고침용

  const activeCardRef = useRef(null); // CARD CENTER

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView();
  }, [messages]);

  // category 또는 topic이 바뀔 때마다 대화 초기화
  useEffect(() => {
    bootLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, topic]);

  useEffect(() => {
    if (activeCardRef.current) {
      activeCardRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [topic]);

  async function bootLoad() {
    setLoading(true);
    setErrorMsg("");
    setMessages([]);
    setDialogue([]);
    
    try {
      setCurrentTurnRole("store");
      const initialMessage = "가게 주인이 손님에게 건네는 자연스러운 첫 인사말 3개를 생성해 줘.";

      const payload = {
        category,
        topic,
        role: "store",
        threadId,
        message: initialMessage,
        store_id: storeId
      };

      setLastRequest({ role: "store", message: initialMessage });

      console.log("보내는 payload:", payload);

      const response = await postChatMessage(payload);
      setDialogue(response?.dialogue ?? []);
    } catch (e) {
      setErrorMsg(e.message || "채팅 시작에 실패했습니다. 새로고침 해주세요.");
    } finally {
      setLoading(false);
    }
  }

  async function onSelect(item) {
    if (!item?.korean) return;
    setMessages(prev => [
      ...prev,
      { 
        sender: currentTurnRole,
        text: `${item.korean}\n${item.romanization ?? ""}`.trim(),
        english: item.english_gloss ?? "",
        korean: item.korean,
        roman: item.romanization ?? ""
      }
    ]);
    setLoading(true);
    setErrorMsg("");
    setDialogue([]);

    try {
      const nextTurnRole = currentTurnRole === 'store' ? 'user' : 'store';

      setLastRequest({ role: nextTurnRole, message: item.korean });

      const response = await postChatMessage({
        category,
        topic,
        role: nextTurnRole,
        threadId,
        message: item.korean,
        store_id: storeId,
      });
      setDialogue(response?.dialogue ?? []);
      setCurrentTurnRole(nextTurnRole);
    } catch (e) {
      setErrorMsg(e.message || "다음 대사를 가져오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function handleRefreshOptions() {
    if (!lastRequest) return;

    setLoading(true);
    setErrorMsg("");
    setDialogue([]);

    try {
      const response = await postChatMessage({
        category,
        topic,
        threadId,
        role: lastRequest.role,
        message: lastRequest.message,
        retry: true,
        store_id: storeId, 
      });
      setDialogue(response?.dialogue ?? []);
    } catch (e) {
      setErrorMsg(e.message || "새로운 선택지를 가져오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  // 여러 토픽 중 하나 선택
  function handleSelectTopic(t) {
    setTopic(t.topic);
    setTopicCaption(t.caption);
  }

  const formatTopicTitle = (text) => {
    if (!text) return "";
    return text
      .split(/[\s_]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Layout>
      <PageContainer>
        {/* --- Header --- */}
        <LeftHeader
          title="AI Chat Simulator"
          leftIcon={BackImg}
          onLeftClick={() => window.history.back()}
        />

        {/* --- 여러 토픽 카드 --- */}
        <ScenarioRow>
          {state?.topics?.map((t, i) => (
            <ScenarioCard
              key={i}
              ref={t.topic === topic ? activeCardRef : null} 
              $active={t.topic === topic}
              onClick={() => handleSelectTopic(t)}
            >
              <ScenarioThumb>
                <TopicIcon id={t.topic} size={27} />
              </ScenarioThumb>
              <ScenarioTexts>
                <ScenarioTitle $active={t.topic === topic}>
                  {formatTopicTitle(t.topic)}
                </ScenarioTitle>
                <ScenarioSub>{t.caption}</ScenarioSub>
              </ScenarioTexts>
            </ScenarioCard>
          ))}
        </ScenarioRow>

        {/* --- 채팅창 --- */}
        <ChatStage>
          <Messages>
            {messages.map((m, i) =>
              m.sender === 'user'
                ? <BubbleUser key={i}>
              {m.english && <BubbleEn>{m.english}</BubbleEn>}
              <div>{m.korean}</div>
              {m.roman && <BubbleRoman>{m.roman}</BubbleRoman>}
            </BubbleUser>
          : <BubbleBot key={i}>
              {m.english && <BubbleEn>{m.english}</BubbleEn>}
              <div>{m.korean}</div>
              {m.roman && <BubbleRoman>{m.roman}</BubbleRoman>}
            </BubbleBot>
            )}
            <div ref={chatBottomRef} />
          </Messages>
        </ChatStage>
        
        {errorMsg && <ErrorBox>⚠️ {errorMsg}</ErrorBox>}

        {/* --- 하단 컨트롤 --- */}
        <ControlsContainer>
          <OptionHeader>
            {loading 
              ? 'Creating…' 
              : `Select the ${currentTurnRole === 'store' ? 'owner’s' : 'customer’s'} line.`
            }
          </OptionHeader>
          <PhraseRow>
            {dialogue?.map((d, i) => (
              <PhraseCard key={i} onClick={() => onSelect(d)}>
                <PhraseEn>{d.english_gloss}</PhraseEn>
                <PhraseKo>{d.korean}</PhraseKo>
                <PhraseRoman>{d.romanization}</PhraseRoman>
              </PhraseCard>
            ))}
            
            {!loading && dialogue.length > 0 && (
              <RefreshCard onClick={handleRefreshOptions}>
                <RefreshIcon>↻</RefreshIcon>
                <RefreshText>Show Another Response</RefreshText>
              </RefreshCard>
            )}
          </PhraseRow>
          <BottomBar>
            <EndButton
              disabled={messages.length < 2}
              onClick={() => {
                const category = state?.store?.category?.toLowerCase();
                const store = state?.store;   // store 객체 꺼내기

                // store_id를 id로 변환
                const storeWithId = { ...store, id: store.id ?? store.store_id };

                if (!storeWithId.id) {
                  alert("가게 ID가 없습니다. 백엔드 응답 확인 필요합니다.");
                  console.log("현재 store 값:", store); // 디버깅
                  return;
                }

                const nextState = { ...state, store: storeWithId };

                if (category === "restaurants") {
                  navigate("/review/restaurant", { state: nextState });
                } else if (category === "snacks") {
                  navigate("/review/snack", { state: nextState });
                } else if (category === "fresh") {
                  navigate("/review/fresh", { state: nextState });
                } else if (category === "goods") {
                  navigate("/review/goods", { state: nextState });
                } else {
                  navigate("/review/restaurant", { state: nextState }); // fallback
                }
              }}
            >
              End Chat &amp; Claim Reward
            </EndButton>
          </BottomBar>
        </ControlsContainer>
      </PageContainer>
    </Layout>
  );
}

/* --------------------------- styled-components --------------------------- */

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 375px;
  margin: 0 auto;
  background-color: #fff;
`;

const ControlsContainer = styled.div`
  padding-top: 8px;
  background-color: #fff;
  box-shadow: 0 -4px B(0,0,0,0.05);
`;

export const ChatStage = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 100px;
  margin: 12px clamp(16px, 4vw, 20px); 
  display: flex;
`;


export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  /* 좌우 padding 제거 */
  padding: 12px 0;
  width: 100%;
`;

const bubbleBase = `
  display: inline-block;     /* 부모 폭 따라가지 않고 글자수에 맞게 */
  width: auto;
  max-width: 78%;            /* 너무 길면 여기서 줄바꿈 */
  min-width: 40px;

  padding: 10px 12px;
  border-radius: 12px;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 14px;
  line-height: 1.4;
  box-shadow: 0 0 10px rgba(0,0,0,.06);
`;
export const BubbleBot = styled.div`
  ${bubbleBase}
  background: #dfdfdf;
  border-bottom-left-radius: 0px;
`;

export const BubbleUser = styled.div`
  ${bubbleBase}
  background: #FFF7ED;
  margin-left: auto;
  border-bottom-right-radius: 0px;
`;

export const ErrorBox = styled.div`
  background: #3b0a0a;
  border: 1px solid #7f1d1d;
  padding: 10px 12px;
  border-radius: 8px;
  color: #fecaca;
  margin: 0 clamp(16px, 4vw, 20px);
`;

export const OptionHeader = styled.div`
  padding: 0 clamp(16px, 4vw, 20px) 6px;
  color: #6b7280;
  font-size: 13px;
`;

const CARD_W = '150px';
export const PhraseRow = styled.div`
  padding: 0 clamp(16px, 4vw, 20px) 8px;
  display: flex;
  gap: 8px;
  overflow-x: auto;
  
  min-height: 150px; /* 카드의 높이(142px) + 여백을 고려한 값 */

  &::-webkit-scrollbar {
    display: none;
  }
  & > * {
    flex: 0 0 ${CARD_W};
    max-width: ${CARD_W};
  }
`;

export const PhraseCard = styled.div`
  width: ${CARD_W};
  min-height: 142px;
  padding: 10px;
  background: #FFF7ED;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,.10);
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  user-select: none;
  &:active {
    transform: scale(.98);
  }
`;

export const RefreshCard = styled(PhraseCard)`
  background: #dfdfdf;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const RefreshIcon = styled.div`
  font-size: 28px;
  color: #000;
`;

export const RefreshText = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #000;
  text-align: center;
`;

export const PhraseEn = styled.div`
  font-size: 14px;
  font-weight: 600;
  word-break: break-word;
`;

export const PhraseKo = styled.div`
  font-size: 13px;
  word-break: break-word;
`;

export const PhraseRoman = styled.div`
  font-size: 12px;
  color: #787878;
  word-break: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const BottomBar = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 16px calc(22px + env(safe-area-inset-bottom));
`;

export const EndButton = styled.button`
  width: clamp(280px, 88vw, 520px);
  padding: 13px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  background: ${({ disabled }) => (disabled ? "#E5E7EB" : "#ff6900")};
  color: ${({ disabled }) => (disabled ? "#8D8D8D" : "#fff")};
  border: none;
  transition: background 0.2s;
`;


export const ScenarioRow = styled.div`
  margin-top: 12px;
  padding: 0 clamp(16px, 4vw, 20px);
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 20px;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ScenarioCard = styled.div`
  flex: 0 0 clamp(240px, 60vw, 320px);
  scroll-snap-align: center;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px;
  border-radius: 12px;
  background: ${({ $active }) => ($active ? '#fff7ed' : '#ECECEC')};
  ${({ $active }) => $active && `
    box-shadow: 0 0 10px rgba(0,0,0,.10);
    outline: 1px solid #E1E1E1;
    outline-offset: -1px;
  `};
`;

export const ScenarioThumb = styled.div`
  width: clamp(40px, 5vw, 48px);
  height: clamp(40px, 5vw, 48px);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg, img {
    width: 70%;
    height: 70%;
  }
`;

export const ScenarioTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

export const ScenarioTitle = styled.div`
  font-size: clamp(13px, 2vw, 15px);
  line-height: 1.4;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};

  white-space: nowrap;       /* 줄바꿈 방지 */
  overflow: hidden;          /* 넘치는 부분 숨김 */
  text-overflow: ellipsis;   /* ... 처리 */
`;

export const ScenarioSub = styled.div`
  font-size: 12px;
  color: #404040;
`;

export const BubbleEn = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #000;
`;

export const BubbleRoman = styled.div`
  font-size: 12px;
  color: #555;
  margin-top: 4px;
`;
