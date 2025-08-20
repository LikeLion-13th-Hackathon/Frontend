// src/features/review/pages/ReviewFeedback.jsx
import React, { useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

/* 공용 스캐폴드 */
import Layout from "@/components/common/Layout";
import LeftHeader from "@/components/common/header/LeftHeader";
/* 공통 버튼 */
import CommonButton from "@/components/common/CommonButton";
/* 스테퍼 */
import Stepper from "@/components/Stepper";

/* 아이콘 */
import BackImg from "@/assets/icons/header_back.png";
import LikeIcon from "@/assets/icons/review_like.svg";
import DislikeIcon from "@/assets/icons/review_dislike.svg";


const MAX_LEN = 500;

export default function ReviewFeedback() {
  const nav = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [choice, setChoice] = useState(null); // "up" | "down"

  const canNext = useMemo(() => {
    return choice !== null && feedback.trim().length >= 2;
  }, [choice, feedback]);

  const onNext = () => {
    if (!canNext) return;
    nav("/review/complete"); // 마지막 페이지 예시
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
        <Stepper current={3} total={4} />

        <Title>How helpful was{"\n"}the AI chat simulator?</Title>
        <Sub>Your feedback* helps us make the simulator better.</Sub>

        <ChoiceRow>
            <ChoiceBtn
                $active={choice === "up"}
                onClick={() => setChoice("up")}
            >
                <img src={LikeIcon} alt="Like" width={40} height={40} />
            </ChoiceBtn>
            <ChoiceBtn
                $active={choice === "down"}
                onClick={() => setChoice("down")}
            >
                <img src={DislikeIcon} alt="Dislike" width={40} height={40} />
            </ChoiceBtn>
        </ChoiceRow>


        <Sub>Your feedback helps us make the simulator better.</Sub>

        <TextareaWrap>
          <Textarea
            placeholder="Write a feedback of AI Chat Simulator"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value.slice(0, MAX_LEN))}
          />
          <Counter>
            {feedback.length} / {MAX_LEN}
          </Counter>
        </TextareaWrap>

        {/* 공통 버튼 */}
        <ButtonRow>
        <CommonButton
            variant="secondary-dim"
            fullWidth={false}
            onClick={() => nav(-1)}  // 이전 단계로 이동
        >
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

/* styled-components */
const Page = styled.div`
  color: #111;
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
`;

const ChoiceRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 45px;
  margin: 20px 0;
`;

const ChoiceBtn = styled.button`
  width: 100px;     
  height: 100px;
  margin: 25px 0 25px 0;
  border-radius: 12px;
  border: 1px solid ${({ $active }) => ($active ? "#818181" : "transparent")};;
  background: ${({ $active }) => ($active ? "#bcbcbc" : "#F8F8F8")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const TextareaWrap = styled.div`
  margin-top: 14px;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  resize: vertical;
  border: 1px solid #e0e0e0;
  border-radius: 14px;
  padding: 12px 14px;
  font-size: 14px;
  outline: none;
`;

const Counter = styled.div`
  text-align: right;
  color: #6b6f76;
  font-size: 11px;
  padding: 6px 6px 0 0;
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
