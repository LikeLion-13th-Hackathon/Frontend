import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LocationSvg from "@/assets/icons/location.svg?react";
import LikeImg from "@/assets/icons/main_like.png";

const StoreCard = ({ items = [] }) => {
  const navigate = useNavigate();  // 추가

  const handleClick = (id) => {
    navigate(`/store/${id}`);  // 상세 페이지로 이동
  };

  return (
    <Wrapper>
      {items.map(it => (
        <Card key={it.id} onClick={() => handleClick(it.id)}> {/* 클릭 이벤트 추가 */}
          <ImageBox>
            {it.imageUrl ? (
              <StoreImage src={it.imageUrl} alt={it.title} />
            ) : (
              <Placeholder />
            )}
          </ImageBox>
          <TextBox>
            <Title>{it.title}</Title>
            <ReviewText>{it.desc || "No reviews yet."}</ReviewText>
            <BottomRow>
              <LocationContainer>
                <PinIcon $active={true} />
                <MarketName>{it.marketName}</MarketName>
              </LocationContainer>

              <LikeContainer>
                <ThumbIcon src={LikeImg} alt="thumbs up" />
                <LikeCount>{it.likes}</LikeCount>
              </LikeContainer>
            </BottomRow>
          </TextBox>
        </Card>
      ))}
    </Wrapper>
  )
}

export default StoreCard

// === styled ===
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 16px 20px 31px 20px;
  overflow-x: auto;
  overflow-y: hidden;
  flex-wrap: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const Card = styled.div`
  display: flex;
  width: 140px;
  flex: 0 0 140px;
  flex-direction: column;
  border-radius: 8px;
  background: #FFF;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10);

  /* 카드 높이 통일 */
  min-height: 180px;
`;


const ImageBox = styled.div`
  height: 100px;
  align-self: stretch;
  border-radius: 8px 8px 0 0;
  background-color: #efefef;
  overflow: hidden;
`;

const StoreImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background: #e0e0e0;
`;

const TextBox = styled.div`
  display: flex;
  padding: 0 10px 10px 10px;
margin-top: 6px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
  background: #ffffff;
  border-radius: 0 0 8px 8px;
`;

const Title = styled.div`
  color: #000;
  text-align: left;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.28px;

  white-space: normal;           /* 줄바꿈 허용 */
  word-break: break-word;        /* 단어 길면 강제 줄바꿈 */
  display: -webkit-box;
  -webkit-line-clamp: 1;         /* 최대 2줄까지만 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReviewText = styled.div`
  align-self: stretch;
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.24px;

  display: -webkit-box;
  -webkit-line-clamp: 1;   /* 최대 2줄까지만 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* ... 처리 */
`;


const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const LocationContainer = styled.div`
  display: flex;
  padding: 4px 6px;
  align-items: center;
  gap: 2px;
  border-radius: 6px;
  background: #EAEAEA;
`;

const PinIcon = styled(LocationSvg)`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
`;

const MarketName = styled.span`
  color: #818181;
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.2px;
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2px;
`;

const ThumbIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const LikeCount = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.24px;
`;
