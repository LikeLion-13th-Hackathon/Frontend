import React from 'react'
import styled from 'styled-components'

import SubwayIcon from "@/assets/icons/location.svg?react";   // ✅ 시장 아이콘
import TagFresh from "@/assets/icons/tag_fresh.svg?react";
import TagSnacks from "@/assets/icons/tag_snacks.svg?react";
import TagGoods from "@/assets/icons/tag_goods.svg?react";
import TagRestaurants from "@/assets/icons/tag_restaurants.svg?react";

// API에서 내려주는 값 그대로 매핑
const CATEGORY_ICON = {
  Fresh: TagFresh,
  Snacks: TagSnacks,
  Goods: TagGoods,
  Restaurants: TagRestaurants,
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
  const lineLabel = MARKET_MAP[store?.market_id] ?? '시장';
  const catKey = store?.category ?? 'Restaurants';
  const catIcon = CATEGORY_ICON[catKey];
  const catLabel = CATEGORY_LABEL[catKey] ?? catKey;

  return (
    <TagBox>
      {/* 시장 태그 */}
      <TagPill>
        <TagIcon>
          <SubwayIcon />
        </TagIcon>
        <TagText>{lineLabel}</TagText>
      </TagPill>

      {/* 카테고리 태그 */}
      <TagPill>
        <TagIcon>
          {React.createElement(catIcon)}
        </TagIcon>
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
  background: #FFF7ED;  /* 배경색 */
  line-height: 1;
  color: #FF8904;       /* 글자/아이콘 색 */
`;

const TagIcon = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 14px;
    height: 14px;
  }

   /* 바깥 path는 주황색 */
  svg path {
    fill: currentColor !important;
    stroke: currentColor !important;
  }

  /* 안쪽 점(circle)은 투명 */
  svg circle {
    fill: transparent !important;
    stroke: none !important;
  }
`;


const TagText = styled.span`
  color: currentColor;   /* TagPill의 color 상속 */
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.2px;
`;

