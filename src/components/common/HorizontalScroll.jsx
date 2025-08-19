import React, { useRef, useCallback } from 'react';
import styled, { css } from 'styled-components';

export default function HorizontalScroll({
  children,
  gap = 10,
  padding = '0 0',
  snap = 'none',
  draggable = true,
  hideScrollbar = true,
  tailSpace = 0,
  ...rest
}) {
  const DRAG_THRESHOLD = 10;

  const ref = useRef(null);
  const dragRef = useRef({
    down: false,
    startX: 0,
    startLeft: 0,
    moved: false,
  });

  const onPointerDown = useCallback((e) => {
    if (!draggable) return;
    if (e.button && e.button !== 0) return; // 우클릭 등 무시
    const el = ref.current;
    if (!el) return;
    el.setPointerCapture?.(e.pointerId);
    dragRef.current.down = true;
    dragRef.current.moved = false;
    dragRef.current.startX = e.clientX;
    dragRef.current.startLeft = el.scrollLeft;
  }, [draggable]);

  const onPointerMove = useCallback((e) => {
    if (!draggable) return;
    const el = ref.current;
    const d = dragRef.current;
    if (!el || !d.down) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > DRAG_THRESHOLD) d.moved = true;
    el.scrollLeft = d.startLeft - dx;
  }, [draggable]);

  const endDrag = useCallback(() => {
    if (!draggable) return;
    dragRef.current.down = false;
    // moved는 클릭 캡처에서 한 번 보고 바로 false로 털어줄게요.
  }, [draggable]);

  // 드래그 했으면 클릭 막기 (상태가 리렌더 타이밍과 무관)
  const onClickCapture = useCallback((e) => {
    const d = dragRef.current;
    if (d.moved) {
      e.preventDefault();
      e.stopPropagation();
      d.moved = false; // 바로 리셋해서 다음 클릭은 정상 동작
    }
  }, []);

  return (
    <Wrap
      ref={ref}
      $gap={gap}
      $padding={padding}
      $snap={snap}
      $hideScrollbar={hideScrollbar}
      $draggable={draggable}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
      {...rest}
    >
      {children}
      {tailSpace > 0 && <TailSpace style={{ width: tailSpace }} />}
    </Wrap>
  );
}

const snapCss = {
  none: css``,
  proximity: css`
    scroll-snap-type: x proximity;
    > * { scroll-snap-align: start; }
  `,
  mandatory: css`
    scroll-snap-type: x mandatory;
    > * { scroll-snap-align: start; }
  `,
};

const Wrap = styled.div`
  display: flex;
  gap: ${(p) => p.$gap}px;
  padding: ${(p) => p.$padding};
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
  cursor: ${(p) => (p.$draggable ? 'grab' : 'default')};
  &:active { cursor: ${(p) => (p.$draggable ? 'grabbing' : 'default')}; }

  user-select: none;
  -webkit-user-drag: none;

  > * { flex: 0 0 auto; }

  ${(p) => p.$hideScrollbar && css`
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  `}

  ${(p) => snapCss[p.$snap] || ''};
`;

const TailSpace = styled.div`
  flex: 0 0 auto;
  height: 1px;
`;
