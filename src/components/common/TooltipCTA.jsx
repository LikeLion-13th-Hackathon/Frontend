// ../../../../components/common/TooltipCTA.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import BottomCTA from './BottomCTA';
import BalloonPng from '@/assets/icons/tooltip.png'; // 말풍선 PNG

export default function TooltipCTA({
  label,
  tooltip = '',
  onClick,
  bottomOffset = 0,
  variant = 'ai',
  balloonImg = BalloonPng,
  balloonWidth = 220,
  balloonHeight = 70,
  textOffsetY = -6,
  tailPadding = 10,
}) {
  const [open, setOpen] = useState(false);
  const [tid, setTid] = useState(null);

  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  const onTouchStart = () => {
    if (tid) clearTimeout(tid);
    setOpen(true);
    const id = setTimeout(() => setOpen(false), 1200);
    setTid(id);
  };
  const onTouchEnd = () => { if (tid) clearTimeout(tid); };

  return (
    <>
      <BalloonBox
        role="tooltip"
        aria-hidden={!open}
        $open={open}
        $img={balloonImg}
        $tail={tailPadding}
        style={{ bottom: (bottomOffset ?? 0) + 72, width: balloonWidth, height: balloonHeight }}
      >
        <BalloonText $offset={textOffsetY}>{tooltip}</BalloonText>
      </BalloonBox>

      <div
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ position: 'fixed', left: 0, right: 0, bottom: bottomOffset ?? 0, zIndex: 40 }}
      >
        <BottomCTA
          label={label}
          onClick={onClick}
          bottomOffset={bottomOffset}
          variant={variant}
        />
      </div>
    </>
  );
}

const BalloonBox = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%) translateY(6px);
  background: ${({ $img }) => `url(${$img}) no-repeat center / contain`};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px ${p => 8 + (p.$tail ?? 0)}px;
  z-index: 50;

  opacity: ${p => (p.$open ? 1 : 0)};
  visibility: ${p => (p.$open ? 'visible' : 'hidden')};
  transition: opacity .12s ease, transform .12s ease, visibility .12s ease;
  ${p => p.$open && `transform: translateX(-50%) translateY(0);`}

  pointer-events: none;   /* 클릭은 아래 CTA로 통과 */
`;

const BalloonText = styled.div`
    letter-spacing: -0.2px;
    text-align: center;
    white-space: pre-line;  /* \n 줄바꿈 유지 */

    color: #000;

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
`;
