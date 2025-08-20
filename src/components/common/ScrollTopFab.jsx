// src/components/common/ScrollTopFab.jsx
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ChevronDown from '@/assets/icons/chevron_down.png'; // 위 아이콘 없으면 180도 회전

export default function ScrollTopFab({
  offsetBottom = 66,   // 하단 CTA 높이
  gap = 12,            // CTA와 간격
  right = 12,          // 우측 여백
  showAfter = 200,     // 몇 px 스크롤 후 표시
  ariaLabel = '맨 위로 이동',
  onClick,
}) {
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > showAfter);
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfter]);

  const handleClick = () => {
    onClick?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Rail $bottom={offsetBottom + gap}>
      <Fab
        type="button"
        onClick={handleClick}
        aria-label={ariaLabel}
        $right={right}
        $visible={visible}
      >
        <ChevronUp src={ChevronDown} alt="" aria-hidden />
      </Fab>
    </Rail>
  );
}

/* 뷰포트 하단에 고정된 375px 레일(가운데 정렬) */
const Rail = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(${p => p.$bottom}px + env(safe-area-inset-bottom));
  z-index: 1100;

  width: 100%;
  max-width: 375px;     /* 앱 내부 폭 한정 */
  pointer-events: none; /* 내부 버튼만 클릭 가능하도록 */
`;

/* 레일 내부의 실제 버튼 (오른쪽 여백 유지) */
const Fab = styled.button`
  position: absolute;
  right: ${p => p.$right}px;
  bottom: 0;
  pointer-events: auto;

  display: inline-flex;
  padding: 10px;
  align-items: center;
  gap: 10px;

  border: 0;
  border-radius: 20px;
  background: #D0D0D0;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  opacity: ${p => (p.$visible ? 1 : 0)};
  transform: translateY(${p => (p.$visible ? '0' : '8px')});
  transition: opacity .2s ease, transform .2s ease;
  &:active { transform: scale(0.98); }
`;

/* 아래 화살표 이미지를 위쪽으로 사용 */
const ChevronUp = styled.img`
  width: 18px;
  height: 18px;
`;
