import React, { useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import styled, { css } from 'styled-components';

// HorizontalScroll.jsx 맨 위 유틸 교체
export function scrollToChildCenter(containerEl, childEl, { smooth = true } = {}) {
  if (!containerEl || !childEl) return;

  // 레이아웃 완성 프레임에 계산 (선택 직후 0,0 방지)
  requestAnimationFrame(() => {
    // 1) 기본: offset 기준(가장 견고)
    let childCenter = childEl.offsetLeft + childEl.offsetWidth / 2;

    // 2) 만약 child의 offsetParent가 container가 아니면(중첩 래퍼/트랜스폼 등),
    //    rect 기준으로 보정
    const cRect = containerEl.getBoundingClientRect();
    const iRect = childEl.getBoundingClientRect();
    const rectCenter = (iRect.left - cRect.left) + (iRect.width / 2) + containerEl.scrollLeft;

    // 두 값이 많이 다르면(rect 쪽으로) 교체
    if (Math.abs(rectCenter - childCenter) > 1) {
      childCenter = rectCenter;
    }

    // 목표 스크롤값 + 양끝 클램프
    const target = childCenter - containerEl.clientWidth / 2;
    const maxLeft = Math.max(0, containerEl.scrollWidth - containerEl.clientWidth);
    const clamped = Math.max(0, Math.min(target, maxLeft));

    containerEl.scrollTo({
      left: clamped,
      behavior: smooth ? 'smooth' : 'auto',
    });
  });
}


const HorizontalScroll = forwardRef(function HorizontalScroll(
  {
    children,
    gap = 10,
    padding = '0 0',
    snap = 'none',
    draggable = true,
    hideScrollbar = true,
    tailSpace = 0,

    // 드래그 관련
    activateOnLongPress = false,
    longPressMs = 160,
    allowMoveStart = false,
    disableTextSelect = true,
    ...rest
  },
  externalRef
) {
  const DRAG_THRESHOLD = 10;

  const ref = useRef(null);
  const dragRef = useRef({
    armed: false,
    active: false,
    startX: 0,
    startLeft: 0,
    moved: false,
    timer: null,
    pointerId: null,
  });

  // 부모에서 ref로 컨테이너 DOM 접근 가능
  useImperativeHandle(externalRef, () => ref.current, []);

  const clearTimer = () => {
    if (dragRef.current.timer) {
      clearTimeout(dragRef.current.timer);
      dragRef.current.timer = null;
    }
  };

  const startDrag = (clientX) => {
    const el = ref.current;
    if (!el) return;
    dragRef.current.active = true;
    dragRef.current.moved = false;
    dragRef.current.startX = clientX;
    dragRef.current.startLeft = el.scrollLeft;
  };

  const onPointerDown = useCallback((e) => {
    if (!draggable) return;
    if (e.button && e.button !== 0) return; // 우클릭 무시
    const el = ref.current;
    if (!el) return;

    dragRef.current.armed = true;
    dragRef.current.active = false;
    dragRef.current.pointerId = e.pointerId;

    el.setPointerCapture?.(e.pointerId);

    if (activateOnLongPress) {
      clearTimer();
      dragRef.current.timer = setTimeout(() => {
        startDrag(e.clientX);
      }, longPressMs);
    } else {
      startDrag(e.clientX);
    }
  }, [draggable, activateOnLongPress, longPressMs]);

  const onPointerMove = useCallback((e) => {
    if (!draggable) return;
    const el = ref.current;
    const d = dragRef.current;
    if (!el || !d.armed) return;

    // 롱프레스 대기 중 이동으로 시작 허용
    if (activateOnLongPress && !d.active && allowMoveStart) {
      const dx0 = e.clientX - d.startX;
      if (Math.abs(dx0) > DRAG_THRESHOLD) {
        clearTimer();
        startDrag(e.clientX);
      }
    }

    if (!d.active) return;

    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > DRAG_THRESHOLD) d.moved = true;
    el.scrollLeft = d.startLeft - dx;
  }, [draggable, activateOnLongPress, allowMoveStart]);

  const endDrag = useCallback(() => {
    if (!draggable) return;
    const el = ref.current;
    const d = dragRef.current;
    clearTimer();
    d.armed = false;
    d.active = false;
    if (el && d.pointerId != null) {
      el.releasePointerCapture?.(d.pointerId);
      d.pointerId = null;
    }
    // d.moved는 onClickCapture에서 초기화
  }, [draggable]);

  // 드래그 후 클릭 이벤트 방지
  const onClickCapture = useCallback((e) => {
    const d = dragRef.current;
    if (d.moved) {
      e.preventDefault();
      e.stopPropagation();
      d.moved = false;
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
      $noSelect={disableTextSelect}
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
});

export default HorizontalScroll;

/* ---------- styles ---------- */

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

  -webkit-overflow-scrolling: touch;  /* iOS 부드러운 스크롤 */
  touch-action: pan-y;                 /* 세로는 페이지 스크롤 허용 */

  cursor: ${(p) => (p.$draggable ? 'grab' : 'default')};
  &:active { cursor: ${(p) => (p.$draggable ? 'grabbing' : 'default')}; }

  user-select: none;
  -webkit-user-drag: none;

  ${(p) => p.$noSelect && css`
    & * { user-select: none; -webkit-user-drag: none; }
  `}

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
