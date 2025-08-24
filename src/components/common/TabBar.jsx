import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import HomeSelected from '@/assets/icons/tabbar/home.png';
import Home from '@/assets/icons/tabbar/home_gray.png';
import SearchSelected from '@/assets/icons/tabbar/search.png';
import Search from '@/assets/icons/tabbar/search_gray.png';
import RewardSelected from '@/assets/icons/tabbar/reward.png';
import Reward from '@/assets/icons/tabbar/reward_gray.png';
import MypageSelected from '@/assets/icons/tabbar/mypage.png';
import Mypage from '@/assets/icons/tabbar/mypage_gray.png';

const TABS = [
  { key: 'home',    label: 'Home',    path: '/home',           icon: Home,    iconActive: HomeSelected },
  { key: 'search',  label: 'Search',  path: '/search',     icon: Search,  iconActive: SearchSelected },
  { key: 'reward',  label: 'Reward',  path: '/reward',     icon: Reward,  iconActive: RewardSelected },
  { key: 'mypage',  label: 'Mypage',  path: '/mypage',     icon: Mypage,  iconActive: MypageSelected },
];

const TabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (tabPath) => {
    // 필요에 따라 startsWith로 섬세하게
    if (tabPath === '/') return location.pathname === '/';
    return location.pathname.startsWith(tabPath);
  };

  return (
    <TabBarContainer>
      {TABS.map((tab) => {
        const active = isActive(tab.path);
        const src = active ? tab.iconActive : tab.icon;

        return (
          <TabItem
            key={tab.key}
            $active={active}
            role="button"
            tabIndex={0}
            onClick={() => navigate(tab.path)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') navigate(tab.path);
            }}
            aria-current={active ? 'page' : undefined}
          >
            <TabIcon src={src} alt={tab.label} $active={active} />
            <TabLabel $active={active}>{tab.label}</TabLabel>
          </TabItem>
        );
      })}
    </TabBarContainer>
  );
};

export default TabBar;

/* styles */
const TabBarContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 375px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 56px;
  padding: 6px 20px calc(6px + env(safe-area-inset-bottom));
  background: #fff;
  border-top: 1px solid #eee;
  z-index: 100;

  /* iOS safe area 대응 */
  padding-bottom: calc(6px + env(safe-area-inset-bottom));
`;

const TabItem = styled.div`
  width: 67px;          /* 필요시 auto로 바꿔도 됨 */
  height: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  cursor: pointer;
  user-select: none;
  outline: none;
`;

const TabIcon = styled.img`
  width: 24px;
  height: 24px;
  /* display: block;
  ${(p) => (!p.$active ? 'opacity: 0.9;' : '')} */
`;

const TabLabel = styled.span`
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.2px;
  color: ${(p) => (p.$active ? '#FF6900' : '#6D6D6D')};
`;
