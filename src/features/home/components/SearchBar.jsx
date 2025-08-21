// src/features/home/components/SearchBar.jsx
import React from 'react'
import styled from 'styled-components';
import SearchIcon from "@/assets/icons/main_search.png";

/**
 * 디자인은 그대로 유지 + 컨트롤러블/제출 지원
 * props:
 *  - value?: string
 *  - onChange?: (v: string) => void
 *  - onSubmit?: () => void
 *  - placeholder?: string
 */
const SearchBar = ({ value, onChange, onSubmit, placeholder = "Heukseok Market" }) => {
  const isControlled = typeof value === "string" && typeof onChange === "function";

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    onSubmit?.();
  };

  return (
    <SearchContainer onSubmit={handleSubmit}>
      <Input
        placeholder={placeholder}
        value={isControlled ? value : undefined}
        onChange={isControlled ? (e) => onChange(e.target.value) : undefined}
        inputMode="search"
      />
      <IconButton type="submit" aria-label="search">
        <img src={SearchIcon} alt="검색" />
      </IconButton>
    </SearchContainer>
  )
}

export default SearchBar

// form으로 바꿔도 기본 margin은 0이라 레이아웃 영향 없음
const SearchContainer = styled.form`
  box-sizing: border-box;
  display: flex;
  /* 원래 고정폭이었는데 부모 padding과 겹치면 깨질 수 있어 방어적으로 처리 */
  width: calc(100% - 40px);
  max-width: 335px;

  padding: 10px 16px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  background: #EAEAEA;
  margin: 30px 20px 0;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  outline: none;
  /* 폰트 렌더링 차이 줄이기 */
  line-height: 1.2;
`;

/* 버튼이 레이아웃을 밀지 않도록 리셋 */
const IconButton = styled.button`
  all: unset;            /* 기본 버튼 스타일 제거 */
  display: grid;
  place-items: center;
  cursor: pointer;
  /* 클릭 영역 확보 */
  width: 24px;
  height: 24px;

  img {
    display: block;
    width: 20px;
    height: 20px;
  }
`;
