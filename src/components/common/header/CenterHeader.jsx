import React from "react";
import styled from "styled-components";

export default function CenterHeader({ title, left, right }) {
  return (
    <Header>
      <Side>{left}</Side>
      <Title>{title}</Title>
      <Side>{right}</Side>
    </Header>
  );
}

const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* width: 375px; */
  width: 100%;
  max-width: 375px;
  margin: 0 auto;

  height: 56px;
  padding: 0 20px;
  flex-shrink: 0;

  /* border-bottom: 1px solid #D2D2D2; */
  background: #FFF;
`;

const Title = styled.h1`
  color: #000;
    text-align: center;

    /* body/body 1-em */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
`;

const Side = styled.div`
    display: flex;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
`;
