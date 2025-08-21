import React, { useState } from 'react'
import styled from 'styled-components'
import ReviewContent from './ReviewContent'
import ScrollTopFab from '@/components/common/ScrollTopFab';

const UserReview = () => {
    // Mock 데이터
    const reviews = [
      {
        id: 'r1',
        user: { avatarUrl: '', nickname: '민정' }, //가게명으로 수정필요
        createdAt: '2025-08-14T12:34:56Z',
        likes: 12, liked: true,
        category: 'snacks',
        tags: [
          { id: 39, category: 'snacks', group: 'Review Tags',  tag: 'Recommended' },
          { id: 40, category: 'snacks', group: 'Review Tags',  tag: 'Clean' },
          { id: 44, category: 'snacks', group: 'Portion Size', tag: 'Moderate' },
          { id: 47, category: 'snacks', group: 'Spicy Level',  tag: 'Mild' },
        ],
        text: [
          'Vegan, Pork-free, Beef-free, Mild/Medium/Spicy/Very spicy',
          'Delicious / Clean / Recommended / Hard to find / Spacious / English spoken',
          'text review'
        ].join('\n'),
      },
      {
        id: 'r2',
        user: { avatarUrl: '', nickname: 'Riku' },
        createdAt: '2025-08-17T09:20:00Z',
        likes: 3, liked: false,
        category: 'restaurants',
        tags: [
          { id: 71, category: 'restaurants', group: 'Review Tags',          tag: 'Delicious' },
          { id: 72, category: 'restaurants', group: 'Review Tags',          tag: 'Spacious' },
          { id: 73, category: 'restaurants', group: 'Dietary Restrictions', tag: 'Pork-free' },
          { id: 74, category: 'restaurants', group: 'Dietary Restrictions', tag: 'Vegan' },
          { id: 75, category: 'restaurants', group: 'Spicy Level',          tag: 'Medium' },
        ],
        text: [
          'Vegan options available, Pork-free menu noted.',
          'Place is spacious and the food was delicious.',
          'medium spicy level was just right for me.'
        ].join('\n'),
      },
    ];

  return (
    <>
      <Wrap>
        {reviews.map(r => (
          <ReviewContent
            key={r.id}
            avatarUrl={r.user.avatarUrl}
            nickname={r.user.nickname}
            createdAt={r.createdAt}
            likes={r.likes}
            liked={r.liked}
            onLikeClick={() => {/* 좋아요 토글 API */}}

            tagsCategory={r.category}
            tagItems={r.tags}

            text={r.text}
          />
        ))}
      </Wrap>

      <ScrollTopFab offsetBottom={66} gap={12} right={12}/>
    </>

  )
}

export default UserReview

const Wrap = styled.div`
    display: inline-flex;
    /* height: 974px; */
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    flex-shrink: 0;
`

const BottomBar = styled.div`
  position: sticky;         /* 스크롤해도 하단에 붙게 */
  bottom: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 66px;
  width: 100%;              /* 부모(Inner 375px) 기준 100% */
  background: #fff;
  border-top: 1px solid #eee;
  padding-bottom: env(safe-area-inset-bottom); /* iOS 홈바 대응 */
`;

const BarInner = styled.div`
  width: 335px;             /* 버튼 래퍼 폭 */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;
