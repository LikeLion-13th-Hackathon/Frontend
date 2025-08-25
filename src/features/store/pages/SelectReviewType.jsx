import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Layout from '@/components/common/Layout';
import LeftHeader from '@/components/common/header/LeftHeader';
import BackImg from '@/assets/icons/header_back.png';

import VerifyImg from '@/assets/icons/verify.png';
import WriteImg from '@/assets/icons/write.png';

import { uploadReceiptFile } from '@/shared/api/receipt';

const SelectReviewType = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 연필 아이콘에서 state로 전달된 store 객체
  const store =
    location.state?.store ||
    (() => {
      try {
        const raw = sessionStorage.getItem('review.store');
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    })();

  // id 우선순위: store.store_id → store.id → location.state.storeId
  const storeId = store?.store_id ?? store?.id ?? location.state?.storeId ?? null;

  // 카테고리: store.category → store.category_name → location.state.category
  const storeCategory =
    store?.category ?? store?.category_name ?? location.state?.category ?? null;

  // 카테고리 문자열을 라우트로 매핑
  const categoryToRoute = (cat) => {
    const key = String(cat || '').trim().toLowerCase();
    if (['fresh'].includes(key)) return '/review/fresh';
    if (['goods', 'good'].includes(key)) return '/review/goods';
    if (['snack', 'snacks'].includes(key)) return '/review/snack';
    if (['restaurant', 'restaurants'].includes(key)) return '/review/restaurant';
    return null;
  };

  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // 공통 이동 도우미
  const goToCategoryReview = (stateExtra = {}) => {
    const target = categoryToRoute(storeCategory);
    if (!target) {
      console.warn('[SelectReviewType] Bad category:', storeCategory);
      alert('가게 카테고리를 확인할 수 없습니다.');
      return;
    }
    // 새로고침 대비: 세션에도 저장
    if (store?.store_id || store?.id) {
      sessionStorage.setItem('review.store', JSON.stringify(store));
    }
    navigate(target, {
      state: {
        storeId,
        store,
        nextPath: '/reward',
        ...stateExtra,
      },
    });
  };

  // 1) 영수증 업로드 카드 클릭 -> 파일 선택창
  const onClickVerifyCard = () => {
    if (loading) return;
    fileInputRef.current?.click();
  };

  // 파일 선택 후 업로드 -> 카테고리 리뷰 페이지 이동
  const onFilePicked = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!storeId) {
      alert('가게 정보가 없습니다. 이전 화면에서 다시 시도해 주세요.');
      e.target.value = '';
      return;
    }
    try {
      setLoading(true);
      const result = await uploadReceiptFile(file); // 백엔드 응답(영수증 업로드 결과)

      // ✅ direct 모드 + 500 포인트
      goToCategoryReview({
        mode: 'direct',
        receipt: result,
        receiptUploaded: true,
        rewardPoint: 500,
      });
    } catch (err) {
      console.error(err);
      alert('영수증 업로드 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
      e.target.value = ''; // 같은 파일 재선택 가능하도록 초기화
    }
  };

  // 2) 영수증 없이 리뷰 작성
  const onClickWriteOnlyCard = () => {
    if (!storeId) {
      alert('가게 정보가 없습니다. 이전 화면에서 다시 시도해 주세요.');
      return;
    }

    // ✅ direct 모드 + 10 포인트
    goToCategoryReview({
      mode: 'direct',
      receiptUploaded: false,
      rewardPoint: 10,
    });
  };

  return (
    <Layout overlapHeader>
      <LeftHeader
        title="Review"
        overlay
        leftIcon={BackImg}
        onLeftClick={() => window.history.back()}
      />

      {/* 숨겨진 파일 입력 (영수증 업로드용) */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        style={{ display: 'none' }}
        onChange={onFilePicked}
      />

      <Wrap>
        <PageTitle>Did you visit this place?</PageTitle>
        <Description>Earn extra rewards by verifying your receipt.</Description>
      </Wrap>

      <CardContainer>
        <Card role="button" tabIndex={0} onClick={onClickVerifyCard} aria-disabled={loading}>
          <Icon src={VerifyImg} alt="Verify receipt" />
          <TextBox>
            <TextTitle>Verify receipt & write a review</TextTitle>
            <TextSub>Earn 500 points</TextSub>
          </TextBox>
        </Card>

        <Card role="button" tabIndex={0} onClick={onClickWriteOnlyCard}>
          <Icon src={WriteImg} alt="Write without receipt" />
          <TextBox>
            <TextTitle>Write a review without receipt</TextTitle>
            <TextSub>Earn 10 points</TextSub>
          </TextBox>
        </Card>
      </CardContainer>
    </Layout>
  );
};

export default SelectReviewType;

/* ===== styles ===== */

const PageTitle = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
  line-height: 125%;
  letter-spacing: -0.48px;
`;

const Description = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.28px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: calc(56px + 21px);
  margin-left: 20px;
`;

const Card = styled.div`
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
  transition: transform .05s ease, box-shadow .15s ease;

  &:active { transform: scale(0.98); }
  &:hover { box-shadow: 0 2px 10px rgba(0,0,0,.06); }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 34px 0 0 20px;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  padding: 10px;
  flex-shrink: 0;
`;

const TextBox = styled.div`
  display: flex;
  width: 241px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
`;

const TextTitle = styled.div`
  align-self: stretch;
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 125%;
  letter-spacing: -0.36px;
`;

const TextSub = styled.div`
  align-self: stretch;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.28px;
`;
