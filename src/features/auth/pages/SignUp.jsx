// src/pages/SignUp.jsx
import React, { useState } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommonButton from "../../../components/common/CommonButton";
import Layout from "../../../components/common/Layout";

import EmailImg from '@/assets/icons/login/email.png'
import PwImg from '@/assets/icons/login/password.png'
import EyeImg from '@/assets/icons/login/eyes.png'
import EyeCloseImg from '@/assets/icons/login/eye_close.png'

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [touched, setTouched] = useState({ email: false, pw: false });
  const [emailInUse, setEmailInUse] = useState(false); // 데모용

  // 간단 이메일 검증
  const isValidEmail = (v) => /^\S+@\S+\.\S+$/.test(v);
  // 비밀번호 규칙(필요시 변경)
  const pwOk = pw.length >= 6;

  // 데모용 중복 이메일 체크 (실서비스에선 API 교체)
  const checkEmail = (v) => {
    if (!isValidEmail(v)) return setEmailInUse(false);
    setEmailInUse(v.toLowerCase() === "likelion13@cau.ac.kr");
  };

  const disabled = !isValidEmail(email) || !pwOk || emailInUse;

  const onSubmit = (e) => {
    e.preventDefault();
    if (disabled) return;
    navigate("/signup/profile", { state: { email, pw } });
  };

  return (
    <Layout>
      <Card>
        <Title>Welcome!</Title>
        <Sub>Let’s set up your profile.</Sub>

        <Form onSubmit={onSubmit} noValidate>
          {/* 이메일 */}
          <Label htmlFor="email">Email address</Label>
          <Field
            className={
              touched.email && (!isValidEmail(email) || emailInUse) ? "error" : ""
            }
          >
            <IconLeft>
              <img src={EmailImg} alt="이메일 아이콘" />
            </IconLeft>
            <input
              id="email"
              type="email"
              placeholder="likelion13@cau.ac.kr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {
                setTouched((t) => ({ ...t, email: true }));
                checkEmail(email);
              }}
              autoComplete="email"
              aria-invalid={touched.email && (!isValidEmail(email) || emailInUse)}
            />
          </Field>
          {touched.email && !isValidEmail(email) && (
            <Help>올바른 이메일 형식을 입력해 주세요.</Help>
          )}
          {touched.email && isValidEmail(email) && emailInUse && (
            <Help>이미 사용 중인 이메일입니다.</Help>
          )}

          {/* 비밀번호 */}
          <Label htmlFor="password">Password</Label>
          <Field className={touched.pw && !pwOk ? "error" : ""}>
            <IconLeft>
              <img src={PwImg} alt="비밀번호 아이콘" />
            </IconLeft>
            <input
              id="password"
              type={showPw ? "text" : "password"}
              placeholder="· · · · · ·"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, pw: true }))}
              autoComplete="new-password"
            />
            <IconRightBtn
              type="button"
              onClick={() => setShowPw((s) => !s)}
              aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
            >
              <img src={showPw ? EyeCloseImg : EyeImg} alt="" />
            </IconRightBtn>
          </Field>
          {touched.pw && !pwOk && <Help>비밀번호는 6자 이상 입력해 주세요.</Help>}

          <SignButton type="submit" disabled={disabled}>
            Next
          </SignButton>

        </Form>
      </Card>
    </Layout>
  );
}

/* ---------------------- styled-components ---------------------- */

const Wrap = styled.div`
  min-height: 100vh;
  background: #fff;
  display: grid;
  grid-template-rows: 56px 1fr;
  justify-items: center;
  padding: 0 16px 24px;
  font-family: Pretendard, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
`;

const Card = styled.main`
  position: relative; /* 장식 원(DecorCircle)의 기준 컨테이너 */
  width: 100%;
  max-width: 375px;
  margin-top: 68px;
  padding: 24px;
  /* border-radius: 16px; */
  /* border: 1px solid #eee; */
  /* box-shadow: 0 8px 28px rgba(0, 0, 0, 0.06); */
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 22px;
  line-height: 28px;
  font-weight: 700;
  color: #111;
`;

const Sub = styled.p`
  margin: 4px 0 0 0;
  color: #555;
  font-size: 13px;
  line-height: 18px;
`;

const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  font-size: 14px;
  line-height: 20px;
  color: #222;
`;

const Field = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 40px 0 36px; /* 아이콘 공간 */
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;

  &.error {
    border-color: #ff6b6b;
    background: #fff5f5;
  }

  input {
    width: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    font-size: 14px;
    line-height: 20px;
    color: #111;
  }
`;

const IconLeft = styled.span`
  position: absolute;
  left: 12px;
  display: flex;
  align-items: center;

  img {
    width: 14px;
    height: 14px;
    display: block;
    object-fit: contain;
  }
`;

const IconRightBtn = styled.button`
  position: absolute;
  right: 10px;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  color: #818181;
  cursor: pointer;

  img {
    display: block;
    width: 24px;
    height: 24px;
  }
`;

const Help = styled.p`
  margin: -4px 0 0 0;
  font-size: 12px;
  line-height: 16px;
  color: #d33;
`;

const SignButton = styled(CommonButton)`
  background-color: ${({ disabled }) =>
    disabled ? '#E5E7EB' : '#FF6900'};
  color: ${({ disabled }) =>
    disabled ? '#888' : '#fff'};
`;