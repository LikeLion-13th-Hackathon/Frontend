// src/features/chat/pages/ChatSimulator.jsx (AIChatSimulatorChat)
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../../../components/common/Layout';
import LeftHeader from '../../../components/common/header/LeftHeader';
import BackImg from "@/assets/icons/header_back.png";

// ── 시나리오 카드 (상단 캐러셀에 쓰는 가벼운 데이터)
const SCENARIOS = [
  { id: 0, key: 'placing', title: 'Placing an Order',      sub: 'One of this, please.' },
  { id: 1, key: 'placing', title: 'Placing an Order',      sub: 'One of this, please.' }, // active 예시
  { id: 2, key: 'menu',    title: 'Asking About the Menu', sub: 'Is it spicy?' },
];

// ── 실제 대화 스크립트 (질문 → 답변 후보)
const SCRIPT_BY_SCENARIO = {
  placing: {
    questions: [
      {
        id: 'how_many',
        en: 'How many people?',
        ko: '몇 분이세요?',
        roman: 'Myeot bun-iseyo?',
        answers: [
          { id: 'alone',  en: 'Just one.',      ko: '혼자요.',            roman: 'Honja-yo.' },
          { id: 'three',  en: 'Three people.',  ko: '세 명이요.',          roman: 'Se myeong-iyo.' },
          { id: 'family', en: 'We are family.', ko: '가족끼리 왔어요.',     roman: 'Gajok-kkiri wasseoyo.' },
        ],
      },
      {
        id: 'what_would_you_like',
        en: 'What would you like?',
        ko: '뭐 드실건가요?',
        roman: 'Mwo deusilgeongayo?',
        answers: [
          { id: 'cold_noodles', en: 'Cold soybean noodles, please.', ko: '콩국수 주세요.',         roman: 'Kong-guksu juseyo.' },
          { id: 'less_spicy',   en: 'Less spicy, please.',           ko: '덜 맵게 해주세요.',       roman: 'Deol maepge haejuseyo.' },
        ],
      },
      {
        id: 'sit_wherever',
        en: 'Please sit wherever you like.',
        ko: '원하시는 자리 앉으세요.',
        roman: 'Wonhanen jari anjuseyo.',
        answers: [
          { id: 'thanks', en: 'Thank you.', ko: '감사합니다.', roman: 'Gamsahamnida.' },
        ],
      },
    ],
  },
  // 메뉴 문의 샘플 (있어도 되고 없어도 됨)
  menu: {
    questions: [
      {
        id: 'is_it_spicy',
        en: 'Is it spicy?',
        ko: '매운가요?',
        roman: 'Mae-ungayo?',
        answers: [
          { id: 'a_little',   en: 'A little spicy.', ko: '조금 매워요.',    roman: 'Jogeum maewoyo.' },
          { id: 'not_spicy',  en: 'Not spicy.',      ko: '안 매워요.',      roman: 'An maewoyo.' },
          { id: 'very_spicy', en: 'Very spicy.',     ko: '아주 매워요.',    roman: 'Aju maewoyo.' },
        ],
      },
    ],
  },
};

