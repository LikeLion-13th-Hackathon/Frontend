import React, { useRef } from 'react'
import styled from 'styled-components';
import TabBar from './TabBar';

const Layout = ({ children, overlapHeader = false }) => {

  return (
    <>
      {/* <Header /> */}
      <Outer>
        <Inner>
          <AppContent $overlap={overlapHeader}>
            {children}
          </AppContent>
        </Inner>
      </Outer>
      {/* <TabBar /> */}
    </>
  )
}

export default Layout

const Outer = styled.div`
  width: 100%;
  background: #0b1016;
`;

const Inner = styled.div`
  margin: 0 auto;
  width: 375px; 
  background: #fff;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);

  min-height: 100dvh;   /* 화면 높이 이상 */
  display: flex;
  flex-direction: column;
`;

const AppContent = styled.main`
  flex: 1;               /* ✅ 내부 콘텐츠가 늘어나면 자동 확장 */
  overflow-x: hidden;
  overflow-y: auto;       /* ✅ 세로 스크롤 허용 */
  padding-bottom: 0;
`;