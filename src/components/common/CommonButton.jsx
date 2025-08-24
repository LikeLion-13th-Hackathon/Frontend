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
const CommonButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant', 'fullWidth'].includes(prop),
})`
  /* === 버튼 색상 토큰 === */
  --btn-primary: #ff6900;       /* ✅ 활성 배경: 주황 */
  --btn-primary-text: #fff;     /* ✅ 활성 글씨: 흰색 */
  --btn-disabled: #E5E7EB;      /* ✅ 비활성 배경: 연회색 */
  --btn-disabled-text: #8D8D8D; /* ✅ 비활성 글씨: 중간 회색 */
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
        color: var(--btn-disabled-text);
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
      background: #ff6900;
      color: #fff;
      `
    }
    // ✅ primary (default)
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
