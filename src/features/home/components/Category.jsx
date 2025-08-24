import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchStores } from "@/shared/api/store";

const FIXED_ORDER = ["Fresh", "Snacks", "Goods", "Restaurants"];

import TagFresh from "@/assets/icons/tag_fresh.svg?react";
import TagSnacks from "@/assets/icons/tag_snacks.svg?react";
import TagGoods from "@/assets/icons/tag_goods.svg?react";
import TagRestaurants from "@/assets/icons/tag_restaurants.svg?react";

// 1) 원본 아이콘 매핑
const CATEGORY_ICONS = {
  Fresh: TagFresh,
  Snacks: TagSnacks,
  Goods: TagGoods,
  Restaurants: TagRestaurants,
};

// 2) 렌더 밖(모듈 스코프)에서 한 번만 styled 래핑
const baseSvgStyle = `
  width: 13px;
  height: 13px;
  flex-shrink: 0;

  path, circle, rect, line, polygon {
    fill: currentColor !important;
    stroke: currentColor !important;
  }
`;

const STYLED_ICONS = {
  Fresh: styled(TagFresh)`
    ${baseSvgStyle}
    color: ${(p) => (p.$active ? "#fff" : "#ff8904")};
  `,
  Snacks: styled(TagSnacks)`
    ${baseSvgStyle}
    color: ${(p) => (p.$active ? "#fff" : "#ff8904")};
  `,
  Goods: styled(TagGoods)`
    ${baseSvgStyle}
    color: ${(p) => (p.$active ? "#fff" : "#ff8904")};
  `,
  Restaurants: styled(TagRestaurants)`
    ${baseSvgStyle}
    color: ${(p) => (p.$active ? "#fff" : "#ff8904")};
  `,
};

const Category = ({ selectedId, onSelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchStores()
      .then((res) => {
        const uniqueCats = [...new Set(res.data.map((s) => s.category))];
        const orderedCats = FIXED_ORDER.filter((cat) =>
          uniqueCats.includes(cat)
        );
        setCategories(orderedCats);
      })
      .catch((err) => console.error("❌ 카테고리 로드 실패:", err));
  }, []);

  return (
    <Wrapper>
      {categories.map((cat) => {
        const Icon = STYLED_ICONS[cat]; // ✅ 렌더에서는 참조만
        const active = cat === selectedId;
        return (
          <CategoryItem
            key={cat}
            $active={active}
            onClick={() => onSelect(cat)}
          >
            <Icon $active={active} />
            <Label $active={active}>{cat}</Label>
          </CategoryItem>
        );
      })}
    </Wrapper>
  );
};

export default Category;

// === styled ===
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;                     /* 아이템 간 간격 */
  width: 100%;
  padding: 0 20px;               /* 좌우 여백 (필요 없으면 0으로) */
  overflow-x: auto;              /* 가로 스크롤 허용 */
  overflow-y: hidden;
  margin-top: 20px;
  flex-wrap: nowrap;             /* 한 줄로 쭉 이어짐 */
  -webkit-overflow-scrolling: touch; /* 모바일 부드러운 스크롤 */
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const CategoryItem = styled.div`
  flex: 0 0 auto;                 /* 줄바꿈 없이 이어짐 */
  display: flex;
  height: 36px;
  padding: 0 14px 0 10px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 8px;
  cursor: pointer;
  background: ${(p) => (p.$active ? "var(--pri, #ff6900)" : "#ffedd4")};
`;



const Label = styled.span`
  font-size: 12px;
  line-height: 150%;
  letter-spacing: -0.24px;
  color: ${(p) => (p.$active ? "#fff" : "#ff8904")};
  font-weight: ${(p) => (p.$active ? 600 : 400)};
`;
