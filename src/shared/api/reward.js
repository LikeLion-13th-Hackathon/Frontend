import { api } from './base';

/** 로그인 사용자 포인트 히스토리 조회 */
export async function getRewardHistory() {
  const { data } = await api.get('/account/reward/');
  return data?.results ?? [];
}

/** 포인트 증감 (delta: 양수=추가, 음수=차감), caption 필수 */
export async function postReward({ delta, caption }) {
  const { data } = await api.post('/account/reward/', { delta, caption });
  // data: { delta, caption, balance, changed, history_id }
  return data;
}