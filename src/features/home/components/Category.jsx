import React from 'react'
import styled from 'styled-components'
import PinIcon from "@/assets/icons/main_pin.png";
import HorizontalScroll from "@/components/common/HorizontalScroll";

const Category = ( { selectedId, onSelect }) => {
    const categories = [
        { id: 1, label: 'Fresh', icon: PinIcon },
        { id: 2, label: 'Snacks', icon: PinIcon },
        { id: 3, label: 'Goods', icon: PinIcon },
        { id: 4, label: 'Restaurants', icon: PinIcon },
    ]

  return (
    <Wrapper>
        {categories.map((cat) => (
            <CategoryItem 
                key = {cat.id}
                $active = {cat.id === selectedId}
                onClick={() => onSelect(cat.id)} 
            >
                <Icon src={cat.icon} alt="" />
                <Label $active={cat.id === selectedId}>{cat.label}</Label>
            </CategoryItem>
        ))}
    </Wrapper>
  )
}

export default Category

const Wrapper = styled.div`
    display: inline-flex;
    align-items: flex-start;
    gap: 10px;

    margin: 30px 20px 0;
    /* padding: 0 16px; */
`;

const CategoryItem = styled.div`
    display: flex;
    height: 36px;
    padding: 0 14px 0 10px;
    justify-content: center;
    align-items: center;
    gap: 6px;

    border-radius: 8px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10);
    cursor: pointer;

    background: ${p => (p.$active ? 'var(--pri, #6D6D6D)' : '#FFF')};
`
const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

const Label = styled.span`
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;

    color: ${p => (p.$active ? '#FFF' : '#707070')};
    font-weight: ${p => (p.$active ? 600 : 400)};
`