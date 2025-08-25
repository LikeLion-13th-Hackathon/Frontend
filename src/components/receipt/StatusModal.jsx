// src/components/common/StatusModal.jsx
import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { createPortal } from "react-dom";

export default function StatusModal({
  open,
  variant = "loading", // 'loading' | 'success' | 'error'
  message = "Loading…",
  autoHideMs,          // 예: 900 (성공 시 자동 닫기)
  onClose,
}) {
  useEffect(() => {
    if (!open || !autoHideMs) return;
    const id = setTimeout(() => onClose?.(), autoHideMs);
    return () => clearTimeout(id);
  }, [open, autoHideMs, onClose]);

  if (!open) return null;
  return createPortal(
    <Backdrop aria-hidden={false}>
      <Card
        role="alertdialog"
        aria-live="assertive"
        aria-busy={variant === "loading"}
      >
        {variant === "loading" && <Spinner aria-hidden />}
        {variant === "success" && <Check aria-hidden viewBox="0 0 24 24">
          <path d="M9 16.2l-3.5-3.6-1.5 1.5L9 19.2l11-11-1.5-1.5z" />
        </Check>}
        {variant === "error" && <ErrorIcon aria-hidden viewBox="0 0 24 24">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </ErrorIcon>}
        <Msg>{message}</Msg>
      </Card>
    </Backdrop>,
    document.body
  );
}

/* ===== styles ===== */
const fadeIn = keyframes`
  from { opacity: 0 } to { opacity: 1 }
`;
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Backdrop = styled.div`
  position: fixed; inset: 0;
  display: grid; place-items: center;
  background: rgba(0,0,0,.35);
  z-index: 1000;
  animation: ${fadeIn} .15s ease;
`;
const Card = styled.div`
  min-width: 140px;
  max-width: 80vw;
  padding: 16px 18px;
  border-radius: 12px;
  background: #FF6900;
  color: #fff;
  display: flex; align-items: center; gap: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.198);
`;
const Spinner = styled.div`
  width: 20px; height: 20px; border-radius: 50%;
  border: 2px solid rgba(255,255,255,.25);
  border-top-color: #fff;
  animation: ${spin} 0.8s linear infinite;
  flex: 0 0 auto;
`;
const Check = styled.svg`
  width: 22px; height: 22px; fill: #ffffff;
  flex: 0 0 auto;
`;
const ErrorIcon = styled.svg`
  width: 22px; height: 22px; fill: #ff6b6b;
  flex: 0 0 auto;
`;
const Msg = styled.div`
  font-size: 14px; line-height: 1.25;
  word-break: keep-all;
`;
