import React, { useMemo, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import Layout from "@/components/common/Layout";
import LeftHeader from "@/components/common/header/LeftHeader";
import CommonButton from "@/components/common/CommonButton";
import Stepper from "@/components/Stepper";
import BackImg from "@/assets/icons/header_back.png";

import { fetchReviewTags } from "@/shared/api/review";
import { createReview } from "@/shared/api/review";
import { postReward } from "@/shared/api/reward";

/* ===== 디자인 토큰 ===== */
const tone = {
  text: "#111111",
  sub: "#6B6F76",
  line: "#E7E9ED",
};
const MAX_REVIEW_LEN = 3000;

export default function ReviewFresh() {
  const nav = useNavigate();
  const { state } = useLocation();
  const isReceiptFlow = state?.source === "receipt";

  // 페이지 진입 시 탭 제목 변경
  useEffect(() => {
    document.title = "mapin | Review"; 
  }, []);
  
  const storeId = state?.storeId ?? state?.store?.id;

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState({});
  const [text, setText] = useState("");

  // 텍스트만 1자 이상이면 Next 버튼 활성화
  const canNext = useMemo(() => {
    return text.trim().length >= 1;
  }, [text]);


  // 태그 불러오기
  useEffect(() => {
    fetchReviewTags("fresh")
      .then((res) => setTags(res.data))
      .catch((err) => console.error("리뷰 태그 불러오기 실패:", err));
  }, []);

  // 그룹별 태그 분류
  const grouped = tags.reduce((acc, t) => {
    acc[t.group] = acc[t.group] ? [...acc[t.group], t] : [t];
    return acc;
  }, {});

  // 토글 (multi/single 자동 구분)
  const handleSelect = (group, id, type) => {
    setSelectedTags((prev) => {
      if (type === "multi") {
        const current = prev[group] || [];
        return {
          ...prev,
          [group]: current.includes(id)
            ? current.filter((x) => x !== id)
            : [...current, id],
        };
      } else {
        return { ...prev, [group]: prev[group] === id ? null : id };
      }
    });
  };

  const onNext = async () => {
    if (!canNext) return;
    const tag_ids = Object.values(selectedTags).flat().filter(Boolean);
  
    // receipt/normal 둘 다 다음 단계 = conversation 으로 이동
    nav("/review/conversation", {
      state: {
        ...state,
        reviewDraft: {
          tag_ids,
          comment: text,
        },
        source: state?.source ?? "normal",   // receipt 도 그대로 유지
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
      <Stepper 
        current={1} 
        total={state?.forceFourSteps ? 4 : (isReceiptFlow ? 2 : 4)} 
      />

        <Title>Share Your Thoughts{"\n"}About This Store</Title>
        <Sub>You can leave a quick review using tags or text.</Sub>

        {/* 태그 카드 */}
        <Card>
          {[
            "Review Tags", // 항상 먼저
            ...Object.keys(grouped).filter((g) => g !== "Review Tags"),
          ].map((groupName) => {
            const list = grouped[groupName];
            if (!list) return null;

            const type = groupName === "Review Tags" ? "multi" : "single";

            return (
              <div 
                key={groupName} 
                style={{ marginTop: groupName !== "Review Tags" ? "20px" : "0" }}
              >
                <FieldLabel>{groupName}</FieldLabel>
                <ChipRow>
                  {list.map((t) => {
                    const isActive =
                      type === "multi"
                        ? (selectedTags[groupName] || []).includes(t.id)
                        : selectedTags[groupName] === t.id;

                    const Chip =
                      type === "multi" ? MultiChoiceChip : SingleChoiceChip;
                    return (
                      <Chip
                        key={t.id}
                        $active={isActive}
                        onClick={() => handleSelect(groupName, t.id, type)}
                      >
                        {t.tag}
                      </Chip>
                    );
                  })}
                </ChipRow>
              </div>
            );
          })}
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
            {text.length} <span>/</span> {MAX_REVIEW_LEN}
          </Counter>
        </TextareaWrap>

        {/* 버튼 */}
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
      border: 1px solid #555555;
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
      border: 1px solid #555555;
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
