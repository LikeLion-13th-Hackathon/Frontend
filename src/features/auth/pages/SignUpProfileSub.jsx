import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommonButton from "../../../components/common/CommonButton";
import Layout from "../../../components/common/Layout";
import CenterHeader from "../../../components/common/header/CenterHeader";

const COUNTRIES = [
  { code: "KR", label: "KR - 대한민국" },
  { code: "US", label: "US - United States" },
  { code: "JP", label: "JP - 日本" },
  { code: "CN", label: "CN - 中国" },
  { code: "GB", label: "GB - United Kingdom" },
];

export default function SignUpProfileSub() {
  const nav = useNavigate();
  const loc = useLocation();
  const prev = loc.state ?? {};

  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("KR");
  const [fullName] = useState(prev.fullName ?? "");
  const [username] = useState(prev.username ?? "");

  const ageNum = Number(age);
  const ageValid = Number.isFinite(ageNum) && ageNum >= 1 && ageNum <= 120;

  const nextDisabled = useMemo(
    () => !ageValid || !nationality,
    [ageValid, nationality]
  );

  const goNext = (e) => {
    e.preventDefault();
    if (nextDisabled) return;
    console.log("profile-sub submit:", { ...prev, age: ageNum, nationality });
    nav("/signup/complete", { state: { ...prev, age: ageNum, nationality } });
  };

  return (
    <Layout>
      <CenterHeader title = "logo" />

      <Card>
        <Title>Welcome!</Title>
        <Sub>Let’s set up your profile.</Sub>

        <Form onSubmit={goNext} noValidate>
          <Row>
            <Col>
              <Label htmlFor="age">
                Age<span className="req">*</span>
              </Label>
              <Field className={!ageValid && age ? "error" : ""}>
                <input
                  id="age"
                  type="number"
                  inputMode="numeric"
                  placeholder="23"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min={1}
                  max={120}
                />
              </Field>
              {!ageValid && age && <Help>1–120 사이 숫자만 입력해주세요.</Help>}
            </Col>

            <Col>
              <Label htmlFor="nat">
                Nationality<span className="req">*</span>
              </Label>
              <SelectWrap>
                <select
                  id="nat"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </SelectWrap>
            </Col>
          </Row>

          <Label>
            Full Name<span className="req">*</span>
          </Label>
          <Field disabled>
            <input value={fullName} readOnly />
          </Field>

          <Label>Username (optional)</Label>
          <Field disabled>
            <input value={username} readOnly />
          </Field>

          <Actions>
            <CommonButton variant="secondary" type="button" onClick={() => nav(-1)}>
              Back
            </CommonButton>
            <CommonButton type="submit" disabled={nextDisabled}>
              Next
            </CommonButton>
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

const Header = styled.header`
  width: 100%;
  max-width: 375px;
  display: grid;
  place-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #000;
`;

const Card = styled.main`
  width: 100%;
  max-width: 375px;
  margin-top: 8px;
  padding: 24px;
  /* border-radius: 16px;
  border: 1px solid #eee;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.06); */
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

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 14px;
  line-height: 20px;
  color: #222;
  .req {
    color: #d33;
    margin-left: 2px;
  }
`;

const Field = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 16px;
  background: ${(props) => (props.disabled ? "#f2f2f2" : "#eaeaea")};
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  opacity: ${(props) => (props.disabled ? 0.9 : 1)};

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

const SelectWrap = styled.div`
  height: 44px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: #eaeaea;
  display: flex;
  align-items: center;
  padding: 0 12px;

  select {
    width: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    font-size: 14px;
    line-height: 20px;
    color: #111;
    appearance: none;
    cursor: pointer;
  }
`;

const Help = styled.p`
  margin: -4px 0 0 0;
  font-size: 12px;
  line-height: 16px;
  color: #d33;
`;

const Actions = styled.div`
  margin-top: 6px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
`;
