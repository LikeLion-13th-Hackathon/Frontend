import React from 'react'
import styled from 'styled-components';

const LeftHeader = ( { title,
  leftIcon,
  rightIcon,
  onLeftClick,
  onRightClick,
  width = "375px",
  border = true,
  overlay = false,
  className,}) => {

  return (
    <Header $overlay={overlay} $width={width} $border={border} className={className} role="banner">
      {leftIcon && (
        <IconButton type="button" onClick={onLeftClick} aria-label="left-button">
          <Icon src={leftIcon} alt="" />
        </IconButton>
      )}

      {/* {leftIcon ? (
        <IconButton type="button" onClick={onLeftClick} aria-label="left-button">
          <Icon src={leftIcon} alt="" />
        </IconButton>
      ) : (
        <Spacer />
      )} */}

      {/* 타이틀은 왼쪽 정렬, 오른쪽 아이콘은 오른쪽으로 밀림 */}
      <HeaderTitle>{title}</HeaderTitle>

      {rightIcon ? (
        <IconButton type="button" onClick={onRightClick} aria-label="right-button">
          <Icon src={rightIcon} alt="" />
        </IconButton>
      ) : (
        <Spacer />
      )}
    </Header>
  )
}

export default LeftHeader

const Header = styled.header`
  position: ${p => (p.$overlay ? 'absolute' : 'sticky')};
  top: 0;
  z-index: 10;
  display: flex;
  width: ${(p) => p.$width};
  height: 56px;
  padding: 0 20px;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;

  background: ${p => (p.$overlay ? 'transparent' : '#FFF')};
  border-bottom: ${p => (p.$overlay ? 'none' : '1px solid #D2D2D2')};

  /* border-bottom: ${(p) => (p.$border ? "1px solid #E8E8E8" : "none")}; */
  /* background: #fff; */
`;

const HeaderTitle = styled.div`
  flex: 1 0 0;       /* 오른쪽 아이콘을 끝으로 밀기 */
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.32px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: block;
`;

// 아이콘 터치 영역 확보
const IconButton = styled.button`
  padding: 0;
  margin: 0;
  background: transparent;
  border: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

// 아이콘 없어도 그 자리만큼의 공간 차지
const Spacer = styled.div`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;