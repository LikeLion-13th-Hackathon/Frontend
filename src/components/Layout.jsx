import React, { useRef } from 'react'
import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components';

const Layout = ({children}) => {
    const contentRef = useRef(null);

  return (
    <>
      <Header />
      <Outer>
        <Inner>
          <AppContent ref={contentRef}>{children}</AppContent>
        </Inner>
      </Outer>
      <Footer />
      
      {/* <Header />
      <div className="outer">
        <div className="inner">
          <main className="app-content" ref={contentRef}>
                {/* <section className="section">
                <h1>테스트데스트</h1>
                {[...Array(200)].map((_, i) => (
                    <p key={i}>테스트테스트 {i + 1}</p>
                ))}
                </section>
            </main>
        </div>
      </div>
      <Footer /> */}
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
  width: 420px; 
  background: #fff;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);

  min-height: 100dvh;  /* 브라우저 지원 시 */
`;

const AppContent = styled.main`
  padding: calc(var(--header-h) + 8px) 16px 16px;
`;