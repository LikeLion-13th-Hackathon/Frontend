import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import CommonButton from "../../../components/common/CommonButton";
import Layout from "../../../components/common/Layout";
import CenterHeader from "../../../components/common/header/CenterHeader";

export default function SignUpProfile() {
  const nav = useNavigate();
  const loc = useLocation();
  const prev = loc.state ?? {}; // 이전 단계(email, pw) 값

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  const isFullValid = fullName.trim().length > 0;
  const usernameOk =
    username.length === 0 || /^[a-zA-Z0-9._]{2,20}$/.test(username);

  const nextDisabled = useMemo(
    () => !isFullValid || !usernameOk,
    [isFullValid, usernameOk]
  );

  const goNext = (e) => {
    e.preventDefault();
    if (nextDisabled) return;
    nav("/signup/profile-sub", {
      state: { ...prev, fullName: fullName.trim(), username },
    });
  };

  return (
    <Layout>

      <Card>
        <Title>Welcome!</Title>
        <Sub>Let’s set up your profile.</Sub>

        <Form onSubmit={goNext} noValidate>
          <Label htmlFor="full">
            Full Name<span className="req">*</span>
          </Label>
          <Field className={!isFullValid && fullName ? "error" : ""}>
            <input
              id="full"
              type="text"
              placeholder="chaeryeong yang"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
            />
          </Field>
          {!isFullValid && fullName.length > 0 && (
            <Help>Please enter a valid name.</Help>
          )}

          <Label htmlFor="username">Username (optional)</Label>
          <Field className={!usernameOk ? "error" : ""}>
            <input
              id="username"
              type="text"
              placeholder="didii"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </Field>
          {!usernameOk && <Help>Use 2–20 characters: letters, numbers, (.) or (_).</Help>}

          <Actions>
            <BackButton type="button" onClick={() => nav(-1)}>
              Back
            </BackButton>
            <NextButton type="submit" disabled={nextDisabled}>
              Next
            </NextButton>
          </Actions>
        </Form>
      </Card>
    </Layout>
  );
}

/* ---------------------- styled-components ---------------------- */

const Card = styled.main`
  position: relative; /* 장식 원(DecorCircle)의 기준 컨테이너 */
  width: 100%;
  max-width: 375px;
  margin-top: 68px;
  padding: 24px;
  /* border-radius: 16px;
  border: 1px solid #eee;
  box-shadow: 0 8px 28px rgba(0,0,0,.06); */
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
  .req { color:#d33; margin-left:2px; }
`;

const Field = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 16px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;

  &.error { border-color:#ff6b6b; background:#fff5f5; }

  input{
    width:100%;
    border:0; outline:0; background:transparent;
    font-size:14px; line-height:20px; color:#111;
  }
`;

const Help = styled.p`
  margin: -4px 0 0 0;
  font-size: 12px;
  line-height: 16px;
  color: #d33;
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