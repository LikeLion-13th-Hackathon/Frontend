import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import GiftImg from '@/assets/icons/gift.png'
import RedeemModal from './RedeemModal'
import VoucherModal from './VoucherModal'

import CardImg1 from '@/assets/icons/5000.png'
import CardImg2 from '@/assets/icons/10000.png'
import CardImg3 from '@/assets/icons/30000.png'

const RedeemCard = () => {
    const [redeemOpen, setRedeemOpen] = useState(false);
    const [voucherOpen, setVoucherOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [voucher, setVoucher] = useState(null);

    const handleRedeem = useCallback((amount) => {
        setSelected(amount);
        setRedeemOpen(true);
    }, []);

    const generateCode = (amount) => {
        // 예시 코드: ONN-5000-XXXX-XXXX
        const rand = () => Math.floor(Math.random() * 9000 + 1000);
        return `ONN-${amount}-${rand()}-${rand()}`;
    };

    const handleConfirm = useCallback(async (amount) => {
        // TODO: 여기서 실제 교환 API 호출하고, 응답으로 바코드 URL/코드 수신
        // const { code, barcodeUrl } = await redeemAPI(amount);

        // 데모용 더미
        const code = generateCode(amount);
        const barcodeUrl = ''; // 실제 url 있으면 채우기

        setVoucher({ code, barcodeUrl, amount });
        setRedeemOpen(false);
        setVoucherOpen(true);
    }, []);

  return (
    <>
        <Wrap>
            {/* 5,000원 상품권 */}
            <FlexRow>
                <CardContainer>
                    <GiftCardIcon src={CardImg1} />

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
                    <GiftCardIcon src={CardImg2} />

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
                    <GiftCardIcon src={CardImg3} />

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

        {/* 1단계: 교환 확인 모달 */}
        <RedeemModal
            open={redeemOpen}
            amount={selected}
            onClose={() => setRedeemOpen(false)}
            onConfirm={handleConfirm}
        />

        {/* 2단계: 바코드 모달 */}
        <VoucherModal
            open={voucherOpen}
            amount={voucher?.amount}
            code={voucher?.code}
            barcodeUrl={voucher?.barcodeUrl}
            onClose={() => setVoucherOpen(false)}
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

const GiftCardIcon = styled.img`
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

const RedeemButton = styled.button`
    display: flex;
    width: 72px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    border: 1px solid var(--gray-200, #E5E7EB);
    background: var(--pri, #E5E7EB);

    color: var(--zinc-700, #8D8D8D);
    text-align: center;

    /* body/body 2 */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;

`