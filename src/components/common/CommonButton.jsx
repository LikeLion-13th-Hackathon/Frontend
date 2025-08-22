// src/components/CommonButton.jsx
import styled, { css } from "styled-components";

/**
 * variant:
 * - "primary": 브랜드 컬러(활성), 비활성시 회색
 * - "secondary": 옅은 회색 배경(서브 액션)
 * - "ghost": 테두리/배경 없는 투명 스타일 (필요 시)
 *
 * fullWidth: 너비 100% (기본 true)
 */
const CommonButton = styled.button`
  --btn-primary: var(--pri, #6D6D6D);
  --btn-primary-text: #000;
  --btn-disabled: #e0e0e0;
  --btn-disabled-text: #858585;
  --btn-secondary-bg: #d3d3d3;
  --btn-secondary-text: #000;

  height: 44px;
  border: 0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 14px;
  width: ${({ fullWidth = true }) => (fullWidth ? "100%" : "auto")};
  transition: filter .15s ease, opacity .15s ease;

  ${({ variant = "primary" }) => {
    if (variant === "secondary") {
      return css`
        background: var(--btn-secondary-bg);
        color: var(--btn-secondary-text);
      `;
    }
    if (variant === "secondary-dim") {
      return css`
        background: var(--btn-secondary-bg);
        color: var(--btn-disabled-text); // 회색 글씨
      `;
    }
    if (variant === "ghost") {
      return css`
        background: transparent;
        border: 1px solid #cfcfcf;
        color: #111;
      `;
    }
    if (variant === "ai") {
      return css`
      background: #ff8904;
      color: #fff;
      `
    }
    // primary (default)
    return css`
      background: var(--btn-primary);
      color: var(--btn-primary-text);
    `;
  }}

  &:disabled {
    background: var(--btn-disabled);
    color: var(--btn-disabled-text);
    cursor: not-allowed;
    opacity: 1;
  }

  &:enabled:hover {
    filter: brightness(0.95);
  }

  &:enabled:active {
    filter: brightness(0.9);
  }
`;

export default CommonButton;