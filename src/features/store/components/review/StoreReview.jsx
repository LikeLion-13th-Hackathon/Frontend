// src\features\store\components\review\StoreReview.jsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReviewContent from "./ReviewContent";
import { fetchReviewsByStore, toggleReviewLike } from "@/shared/api/review";
import { fetchUserDetail } from "@/shared/api/user"; 
import BottomCTA from "../../../../components/common/BottomCTA"; 
import ScrollTopFab from "../../../../components/common/ScrollTopFab";
import { useNavigate } from "react-router-dom";

const StoreReview = ({ storeId, store }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!storeId) return;
    fetchReviewsByStore(storeId)
      .then(async (res) => {
        const rawReviews = res.data.results;

        const userInfos = await Promise.all(
          rawReviews.map(r =>
            fetchUserDetail(r.user)
              .then(res => {
                const u = res.data.results;
                return {
                  id: u.user_id,
                  nickname: u.nickname,
                  profile_image: u.profile_image,
                };
              })
              .catch(() => ({
                id: r.user,
                nickname: "익명",
                profile_image: null,
              }))
          )
        );

        const userMap = {};
        userInfos.forEach(u => { userMap[u.id] = u });

        const enriched = rawReviews.map(r => ({
          ...r,
          userInfo: userMap[r.user] || {}
        }));

        setReviews(enriched);
      })
      .catch((err) => console.error("리뷰 불러오기 실패:", err))
      .finally(() => setLoading(false));
  }, [storeId]);

  const handleLikeClick = (reviewId) => {
    toggleReviewLike(reviewId).then((res) => {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId ? { ...r, liked: res.data.liked, likes_count: res.data.likes_count } : r
        )
      );
    });
  };

  const handleStartChat = () => {
    if (!store) return;
    navigate('/chat', { state: { store: store } });
  };

  return (
    <>
      <Header>Reviews</Header>
      <Wrap>
        {loading ? (
          <EmptyBox>Loading...</EmptyBox>
        ) : reviews.length > 0 ? (
          reviews.map((r) => (
            <ReviewContent
              key={r.id}
              nickname={r.userInfo.nickname || "익명"}
              avatar={r.userInfo.profile_image}
              createdAt={r.created}
              likes={r.likes_count}
              liked={r.liked}
              onLikeClick={() => handleLikeClick(r.id)}
              tagsCategory={r.tags[0]?.category || "snacks"}
              tagItems={r.tags}
              text={r.comment}
            />
          ))
        ) : (
          <EmptyBox>
            <p>No reviews yet.</p>
            <span>Be the first to review! ✨</span>
          </EmptyBox>
        )}
      </Wrap>

      <BottomCTA
        label="AI Chat Simulator"
        onClick={handleStartChat}
        bottomOffset={0}
        variant="ai"
      />
    </>
  );
}


export default StoreReview;

/* ===================== styled ===================== */

const Header = styled.div`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  border-bottom: 2px solid var(--pri, #6D6D6D);
  margin-top: 6px;

  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 125%; 
  letter-spacing: -0.36px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  flex-shrink: 0;
  padding-bottom: 100px;
`;

const EmptyBox = styled.div`
  width: auto;              /* 전체폭 차지 X */
  max-width: 280px;         /* 너무 넓어지지 않도록 제한 */
  margin: 40px 0;        /* 중앙 정렬 */
  padding: 24px 16px;
  border-radius: 12px;
  background: transparent;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-align: center;

  align-self: center;

  p {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    color: #444;
  }

  span {
    font-size: 13px;
    color: #999;
  }
`;


