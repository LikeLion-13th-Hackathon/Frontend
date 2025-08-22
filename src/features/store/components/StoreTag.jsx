import React from 'react'
import styled from 'styled-components'

import SubwayIcon from '@/assets/icons/pin_gray.png';
import FreshIcon from '@/assets/icons/tag_fresh.png'
import SnacksIcon from '@/assets/icons/tag_snacks.png'
import GoodsIcon from '@/assets/icons/tag_goods.png'
import RestaurantsIcon from '@/assets/icons/tag_restaurants.png'

// API에서 내려주는 값 그대로 매핑
const CATEGORY_ICON = {
  Fresh: FreshIcon,
  Snacks: SnacksIcon,
  Goods: GoodsIcon,
  Restaurants: RestaurantsIcon,
};

const CATEGORY_LABEL = {
  Fresh: 'Fresh',
  Snacks: 'Snacks',
  Goods: 'Goods',
  Restaurants: 'Restaurants',
};

const MARKET_MAP = {
  1: "흑석시장",
  2: "상도전통시장",
  3: "노량진수산시장",
};

const StoreTag = ({ store }) => {
  // market_id 기반 시장명
  const lineLabel = MARKET_MAP[store?.market_id] ?? '시장';
  const catKey = store?.category ?? 'Restaurants';
  const catIcon = CATEGORY_ICON[catKey];
  const catLabel = CATEGORY_LABEL[catKey] ?? catKey;

  return (
    <TagBox>
      {/* 시장 태그 */}
      <TagPill>
        <TagIcon src={SubwayIcon} alt="" aria-hidden />
        <TagText>{lineLabel}</TagText>
      </TagPill>

      {/* 카테고리 태그 */}
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
`;

const TagPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 4px 6px;
  border-radius: 6px;
  background: #ffb86a;;
  line-height: 1;
`;

const TagIcon = styled.img`
  width: 14px;
  height: 14px;
  display: block;
  filter: brightness(0) saturate(100%);
`;

const TagText = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 15px */
  letter-spacing: -0.2px;
`;
