// src/features/home/components/MarketInfo.jsx
import React from 'react'
import styled from 'styled-components'

const MarketInfo = ({ infos = [] }) => {

  // 시장별 설명 하드코딩 매핑
  const descMap = {
    1: "A vibrant spot to taste authentic local flavors with fresh produce and traditional street food loved by both visitors and locals.",
    2: "A busy market loved by local residents for fresh groceries, colorful produce, and classic Korean snacks that capture daily life and community spirit.",
    3: "An iconic destination offering vast varieties of live and fresh seafood, attracting seafood lovers and visitors seeking authentic marine flavors and market excitement."
  };

  return (
    <>
      <Title>Learn more about the market</Title>

      <Wrapper>
        {infos.map(info => (
          <InfoCard
            key={info.market_id}
            title={info.market_name}
            subtitle={`– ${info.market_english}`}
            description={descMap[info.market_id] ?? ""}
            image={info.market_image}
          />
        ))}
      </Wrapper>
    </>
  )
}

export default MarketInfo

const InfoCard = ({ title, subtitle, description, image }) => {

  const safeImage = image?.endsWith(".jpg") ? image.replace(".jpg", ".png") : image;
    
  return (
    <Card>
      <ImageBox $image={image} />
      <TextBox>
        <TitleText>
          {title} <SubText>{subtitle}</SubText>
        </TitleText>
        {description && <DescText>{description}</DescText>}
      </TextBox>
    </Card>
  )
}

const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  line-height: 125%;
  letter-spacing: -0.4px;
  padding: 20px 26px 16px;
`

const Wrapper = styled.div`
  display: flex;
  width: 335px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin: 0 20px;
`

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`

const ImageBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 5px;
  background: ${({ $image }) =>
    $image
      ? `url(${$image}) no-repeat center/cover`
      : "#efefef"};
`


const TextBox = styled.div`
  display: flex;
  width: 256px;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`

const TitleText = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.32px;
  white-space: nowrap; /* 한 줄로 고정 */
  overflow: hidden;
  text-overflow: ellipsis; /* 너무 길면 ... 처리 */
`

const SubText = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.32px;
  white-space: nowrap;
`


const DescText = styled.div`
  align-self: stretch;
  color: #858585;
  font-family: Pretendard;
  font-size: 10px;            /* 조금 작게 */
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.2px;

  display: -webkit-box;       /* 멀티라인 ... 처리 */
  -webkit-line-clamp: 2;      /* 최대 2줄 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`