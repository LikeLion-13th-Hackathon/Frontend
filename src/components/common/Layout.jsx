import React, { useRef } from 'react'
import styled from 'styled-components';

const TABBAR_H = 56; // 실제 탭바 높이

const Layout = ({ children, overlapHeader = false, bottomPadding = TABBAR_H }) => {

  return (
    <>
      {/* <Header /> */}
      <Outer>
        <Inner>
          <AppContent $overlap={overlapHeader} $bottomPadding={bottomPadding}>
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
  
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  @supports (height: 100dvh) {
    min-height: 100dvh;    /* 주소창 변동 대응 */
  }
  @supports (height: 100svh) {
    min-height: 100svh;    /* 가장 안정적인 신형 단위 */
  }
`;

const Inner = styled.div`
  margin: 0 auto;
  width: 375px; 
  background: #fff;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);

  flex: 1;
  display: flex;
  flex-direction: column;
`;

const AppContent = styled.main`
  flex: 1;               
  min-height: 0;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  
  padding-bottom: ${({ $bottomPadding = 0 }) =>
    `calc(${$bottomPadding}px + env(safe-area-inset-bottom, 0px))`};
`;