// Login.jsx
import React, { useState } from 'react';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import CommonButton from '../../../components/common/CommonButton';
import Layout from '../../../components/common/Layout';
import CenterHeader from '../../../components/common/header/CenterHeader';

import { loginRequest, saveAuth, loadUser } from '@/shared/api/auth';
import defaultAvatar from '@/assets/icons/basic_profile.png';

function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [touched, setTouched] = useState({ email: false, pw: false });

  // 추가: 로딩/에러 상태
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const isValidEmail = (v) => /^\S+@\S+\.\S+$/.test(v);
  const disabled = !email || !pw || !isValidEmail(email) || loading;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;

    try {
      setLoading(true);
      setErrMsg('');

      const data = await loginRequest({ email, password: pw });
      await saveAuth(data);

      const current = loadUser();
      const profileImage = current?.profile_image || defaultAvatar;

      // 성공 이동
      nav('/onboarding-end', {
        state: {
              username: current?.username || data.user?.username || 'guest',
              profile_image: profileImage,
            },
        replace: true,
      });
    } catch (err) {
      setErrMsg(err.message || '로그인에 실패했어요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <GlobalStyle />
      <Wrap>
        {/* <Header>logo</Header> */}
        <CenterHeader title = "logo" />

        <Card>
          <LogoBox />
          <LogoText>logo</LogoText>

          <Form onSubmit={onSubmit} noValidate>
            <Label htmlFor="email">Email address</Label>
            <Field className={touched.email && !isValidEmail(email) ? 'error' : ''}>
              <IconLeft><FiUser aria-hidden /></IconLeft>
              <input
                id="email"
                type="email"
                placeholder="likelion13@cau.ac.kr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                autoComplete="email"
                aria-invalid={touched.email && !isValidEmail(email)}
              />
            </Field>
            {touched.email && !isValidEmail(email) && (
              <Help role="alert">올바른 이메일 형식을 입력해 주세요.</Help>
            )}

            <Label htmlFor="password">Password</Label>
            <Field className={touched.pw && pw.length === 0 ? 'error' : ''}>
              <IconLeft><FiLock aria-hidden /></IconLeft>
              <input
                id="password"
                type={showPw ? 'text' : 'password'}
                placeholder="· · · · · ·"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, pw: true }))}
                autoComplete="current-password"
              />
              <IconRightBtn
                type="button"
                onClick={() => setShowPw((s) => !s)}
                aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
              >
                {showPw ? <FiEyeOff /> : <FiEye />}
              </IconRightBtn>
            </Field>

            {/* 에러 메시지 */}
            {errMsg && <Help role="alert">{errMsg}</Help>}

            {/* 공통 버튼 */}
            <CommonButton type="submit" disabled={disabled}>
              {loading ? 'Logging in…' : 'Login'}
            </CommonButton>
          </Form>

          <Signup>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </Signup>
        </Card>
      </Wrap>
    </Layout>
  );
}

export default Login;


/* ---------------------- styled-components ---------------------- */
const GlobalStyle = createGlobalStyle`
  :root {
    --bg-muted: #EAEAEA;
    --stroke:   #D9D9D9;
    --icon:     #818181;
    --text:     #000000;
  }
  * { box-sizing: border-box; }
  body { margin:0; font-family: Pretendard, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
`;

const Wrap = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  background: #fff;
  width: 100%;
  max-width: 375px;
  /* margin: 0 auto; */
  /* padding: 0 16px 24px; */
`;

const Header = styled.header`
  height: 56px;
  display: grid;
  place-items: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
`;

const Card = styled.main`
  width: 100%;
  margin: 8px auto 0;
  padding: 20px;
  /* border-radius: 16px; */
  /* border: 1px solid #eee; */
  /* box-shadow: 0 6px 24px rgba(0,0,0,.06); */
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media (min-width: 768px){
    padding: 24px;
  }
`;

const LogoBox = styled.div`
  width: 138px; height: 133px;
  margin: 8px auto 0;
  background: #D9D9D9;
  border-radius: 12px;
`;

const LogoText = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 32px;
  line-height: 40px;
  color: var(--text);
`;

const Form = styled.form`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Label = styled.label`
  font-size: 16px;
  color: var(--text);
  line-height: 24px;
`;

const Field = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--bg-muted);
  border-radius: 8px;
  border: 1px solid var(--stroke);
  padding: 10px 16px;

  &.error{
    border-color: #ff6b6b;
    background: #fff5f5;
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    color: var(--text);
    line-height: 24px;
    padding: 4px 36px 4px 36px;
  }
`;

const IconLeft = styled.div`
  position: absolute;
  left: 12px;
  font-size: 18px;
  color: var(--icon);
`;

const IconRightBtn = styled.button`
  position: absolute;
  right: 10px;
  width: 28px; height: 28px;
  display: grid; place-items: center;
  background: transparent;
  border: none;
  color: var(--icon);
  cursor: pointer;
`;

const Help = styled.p`
  margin-top: -6px;
  font-size: 12px;
  color: #d33;
`;

const Signup = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: var(--text);

  a {
    color: var(--text);
    text-decoration: underline;
  }
`;


