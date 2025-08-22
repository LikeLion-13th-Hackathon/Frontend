// src/components/common/BottomCTA.jsx
import React from 'react';
import styled from 'styled-components';
import CommonButton from '@/components/common/CommonButton';

export default function BottomCTA({
  label = 'Submit Review',
  onClick,
  disabled,
  bottomOffset = 0, // 탭바가 있다면 66 같은 값으로 띄우기
  variant = "primary",
}) {
  return (
    <Bar $offset={bottomOffset}>
      <Inner>
        <CommonButton
          fullWidth
          onClick={onClick}
          disabled={disabled}
          variant={variant}
        >
          {label}
        </CommonButton>
      </Inner>
    </Bar>
  );
}

const Bar = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(${p => p.$offset}px + env(safe-area-inset-bottom));
  z-index: 1000;

  width: 375px;              /* 앱 고정폭 */
  height: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-top: 1px solid #eee;
`;

const Inner = styled.div`
  width: 335px;              /* 버튼 래퍼 */
  display: flex;
  align-items: center;
  justify-content: center;
`;
