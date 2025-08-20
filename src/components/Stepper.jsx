// C:\Users\kyg02\Frontend\src\components\Stepper.jsx
import React from "react";
import styled from "styled-components";

/**
 * 이미지 스타일 그대로의 진행바
 *
 * 사용:
 *  <Stepper current={1} total={4} />
 *  <Stepper percent={0.62} total={4} />
 */
export default function Stepper({
  total = 4,
  current = 1,
  percent = undefined,
  className,
}) {
  const dots = Math.max(2, total);
  const positions = Array.from({ length: dots }, (_, i) =>
    dots === 1 ? 0 : (i / (dots - 1)) * 100
  );

  // ===== 핵심: 점보다 조금 더 긴 최소 채움 =====
  const DOT = 12;          // 점 지름(px)
  const TRACK = 4;         // 트랙 두께(px)
  const HEAD_MIN = DOT + 6; // 점(12)보다 6px 더 길게 -> 점 오른쪽으로 살짝 보임

  const clamp01 = (n) => Math.max(0, Math.min(1, n));
  const ratio =
    percent !== undefined
      ? clamp01(percent)
      : clamp01((Math.max(1, Math.min(current, dots)) - 1) / (dots - 1));

  // 비율 기반 채움 길이 (다음 점 중심까지 가면 꽉 차 보이므로 -DOT/2)
  const fillWidth =
    ratio === 0
      ? `${HEAD_MIN}px`
      : `calc(${(ratio * 100).toFixed(4)}% - ${DOT / 2}px)`;

  // 단계 기반: 현재 점만 진회색
  const activeIndex =
    percent !== undefined ? 0 : Math.max(0, Math.min(dots - 1, current - 1));

  return (
    <Wrap className={className} aria-hidden>
      <Track $trackHeight={TRACK} />
      <Fill style={{ width: fillWidth }} $trackHeight={TRACK} />
      {positions.map((left, idx) => (
        <Dot
          key={idx}
          style={{ left: `${left}%` }}
          $size={DOT}
          $active={idx === activeIndex}
        />
      ))}
    </Wrap>
  );
}

/* ===== 스타일(와이어 색상) ===== */
const COLOR_TRACK = "#E7E9ED";
const COLOR_FILL  = "#9AA0A6";
const COLOR_DOT   = "#C9CDD3";
const COLOR_DOT_ACTIVE = "#55595E";

const Wrap = styled.div`
  position: relative;
  height: 22px; /* 점(12px) + 트랙(4px) */
`;

const Track = styled.div`
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  height: ${(p) => p.$trackHeight}px;
  background: ${COLOR_TRACK};
  border-radius: 999px;
`;

const Fill = styled.div`
  position: absolute;
  top: 10px;
  left: 0; /* ← 무조건 왼쪽에서 시작 */
  height: ${(p) => p.$trackHeight}px;
  background: ${COLOR_FILL};
  border-radius: 999px;
  pointer-events: none;
  transition: width 200ms ease;
`;


const Dot = styled.span`
  position: absolute;
  top: 10px;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: ${(p) => (p.$active ? COLOR_DOT_ACTIVE : COLOR_DOT)};
  box-shadow: ${(p) => (p.$active ? "0 0 0 2px rgba(0,0,0,0.04)" : "none")};
`;
