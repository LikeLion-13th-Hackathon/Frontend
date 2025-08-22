// src/pages/OnboardingEnd.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommonButton from "../../../components/common/CommonButton";
import Layout from "@/components/common/Layout";
import CenterHeader from "../../../components/common/header/CenterHeader";
import defaultAvatar from '@/assets/icons/basic_profile.png';

import { loadUser } from '@/shared/api/auth';

export default function OnboardingEnd() {
  const nav = useNavigate();
  const { state } = useLocation();

  const u = loadUser();
  const username = state?.username || u?.username || "guest";
  const avatar = state?.profile_image || u?.profile_image || defaultAvatar;

  const onStart = () => {
    // 메인으로 이동
    nav("/", { replace: true });
  };

  return (
    <Layout>
      <CenterHeader title = "logo" />

      <Hero>
      <Avatar
        src={avatar}
        alt="profile"
        onError={(e) => {
          e.currentTarget.src = defaultAvatar;
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
