import React, { useRef } from 'react'
import styled from 'styled-components';
import TabBar from './TabBar';

const Layout = ({ children, overlapHeader = false, bottomPadding = 0 }) => {

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
`;

const Inner = styled.div`
  margin: 0 auto;
  width: 375px; 
  background: #fff;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);

  /* height: 100dvb; */
  min-height: 100dvb;   /* 화면 높이 이상 */
  display: flex;
  flex-direction: column;
`;

const AppContent = styled.main`
  flex: 1;               
  min-height: 0;
  overflow-x: hidden;
  
  padding-bottom: ${({ $bottomPadding = 0 }) =>
    `calc(${$bottomPadding}px + env(safe-area-inset-bottom, 0px))`};
`;