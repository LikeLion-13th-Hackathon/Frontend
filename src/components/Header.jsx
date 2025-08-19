import React from 'react'
import styled from 'styled-components';

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderInner>
        헤더
      </HeaderInner>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 375px;
  background: transparent;
  backdrop-filter: blur(6px);
  border-bottom: 1px solid #eee;
`;

const HeaderInner = styled.div`
  display: flex;
  width: 375px;
  height: 56px;
  padding: 0 20px;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
`;