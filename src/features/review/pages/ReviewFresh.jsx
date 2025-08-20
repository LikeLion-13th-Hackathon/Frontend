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

/* ===== 디자인 토큰 ===== */
const tone = {
  text: "#111111",
  sub: "#6B6F76",
  line: "#E7E9ED",
};

/* 리스트 */
const REVIEW_TAGS = [
  "Fresh",
  "Clean",
  "Recommended",
  "Hard to find",
  "Very Good Value",
  "English spoken",
];
const FRESHNESS = ["Excellent", "Good", "Fair", "Poor", "Very Poor"];
const MAX_REVIEW_LEN = 3000;

export default function ReviewFresh() {
  const nav = useNavigate();

  const [reviewTags, setReviewTags] = useState([]);
  const [freshIdx, setFreshIdx] = useState(null);
  const [text, setText] = useState("");

  // Next 활성: 칩(아무거나) 선택 + 텍스트 2자 이상
  const canNext = useMemo(() => {
    const picked = reviewTags.length > 0 || freshIdx !== null;
    return picked && text.trim().length >= 2;
  }, [reviewTags, freshIdx, text]);

  const toggle = (arr, setter, v) => {
    if (arr.includes(v)) setter(arr.filter((x) => x !== v));
    else setter([...arr, v]);
  };

  const onNext = () => {
    if (!canNext) return;
    nav("/review/conversation"); // 다음 단계 예시
  };

  return (
    <Layout>
      <LeftHeader
        title="Review"
        leftIcon={BackImg}
        onLeftClick={() => nav(-1)}
        border={true}
      />

      <Page>
        <Stepper current={1} total={4} />

        <Title>Share Your Thoughts{"\n"}About This Store</Title>
        <Sub>You can leave a quick review using tags or text.</Sub>

        {/* 카드 */}
        <Card>
          <FieldLabel>Review Tags</FieldLabel>
          <ChipRow>
            {REVIEW_TAGS.map((t) => (
              <MultiChoiceChip
                key={t}
                $active={reviewTags.includes(t)}
                onClick={() => toggle(reviewTags, setReviewTags, t)}
                aria-pressed={reviewTags.includes(t)}
              >
                {t}
              </MultiChoiceChip>
            ))}
          </ChipRow>

          <FieldLabel style={{ marginTop: 14 }}>Freshness</FieldLabel>
          <ChipRow>
            {FRESHNESS.map((t, i) => (
              <SingleChoiceChip
                key={t}
                $active={freshIdx === i}
                onClick={() => setFreshIdx(i)}
                aria-pressed={freshIdx === i}
              >
                {t}
              </SingleChoiceChip>
            ))}
          </ChipRow>
        </Card>

        {/* 텍스트 입력 */}
        <TextareaWrap>
          <Textarea
            placeholder="Please leave a quick review before moving on to the next step."
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_REVIEW_LEN))}
            maxLength={MAX_REVIEW_LEN}
          />
          <Counter>
            {Math.max(text.length, 0)} <span>/</span> {MAX_REVIEW_LEN}
          </Counter>
        </TextareaWrap>

        {/* 공통 버튼 */}
        <ButtonWrap>
          <CommonButton
            variant="primary"
            disabled={!canNext}
            onClick={onNext}
            fullWidth
          >
            Next
          </CommonButton>
        </ButtonWrap>
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
      margin: -2px; 
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
const ButtonWrap = styled.div`
  margin-top: 16px;
  margin-bottom: 8px;
`;
