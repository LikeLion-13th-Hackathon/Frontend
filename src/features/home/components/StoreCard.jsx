import React from 'react'
import styled from 'styled-components';
import PinImg from "@/assets/icons/main_pin.png";
import LikeImg from "@/assets/icons/main_like.png";

const StoreCard = ( {items = [
    { id: 1, title: '가게명A', desc: '리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용내용', imageUrl: '', MarketName: '흑석시장' },
    { id: 2, title: '가게명B', desc: '리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용내용', imageUrl: '', MarketName: '흑석시장' },
    { id: 3, title: '가게명C', desc: '리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용내용', imageUrl: '', MarketName: '흑석시장' },
    { id: 4, title: '가게명D', desc: '리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용내용', imageUrl: '', MarketName: '흑석시장' },
    { id: 5, title: '가게명E', desc: '리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용내용', imageUrl: '', MarketName: '흑석시장' }
]}) => {

  return (
    <Wrapper>
        {items.map(it => (
            <Card key={it.id}>
                <ImageBox />
                <TextBox>
                    <Title>{it.title}</Title>
                    <ReviewText>{it.desc}</ReviewText>
                    <BottomRow>
                        <LocationContainer>
                        <PinIcon src={PinImg} alt="pin" />
                        <MarketName>{it.MarketName}</MarketName>
                        </LocationContainer>

                        <LikeContainer>
                        <ThumbIcon src={LikeImg} alt="thumbs up" />
                        <LikeCount>{it.likes || 0}</LikeCount>
                        </LikeContainer>
                    </BottomRow>
                </TextBox>
            </Card>
        ))}
    </Wrapper>
  )
}

export default StoreCard

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
    align-items: flex-start;
    gap: 4px;
    border-radius: 8px;
    background: #FFF;

    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10);
`;

const ImageBox = styled.div`
    height: 100px;
    align-self: stretch;
    border-radius: 8px 8px 0 0;
    background-color: #efefef;
`

const TextBox = styled.div`
    display: flex;
    padding: 0 10px 10px 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;

    background: #ffffff;
    border-radius: 0 0 8px 8px;
`

const Title = styled.div`
    color: #000;

    text-align: center;
    /* body/body 2-em */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;
`;

const ReviewText = styled.div`
    align-self: stretch;
    color: #000;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`

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
`

const PinIcon = styled.img`
  width: 14px;
  height: 14px;
`;

const MarketName = styled.span`
    color: #818181;

    /* caption/caption 2 */
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 15px */
    letter-spacing: -0.2px;
`

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

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`;