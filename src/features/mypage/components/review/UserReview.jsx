import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import ReviewContent from './ReviewContent';
import ScrollTopFab from '@/components/common/ScrollTopFab';
import { fetchUserReviews } from '@/shared/api/review';

const UserReview = ({ userId, onCountChange }) => {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'ok' | 'empty' | 'error'

  useEffect(() => {
    if (!userId) return;
    let mounted = true;

    (async () => {
      try {
        setStatus('loading');
        const raw = await fetchUserReviews(userId);
        const results = Array.isArray(raw) ? raw : (raw?.results ?? []);
        const count   = typeof raw?.count === 'number' ? raw.count : results.length;
        if (!mounted) return;

        if (!results.length) {
          setReviews([]);
          setStatus('empty');
          onCountChange?.(0);
          return;
        }
        setReviews(results);
        onCountChange?.(typeof count === 'number' ? count : results.length);
        setStatus('ok');
      } catch (e) {
        console.error('리뷰 불러오기 실패:', e);
        if (mounted) setStatus('error');
      }
    })();

    return () => { mounted = false; };
  }, [userId]);

  const content = useMemo(() => {
    if (status === 'loading') return <Info>불러오는 중…</Info>;
    if (status === 'error')   return <Info>리뷰를 불러오지 못했어요.</Info>;
    if (status === 'empty')   return <Info>No reviews written yet.</Info>;

    // status === 'ok'
    return (
      <Wrap>
        {reviews.map((r) => {
          // 백엔드 응답 매핑
          const storeKorean = r.store_name || r.store_title || `Store #${r.store}`;
          const storeEnglish = r.store_english || '';
          const createdAt = r.created;
          const likes = r.likes_count ?? 0;
          const liked = !!r.liked;
          const tagItems = Array.isArray(r.tags) ? r.tags : [];
          const category = tagItems[0]?.category || 'others';

          return (
            <ReviewContent
              key={r.id}
              avatarUrl={r.store_image || ''}
              storeKorean={storeKorean}
              storeEnglish={storeEnglish}
              createdAt={createdAt}
              likes={likes}
              liked={liked}
              onLikeClick={() => {
                setReviews(prev => prev.map(x => {
                  if (x.id !== r.id) return x;
                  const nowLiked = !liked;
                  return {
                    ...x,
                    liked: nowLiked,
                    likes_count: (x.likes_count ?? 0) + (nowLiked ? 1 : -1)
                  };
                }));
              }}
              tagsCategory={category}
              tagItems={tagItems}
              text={r.comment || ''}
            />
          );
        })}
      </Wrap>
    );
  }, [reviews, status]);

  return (
    <>
      {content}
      <ScrollTopFab offsetBottom={66} gap={12} right={12} />
    </>
  );
};

export default UserReview;

/* styles */
const Wrap = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  flex-shrink: 0;
`;

const Info = styled.div`
  padding: 24px 20px;
  color: #666;
  font-size: 14px;
`;
