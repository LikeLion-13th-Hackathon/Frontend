import React from 'react'
import Layout from "@/components/common/Layout";
import TabBar from '../../../components/common/TabBar';
import styled from 'styled-components';
import LeftHeader from '../../../components/common/header/LeftHeader';
import ReviewProfile from '../../mypage/components/ReviewProfile';
import SearchImg from '@/assets/icons/search.png';
import BackImg from "@/assets/icons/header_back.png";
import { loadUser } from '../../../shared/api/auth';
import defaultAvatar from '@/assets/icons/basic_profile.png';

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
    <Layout>
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
                    <Divider aria-hidden>|</Divider>
                    <CardMeta>{placesLabel}</CardMeta>
                </CardText>
            </Card>
        </Background>

        <HeroOverlapSpacer height={40} />
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


const Divider = styled.span`
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
