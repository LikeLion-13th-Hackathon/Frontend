import React, { useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

/* 공용 스캐폴드 */
import Layout from "@/components/common/Layout";
import LeftHeader from "@/components/common/header/LeftHeader";
import Footer from "@/components/common/Footer";
/* 공통 버튼 */
import CommonButton from "@/components/common/CommonButton";
/* 스테퍼 */
import Stepper from "@/components/Stepper";

/* 아이콘 (프로젝트 아이콘으로 교체 가능) */
import BackImg from "@/assets/icons/header_back.png";

/* ===== 디자인 토큰 (와이어톤) ===== */
const tone = {
  text: "#111111",
  sub: "#6B6F76",
  line: "#E7E9ED",
  cardBg: "#F3F4F6",
  chipBg: "#ECEEF2",
  chipText: "#2D3142",
  chipActiveBg: "#BFC4CC",
  chipActiveText: "#111111",
};

/* 리스트 */
const REVIEW_TAGS = [
  "Delicious",
  "Clean",
  "Recommended",
  "Hard to find",
  "Spacious",
  "English spoken",
];
const DIET_TAGS = ["Vegan", "Pork-free", "Beef-free", "Nut-free"];
const SPICY_LEVELS = ["Mild", "Medium", "Spicy", "Very spicy"];
const MAX_REVIEW_LEN = 3000;

/* Footer(고정)와 겹침 방지 여백 */
const TABBAR_H = 68;

export default function ReviewFlow() {
  const nav = useNavigate();

  const [reviewTags, setReviewTags] = useState([]);
  const [dietTags, setDietTags] = useState([]);
  const [spicyIdx, setSpicyIdx] = useState(null);
  const [text, setText] = useState("");

  // Next 활성: 칩(아무거나) 1개 이상 + 텍스트 2자 이상
  const canNext = useMemo(() => {
    const picked =
      reviewTags.length > 0 || dietTags.length > 0 || spicyIdx !== null;
    return picked && text.trim().length >= 2;
  }, [reviewTags, dietTags, spicyIdx, text]);

  const toggle = (arr, setter, v) => {
    if (arr.includes(v)) setter(arr.filter((x) => x !== v));
    else setter([...arr, v]);
  };

  const onNext = () => {
    if (!canNext) return;
    // TODO: API 연동 위치
    // await api.post('/review/step1', { reviewTags, dietTags, spicy: SPICY_LEVELS[spicyIdx], text })
    nav("/review/topic"); // 다음 단계 라우트로 교체
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
        {/* 진행바 (1/4단계) */}
        <Stepper current={1} total={4} />

        <Title>Share Your Thoughts{"\n"}About This Store</Title>
        <Sub>You can leave a quick review using tags or text.</Sub>

        {/* 카드 */}
        <Card>
          <FieldLabel>Review Tags</FieldLabel>
          <ChipRow>
            {REVIEW_TAGS.map((t) => (
              <Chip
                key={t}
                $active={reviewTags.includes(t)}
                onClick={() => toggle(reviewTags, setReviewTags, t)}
                aria-pressed={reviewTags.includes(t)}
              >
                {t}
              </Chip>
            ))}
          </ChipRow>

          <FieldLabel style={{ marginTop: 14 }}>Dietary Restrictions</FieldLabel>
          <ChipRow>
            {DIET_TAGS.map((t) => (
              <Chip
                key={t}
                $active={dietTags.includes(t)}
                onClick={() => toggle(dietTags, setDietTags, t)}
                aria-pressed={dietTags.includes(t)}
              >
                {t}
              </Chip>
            ))}
          </ChipRow>

          <FieldLabel style={{ marginTop: 14 }}>Spicy level</FieldLabel>
          <ChipRow>
            {SPICY_LEVELS.map((t, i) => (
              <Chip
                key={t}
                $active={spicyIdx === i}
                onClick={() => setSpicyIdx(i)}
                aria-pressed={spicyIdx === i}
              >
                {t}
              </Chip>
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

        {/* 공통 버튼 사용 */}
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

        {/* Footer와 겹치지 않게 바닥 패딩 */}
        <BottomPad />
      </Page>

      <Footer />
    </Layout>
  );
}

/* ===== styled-components ===== */
const Page = styled.div`
  color: ${tone.text};
  padding: 12px 18px 0;
`;

const Title = styled.h2`
  white-space: pre-line;
  font-size: 24px;
  line-height: 1.25;
  margin: 14px 2px 6px;
`;
const Sub = styled.p`
  color: ${tone.sub};
  font-size: 14px;
  margin: 0 2px 12px;
`;

const Card = styled.div`
  background: ${tone.cardBg};
  border: 1px solid ${tone.line};
  border-radius: 16px;
  padding: 14px;
`;
const FieldLabel = styled.div`
  color: ${tone.text};
  font-size: 13px;
  margin-bottom: 8px;
`;

const ChipRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;
const Chip = styled.button`
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid ${tone.line};
  background: ${tone.chipBg};
  color: ${tone.chipText};
  font-size: 13px;
  cursor: pointer;

  ${({ $active }) =>
    $active &&
    css`
      background: ${tone.chipActiveBg};
      color: ${tone.chipActiveText};
      border-color: ${tone.chipActiveBg};
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
  font-size: 12px;
  padding: 6px 6px 0 0;

  span {
    margin: 0 2px;
  }
`;

const ButtonWrap = styled.div`
  margin-top: 16px;
  margin-bottom: 8px;
`;

const BottomPad = styled.div`
  height: ${TABBAR_H}px;
`;
