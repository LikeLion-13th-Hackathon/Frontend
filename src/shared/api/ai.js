// 프론트에서 직접 키 쓰지 말고, 백엔드 프록시(/api/chat)를 호출하세요.
export async function askAI({ question, context = [], scenario = '' }) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question,
      context,   // [{role:'user'|'assistant', content:string}]
      scenario,  // 선택된 시나리오 제목 등 컨텍스트
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || `AI API error: ${res.status}`);
  }
  const data = await res.json();
  return data.answer; // 서버에서 { answer: '...'} 형태로 내려준다고 가정
}
