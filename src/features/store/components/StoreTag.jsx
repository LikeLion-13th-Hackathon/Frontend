import React from 'react'
import styled from 'styled-components'

import SubwayIcon from '@/assets/icons/pin_gray.png';
import FreshIcon from '@/assets/icons/tag_fresh.png'
import SnacksIcon from '@/assets/icons/tag_snacks.png'
import GoodsIcon from '@/assets/icons/tag_goods.png'
import RestaurantsIcon from '@/assets/icons/tag_restaurants.png'

// 백에서 받을 카테고리 키 -> 아이콘/라벨 매핑
const CATEGORY_ICON = {
    fresh: FreshIcon,
    snacks: SnacksIcon,
    goods: GoodsIcon,
    restaurants: RestaurantsIcon,
};

const CATEGORY_LABEL = {
    fresh: 'Fresh',
    snacks: 'Snacks',
    goods: 'Goods',
    restaurants: 'Restaurants',
}

const StoreTag = ( {store = MOCK_STORE} ) => {
    const lineLabel = store.line ?? '호선';
    const catKey = store.category ?? 'korean';
    const catIcon = CATEGORY_ICON[catKey];
    const catLabel = CATEGORY_LABEL[catKey] ?? catKey;

  return (
    <TagBox>
        {/* 호선 태그 (아이콘 고정) */}
        <TagPill>
            <TagIcon src={SubwayIcon} alt="" aria-hidden />
            <TagText>{lineLabel}</TagText>
        </TagPill>

        {/* 카테고리 태그 (4종 중 매핑) */}
        <TagPill>
            {catIcon && <TagIcon src={catIcon} alt="" aria-hidden />}
            <TagText>{catLabel}</TagText>
        </TagPill>
    </TagBox>
  )
}

export default StoreTag

const TagBox = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`

const TagPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px 6px;
  border-radius: 6px;
  background: #EAEAEA;
  line-height: 1;
`;


const TagIcon = styled.img`
  width: 14px;
  height: 14px;
  display: block;
`;

const TagText = styled.span`
  color: #818181;

    /* caption/caption 2 */
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 15px */
    letter-spacing: -0.2px;
`;