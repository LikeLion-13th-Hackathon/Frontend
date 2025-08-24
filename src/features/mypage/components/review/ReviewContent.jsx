import React, { useState } from 'react'
import styled from 'styled-components'
import ThumbOn from '@/assets/icons/thumb/thumb-up_on.png';
import ThumbOff from '@/assets/icons/thumb/thumb-up_off.png';
import ModifyImg from '@/assets/icons/modify.png'
import DeleteImg from '@/assets/icons/delete.png'
import defaultAvatar from '@/assets/icons/basic_profile.png';
import ReviewTags from './ReviewTags';

const ReviewContent = ({
  avatarUrl,
  storeKorean,
  storeEnglish,
  createdAt = new Date(),
  likes,
  onLikeClick,
  liked = false,

  tagsCategory = 'snacks',
  tagItems = [],

  text = '',
  onEdit,
  onDelete,
  onSave,
}) => {
    const dateText = formatDateYYMMDD(createdAt)


    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(text);
    const [busy, setBusy] = useState(false);

    const startEdit = () => {
      setDraft(text);
      setIsEditing(true);
    };

    const cancelEdit = () => {
      setDraft(text);
      setIsEditing(false);
    };

    const handleSave = async () => {
      const v = draft.trim();
      if (!v) { alert('Comment cannot be empty.'); return; }
      try {
        setBusy(true);
        await onSave?.(v);
        setIsEditing(false);
      } catch (e) {
        console.error(e);
        alert('Failed to save the review.');
      } finally {
        setBusy(false);
      }
    };

  return (
    <Wrap>
        <ReviewHeader>
            <Profile>
              <Avatar
                src={(avatarUrl && String(avatarUrl).trim()) || defaultAvatar}
                alt={storeKorean || 'store'}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  // 기본이미지로 안전하게 폴백(무한 onError 방지)
                  if (!e.currentTarget.src.includes('basic_profile')) {
                    e.currentTarget.src = defaultAvatar;
                  }
                }}
              />

              <Meta>
                <StoreNames>
                  <StoreName>{storeKorean}</StoreName>
                  {storeEnglish && <StoreEnglish>{storeEnglish}</StoreEnglish>}
                </StoreNames>
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

        {/* 진행중 .. 태그 추가 필용.... */}
        <ReviewTags
            category={tagsCategory}
            items={tagItems}
            defaultOpen={false} //기본 접힘(default)
        />

        {!isEditing ? (
          text && <ReviewText>{text}</ReviewText>
        ) : (
          <EditorArea>
            <EditTextarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={1000}
              disabled={busy}
              placeholder="Write your review..."
            />
            <CharCounter>{draft.length}/1000</CharCounter>
          </EditorArea>
        )}

        <ReviewTool>
          {!isEditing ? (
            <>
              <ToolBtn
                type="button"
                onClick={() => { startEdit(); onEdit?.(); }}
                aria-label="Edit review"
                title="Edit"
                disabled={busy}
              >
                <ToolIcon src={ModifyImg} alt="" />
              </ToolBtn>
              <ToolBtn
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this review?')) onDelete?.();
                }}
                aria-label="Delete review"
                title="Delete"
                disabled={busy}
              >
                <ToolIcon src={DeleteImg} alt="" />
              </ToolBtn>
            </>
          ) : (
            <>
              <PrimaryBtn type="button" onClick={handleSave} disabled={busy}>Save</PrimaryBtn>
              <GhostBtn type="button" onClick={cancelEdit} disabled={busy}>Cancel</GhostBtn>
            </>
          )}
        </ReviewTool>

    </Wrap>
  )
}

export default ReviewContent

const Wrap = styled.div`
    display: flex;
    width: 335px;
    flex-direction: column;
    align-items: flex-end;
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

const Avatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 8px;
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

const StoreNames = styled.div`
  display: flex;
  flex-direction: column; /* 한국어, 영어를 위아래로 쌓되 */
  align-items: flex-start;
`;

const StoreName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  white-space: normal;   /* 줄바꿈 허용 -> 세로로 길게 */
  word-break: keep-all;  /* 한국어 자연 줄바꿈 */
`;

const StoreEnglish = styled.div`
  font-size: 12px;
  color: #888;
  white-space: normal;   /* 줄바꿈 허용 */
  word-break: break-word; /* 긴 단어는 강제로 개행 */
  margin-top: 2px;       /* 위 한글명과 간격 */
`;

const ReviewTool = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const ToolIcon = styled.img`
  width: 24px;
  height: 24px;
`

const ToolBtn = styled.button`
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const EditorArea = styled.div`
  position: relative;
  width: 100%;
`;

const EditTextarea = styled.textarea`
  width: 100%;
  min-height: 88px;
  resize: vertical;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #e5e5e5;
  font-family: Pretendard;
  font-size: 14px;
  line-height: 1.5;
  outline: none;
  &:focus { border-color: #111; }
`;

const CharCounter = styled.div`
  position: absolute;
  right: 10px;
  bottom: 8px;
  font-size: 11px;
  color: #999;
`;

const PrimaryBtn = styled.button`
  padding: 6px 10px;
  border-radius: 8px;
  border: 0;
  background: #111;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
`;

const GhostBtn = styled.button`
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #fff;
  color: #333;
  font-size: 12px;
  cursor: pointer;
`;



