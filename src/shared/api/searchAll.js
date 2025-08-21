// src/shared/api/searchAll.js
import { api } from "@/shared/api/apiClient";

/**
 * 전역 자동완성
 * GET /search/suggest?q=키워드
 * @returns string[] | { text: string, type?: string }[]
 */
export async function suggestAll(q, { signal } = {}) {
  if (!q) return [];
  const { data } = await api.get("/search/suggest", { params: { q }, signal });
  return data;
}

/**
 * 전역 트렌딩(웜 상태)
 * GET /search/trending?limit=8
 * @returns Array<{ type: string, id: number|string, ... }>
 */
export async function fetchTrendingAll({ limit = 8 } = {}) {
  const { data } = await api.get("/search/trending", { params: { limit } });
  return data;
}

/**
 * 전역 검색
 * GET /search?q=...&limit=20&cursor=abc&scopes=market,store,menu,post,user,tag
 * @returns { items: any[], nextCursor: string|null, total?: number }
 */
export async function searchAll({ q, scopes = [], limit = 20, cursor = null, signal } = {}) {
  const params = { q, limit };
  if (cursor) params.cursor = cursor;
  if (scopes?.length) params.scopes = scopes.join(",");
  const { data } = await api.get("/search", { params, signal });
  return data;
}

// 추천(= Check this place out)
export async function fetchDiscover({ limit = 10 } = {}) {
  // 백엔드 엔드포인트에 맞게 경로만 바꿔도 됩니다.
  // 예시1) /search/discover  예시2) /markets/recommend
  const { data } = await api.get("/search/discover", { params: { limit } });
  // 기대 응답: [{ id, name, desc, thumbnailUrl, marketName, likes }]
  return data;
}

