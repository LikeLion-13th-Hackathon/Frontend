// src/shared/api/market.js
import { api } from '@/shared/api/base';

/** 시장 리스트 그대로 가져오기 */
export const fetchMarkets = async () => {
  const { data } = await api.get('/market/list/');
  return Array.isArray(data) ? data : [];
};

