import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import Layout from "@/components/common/Layout";
import LeftHeader from "@/components/common/header/LeftHeader";
import CommonButton from "@/components/common/CommonButton";
import Stepper from "@/components/Stepper";

import BackImg from "@/assets/icons/header_back.png";
import LikeIcon from "@/assets/icons/review_like.svg?react";
import DislikeIcon from "@/assets/icons/review_dislike.svg?react";

import { createReview, createConversation, createFeedback } from "@/shared/api/review";
import { postReward } from "@/shared/api/reward";
import { fetchStoreDetail } from "@/shared/api/store";

const MAX_LEN = 500;

export default function ReviewFeedback() {
  const nav = useNavigate();
  const { state } = useLocation();

  const [feedback, setFeedback] = useState("");
  const [choice, setChoice] = useState(null); // "up" | "down"
  const [loading, setLoading] = useState(false);

  // 👍/👎만 선택해도 Next 가능
  const canNext = useMemo(() => {
    return choice !== null;
  }, [choice]);

  const REVIEW_REWARD = 300;


  //한/영 가게명
  async function ensureStoreMeta() {
    const storeId = state?.sotre?.id ?? state?.storeId ?? null;
    let storeName = state?.storeName ?? state?.store?.store_name ?? "";
    let storeEnglish = state?.storeEnglish ?? state?.store?.store_english ?? "";

    if ((!storeName || !storeEnglish) && storeId) {
      try {
        const d = await fetchStoreDetail(storeId);
        const detail = (d && d.data) ? d.data : d;
        storeName = storeName || detail?.store_name || "";
        storeEnglish = storeEnglish || detail?.store_english || "";
      } catch {
      }
    }
    return { storeName, storeEnglish, storeId };
  }

  // 서버 저장 (최종 단계)
const onNext = async () => {
  if (!canNext) return;
  setLoading(true);

  try {
    // 1) review 저장
    const reviewRes = await createReview(state?.store?.id, state.reviewDraft);

    // 2) conversation 저장 (topics 배열 + comment)
    const conversationPayload = {
      review_id: reviewRes.data.id,
      topics: state.conversationDraft?.topics || [],   // 원래 서버가 받던 필드명
      comment: state.conversationDraft?.comment || "", // 빈 문자열이라도 전달
    };

    const convRes = await createConversation(conversationPayload);

    // 3) feedback 저장 (comment 없으면 제외)
    const feedbackPayload = {
    thumbs: choice === "up",
    conversation_id: convRes.id,
    comment: feedback.trim() || "", // ❗ 항상 포함시키기 (빈 문자열이라도)
    };
    console.log("👉 createFeedback payload:", feedbackPayload);

    await createFeedback(feedbackPayload);

    const { storeName, storeEnglish } = await ensureStoreMeta();
    const reward = await postReward({
        delta: REVIEW_REWARD,
        caption: ["Chat Review", storeName, storeEnglish].join("|"),
    });


    // 완료 페이지 이동
    nav("/review/complete", {
      state: {
        // source: "chat",
        store: state?.store,
        reviewId: reviewRes.data.id,
        conversationId: convRes.id,
        reward,
        storeName,
        storeEnglish,
      },
    });
  } catch (err) {
    console.error("저장 실패:", err);
    alert("저장 실패: " + err.message);
  } finally {
    setLoading(false);
  }
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
        <Sub>Your feedback helps us make the simulator better.</Sub>

        <ChoiceRow>
          <ChoiceBtn $active={choice === "up"} onClick={() => setChoice("up")}>
            <StyledLike $active={choice === "up"} width={40} height={40} />
          </ChoiceBtn>

          <ChoiceBtn $active={choice === "down"} onClick={() => setChoice("down")}>
            <StyledDislike $active={choice === "down"} width={40} height={40} />
          </ChoiceBtn>


        </ChoiceRow>

        <TextareaWrap>
          <Textarea
            placeholder="Write a feedback of AI Chat Simulator (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value.slice(0, MAX_LEN))}
          />
          <Counter>
            {feedback.length} / {MAX_LEN}
          </Counter>
        </TextareaWrap>

        <ButtonRow>
          <CommonButton
            variant="secondary-dim"
            fullWidth={false}
            onClick={() => nav(-1)}
          >
            Back to Review
          </CommonButton>

          <CommonButton
            variant={canNext ? "primary" : "secondary"}
            disabled={!canNext || loading}
            onClick={onNext}
          >
            {loading ? "Saving..." : "Next"}
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
  border: 1px solid ${({ $active }) => ($active ? "#FF6900" : "transparent")};;
  background: ${({ $active }) => ($active ? "#FFF3E0" : "#F8F8F8")};
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

const StyledLike = styled(LikeIcon)`
  color: ${({ $active }) => ($active ? "#FF6900" : "#6B6F76")};
`;

const StyledDislike = styled(DislikeIcon)`
  color: ${({ $active }) => ($active ? "#FF6900" : "#6B6F76")};
`;

