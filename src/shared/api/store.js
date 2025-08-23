// src/shared/api/store.js
import { api } from "./base"; // axios instance

// 전체 가게 조회
export const fetchStores = () => api.get("store/");

// 특정 가게 상세 조회
export const fetchStoreDetail = (id) => api.get(`store/${id}/`);

// 검색
export const searchStores = (keyword) => api.get(`store/?search_by=${keyword}`);

// 카테고리 필터링
export const filterStoresByCategory = (category) => api.get(`store/?category=${category}`);

// 정렬
export const sortStores = (type) => api.get(`store/?sort_by=${type}`);

// 특정 시장 내 가게 정렬
export const filterStoresByMarket = (marketId) => api.get(`store/?market=${marketId}`);

// 특정 시장 + 카테고리
export const filterStoresByMarketAndCategory = (marketId, category) =>
  api.get(`store/?market=${marketId}&category=${category}`);