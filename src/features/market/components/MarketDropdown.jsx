import React from "react";
import styled from "styled-components";

export default function MarketDropdown({ markets, value, onChange }) {
  return (
    <List>
      {markets.map((m) => (
        <Item
          key={m}
          $active={m === value}
          onClick={() => onChange(m)}
        >
          {m}
        </Item>
      ))}
    </List>
  );
}

/* styled */
const List = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 144px;
  /* Popover에서 이미 border, radius, overflow 처리하므로 여기선 배경만 */
  background: #fff;
`;

const Item = styled.button`
  display: flex;
  height: 36px;
  padding: 10px;
  justify-content: center;
  align-items: center;

  border: none;                 /* Popover가 테두리 담당 */
  border-bottom: 1px solid #eee;
  background: ${({ $active }) => ($active ? "#EAEAEA" : "#FFF")};
  font-family: Pretendard;
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  line-height: 150%;
  letter-spacing: -0.32px;
  color: #000;
  cursor: pointer;

  &:last-child {
    border-bottom: none;        /* 마지막 줄 구분선 제거 */
  }

  &:hover {
    background: ${({ $active }) => ($active ? "#EAEAEA" : "#F7F7F7")};
  }
`;
