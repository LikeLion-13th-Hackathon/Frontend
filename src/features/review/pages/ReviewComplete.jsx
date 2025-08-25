// src/features/review/pages/ReviewComplete.jsx
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

/* 공용 스캐폴드 */
import Layout from "@/components/common/Layout";
import LeftHeader from "@/components/common/header/LeftHeader";
/* 공통 버튼 */
import CommonButton from "@/components/common/CommonButton";
/* 스테퍼 */
import Stepper from "@/components/Stepper";

/* 아이콘 */
import BackImg from "@/assets/icons/header_back.png";

/* 보상 아이콘 (업로드한 svg/png) */
import RewardIcon from "@/assets/icons/reward.svg"; 
import Confetti from "react-confetti"; 
import { useWindowSize } from "react-use";

export default function ReviewComplete() {
  const nav = useNavigate();
  const { width, height } = useWindowSize(); // 화면 크기 자동 반영
  
  // 페이지 진입 시 탭 제목 변경
  useEffect(() => {
    document.title = "mapin | Review"; 
  }, []);

  const { state } = useLocation();
  console.log("[ReviewComplete] location state:", state);
  const isReceiptFlow =
    state?.source === 'receipt' || sessionStorage.getItem('flow') === 'receipt';
  
  // 리워드 값
  const rewardDelta   = state?.reward?.changed ?? state?.reward?.delta ?? 10;
  const rewardCaption = state?.reward?.caption ?? "Review";
  const rewardBalance = state?.reward?.balance;

  
  // confetti 상태 관리
  const [pieces, setPieces] = useState(1200);  // 시작할 때 훨씬 많이 (기존 800 → 1200)
    useEffect(() => {
    const timer = setInterval(() => {
        setPieces((prev) => {
        if (prev <= 0) {
            clearInterval(timer);
            return 0;
        }
        return prev - 15; // 더 크게 줄임 (빨리 사라짐)
        });
    }, 250); // ⏱ 0.15초마다 업데이트 (기존 0.25s → 더 빠르게)
    return () => clearInterval(timer);
    }, []);


  return (
    <Layout>
      <LeftHeader
        title="Review"
        leftIcon={BackImg}
        onLeftClick={() => nav(-1)}
        border
      />

      {/* 빵빠레 효과 */}
      <Confetti
        width={width}
        height={height}
        numberOfPieces={pieces}
        gravity={0.4}
        recycle={false}
      />

      <Page>
      <Stepper 
        current={2} 
        total={
          state?.mode === "direct"
            ? 2   // direct는 항상 2단계
            : (state?.forceFourSteps ? 4 : 4) // chat(receipt/normal)은 4단계
        }
      />


        <Title>Congrats!{"\n"}You’ve earned a reward!</Title>

        <IconWrap>
          <img src={RewardIcon} alt="Reward" />
        </IconWrap>

        <PointRow>
          <Point>{rewardDelta}</Point>
          <span>points</span>
        </PointRow>

        {/* {typeof rewardBalance === "number" && (
          <div style={{ color:"#6B6F76", marginBottom: 12 }}>
            New balance: {rewardBalance}
          </div>
        )} */}

        <ButtonRow>
          <CommonButton
            variant="primary"
            onClick={() => nav("/reward")}
          >
            See What You Can Do Next
          </CommonButton>
          <CommonButton
            variant="secondary-dim"
            onClick={() => nav("/home")}
          >
            Exit
          </CommonButton>
        </ButtonRow>

      </Page>
    </Layout>
  );
}

/* styled-components */
const Page = styled.div`
  color: #111;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  white-space: pre-line;
  margin: 20px 0;
`;

const IconWrap = styled.div`
  margin: 100px 0 30px 0;
  img {
    width: 120px;
    height: auto;
  }
`;

const PointRow = styled.div`
  font-size: 16px;
  margin-bottom: 100px;
  span {
    margin-left: 6px;
    color: #555;
  }
`;

const Point = styled.span`
  font-size: 22px;
  font-weight: bold;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

