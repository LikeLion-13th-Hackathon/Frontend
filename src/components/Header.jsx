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
  width: 420px;
  background: #ffffff;
  backdrop-filter: blur(6px);
  border-bottom: 1px solid #eee;
`;

const HeaderInner = styled.div`
  height: 56px;
  display: grid;
  grid-template-columns: 56px 1fr 56px;
  align-items: center;
  padding: 0 8px;
`;