// src/features/mypage/components/ProfileStatsRow.jsx
import React from 'react';
import styled from 'styled-components';

export default function ProfileStatsRow({
  rewards = '',
  visited = '',

  gap = 16,
}) {
  return (
    <Row $gap={gap}>
      <Card>
        <CardTitle>Rewards</CardTitle>
        <CardDesc>{rewards} points</CardDesc>
      </Card>

      <Card>
        <CardTitle>My Visits</CardTitle>
        <CardDesc>{visited} places</CardDesc>
      </Card>
    </Row>
  );
}

const Row = styled.div`
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
  z-index: 5;

  display: flex;
  gap: ${(p) => p.$gap}px;
`;

const Card = styled.div`
    display: flex;
    width: 160px;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    border-radius: 12px;
    background: #FFEDD4;
`;

const CardTitle = styled.div`
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

const CardDesc = styled.div`
    color: #000;

    /* body/body 1-em */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
`;
