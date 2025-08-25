// src/pages/SignUp.jsx
import React, { useState, useEffect } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommonButton from "../../../components/common/CommonButton";
import Layout from "../../../components/common/Layout";

import EmailImg from '@/assets/icons/login/email.png'
import PwImg from '@/assets/icons/login/password.png'
import EyeImg from '@/assets/icons/login/eyes.png'
import EyeCloseImg from '@/assets/icons/login/eye_close.png'

import { checkEmailDup } from "@/shared/api/auth";

export default function SignUp() {
  const navigate = useNavigate();

  //이메일 중복 체크
  const [email, setEmail] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [touched, setTouched] = useState({ email: false, pw: false });
  const [emailInUse, setEmailInUse] = useState(false); // 데모용

  // 간단 이메일 검증
  const isValidEmail = (v) => /^\S+@\S+\.\S+$/.test(v);
  // 비밀번호 규칙(필요시 변경)
  const pwOk = pw.length >= 6;

  const checkEmail = async (v) => {
    if (!isValidEmail(v)) { setEmailInUse(false); return; }
    try {
      setIsChecking(true);
      const res = await checkEmailDup(v.trim());
      const inUse =
        res?.hasOwnProperty("available") ? !res.available :
        res?.hasOwnProperty("exists")    ? !!res.exists   :
        false;
        setEmailInUse(inUse);
      } catch (e){
        // 실패 시 과도한 차단을 피하려면 false, 보수적으로 막으려면 true
        console.error('[checkEmail] error:', e);
        setEmailInUse(false);
        } finally {
          setIsChecking(false);
        }
  };

  const disabled = isChecking || !isValidEmail(email) || !pwOk || emailInUse;

  const onSubmit = (e) => {
    e.preventDefault();
    if (disabled) return;
    navigate("/signup/profile", { state: { email, pw } });
  };

  // 이메일이 바뀌면 300ms 뒤 자동으로 중복 체크 (형식이 유효할 때만)
  useEffect(() => {
    if (!email || !isValidEmail(email)) { 
      setEmailInUse(false);
      return;
    }
    const id = setTimeout(() => { checkEmail(email); }, 300);
    return () => clearTimeout(id);
  }, [email]); 

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
              emailInUse || (touched.email && !isValidEmail(email)) ? "error" : ""
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
              }}
              autoComplete="email"
              aria-invalid={touched.email && (!isValidEmail(email) || emailInUse)}
            />
          </Field>
          {touched.email && !isValidEmail(email) && (
            <Help>Please enter a valid email address.</Help>
          )}
          {isValidEmail(email) && isChecking && (
            <Help>Checking email…</Help>
          )}
          {isValidEmail(email) && emailInUse && (
            <Help>This email is already in use.</Help>
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
          {touched.pw && !pwOk && <Help>Password must be at least 6 characters.</Help>}

          {/* <SignButton type="submit" disabled={disabled}>
            Next
          </SignButton> */}
          <Actions>
            <BackButton type="button" onClick={() => navigate(-1)}>
              Back
            </BackButton>
            <NextButton type="submit" disabled={disabled}>
              Next
            </NextButton>
          </Actions>

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

const Actions = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
`;

const BackButton = styled(CommonButton)`
  background-color: #fff;
  border: 1px solid var(--gray-200, #E5E7EB);
  color: #111;
`;

const NextButton = styled(CommonButton)`
  background-color: ${({ disabled }) =>
    disabled ? '#E5E7EB' : '#FF6900'};
  color: ${({ disabled }) =>
    disabled ? '#888' : '#fff'};
`;
