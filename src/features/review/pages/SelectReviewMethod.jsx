// src/components/common/SelectReviewMethod.jsx
import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Layout from '@/components/common/Layout';
import LeftHeader from "@/components/common/header/LeftHeader";
import BackImg from "@/assets/icons/header_back.png";
import styled from 'styled-components';

import VerifyImg from '@/assets/icons/verify.png'
import WriteImg from '@/assets/icons/write.png'

import { uploadReceiptFile } from "@/shared/api/receipt"; 

const SelectMethod = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const store = state?.store; // 전달된 store 값

  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // 파일 업로드 → 리뷰 페이지 이동
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!store) {
      alert("Store 정보가 없습니다. 다시 시도해주세요.");
      return;
    }
    console.log("📂 선택한 파일:", file);

    setLoading(true);
    try {
      const res = await uploadReceiptFile(file);
      console.log("[SelectMethod] receipt upload response:", res);

      // 업로드 성공 → store와 receipt 함께 넘김
      const category = store?.category?.toLowerCase();
      const storeWithId = { ...store, id: store.id ?? store.store_id };
      const nextState = { 
        store: storeWithId, 
        source: "receipt", 
        receipt: res,
        forceFourSteps: true,  // ✅ 스테퍼 4개
        rewardPoint: 500,      // ✅ 사진 올리면 500
      };

      console.log("➡️ navigate 실행:", category, nextState);

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
    } catch (err) {
      console.error("영수증 업로드 실패:", err);
      alert("영수증 업로드에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout overlapHeader>
      <LeftHeader
        title="Review"
        overlay
        leftIcon={BackImg}
        onLeftClick={() => window.history.back()}
      />

      <Wrap>
        <PageTitle>Did you visit this place?</PageTitle>
        <Description>Earn extra rewards by verifying your receipt.</Description>
      </Wrap>

      <CardContainer>
        {/* 첫 번째 카드: 영수증 인증 리뷰 */}
        <Card onClick={() => fileInputRef.current?.click()} disabled={loading}>
          <Icon src={VerifyImg}/>
          <TextBox>
            <TextTitle>Verify receipt & write a review</TextTitle>
            <TextSub>Earn 500 points</TextSub>
          </TextBox>
        </Card>
        {/* 숨겨진 input */}
        <input
          type="file"
          accept="image/jpeg"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={onFileChange}
        />

        {/* 두 번째 카드: 영수증 없이 리뷰 */}
        <Card
          onClick={() => {
            if (!store) {
              alert("Store 정보가 없습니다. 다시 시도해주세요.");
              return;
            }
            const category = store?.category?.toLowerCase();
            const storeWithId = { ...store, id: store.id ?? store.store_id };
            const nextState = { 
                store: storeWithId, 
                source: "normal",
                forceFourSteps: true, // ✅ 스테퍼 4개
                rewardPoint: 10,      // ✅ 사진 안 올리면 10
            };

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
          <Icon src={WriteImg}/>
          <TextBox>
            <TextTitle>Write a review without receipt</TextTitle>
            <TextSub>Earn 10 points</TextSub>
          </TextBox>
        </Card>
      </CardContainer>
    </Layout>
  )
}

export default SelectMethod


/* ---------------- styled-components ---------------- */
const PageTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
  line-height: 125%;
  letter-spacing: -0.48px;
`

const Description = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.28px;
`

const Wrap = styled.div`
  display: flex;            
  flex-direction: column;
  gap: 10px; 
  padding-top: calc(56px + 21px);
  margin: 0 0 0 20px;
`;

const Card = styled.button`
  display: flex;
  width: 335px;
  height: 119px;
  padding: 10px;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;

  border-radius: 12px;
  border: 1px solid #B8B8B8;
  background: #FAFAFA;
  cursor: pointer;

  transition: background 0.2s;
  &:hover { background: #f0f0f0; }
`;

const CardContainer = styled.div`
  display: flex;            
  flex-direction: column;
  gap: 18px;
  margin: 34px 0 0 20px;
`

const Icon = styled.img`
  width: 40px;
  height: 40px;
  padding: 10px;
  flex-shrink: 0;
`

const TextBox = styled.div`
  display: flex;
  width: 241px;
  flex-direction: column;
  gap: 8px;
`

const TextTitle = styled.div`
  color: #000;
  font-size: 18px;
  font-weight: 600;
  line-height: 125%;
  letter-spacing: -0.36px;
`

const TextSub = styled.div`
  color: #000;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.28px;
`
