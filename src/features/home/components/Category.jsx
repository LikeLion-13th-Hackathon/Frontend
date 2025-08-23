import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchStores } from "@/shared/api/store";

// 카테고리 순서 고정
const FIXED_ORDER = ["Fresh", "Snacks", "Goods", "Restaurants"];

// 카테고리별 아이콘 매핑
import TagFresh from "@/assets/icons/tag_fresh.svg?react";
import TagSnacks from "@/assets/icons/tag_snacks.svg?react";
import TagGoods from "@/assets/icons/tag_goods.svg?react";
import TagRestaurants from "@/assets/icons/tag_restaurants.svg?react";

const CATEGORY_ICONS = {
  Fresh: TagFresh,
  Snacks: TagSnacks,
  Goods: TagGoods,
  Restaurants: TagRestaurants,
};

const Category = ({ selectedId, onSelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchStores()
      .then((res) => {
        const uniqueCats = [...new Set(res.data.map((s) => s.category))];

        // 고정 순서대로 정렬
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
        const IconComp = CATEGORY_ICONS[cat];
        const ActiveSvg = makeStyledSvg(IconComp); // 여기서 styled 생성

        return (
          <CategoryItem
            key={cat}
            $active={cat === selectedId}
            onClick={() => onSelect(cat)}
          >
            <ActiveSvg $active={cat === selectedId} />
            <Label $active={cat === selectedId}>{cat}</Label>
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
  overflow-x: auto;
  gap: 10px;
  margin: 30px 20px 0;
  padding-bottom: 4px;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryItem = styled.div`
  display: flex;
  height: 36px;
  padding: 0 14px 0 10px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background: ${(p) => (p.$active ? "var(--pri, #ff6900)" : "#ffedd4")};
`;

const Label = styled.span`
  font-size: 12px;
  line-height: 150%;
  letter-spacing: -0.24px;
  color: ${(p) => (p.$active ? "#fff" : "#707070")};
  font-weight: ${(p) => (p.$active ? 600 : 400)};
`;

const makeStyledSvg = (Comp) => styled(Comp)`
  width: 13px;
  height: 13px;
  flex-shrink: 0;

  path,
  circle,
  rect,
  line,
  polygon {
    fill: currentColor !important;
    stroke: currentColor !important;
  }

  color: ${(p) => (p.$active ? "#fff" : "#707070")};
`;
