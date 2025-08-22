// src/features/mypage/components/ReviewProfileBar.jsx
import React from 'react';
import styled from 'styled-components';

export default function ReviewProfile({
  avatarUrl = '',
  name = 'User',
  sub = '',              // 한 줄 설명 (선택)
  className,
}) {
  return (
    <Wrap className={className}>
      <Avatar $src={avatarUrl} aria-label="프로필 이미지" />
      <Texts>
        <Name title={name}>{name}</Name>
        {sub && <Sub>{sub}</Sub>}
      </Texts>
    </Wrap>
  );
}

const Wrap = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;

    padding-top: 64px;
  padding-left: 20px;
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background: ${({ $src }) =>
    $src ? `url(${$src}) center / cover no-repeat` : `#ffffff`};
  flex-shrink: 0;
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;  /* 텍스트 왼쪽 정렬 */
  gap: 4px;
`;

const Name = styled.div`
  color: #000;
    text-align: center;

    /* head/head 1-em */
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 125%; /* 30px */
    letter-spacing: -0.48px;
`;

const Sub = styled.div`
    color: #000;
    text-align: center;

    /* body/body 1 */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
`;
