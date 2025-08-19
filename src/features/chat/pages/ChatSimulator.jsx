import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { askAI } from '@/shared/api/ai';
import Layout from '../../../components/common/Layout';
import LeftHeader from '../../../components/common/header/LeftHeader';
import BackImg from "@/assets/icons/header_back.png"

export default function AIChatSimulatorChat() {
  const [selected, setSelected] = useState(1);
  const [messages, setMessages] = useState([]);     // {sender:'user'|'bot', text}
  const [typing, setTyping] = useState(false);
  const chatBottomRef = useRef(null);
  const navigate = useNavigate();

  const scenarios = [
    { id: 0, title: 'Placing an Order', sub: 'One of this, please.' },
    { id: 1, title: 'Placing an Order', sub: 'One of this, please.' }, // active
    { id: 2, title: 'Asking About the Menu', sub: 'Is it spicy?' },
  ];

  const phrases = [
    { en: 'Please sit over here.', ko: '이쪽으로 앉으세요.', roman: 'Ijjeogeuro anjuseyo.' },
    { en: 'How many people?', ko: '몇 분이세요?', roman: 'Myeot bun-iseyo?' },
    { en: 'Please wait a moment for a seat.', ko: '자리 조금만 기다려주세요.', roman: 'Jari jogeumman gidaryeo juseyo.' },
  ];

  // 스크롤 맨 아래
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // 카드 클릭 → 질문 전송 → AI 응답
  const handleSendPhrase = async (p) => {
    const question = p.en;

    // 1) 사용자 말풍선 추가
    setMessages((prev) => [...prev, { sender: 'user', text: question }]);

    // 2) AI 요청 준비
    const scenarioTitle = scenarios.find(s => s.id === selected)?.title || '';
    const context = messages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text,
    }));

    setTyping(true);
    try {
      // 3) AI 호출 (백엔드 프록시 경유)
      const answer = await askAI({ question, context, scenario: scenarioTitle });

      // 4) 봇 말풍선 추가
      setMessages((prev) => [...prev, { sender: 'bot', text: answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '⚠️ 응답을 가져오지 못했어요. 잠시 후 다시 시도해 주세요.' },
      ]);
      // 개발용 콘솔
      // console.error(err);
    } finally {
      setTyping(false);
    }
  };

  return (
    <Layout>
      {/* 상단 네비 */}
      {/* <NavBar>
        <BackButton onClick={() => navigate(-1)} aria-label="뒤로가기">
          <ChevronLeftIcon />
        </BackButton>
        <NavTitle>AI Chat Simulator</NavTitle>
        <Spacer />
      </NavBar> */}
      <LeftHeader 
        title = "AI Chat Simulator"
        leftIcon={BackImg}
        onLeftClick={() => window.history.back()}
      />

      {/* 시나리오 가로 카드 */}
      <ScenarioRow>
        {scenarios.map((s) => {
          const active = s.id === selected;
          return (
            <ScenarioCard
              key={s.id}
              $active={active}
              onClick={() => setSelected(s.id)}
              role="button"
              tabIndex={0}
              aria-pressed={active}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelected(s.id)}
            >
              <ScenarioThumb />
              <ScenarioTexts>
                <ScenarioTitle $active={active}>{s.title}</ScenarioTitle>
                <ScenarioSub>{s.sub}</ScenarioSub>
              </ScenarioTexts>
            </ScenarioCard>
          );
        })}
      </ScenarioRow>

      {/* 채팅 영역 */}
      <ChatStage>
        <Messages>
          {messages.map((m, i) =>
            m.sender === 'user' ? (
              <BubbleUser key={i}>{m.text}</BubbleUser>
            ) : (
              <BubbleBot key={i}>{m.text}</BubbleBot>
            )
          )}
          {typing && (
            <TypingBubble aria-live="polite" aria-label="AI is typing">
              <DotLight />
              <DotDark />
              <DotLight />
            </TypingBubble>
          )}
          <div ref={chatBottomRef} />
        </Messages>
      </ChatStage>

      {/* 예문 카드 (클릭/엔터 → 질문으로 전송) */}
      <PhraseRow>
        {phrases.map((p, i) => (
          <PhraseCard
            key={i}
            role="button"
            tabIndex={0}
            onClick={() => handleSendPhrase(p)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSendPhrase(p)}
            aria-label={`Send question: ${p.en}`}
          >
            <PhraseEn>{p.en}</PhraseEn>
            <PhraseKo>{p.ko}</PhraseKo>
            <PhraseRoman>{p.roman}</PhraseRoman>
          </PhraseCard>
        ))}
      </PhraseRow>

      {/* 하단 버튼 */}
      <BottomBar>
        <EndButton>End Chat &amp; Claim Reward</EndButton>
      </BottomBar>
    </Layout>
  );
}

