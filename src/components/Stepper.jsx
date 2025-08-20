// src/components/Stepper.jsx
import React from "react";
import styled from "styled-components";

/**
 * 진행바 (선 -> 점 -> 선 -> 점 구조)
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

  // 점 위치 (0% ~ 100%)
  const positions = Array.from({ length: dots }, (_, i) =>
    (i / (dots - 1)) * 100
  );

  // ===== 디자인 파라미터 =====
  const DOT = 12; // 점 지름(px)
  const TRACK = 4; // 트랙 두께(px)

  const clamp01 = (n) => Math.max(0, Math.min(1, n));
  const ratio =
    percent !== undefined
      ? clamp01(percent)
      : clamp01((current - 1) / (dots - 1));

  // 진행 채움 길이
  let fillWidth = "0px";
  if (percent !== undefined) {
    fillWidth =
      ratio <= 0 ? "0px" : `calc(${(ratio * 100).toFixed(4)}% - ${DOT / 2}px)`;
  } else {
    // 단계 기반
    if (current <= 1) {
      fillWidth = "0px"; // 첫 단계일 땐 선 없음
    } else {
      fillWidth = `calc(${((current - 1) / (dots - 1)) * 100}% - ${
        DOT / 2
      }px)`;
    }
  }

  // 활성화된 점
  const activeIndex =
    percent !== undefined
      ? -1
      : Math.max(-1, Math.min(dots - 1, current - 1));

  return (
    <Wrap className={className} aria-hidden>
      <Track $trackHeight={TRACK} />
      <Fill style={{ width: fillWidth }} $trackHeight={TRACK} />
      {positions.map((left, idx) => (
        <Dot
          key={idx}
          style={{ left: `${left}%` }}
          $size={DOT}
          $active={idx <= activeIndex}
        />
      ))}
    </Wrap>
  );
}

/* ===== 스타일 ===== */
const COLOR_TRACK = "#D9D9D9";
const COLOR_FILL = "#6D6D6D";
const COLOR_DOT = "#D9D9D9";
const COLOR_DOT_ACTIVE = "#6D6D6D";

const Wrap = styled.div`
  position: relative;
  height: 22px;
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
  left: 0;
  height: ${(p) => p.$trackHeight}px;
  background: ${COLOR_FILL};
  border-radius: 999px;
  pointer-events: none;
  transition: width 200ms ease;
`;

const Dot = styled.span`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  border-radius: 50%;
  background: ${(p) => (p.$active ? COLOR_DOT_ACTIVE : COLOR_DOT)};
  box-shadow: ${(p) => (p.$active ? "0 0 0 2px rgba(0,0,0,0.04)" : "none")};
`;
