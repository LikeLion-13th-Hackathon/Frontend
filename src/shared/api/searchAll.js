import apiClient from "./apiClient";

/**
 * 전역 자동완성
 * GET /search/suggest?q=키워드
 */
export async function suggestAll(q, { signal } = {}) {
  if (!q) return [];
  const { data } = await apiClient.get("/search/suggest", {
    params: { q },
    signal,
  });
  return data;
}

/**
 * 전역 트렌딩
 * GET /search/trending?limit=8
 */
export async function fetchTrendingAll({ limit = 8 } = {}) {
  const { data } = await apiClient.get("/search/trending/", {
    params: { limit },
  });
  return data;
}

/**
 * 추천 (Check this place out)
 * GET /search/discover?limit=10
 */
export async function fetchDiscover({ limit = 10 } = {}) {
  const { data } = await apiClient.get("/search/discover/", {
    params: { limit },
  });
  // 기대 응답: [{ id, name, desc, thumbnailUrl, marketName, likes }]
  return data;
}

/**
 * 스토어 검색
 * GET /store/?search_by=키워드
 * @returns Array<{ id, name, desc, thumbnailUrl, marketName, reviewCount }>
 */
export async function searchStores({ keyword, signal } = {}) {
  if (!keyword) return [];

  const { data } = await apiClient.get("/store/", {
    params: { search_by: keyword },
    signal,
  });

  console.log("🔥 서버 원본 응답:", JSON.stringify(data, null, 2));

  // 백엔드 응답 매핑
  return (data.results || data || []).map((x) => ({
    id: x.store_id,
    name: x.store_name,
    desc: x.road_address ?? "",
    thumbnailUrl: x.store_image ?? null,
    marketName: x.store_english ?? "",
    reviewCount: x.review_count ?? 0,
    firstMenu: x.menu_list?.[0] || null,
  }));
}

// /**
//  * Check this place out (추천)
//  * /search?q=&scopes=store&limit=60
//  */
// export async function fetchDiscover({ limit = 60 } = {}) {
//   const { data } = await apiClient.get("/search", {
//     params: { q: "", scopes: "store", limit },
//   });
//   return data.items || [];
// }