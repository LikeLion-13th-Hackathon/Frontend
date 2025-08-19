import React, { useRef } from 'react'
import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components';
import TabBar from './TabBar';

const Layout = ({ children, overlapHeader = false }) => {

  return (
    <>
      {/* <Header /> */}
      <Outer>
        <Inner>
          <AppContent $overlap={overlapHeader}>{children}</AppContent>
        </Inner>
      </Outer>
      <TabBar />
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

  min-height: 100dvh;  /* 브라우저 지원 시 */
  overflow: hidden;
`;

const AppContent = styled.main`
  padding-top: ${p => (p.$overlap ? '0' : 'calc(var(--header-h) + 8px)')};
  padding-bottom: 64px;      /* 탭바에 안 가리게 */
  overflow-x: hidden;
`;