import React from 'react'
import Layout from '@/components/common/Layout';
import LeftHeader from '@/components/common/header/LeftHeader';
import SearchImg from '@/assets/icons/search.png';
import styled from 'styled-components';
import Profile from '../components/Profile';
import ProfileStatsRow from '../components/ProfileStatsRow';
import TabBar from '../../../components/common/TabBar';
import DetailButton from '../components/DetailButton';
import { clearAuth, loadUser } from '@/shared/api/auth';

import defaultAvatar from '@/assets/icons/basic_profile.png';

function mapUserToProfile(results = {}) {
  return {
    avatarUrl: (results.profile_image && String(results.profile_image).trim()) || defaultAvatar,
    name: (results.nickname && results.nickname.trim()) || results.username || "User",
    subtitle: results.subtitle || results.email || "", //미정
  };
}

const Mypage = () => {
    //로그인시 저장된 유저 불러오기
    const user = loadUser();
    const profileProps = mapUserToProfile(user || {});
    const rewards = user?.reward_count ?? 0;
    const visited = user?.visited_count ?? 0;

  return (
    <Layout overlapHeader>
        <Background>
            <LeftHeader
                title="Mypage"
                rightIcon={SearchImg}
                overlay
                onLeftClick={() => window.history.back()}
                onRightClick={() => console.log("검색 클릭")}
            />

        <Profile
            avatarUrl={profileProps.avatarUrl}
            name={profileProps.name}
            subtitle={profileProps.subtitle} 
        />

        <ProfileStatsRow
            rewards={rewards}
            visited={visited}
        />
        </Background>

        <HeroOverlapSpacer height={80} />

        {/* 리뷰/리워드로 넘어가는 페이지 버튼 */}
        <ButtonBox>
            <DetailButton
                title="My Reviews"
                to="/mypage/reviews"
            />
            <DetailButton
                title="Rewards"
                description="Redeem your rewards for a market gift card"
                to="/mypage/rewards"
            />
        </ButtonBox>

        <Logout onClick={() => { clearAuth(); window.location.href = '/login'; }}>
            logout
        </Logout>

        <TabBar />
    </Layout>
  )
}

export default Mypage

const Background = styled.div`
    position: relative;
    width: 100%;
    height: 333px;
    flex-shrink: 0;
    background: #DDD;

    /* 프로필 중앙 정렬 */
    display: flex;
    align-items: center;  /* 수직 가운데 */
    justify-content: center; /* 수평 가운데 */
`

const HeroOverlapSpacer = styled.div`
  height: ${(p) => p.height || 96}px;
`;

const ButtonBox = styled.div`
    margin: auto 0;
    display: flex;
    flex-direction: column;
    gap: 20px;            
    width: 100%;
`

const Logout = styled.button`
  position: absolute;
  top: 682px;          
  left: 50%;
  transform: translateX(-50%); /* 가로 가운데 정렬 */
  background: transparent;
  border: 0;
  cursor: pointer;

  color: #858585;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.24px;

  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;
