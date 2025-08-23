import React from 'react'
import styled from 'styled-components'
import PlusImg from '@/assets/icons/plus.png'
import MinusImg from '@/assets/icons/minus.png'

const PointHistory = () => {
  return (
    <Wrap>
        <Title>Redemption History</Title>

        <HistoryRow>
            <ContentRow>
                <RightContent>
                    <Icon src={PlusImg}/>
                    <TextBox>
                        <HistoryTitle>Redeem Onnuri Gift Card</HistoryTitle>
                        <HistoryMemo>5,000 won</HistoryMemo>
                    </TextBox>
                </RightContent>

                <LeftContent>
                    <PointChange>- 5,000 points</PointChange>
                    <PointRemain>150 points</PointRemain>
                </LeftContent>

            </ContentRow>
        </HistoryRow>

        <ViewText>View all Redemption</ViewText>
    </Wrap>
  )
}

export default PointHistory

const Wrap = styled.div`
    display: flex;
    width: 335px;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    margin: 49px 20px;
`

const Title = styled.div`
    align-self: stretch;
    color: #000;

    /* head/head 3-em */
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 125%; /* 22.5px */
    letter-spacing: -0.36px;
`

const ContentRow = styled.div`
    display: flex;
    padding: 10px 0;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
`

const HistoryRow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
`

const RightContent = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 6px;
`

const Icon = styled.img`
    width: 24px;
    height: 24px;
`

const TextBox = styled.div`
    display: flex;
    width: 156px;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
`

const HistoryTitle = styled.div`
    color: #000;

    /* body/body 2-em */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;
`

const HistoryMemo = styled.div`
    align-self: stretch;
    color: #858585;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`

const LeftContent = styled.div`
    display: flex;
    width: 105px;
    flex-direction: column;
    align-items: flex-end;
`

const PointChange = styled.div`
    color: #FA684E;

    /* body/body 2-em */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;
`

const PointRemain = styled.div`
    color: #858585;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`

const ViewText = styled.div`
    align-self: stretch;
    color: #858585;
    text-align: right;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: none;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;
`