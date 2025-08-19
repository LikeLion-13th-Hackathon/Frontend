// src/features/auth/pages/SignUpComplete.jsx
import React, { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommonButton from "../../../components/common/CommonButton";

import Layout from "../../../components/common/Layout";
import CenterHeader from "../../../components/common/header/CenterHeader";
import { joinRequest } from "@/shared/api/auth";


/* 국가코드 → 국기 이모지 */
function flagEmoji(cc = "KR") {
  return cc
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(0x1f1a5 + c.charCodeAt(0)));
}

export default function SignUpComplete() {
  const nav = useNavigate();
  const loc = useLocation();
  // 이전 단계에서 넘어온 값들 (email, pw, fullName, username, age, nationality 등)
  const prev = loc.state ?? {};

  const [file, setFile] = useState(null);      // 미리보기용 파일만 보유(전송 안 함)
  const [preview, setPreview] = useState("");  // 미리보기 blob URL
  const [error, setError] = useState("");      // 에러 메시지
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const nameLine = useMemo(() => {
    const nat = prev.nationality ?? "KR";
    const full = prev.fullName ?? "";
    const age = prev.age != null ? ` (${prev.age})` : "";
    return `${flagEmoji(nat)}  ${full}${age}`;
  }, [prev]);

  // 파일 유효성 검사 + 미리보기 세팅 (서버로 파일은 보내지 않음)
  const handleFile = (f) => {
    setError("");
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      setError("이미지 파일만 업로드할 수 있어요.");
      return;
    }
    const MAX = 5 * 1024 * 1024;
    if (f.size > MAX) {
      setError("파일 용량은 5MB 이하만 가능해요.");
      return;
    }

    const url = URL.createObjectURL(f);
    setFile(f);
    setPreview(url);
  };

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

  // 최종 제출
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("프로필 이미지를 업로드해 주세요.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 현재 백엔드 스펙은 URL 문자열만 받음 → 임시 기본 URL 사용
      // (CDN 업로드가 준비되면 여기서 실제 업로드 후 받은 URL로 교체)
      const profileImageUrl = "https://via.placeholder.com/256.png?text=Profile";

      const email = prev.email;
      const username = prev.username?.trim() || (email?.split("@")[0] ?? "user");

      const payload = {
        username,
        email,
        password: prev.pw,
        nickname: prev.fullName || username,
        age: prev.age,
        nationality: prev.nationality,      // 예: "KR"
        profile_image: profileImageUrl,     // URL 문자열만 전송
      };

      const { user, token } = await joinRequest(payload);
      
      // 프로필 이미지 로컬에도 저장 (state가 사라져도 복구용)
      const avatar = user?.profile_image || profileImageUrl;
      localStorage.setItem('profile_image', avatar)

      if (token?.access_token) localStorage.setItem("access_token", token.access_token);
      if (token?.refresh_token) localStorage.setItem("refresh_token", token.refresh_token);

      nav("/onboarding-end", {
        state: { 
          username: user?.username || username,
          profile_image: avatar,
        },
        replace: true,
      });
    } catch (err) {
      setError(err.message || "회원가입에 실패했어요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <CenterHeader title = "logo" />

      <Card as="form" onSubmit={onSubmit} noValidate>
        <Title>Welcome!</Title>
        <Sub>This is the last step!</Sub>

        <Label>
          Profile Image<span className="req">*</span>
        </Label>

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
        {error && <Help role="alert">{error}</Help>}

        <Actions>
          <CommonButton type="button" onClick={() => nav(-1)}>
            Back
          </CommonButton>
          <CommonButton type="submit" disabled={!file || loading}>
            {loading ? "Submitting…" : "Next"}
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
  margin: 4px 0 30px 0;
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
