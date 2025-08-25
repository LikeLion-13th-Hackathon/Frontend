// Login.jsx
import React, { useState } from 'react';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import CommonButton from '../../../components/common/CommonButton';
import Layout from '../../../components/common/Layout';

import { loginRequest, saveAuth, loadUser } from '@/shared/api/auth';
import defaultAvatar from '@/assets/icons/basic_profile.png';

//메인로고
import LogoImg from '@/assets/icons/login_logo.png'
import EmailImg from '@/assets/icons/login/email.png'
import PwImg from '@/assets/icons/login/password.png'
import EyeImg from '@/assets/icons/login/eyes.png'
import EyeCloseImg from '@/assets/icons/login/eye_close.png'

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
      if (err.response?.status === 400) {
        // 없는 계정
        setErrMsg('Account does not exist.');
      } else if (err.response?.status === 401) {
        // 비밀번호 불일치
        setErrMsg('Incorrect password.');
      } else {
        setErrMsg('Login failed. Please try again.');
      }
    }
  };

  return (
    <Layout>
      <GlobalStyle />
      <Wrap>
        {/* <Header>logo</Header> */}
        {/* <CenterHeader title = "logo" /> */}

        <Card>
          <LogoBox src={LogoImg}/>
          {/* <LogoText>logo</LogoText> */}

          <Form onSubmit={onSubmit} noValidate>
            <Label htmlFor="email">Email address</Label>
            <Field className={touched.email && !isValidEmail(email) ? 'error' : ''}>
              <IconLeft>
                <img src={EmailImg} alt="이메일 아이콘"/>
              </IconLeft>
              <input
                id="email"
                type="email"
                placeholder="likelion13@cau.ac.kr"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (errMsg) setErrMsg(''); if (loading) setLoading(false);}}
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
              <IconLeft>
                <img src={PwImg} alt="비밀번호 아이콘" />
              </IconLeft>
              <input
                id="password"
                type={showPw ? 'text' : 'password'}
                placeholder="· · · · · ·"
                value={pw}
                onChange={(e) => { setPw(e.target.value); if (errMsg) setErrMsg(''); if (loading) setLoading(false);} }
                onBlur={() => setTouched((t) => ({ ...t, pw: true }))}
                autoComplete="current-password"
              />
              <IconRightBtn
                type="button"
                onClick={() => setShowPw((s) => !s)}
                aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 보기'}
              >
                <img src={showPw ? EyeCloseImg : EyeImg} alt="" />
              </IconRightBtn>
            </Field>

            {/* 에러 메시지 */}
            {errMsg && <Help role="alert">{errMsg}</Help>}

            {/* 공통 버튼 */}
            <LoginButton type="submit" disabled={disabled}>
              {loading ? 'Logging in…' : 'Login'}
            </LoginButton>
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

const LogoBox = styled.img`
  display: block;
  width: 98.508px;
  margin: 140px auto 90px;
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
  border-radius: 8px;
  border: 1px solid #D9D9D9;
  background: #FFF;
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
    /* padding: 4px 36px 4px 36px; */
    padding: 0 52px 0 8px;
  }
`;

const IconLeft = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  & > img {
    display: block;
    width: 14px;
    height: 14px;
    object-fit: contain;
  }
`;

const IconRightBtn = styled.button`
  position: absolute;
  align-items: center;
  justify-content: center;
  right: 10px;
  width: 28px; 
  height: 28px;
  display: flex;
  background: transparent;
  border: none;
  color: var(--icon);
  cursor: pointer;

  img {
    display: block;
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
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

  /* body/body 1 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 380;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;

  a {
    color: var(--text);
    text-decoration: underline;
  }
`;

const LoginButton = styled(CommonButton)`
  background-color: ${({ disabled }) =>
    disabled ? '#E5E7EB' : '#FF6900'};
  color: ${({ disabled }) =>
    disabled ? '#888' : '#fff'};
`;

