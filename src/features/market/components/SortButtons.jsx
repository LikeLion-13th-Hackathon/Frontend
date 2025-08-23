import React, { useState } from 'react';
import styled from 'styled-components';

const sortOptions = ["default", "most reviewed"];

const SortButtons = ({ value = "default", onChange }) => {

  return (
    <Wrapper>
      {sortOptions.map((option) => (
        <SortButton
          key={option}
          $active={value === option}
          onClick={() => onChange?.(option)}
          aria-pressed={value === option}
        >
          {option}
        </SortButton>
      ))}
    </Wrapper>
  );
};

export default SortButtons;

const Wrapper = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: 10px;
  margin: 20px;
`;

const SortButton = styled.div`
  display: flex;
  height: 36px;
  padding: 0 14px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 20px;
  cursor: pointer;

  background: ${(props) => (props.$active ? "#FF6900" : "#FFF7ED")};
  border: ${(props) => (props.$active ? "none" : "1px solid #E8E8E8")};

  color: ${(props) => (props.$active ? "#FFF" : "#707070")};
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  line-height: 150%; /* 18px */
  letter-spacing: -0.24px;
  font-weight: ${(props) => (props.$active ? 600 : 400)};
  text-align: center;

  transition: all 0.2s ease-in-out;
`;