/* SVG Icon */
function ChevronLeftIcon(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* --------------------------- styled-components (bottom) --------------------------- */
/* (아래 스타일 블록은 너가 쓰던 최종본 그대로 유지) */
const BP = { sm: '480px', md: '768px', lg: '1024px' };

const Wrap = styled.div`
  position: relative;
  max-width: clamp(360px, 92vw, 1024px);
  margin: 0 auto;
  min-height: 100dvh;
  background: #fff;
  padding-bottom: 110px;
  font-family: Pretendard, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;

  @media (min-width: ${BP.md}) {
    padding-bottom: 120px;
  }
`;

/* Nav */
const NavBar = styled.div`
  position: sticky; top: 0; z-index: 10;
  height: calc(56px + env(safe-area-inset-top));
  display: flex; align-items: center; gap: 16px;
  padding: env(safe-area-inset-top) clamp(16px, 4vw, 20px) 0;
  background: #fff; border-bottom: 1px solid #e8e8e8;
`;
const BackButton = styled.button`
  width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  border: 0; background: transparent; padding: 0; margin: 0;
  cursor: pointer; color: #111827;
  -webkit-tap-highlight-color: transparent;
  &:focus-visible { outline: 2px solid #11182733; outline-offset: 2px; border-radius: 8px; }
`;
const NavTitle = styled.div`
  flex: 1;
  font-size: clamp(16px, 1.6vw, 18px);
  font-weight: 600; line-height: 24px; color: #000;
`;
const Spacer = styled.div`width: 24px;`;

/* Scenario */
const ScenarioRow = styled.div`
  margin-top: 12px;
  padding: 0 clamp(16px, 4vw, 20px);
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 20px;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar { display: none; }
  @media (min-width: ${BP.md}) { gap: 14px; }
`;
const ScenarioCard = styled.div`
  flex: 0 0 clamp(240px, 60vw, 320px);
  scroll-snap-align: center;
  display: flex; align-items: center; gap: 10px;
  padding: 12px; border-radius: 12px;
  background: ${({ $active }) => ($active ? '#ECECEC' : '#F8F8F8')};
  ${({ $active }) => $active && `
    box-shadow: 0 0 10px rgba(0,0,0,.10);
    outline: 1px solid #E1E1E1;
    outline-offset: -1px;
  `};
  &:focus-visible { outline: 2px solid #11182733; outline-offset: 2px; border-radius: 12px; }
  @media (min-width: ${BP.md}) { flex-basis: clamp(280px, 42vw, 360px); padding: 14px; }
`;
const ScenarioThumb = styled.div`
  width: clamp(40px, 5vw, 48px); height: clamp(40px, 5vw, 48px);
  background: #d9d9d9; border-radius: 8px;
`;
const ScenarioTexts = styled.div`display: inline-flex; flex-direction: column; gap: 2px; flex: 1 1 0;`;
const ScenarioTitle = styled.div`
  font-size: clamp(15px, 2vw, 18px); line-height: 1.4; color: #000;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
`;
const ScenarioSub = styled.div`font-size: clamp(12px, 1.6vw, 13px); line-height: 1.45; color: #404040;`;

/* Chat */
const ChatStage = styled.div`
  position: relative;
  min-height: clamp(260px, 40vh, 420px);
  margin: 16px clamp(16px, 4vw, 20px) 12px;
  border-radius: 12px;
  background: #fff;
  display: flex;
`;
const Messages = styled.div`
  display: flex; flex-direction: column; justify-content: flex-end;
  gap: 10px; padding: 8px 4px; width: 100%;
`;
const bubbleBase = `
  max-width: 78%;
  padding: 10px 12px;
  border-radius: 12px;
  white-space: pre-wrap;
  box-shadow: 0 0 10px rgba(0,0,0,.06);
`;
const BubbleBot = styled.div`
  ${bubbleBase}
  background: #dfdfdf;
  border-top-left-radius: 12px; border-top-right-radius: 12px; border-bottom-right-radius: 12px;
`;
const BubbleUser = styled.div`
  ${bubbleBase}
  background: #e5e7eb; margin-left: auto;
  border-top-left-radius: 12px; border-top-right-radius: 12px; border-bottom-left-radius: 12px;
`;
const TypingBubble = styled.div`
  display: inline-flex; align-items: center; gap: 10px;
  padding: 10px; background: #dfdfdf;
  border-radius: 12px 12px 12px 0; box-shadow: 0 0 10px rgba(0,0,0,.10);
  width: fit-content;
`;
const bounce = `@keyframes b{0%,80%,100%{transform:scale(.8);opacity:.6}40%{transform:scale(1);opacity:1}}`;
const DotLight = styled.div`
  width: 8px; height: 8px; background: #b9b9b9; border-radius: 9999px;
  animation: b 1.2s infinite ease-in-out;
  ${bounce}
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;
const DotDark = styled.div`
  width: 12px; height: 12px; background: #6d6d6d; border-radius: 9999px;
  box-shadow: 0 0 20px rgba(0,0,0,.25);
  animation: b 1.2s .15s infinite ease-in-out;
  ${bounce}
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

/* Phrases */
const PhraseRow = styled.div`
  display: inline-flex; gap: 10px;
  padding: 0 clamp(16px, 4vw, 20px) 8px; width: 100%;
  overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  @media (min-width: ${BP.md}) {
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; overflow: visible;
  }
`;
const PhraseCard = styled.div`
  width: 148px; padding: 10px; background: #dfdfdf; border-radius: 12px;
  display: inline-flex; flex-direction: column; gap: 4px; box-shadow: 0 0 10px rgba(0,0,0,.10);
  cursor: pointer; user-select: none;
  &:focus-visible { outline: 2px solid #11182733; outline-offset: 2px; border-radius: 12px; }
  &:active { transform: scale(0.98); }
  @media (min-width: ${BP.md}) { width: auto; }
`;
const PhraseEn = styled.div`
  font-size: clamp(13px, 1.8vw, 16px); line-height: 1.5; color: #000; font-weight: 600; word-break: keep-all;
`;
const PhraseKo = styled.div`
  font-size: clamp(13px, 1.8vw, 16px); line-height: 1.5; color: #000; word-break: keep-all;
`;
const PhraseRoman = styled.div`
  font-size: clamp(14px, 2vw, 18px); line-height: 1.5; color: #787878; overflow-wrap: anywhere;
`;

/* Bottom CTA */
const BottomBar = styled.div`
  position: fixed; 
  left: 50%; right: 0; bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  max-width: 375px;
  display: flex; justify-content: center; background: #fff;
  padding: 10px 16px calc(22px + env(safe-area-inset-bottom));
`;
const EndButton = styled.button`
  width: clamp(280px, 88vw, 520px);
  padding: 10px 12px; border: 0; border-radius: 8px;
  background: #6d6d6d; color: #000; font-size: clamp(14px, 1.8vw, 16px);
  font-weight: 600; line-height: 24px; cursor: pointer; -webkit-tap-highlight-color: transparent;
`;