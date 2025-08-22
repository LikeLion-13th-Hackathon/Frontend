import React from "react";

// 카테고리별 아이콘 import
// 1. restaurants
import IconChange from "@/assets/icons/restaurants/change.svg?react";
import IconWater from "@/assets/icons/restaurants/water.svg?react";

// 2. fresh
import IconFreshness from "@/assets/icons/fresh/freshness.svg?react";
import IconStore from "@/assets/icons/fresh/store.svg?react";
import IconPrice2 from "@/assets/icons/fresh/price2.svg?react";
import IconOrigin from "@/assets/icons/fresh/origin.svg?react";

// 3. goods
import IconProduct from "@/assets/icons/goods/product.svg?react";
import IconPrice from "@/assets/icons/goods/price.svg?react";
import IconOptions from "@/assets/icons/goods/options.svg?react";
import IconQuality from "@/assets/icons/goods/quality.svg?react";
import IconReturn from "@/assets/icons/goods/return.svg?react";

// 4. snacks
import IconMenu from "@/assets/icons/snacks/menu.svg?react";
import IconOrder from "@/assets/icons/snacks/placing.svg?react";
import IconPortion from "@/assets/icons/snacks/portion.svg?react";
import IconTakeout from "@/assets/icons/snacks/takeout.svg?react";
import IconPay from "@/assets/icons/snacks/pay.svg?react";
import IconIngredient from "@/assets/icons/snacks/ingredient.svg?react";

import TopicIconPlaceholder from "@/assets/icons/topic_placeholder.png";

// 매핑
const TOPIC_ICON_MAP = {
  change: IconChange,
  water: IconWater,

  freshness: IconFreshness,
  store: IconStore,
  price2: IconPrice2,
  origin: IconOrigin,

  product: IconProduct,
  price: IconPrice,
  options: IconOptions,
  quality: IconQuality,
  return: IconReturn,

  placing: IconOrder,
  menu: IconMenu,
  portion: IconPortion,
  takeout: IconTakeout,
  pay: IconPay,
  ingredient: IconIngredient,
};

// key normalize 함수
function normalizeKey(raw = "") {
  const text = raw.toLowerCase();
  if (text.includes("placing")) return "placing";
  if (text.includes("menu")) return "menu";
  if (text.includes("portion")) return "portion";
  if (text.includes("takeout") || text.includes("to-go")) return "takeout";
  if (text.includes("pay")) return "pay";
  if (text.includes("ingredient")) return "ingredient";
  if (text.includes("changing") || text.includes("quantity")) return "change";
  if (text.includes("water") || text.includes("side")) return "water";
  if (text.includes("product")) return "product";
  if (text.includes("bargain")) return "price";
  if (text.includes("size") || text.includes("color")) return "options";
  if (text.includes("quality")) return "quality";
  if (text.includes("return") || text.includes("exchange")) return "return";
  if (text.includes("fresh")) return "freshness";
  if (text.includes("store") || text.includes("cooking")) return "store";
  if (text.includes("price")) return "price2";
  if (text.includes("origin")) return "origin";
  return null;
}

export default function TopicIcon({ id, size = 27 }) {
  const normalizedKey = normalizeKey(id);
  const IconComponent = TOPIC_ICON_MAP[normalizedKey];

  if (!IconComponent) {
    return (
      <img
        src={TopicIconPlaceholder}
        alt={id}
        style={{ width: size, height: size }}
      />
    );
  }
  return <IconComponent width={size} height={size} />;
}
