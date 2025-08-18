import React from 'react'
import styled from 'styled-components';
import SearchIcon from '../../assets/icons/main_search.png';

const SearchBar = () => {
  return (
    <SearchContainer>
        <Input placeholder="Heukseok Market" />
        <img src={SearchIcon} alt="검색" />
    </SearchContainer>
  )
}

export default SearchBar

const SearchContainer = styled.div`
  display: flex;
  width: 335px;
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
`;