import React from 'react'
import ChevronDown from '@/assets/icons/chevron_down.png';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DetailButton = ({
    title,
    description,      // 한 줄 설명(옵션)
    to,               // 이동 경로 (react-router)
    onClick,          // 클릭 핸들러 (선택)
    className,
}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (onClick) onClick();
        else if (to) navigate(to);
    };

  return (
    <Item 
        className={className} 
        type="button" 
        onClick={handleClick} 
        aria-label={title}
    >
      <Left>
        <Title>{title}</Title>
        {description && <Desc>{description}</Desc>}
      </Left>
      
      <RightIcon src={ChevronDown} alt="" aria-hidden />
    </Item>
  )
}

export default DetailButton

const Item = styled.button`
  display: flex;
  width: 335px;
  height: 68px;
  padding: 10px 16px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  border: 0;
  border-radius: 8px;
  background: #FFEDD4;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  margin: 0 auto;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.32px;
`;

const Desc = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.24px;
  opacity: 0.8;
`;

const RightIcon = styled.img`
  width: 24px;
  height: 24px;
  transform: rotate(90deg);
`;