export default function AIChatSimulatorChat() {
  const [selected, setSelected] = useState(1);            // 상단 캐러셀 선택 id
  const [messages, setMessages] = useState([]);           // {sender:'user'|'bot', text}
  const [mode, setMode] = useState('question');           // 'question' | 'answer'
  const [currentAnswers, setCurrentAnswers] = useState([]); // 현재 질문의 답변 후보
  const chatBottomRef = useRef(null);

  // 현재 선택된 시나리오 스크립트
  const currentKey = SCENARIOS.find(s => s.id === selected)?.key ?? 'placing';
  const currentScenario = SCRIPT_BY_SCENARIO[currentKey];

  // 스크롤 하단 고정
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, mode]);

  // 질문 카드 클릭 → 사장님(왼쪽) 말풍선 + 답변 후보 표시
  const onPickQuestion = (q) => {
    setMessages(prev => [...prev, { sender: 'bot', text: `${q.ko}\n${q.roman}` }]);
    setCurrentAnswers(q.answers ?? []);
    setMode('answer');
  };

  // 답변 카드 클릭 → 손님(오른쪽) 말풍선 + 다시 질문 모드
  const onPickAnswer = (a) => {
    setMessages(prev => [...prev, { sender: 'user', text: `${a.ko}\n${a.roman}` }]);
    setCurrentAnswers([]);
    setMode('question');
  };

  return (
    <Layout>
      <LeftHeader
        title="AI Chat Simulator"
        leftIcon={BackImg}
        onLeftClick={() => window.history.back()}
      />

      {/* 시나리오 캐러셀 */}
      <ScenarioRow>
        {SCENARIOS.map((s) => {
          const active = s.id === selected;
          return (
            <ScenarioCard
              key={s.id}
              $active={active}
              onClick={() => { setSelected(s.id); setMode('question'); setCurrentAnswers([]); }}
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
            m.sender === 'user'
              ? <BubbleUser key={i}>{m.text}</BubbleUser>
              : <BubbleBot  key={i}>{m.text}</BubbleBot>
          )}
          <div ref={chatBottomRef} />
        </Messages>
      </ChatStage>

      {/* 옵션 영역 */}
      <OptionHeader>{mode === 'question' ? 'Please select a question.' : 'Please choose the answer.'}</OptionHeader>

      <PhraseRow>
        {mode === 'question'
          ? (currentScenario.questions ?? []).map((q) => (
              <PhraseCard
                key={q.id}
                role="button"
                tabIndex={0}
                onClick={() => onPickQuestion(q)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onPickQuestion(q)}
                aria-label={`Send question: ${q.en}`}
              >
                <PhraseEn>{q.en}</PhraseEn>
                <PhraseKo>{q.ko}</PhraseKo>
                <PhraseRoman>{q.roman}</PhraseRoman>
              </PhraseCard>
            ))
          : (currentAnswers ?? []).map((a) => (
              <PhraseCard
                key={a.id}
                role="button"
                tabIndex={0}
                onClick={() => onPickAnswer(a)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onPickAnswer(a)}
                aria-label={`Send answer: ${a.ko}`}
              >
                <PhraseEn>{a.en}</PhraseEn>
                <PhraseKo>{a.ko}</PhraseKo>
                <PhraseRoman>{a.roman}</PhraseRoman>
              </PhraseCard>
            ))
        }
      </PhraseRow>

      <BottomBar>
        <EndButton>End Chat &amp; Claim Reward</EndButton>
      </BottomBar>
    </Layout>
  );
}


/* --------------------------- styled-components --------------------------- */
const BP = { sm: '480px', md: '768px', lg: '1024px' };
const CARD_W = '150px';

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
  border-top-left-radius: 12px; 
  border-top-right-radius: 12px; 
  border-bottom-right-radius: 12px;
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
// 기존 PhraseRow 교체
const PhraseRow = styled.div`
  padding: 0 clamp(16px, 4vw, 20px) 8px;
  display: flex;
  gap: 8px;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }

  /* 모바일: 가로 스크롤에서 카드 폭 고정 */
  & > * {
    flex: 0 0 ${CARD_W};
    max-width: ${CARD_W};
  }

  /* 태블릿 이상: 그리드 3열로 센터 정렬 */
  @media (min-width: ${BP.md}) {
    display: grid;
    grid-template-columns: repeat(3, ${CARD_W});
    justify-content: center;
    gap: 12px;
    overflow: visible;
  }
`;

// 기존 PhraseCard 교체
const PhraseCard = styled.div`
  width: ${CARD_W};
  height: 142px;                 /* ← 높이 통일 */
  padding: 10px;
  background: #dfdfdf;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0,0,0,.10);
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  user-select: none;

  &:active { transform: scale(.98); }
  &:focus-visible { outline: 2px solid #11182733; outline-offset: 2px; border-radius: 12px; }
`;

// 텍스트 3종(살짝 컴팩트하게)
const PhraseEn = styled.div`
  font-size: 16px;
  line-height: 1.35;
  color: #000;
  font-weight: 700;
  word-break: keep-all;
`;

const PhraseKo = styled.div`
  font-size: 14px;
  line-height: 1.35;
  color: #000;
  word-break: keep-all;
`;

const PhraseRoman = styled.div`
  font-size: 13px;
  line-height: 1.35;
  color: #787878;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;   /* 모바일 2줄 */
  @media (min-width: ${BP.md}) {
    -webkit-line-clamp: 3; /* 태블릿+ 3줄 */
  }
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

// 옵션 섹션 헤더
const OptionHeader = styled.div`
  padding: 0 clamp(16px, 4vw, 20px) 6px;
  color: #6b7280;
  font-size: 13px;
`;
