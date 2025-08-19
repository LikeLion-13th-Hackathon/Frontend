import React from 'react';
import styled from 'styled-components';

export default function MessageCard({ sender = 'bot', children }) {
  return <Bubble $sender={sender}>{children}</Bubble>;
}

/* ------------------------ styled-components ------------------------ */

const Bubble = styled.div`
  max-width: 78%;
  padding: 10px 12px;
  border-radius: 12px;
  margin: 6px 0;
  white-space: pre-wrap;
  ${({ $sender }) =>
    $sender === 'bot'
      ? `background:#eef2ff; border-top-left-radius:4px;`
      : `background:#e5e7eb; margin-left:auto; border-top-right-radius:4px;`}
`;
