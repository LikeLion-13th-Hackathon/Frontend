// src/pages/OnboardingEnd.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommonButton from "../../../components/common/CommonButton";
import Layout from "@/components/common/Layout";
import CenterHeader from "../../../components/common/header/CenterHeader";

export default function OnboardingEnd() {
  const nav = useNavigate();
  const { state } = useLocation();

  console.log("[OnboardingEnd state]", state);

  // 이전 단계에서 받은 값들 (username, profile_image 등)
  const username = state?.username || "guest";
  const avatar =
      state?.profile_image ||
      localStorage.getItem('profile_image') ||
      "https://via.placeholder.com/120.png?text=Avatar";

   console.log('[OnboardingEnd] username:', username, 'avatar:', avatar);

  const onStart = () => {
    // 메인으로 이동
    nav("/", { replace: true });
  };

  return (
    <Layout>
      <CenterHeader title = "logo" />
      <Page>
        <DecorCircle />
        <Hero>
        <Avatar
          src={avatar}
          alt="profile"
          onError={(e) => {
            // via.placeholder.com이 막히거나 깨질 때 대체
            e.currentTarget.src = "https://placehold.co/120x120?text=Avatar";
          }}
        />

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
      </Page>
    </Layout>
  );
}

/* ---------------- styled-components ---------------- */

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
  margin-top: 56px;
`;

const LogoBadge = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 12px;
  background: #d9d9d9;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
`;

const Brand = styled.div`
  font-size: 28px;
  line-height: 36px;
  color: #111;
`;

const Content = styled.section`
  margin: 47px 20px 157px;
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
  margin: 24px 20px;
`;

// 페이지 내부 기준 컨테이너 (mobile canvas width)
const Page = styled.div`
  position: relative;      /* 👈 DecorCircle의 기준 */
  width: 100%;
  max-width: 375px;        /* 화면 캔버스 폭 */
  margin: 0 auto;          /* 가운데 정렬 */
  padding: 0 16px;         /* 좌우 여백 (필요시 조정) */
`;

// 우상단 장식 원 (decorative circle)
const DecorCircle = styled.div`
  position: absolute;
  top: -138px;    /* 화면 밖으로 살짝 */
  right: -20px;  /* 화면 밖으로 살짝 */
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: #D9D9D9;   /* 회색(Gray) */
  pointer-events: none;   /* 클릭 방해 X */
  /* z-index 지정 안 해도 DOM 순서상 아래에 깔림(Decor가 먼저 그려지고, 뒤 요소들이 위에 옴) */
`;
