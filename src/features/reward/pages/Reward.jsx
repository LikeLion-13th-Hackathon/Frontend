import React from 'react'
import Layout from "@/components/common/Layout";
import TabBar from '../../../components/common/TabBar';
import styled from 'styled-components';
import LeftHeader from '../../../components/common/header/LeftHeader';
import ReviewProfile from '../../mypage/components/ReviewProfile';
import SearchImg from '@/assets/icons/search.png';
import BackImg from "@/assets/icons/header_back.png";
import Divider from '@/components/common/Divider';
import InfoImg from '@/assets/icons/info.png';
import UploadImg from "@/assets/icons/upload.png";

import { loadUser } from '../../../shared/api/auth';
import defaultAvatar from '@/assets/icons/basic_profile.png';
import RedeemCard from '../components/RedeemCard';
import PointHistory from '../components/PointHistory';

const Reward = () => {
    // 로그인 시 저장된 유저 불러오기
    const user = loadUser();

    const rewards = user?.reward_count ?? 0;
    const placesLabel = `${rewards} ${rewards === 1 ? 'point' : 'points'}`;

    // 프로필 표시값 매핑
    const raw = (user?.profile_image && String(user.profile_image).trim()) || '';
    const avatarUrl = /^https?:\/\//i.test(raw) ? raw : defaultAvatar;
    
    const name = (user?.nickname && user.nickname.trim()) || user?.username || 'User';
    const sub =
        user?.subtitle || user?.nationality || user?.email || '';

  return (
    <Layout overlapHeader>
        <Background>
            <LeftHeader
                title="My Reviews"
                leftIcon={BackImg}
                rightIcon={SearchImg}
                overlay
                onLeftClick={() => window.history.back()}
                onRightClick={() => console.log("검색 클릭")}
            />

            <ReviewProfile
                avatarUrl={avatarUrl}
                name={name}
                sub={sub}
            />

            <Card>
                <CardText>
                    <CardTitle>Rewards</CardTitle>
                    <CardDivider aria-hidden>|</CardDivider>
                    <CardMeta>{placesLabel}</CardMeta>
                </CardText>
            </Card>
        </Background>

        <HeroOverlapSpacer height={30} />

        <FlexRow>
            <TextBox>
                <Title>Quick Review Submission</Title>
                <Description>Snap your receipt (OCR) to write a review and earn rewards in one go.</Description>
            </TextBox>

            <UploadBlock>
                <UploadIcon src={UploadImg} alt="upload" />
            </UploadBlock>
        </FlexRow>
        
        <Divider />

        <InfoRow>
            <Title>Redeem for Gift Card</Title>
            <InfoIcon src={InfoImg} alt="info" />
        </InfoRow>
        
        <InfoDescription>
            Exchange your reward for 온누리상품권 (Onnuri gift certificates),
            usable at markets in Dongjak-gu.
        </InfoDescription>
        
        <RedeemCard />

        <PointHistory />

        <TabBar/>
    </Layout>
  )
}

export default Reward

const Background = styled.div`
    position: relative;
    width: 100%;
    height: 175px;
    flex-shrink: 0;
    background: #DDD;
`

const Card = styled.div`
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, -50%);
    z-index: 5;

    display: flex;
    width: 335px;
    padding: 16px 0;
    justify-content: center;
    align-items: center;

    border-radius: 12px;
    background: #ECECEC;
`

const CardTitle = styled.div`
    width: 160px;

    color: #000;
    text-align: center;

    /* body/body 1 */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
`;

const HeroOverlapSpacer = styled.div`
    height: ${(p) => p.height || 84}px;
`;


const CardDivider= styled.span`
    color: #000;
    text-align: center;

    /* body/body 1 */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
`;

const CardText = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;                  /* " | "와 간격 */
`;

const CardMeta = styled.span`
    width: 159px;
    flex-shrink: 0;

    color: #000;
    text-align: center;

    /* body/body 1-em */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
`;

const Title = styled.div`
    color: #000;

    /* head/head 3-em */
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 125%; /* 22.5px */
    letter-spacing: -0.36px;
`

const Description = styled.div`
    color: #858585;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`

const TextBox = styled.div`
    display: flex;
    width: 215px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
`

const UploadBlock = styled.div`
    display: flex;
    width: 72px;
    height: 63px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    border-radius: 8px;
    background: var(--pri, #6D6D6D);
`

const FlexRow = styled.div`
    display: flex;
    justify-content: space-between;  /* 좌-우 끝에 배치 */
    align-items: center;
    padding: 0 20px;
    margin: 20px 0; /* 위아래/좌측 20px */
`;

const InfoRow = styled.div`
    display: flex;
    width: 335px;
    justify-content: space-between;
    align-items: flex-start;
    margin: 20px 20px 5px;
`

const InfoIcon = styled.img`
  width: 20px;   /* 필요 시 조정 */
  height: 20px;  /* 필요 시 조정 */
  flex-shrink: 0;
`;

const InfoDescription = styled.p`
  padding: 0 20px;     /* 이 줄만 좌우 20px */
  margin: 0 0 20px;    /* 아래 간격만 */
  color: #858585;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.24px;
`;

const UploadIcon = styled.img`
  width: 24px;   /* 원하는 크기 */
  height: 24px;
  object-fit: contain;
`;
