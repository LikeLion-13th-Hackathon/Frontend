import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import GiftImg from '@/assets/icons/gift.png'
import RedeemModal from './RedeemModal'
import VoucherModal from './VoucherModal'

import CardImg1 from '@/assets/icons/5000.png'
import CardImg2 from '@/assets/icons/10000.png'
import CardImg3 from '@/assets/icons/30000.png'

import { postReward } from '@/shared/api/reward';

const RedeemCard = ({ balance = 0, onRedeemed }) => {
    const [redeemOpen, setRedeemOpen] = useState(false);
    const [voucherOpen, setVoucherOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [voucher, setVoucher] = useState(null);

    const [redeeming, setRedeeming] = useState(false);

    // 교환 티어 목록
    const can5000  = balance >= 5000;
    const can10000 = balance >= 10000;
    const can30000 = balance >= 30000;


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
    // 안전 가드: 잔액 부족하면 중단
    if (balance < amount) {
        alert('포인트가 부족합니다.');
        return;
    }
    if (redeeming) return;

    setRedeeming(true);
    try {
        // 1) 히스토리 차감 기록 (-amount)
        //    서버에서 사용하는 필드명은 seedHistory와 동일하게 맞춤: { delta, caption }
        await postReward({
        delta: -amount,
        caption: `온누리 ${amount.toLocaleString('ko-KR')}원 교환`,
        });

        // 2) (선택) 바우처 코드 생성/수신
        const code = generateCode(amount);
        const barcodeUrl = ''; // 서버가 주면 대체

        // 3) 모달 전환
        setVoucher({ code, barcodeUrl, amount });
        setRedeemOpen(false);
        setVoucherOpen(true);

        // 4) 부모에게 알림 → PointHistory 새로고침 트리거
        onRedeemed?.();
    } catch (e) {
        alert(e?.message || '교환에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
        setRedeeming(false);
    }
    }, [balance, onRedeemed, redeeming]);

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

                <RedeemButton
                    $active={can5000}
                    disabled={!can5000}
                    onClick={() => can5000 && handleRedeem(5000)}
                    title={can5000 ? '' : '5,000 포인트 이상 필요'}
                >
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

                <RedeemButton
                    $active={can10000}
                    disabled={!can10000}
                    onClick={() => can10000 && handleRedeem(10000)}
                    title={can10000 ? '' : '10,000 포인트 이상 필요'}
                >
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

                <RedeemButton
                    $active={can30000}
                    disabled={!can30000}
                    onClick={() => can30000 && handleRedeem(30000)}
                    title={can30000 ? '' : '30,000 포인트 이상 필요'}
                >
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

    background: ${({ $active }) => ($active ? '#FF6900' : 'var(--pri, #E5E7EB)')};
    color: ${({ $active }) => ($active ? '#FFFFFF' : 'var(--zinc-700, #8D8D8D)')};
    
    text-align: center;
    /* body/body 2 */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;

    cursor: ${({ $active }) => ($active ? 'pointer' : 'default')};

    /* 선택사항: hover 효과 (활성일 때만) */
    ${({ $active }) =>
        $active &&
        `
        &:hover { filter: brightness(0.98); }
        &:active { transform: scale(0.98); }
    `}
`