import React, { useMemo, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import Layout from "@/components/common/Layout";
import LeftHeader from "@/components/common/header/LeftHeader";
import CommonButton from "@/components/common/CommonButton";
import Stepper from "@/components/Stepper";
import BackImg from "@/assets/icons/header_back.png";

import { fetchAiTopics } from "@/shared/api/ai";
// import { createConversation } from "@/shared/api/review"; // ❌ 더 이상 사용 안 함

const MAX_REVIEW_LEN = 500;

/* ===== 디자인 토큰 ===== */
const tone = {
  text: "#111111",
  sub: "#6B6F76",
  line: "#E7E9ED",
};

export default function ReviewConversation() {
  const nav = useNavigate();
  const { state } = useLocation();

  // 페이지 진입 시 탭 제목 변경
  useEffect(() => {
    document.title = "mapin | Review"; 
  }, []);

  const [topics, setTopics] = useState([]); // 서버에서 불러온 토픽
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [text, setText] = useState("");

  const canNext = useMemo(() => {
    return selectedTopics.length > 0;
  }, [selectedTopics]);


  // 토픽 불러오기
  useEffect(() => {
    fetchAiTopics(state?.store?.category || "fresh")
      .then((res) => {
        console.log("AI Topics raw response:", res);

        // res.all 에 모든 토픽 있음
        const list = res.all || [];
        setTopics(list);
      })
      .catch((err) => console.error("토픽 불러오기 실패:", err));
  }, [state?.store?.category]);

  // 토픽 선택 토글
  const toggleTopic = (id) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // 👉 서버 저장 제거, draft만 전달
  const onNext = () => {
    if (!canNext) return;
    const conversationDraft = {
      topics: selectedTopics,
      comment: text.trim() || null,
    };
    nav("/review/feedback", {
      state: {
        ...state,
        conversationDraft,
      },
    });
  };

  return (
    <Layout>
      <LeftHeader
        title="Review"
        leftIcon={BackImg}
        onLeftClick={() => nav(-1)}
        border
      />

      <Page>
        <Stepper current={2} total={4} />

        <Title>What was the topic of{"\n"}the conversation?</Title>
        <Sub>Tell us what you discussed at this store.</Sub>

        {/* 서버에서 불러온 토픽 */}
        <Card>
          <FieldLabel>Conversation Topic*</FieldLabel>
          <ChipRow>
            {topics.map((t) => (
              <MultiChoiceChip
                key={t.id}
                $active={selectedTopics.includes(t.id)}
                onClick={() => toggleTopic(t.id)}
              >
                {t.topic}
              </MultiChoiceChip>
            ))}
          </ChipRow>
        </Card>

        <Sub className="other-responses">For other responses, enter them below.</Sub>

        <TextareaWrap>
          <Textarea
            placeholder="Write a topic of the conversation."
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_REVIEW_LEN))}
            maxLength={MAX_REVIEW_LEN}
          />
          <Counter>
            {text.length} <span>/</span> {MAX_REVIEW_LEN}
          </Counter>
        </TextareaWrap>

        <ButtonRow>
          <CommonButton variant="secondary-dim" onClick={() => nav(-1)}>
            Back to Review
          </CommonButton>
          <CommonButton
            variant={canNext ? "primary" : "secondary"}
            disabled={!canNext}
            onClick={onNext}
          >
            Next
          </CommonButton>
        </ButtonRow>
      </Page>
    </Layout>
  );
}

/* ===== styled-components ===== */
const Page = styled.div`
  color: ${tone.text};
  padding: 12px 18px;
`;

const Title = styled.h2`
  white-space: pre-line;
  font-size: 24px;
  line-height: 1.25;
  margin: 14px 2px 6px;
`;
const Sub = styled.p`
  color: #000;
  font-size: 14px;
  margin: 0 2px 12px;

  &.other-responses {
    margin-top: 30px; 
  }
`;

const Card = styled.div`
  background: #f8f8f8;
  border-radius: 16px;
  padding: 14px;
`;

const FieldLabel = styled.div`
  color: ${tone.text};
  font-size: 12px;
  margin-bottom: 8px;
`;

const ChipRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const MultiChoiceChip = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: #eaeaea;
  color: #818181;
  font-size: 11px;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;

  ${({ $active }) =>
    $active &&
    css` 
      background: #bcbcbc;
      color: var(--primary);
      border: 2px solid #555555;
      font-weight: 600;
    `}
`;

const SingleChoiceChip = styled.button`
  padding: 6px 9px;
  border-radius: 8px;
  border: 1px solid #D9D9D9;
  background: transparent;
  color: #818181;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;

  ${({ $active }) =>
    $active &&
    css`
      margin: -1px; 
      background: #BCBCBC;
      color: var(--primary);
      border: 2px solid #555555;
      font-weight: 600;
    `}
`;

const TextareaWrap = styled.div`
  margin-top: 14px;
`;
const Textarea = styled.textarea`
  width: 100%;
  min-height: 136px;
  resize: vertical;
  background: #ffffff;
  border: 1px solid ${tone.line};
  border-radius: 14px;
  padding: 12px 14px;
  color: ${tone.text};
  outline: none;
  font-size: 14px;

  &::placeholder {
    color: ${tone.sub};
  }
`;
const Counter = styled.div`
  text-align: right;
  color: ${tone.sub};
  font-size: 11px;
  padding: 6px 6px 0 0;
  span {
    margin: 0 2px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
  margin-bottom: 8px;

  & > button {
    flex: 1; /* 버튼을 동일한 너비로 */
  }
`;

