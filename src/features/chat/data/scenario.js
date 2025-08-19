// 간단한 키워드 기반 시나리오 데이터
export const scenario = {
  id: 'placing-order',
  title: 'Placing an Order',
  steps: [
    {
      id: 1,
      system: 'You entered a cafe. Greet the staff.',
      expected: ['hello', 'hi', 'good morning'],
      hints: { ko: '직원을 보고 가볍게 인사해요.', en: 'Say a casual greeting to the staff.' },
      sample: { en: 'Hello!', ko: '안녕하세요!' },
    },
    {
      id: 2,
      system: 'Order one americano politely.',
      expected: ['one americano', 'an americano', 'americano please'],
      hints: { ko: '아메리카노 1잔을 공손히 주문해요.', en: 'Politely ask for one Americano.' },
      sample: { en: 'One americano, please.', ko: '아메리카노 하나 주세요.' },
    },
    {
      id: 3,
      system: 'Choose hot or iced.',
      expected: ['hot', 'iced'],
      hints: { ko: '핫/아이스 중 하나를 말해요.', en: 'Say “hot” or “iced”.' },
      sample: { en: 'Iced, please.', ko: '아이스로 주세요.' },
    },
  ],
  reward: { exp: 30, badge: '🧋 First Order' },
};
