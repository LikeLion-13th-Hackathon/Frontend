// src/shared/api/ai.js
import apiClient from "./apiClient";

/**
 * AI 추천 토픽 가져오기
 * @param {string} category - fresh, etc
 */
export async function fetchAiTopics(category = "fresh") {
  const { data } = await apiClient.get(`/ai/topics`, {
    params: { category },
  });

  console.log("[fetchAiTopics] response:", data);
  
  return data;
}

/**
 * AI Chat 대화 요청
 * @param {Object} params
 * @param {string} params.category - 카테고리
 * @param {string} params.topic - 토픽 ID
 * @param {string} params.role - "user" | "store"
 * @param {string} params.message - 메시지 텍스트
 * @param {boolean} [params.retry=false] - 재시도 여부
 * @param {string} [params.threadId] - 스레드 ID (없으면 topic 사용)
 */
export async function postChatMessage({
  category,
  topic,
  role,
  message,
  retry = false,
}) {
  const body = {
    thread_id: topic,   // 항상 topic과 동일
    category,
    topic,
    retry: String(retry),  // "true"/"false" 문자열
    role,
    message,
  };

  const { data } = await apiClient.post(`/ai/chat/`, body);
  return data;
}
