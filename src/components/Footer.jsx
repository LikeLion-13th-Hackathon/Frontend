import styled from 'styled-components';

export default function Footer() {
  return (
    <FooterContainer>
      <span>community</span>
      <span>community</span>
      <span>community</span>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 420px;
  height: 48px;
  padding: 5px 0;
  background-color: white;
  border-top: 1px solid #ddd;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

`;
