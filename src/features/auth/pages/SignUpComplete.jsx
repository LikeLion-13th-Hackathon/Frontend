// src/pages/SignUpComplete.jsx
import React, { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommonButton from "../../../components/common/CommonButton";
import Layout from "../../../components/common/Layout";

/* 국가코드 → 국기 이모지 변환 */
function flagEmoji(cc = "KR") {
  return cc
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(0x1f1a5 + c.charCodeAt(0)));
}

export default function SignUpComplete() {
  const nav = useNavigate();
  const loc = useLocation();
  // 이전 단계에서 넘어온 값 (email, pw, fullName, username, age, nationality 등)
  const prev = loc.state ?? {};

  // ---- 로컬 상태 ----
  const [file, setFile] = useState(null);        // 업로드된 원본 파일
  const [preview, setPreview] = useState("");    // 미리보기 URL
  const [error, setError] = useState("");        // 에러 메시지
  const inputRef = useRef(null);

  const nameLine = useMemo(() => {
    const nat = prev.nationality ?? "KR";
    const full = prev.fullName ?? "";
    const age = prev.age != null ? ` (${prev.age})` : "";
    return `${flagEmoji(nat)}  ${full}${age}`;
  }, [prev]);

  // ---- 파일 선택 핸들러 ----
  const onPick = (e) => {
    const f = e.target.files?.[0];
    handleFile(f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    handleFile(f);
  };

  const onDragOver = (e) => e.preventDefault();

  // ---- 파일 유효성 검사 + 미리보기 세팅 ----
  const handleFile = (f) => {
    setError("");
    if (!f) return;

    // 1) 타입 검사 (이미지)
    if (!f.type.startsWith("image/")) {
      setError("이미지 파일만 업로드할 수 있어요.");
      return;
    }
    // 2) 용량 제한 (예: 5MB)
    const MAX = 5 * 1024 * 1024;
    if (f.size > MAX) {
      setError("파일 용량은 5MB 이하만 가능해요.");
      return;
    }

    // 3) 미리보기 URL 생성
    const url = URL.createObjectURL(f);
    setFile(f);
    setPreview(url);
  };

  // ---- 완료(Next) ----
  const onSubmit = (e) => {
    e.preventDefault();
    // 필수: 프로필 이미지
    if (!file) {
      setError("프로필 이미지를 업로드해 주세요.");
      return;
    }
    // 실제 서비스에선 업로드(API) → 성공 시 다음 화면 이동
    console.log("✅ 최종 가입 데이터:", { ...prev, avatar: file });
    nav("/receipt", { state: { ...prev, avatarSelected: true } });
  };

  return (
    <Layout>
      <Header>logo</Header>

      <Card as="form" onSubmit={onSubmit} noValidate>
        <Title>Welcome!</Title>
        <Sub>This is the last step!</Sub>

        <Label>Profile Image<span className="req">*</span></Label>

        <UploadCard
          onDrop={onDrop}
          onDragOver={onDragOver}
          onClick={() => inputRef.current?.click()}
          role="button"
          aria-label="프로필 이미지 업로드"
        >
          <Circle>
            {preview ? (
              <img src={preview} alt="미리보기" />
            ) : (
              <ArrowUp>↑</ArrowUp>
            )}
          </Circle>
          <Hint>이미지를 클릭하거나 드래그하여 업로드</Hint>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={onPick}
          />
        </UploadCard>

        {prev.username ? <Username>{prev.username}</Username> : null}
        <NameLine>{nameLine}</NameLine>
        {error && <Help>{error}</Help>}

        <Actions>
          <CommonButton
            variant="secondary"
            type="button"
            onClick={() => nav(-1)}
            fullWidth={false}
          >
            Back
          </CommonButton>

          <CommonButton type="submit" disabled={!file} fullWidth={false}>
            Next
          </CommonButton>
        </Actions>
      </Card>
    </Layout>
  );
}

/* ---------------- styled-components ---------------- */

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
  border-radius: 16px;
  border: 1px solid #eee;
  box-shadow: 0 8px 28px rgba(0,0,0,.06);
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
  margin: 4px 0 12px 0;
  color: #555;
  font-size: 13px;
  line-height: 18px;
`;

const Label = styled.label`
  font-size: 14px;
  line-height: 20px;
  color: #222;
  .req { color:#d33; margin-left:2px; }
`;

const UploadCard = styled.div`
  margin-top: 8px;
  padding: 24px 12px;
  border-radius: 12px;
  background: #f6f6f6;
  border: 1px solid #eee;
  display: grid;
  justify-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
`;

const Circle = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 999px;
  background: repeating-conic-gradient(#eee 0% 12.5%, #fff 12.5% 25%);
  display: grid;
  place-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 원형에 꽉 차게 */
    display: block;
  }
`;

const ArrowUp = styled.div`
  width: 40px; height: 40px;
  border-radius: 999px;
  display: grid; place-items: center;
  background: #e9e9e9;
  font-size: 20px; color: #666;
`;

const Hint = styled.div`
  font-size: 12px;
  color: #777;
`;

const Username = styled.div`
  margin-top: 14px;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  color: #111;
`;

const NameLine = styled.div`
  margin-top: 4px;
  text-align: center;
  font-size: 13px;
  color: #666;
`;

const Help = styled.p`
  margin: 8px 0 0 0;
  font-size: 12px;
  color: #d33;
  text-align: center;
`;

const Actions = styled.div`
  margin-top: 18px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;
