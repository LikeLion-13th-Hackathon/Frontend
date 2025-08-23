import React from 'react'
import styled from 'styled-components'
import ThumbOn from '@/assets/icons/thumb/thumb-up_on.png';
import ThumbOff from '@/assets/icons/thumb/thumb-up_off.png';
import ReviewTags from './ReviewTags';

const ReviewContent = ({
  avatar,                // 이름 맞춤 (StoreReview에서 내려주는 값)
  nickname = '',
  createdAt = new Date(),
  likes,
  onLikeClick,
  liked = false,

  tagsCategory = 'snacks',
  tagItems = [],

  text = '',
}) => {
  const dateText = formatDateYYMMDD(createdAt);

  return (
    <Wrap>
      <ReviewHeader>
        <Profile>
          {avatar ? (
            <Avatar src={avatar} alt={`${nickname} 프로필 이미지`} />
          ) : (
            <AvatarFallback aria-hidden />
          )}

          <Meta>
            <Nickname title={nickname}>{nickname}</Nickname>
            <DateBox>{dateText}</DateBox>
          </Meta>
        </Profile>

        {typeof likes === 'number' && (
          <LikeBox>
            <LikeButton
              type="button"
              onClick={onLikeClick}
              aria-pressed={liked}
              aria-label={liked ? '좋아요 취소' : '좋아요'}
            >
              <LikeIcon src={liked ? ThumbOn : ThumbOff} alt="" aria-hidden />
            </LikeButton>
            <LikeCount>{likes}</LikeCount>
          </LikeBox>
        )}
      </ReviewHeader>

      <ReviewTags
        category={tagsCategory}
        items={tagItems}
        defaultOpen={false}
      />

      {text && <ReviewText>{text}</ReviewText>}
    </Wrap>
  );
};


export default ReviewContent

const Wrap = styled.div`
    display: flex;
    width: 335px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin: 22px 20px 0 20px;
`

const ReviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`

const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

{/* 프로필 이미지(백엔드 연동 필요) */}
const Avatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 42px;
  object-fit: cover;
  display: block;
  background: #d9d9d9;
`

/* 이미지 없을 때 플레이스홀더 */
const AvatarFallback = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 42px;
  background: #d9d9d9;
  flex-shrink: 0;
`

/* 닉네임 + 날짜 */
const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0; /* 디자인상 붙여 보임 */
`

const Nickname = styled.div`
  color: #000;
  text-align: left;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 240px; /* 필요시 조정 */
`

const DateBox = styled.div`
  color: #858585;
  text-align: left;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
  letter-spacing: -0.24px;
`

const LikeBox = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`;

const LikeButton = styled.button`
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const LikeCount = styled.span`
  color: #111;
  font-size: 12px;
  font-weight: 600;
`

const LikeIcon = styled.img`
    width: 24px;
    height: 24px;
    display: block;
`;

const ReviewText = styled.p`
    align-self: stretch;
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;

    /* 줄바꿈/긴 단어 대응 */
    white-space: pre-wrap;     /* \n 유지 + 줄바꿈 */
    word-break: keep-all;      /* 한국어 단어 줄바꿈 자연스럽게 */
    overflow-wrap: anywhere;   /* 긴 영어/URL 강제 줄바꿈 */
`;



/** 'YY.MM.DD'로 출력. */
function formatDateYYMMDD(v) {
  const s = String(v)
  // 이미 25.08.14 형태면 그대로
  if (/^\d{2}\.\d{2}\.\d{2}$/.test(s)) return s
  const d = new Date(v)
  if (isNaN(d)) return s
  const yy = String(d.getFullYear()).slice(2)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yy}.${mm}.${dd}`
}