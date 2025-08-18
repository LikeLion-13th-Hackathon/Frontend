// src/pages/OnboardingEnd.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommonButton from "../../../components/common/CommonButton";

export default function OnboardingEnd() {
  const nav = useNavigate();
  const { state } = useLocation();
  // 이전 단계에서 받은 값들 (username, fullName 등)
  const username = state?.username || "guest";

  const onStart = () => {
    // 메인으로 이동
    nav("/", { replace: true });
  };

  return (
    <Wrap>
      <Header>logo</Header>

      <Hero>
        <LogoBadge />
        <Brand>logo</Brand>
      </Hero>

      <Content>
        <WelcomeRow>
          <WelcomeTitle>Welcome!</WelcomeTitle>
          <UserName>{username}</UserName>
        </WelcomeRow>
        <Sub>Explore traditional markets with logo</Sub>
      </Content>

      <CTA>
        <CommonButton onClick={onStart}>Get Started</CommonButton>
      </CTA>
    </Wrap>
  );
}

/* ---------------- styled-components ---------------- */

const Wrap = styled.div`
  min-height: 100vh;
  background: #fff;
  display: grid;
  grid-template-rows: 56px auto 1fr auto;
  gap: 12px;
  padding: 0 16px 24px;
  font-family: Pretendard, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
`;

const Header = styled.header`
  display: grid;
  place-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #000;
`;

const Hero = styled.section`
  display: grid;
  justify-items: center;
  gap: 12px;
  margin-top: 8px;
`;

const LogoBadge = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 12px;
  background: #d9d9d9;
`;

const Brand = styled.div`
  font-size: 28px;
  line-height: 36px;
  color: #111;
`;

const Content = styled.section`
  margin-top: 8px;
`;

const WelcomeRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

const WelcomeTitle = styled.h1`
  margin: 0;
  font-size: 22px;
  line-height: 28px;
  font-weight: 800;
  color: #111;
`;

const UserName = styled.span`
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  color: #111;
`;

const Sub = styled.p`
  margin: 6px 0 0 0;
  font-size: 14px;
  line-height: 20px;
  color: #444;
`;

const CTA = styled.div`
  margin-top: 24px;
`;
