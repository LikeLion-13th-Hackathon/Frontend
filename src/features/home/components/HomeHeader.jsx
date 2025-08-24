// src/features/home/components/HomeHeader.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@/assets/icons/main_search.png"; // 기존 SearchBar 아이콘

const HomeHeader = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`); // Search 페이지로 이동
  };

  return (
    <HeaderWrapper>
      <Logo>mapin</Logo>
      <form onSubmit={handleSearch}>
        <SearchBox>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Heukseok Market"
          />
          <Icon onClick={handleSearch}>
            <img src={SearchIcon} alt="검색" />
          </Icon>
        </SearchBox>
      </form>
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
  width: 18px;
  height: 18px;
  margin-left: 6px;
  cursor: pointer;  /* 아이콘 클릭 가능 */
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
