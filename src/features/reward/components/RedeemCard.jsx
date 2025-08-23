import React from 'react'
import styled from 'styled-components'
import GiftImg from '@/assets/icons/gift.png'
import RedeemModal from './RedeemModal'

const RedeemCard = () => {
  return (
    <>
        <Wrap>
            {/* 5,000원 상품권 */}
            <FlexRow>
                <CardContainer>
                    <Rectangle />

                    <TextContainer>
                        <SubName>디지털 온누리상품권</SubName>
                        <Cost>5,000 won</Cost>
                        <PointRow>
                            <GiftIcon src={GiftImg}/>
                            <GiftText>Use 5,000 points</GiftText>
                        </PointRow>
                    </TextContainer>
                </CardContainer>

                <RedeemButton onClick={() => handleRedeem(5000)}>
                    Redeem
                </RedeemButton>
            </FlexRow>

            {/* 10,000원 상품권 */}
            <FlexRow>
                <CardContainer>
                    <Rectangle />

                    <TextContainer>
                        <SubName>디지털 온누리상품권</SubName>
                        <Cost>10,000 won</Cost>
                        <PointRow>
                            <GiftIcon src={GiftImg}/>
                            <GiftText>Use 10,000 points</GiftText>
                        </PointRow>
                    </TextContainer>
                </CardContainer>

                <RedeemButton onClick={() => handleRedeem(10000)}>
                    Redeem
                </RedeemButton>
            </FlexRow>

            {/* 30,000원 상품권 */}
            <FlexRow>
                <CardContainer>
                    <Rectangle />

                    <TextContainer>
                        <SubName>디지털 온누리상품권</SubName>
                        <Cost>30,000 won</Cost>
                        <PointRow>
                            <GiftIcon src={GiftImg}/>
                            <GiftText>Use 30,000 points</GiftText>
                        </PointRow>
                    </TextContainer>
                </CardContainer>

                <RedeemButton onClick={() => handleRedeem(30000)}>
                    Redeem
                </RedeemButton>
            </FlexRow>
        </Wrap>

        <RedeemModal
            open={open} 
            onClose={() => setOpen(false)} 
            onOpenApp={() => alert(`${selected}원 상품권 사용하기!`)} 
        />
    </>
  )
}

export default RedeemCard

const Wrap = styled.div`
    display: flex;
    width: 335px;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 20px;
`

const FlexRow = styled.div`
    display: flex;
    padding: 10px 0;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`

const CardContainer = styled.div`
    display: flex;
    width: 235px;
    align-items: center;
    gap: 8px;
`

const Rectangle = styled.div`
    width: 60px;
    height: 60px;
    flex-shrink: 0;

    border-radius: 8px;
    background: #D9D9D9;
`

const TextContainer = styled.div`
    display: flex;
    /* width: 80px; */
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
`

const SubName = styled.div`
    color: #858585;

    /* caption/caption 2 */
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 15px */
    letter-spacing: -0.2px;
`

const Cost = styled.div`
    color: #000;

    /* body/body 1-em */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
`

const PointRow = styled.div`
    display: flex;
    color: #707070;
    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`


const GiftIcon = styled.img`
    width: 18px;
    height: 18px;
`

const GiftText = styled.div`
    color: #707070;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`

const RedeemButton = styled.div`
    display: flex;
    width: 72px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    border: 1px solid var(--gray-200, #E5E7EB);
    background: var(--pri, #6D6D6D);

    color: var(--zinc-700, #3F3F47);
    text-align: center;

    /* body/body 2 */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;

`