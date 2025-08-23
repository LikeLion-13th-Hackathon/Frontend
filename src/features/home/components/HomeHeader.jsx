// src/features/home/components/HomeHeader.jsx
import React from "react";
import styled from "styled-components";
import SearchIcon from "@/assets/icons/main_search.png"; // 기존 SearchBar 아이콘

const HomeHeader = () => {
  return (
    <HeaderWrapper>
      <Logo>mapin</Logo>
      <SearchBox>
        <Input placeholder="Heukseok Market" />
        <Icon>
          <img src={SearchIcon} alt="검색" />
        </Icon>
      </SearchBox>
    </HeaderWrapper>
  );
};

export default HomeHeader;

// === styled ===
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #000;
  font-family: 'Gmarket Sans', sans-serif;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #ddd;   /* 테두리 추가 */
  border-radius: 12px;      /* 둥근 모서리 */
  padding: 6px 12px;
  width: 230px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #333;

  ::placeholder {
    color: #aaa;  /* placeholder 색상 연하게 */
  }
`;

const Icon = styled.div`
  width: 18px;   /* 크기 조정 */
  height: 18px;
  margin-left: 6px; /* 아이콘과 텍스트 간격 */

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
