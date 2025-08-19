import React from 'react';
import styled from 'styled-components';

export default function RewardModal({ open, onClose, reward, score }) {
  if (!open) return null;
  return (
    <Backdrop onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <h3>🎉 Chat Complete!</h3>
        <p style={{ margin: 8 }}>Score: <b>{score}</b></p>
        <p style={{ margin: 8 }}>
          Reward: <b>{reward.exp} EXP</b> &nbsp; <Badge>{reward.badge}</Badge>
        </p>
        <PrimaryButton onClick={onClose}>Close</PrimaryButton>
      </Modal>
    </Backdrop>
  );
}

/* ------------------------ styled-components ------------------------ */

const Backdrop = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,.4);
  display: flex; align-items: center; justify-content: center;
`;

const Modal = styled.div`
  background: #fff; border-radius: 16px; padding: 20px;
  width: 90%; max-width: 360px; text-align: center;
`;

const Badge = styled.span`
  display: inline-block; background: #10b981; color: #fff;
  padding: 2px 8px; border-radius: 9999px; font-size: 12px;
`;

const PrimaryButton = styled.button`
  width: 100%; padding: 14px; border: none; border-radius: 12px;
  background: #111827; color: #fff; font-weight: 700; cursor: pointer;
  &:disabled { opacity: .6; cursor: not-allowed; }
`;
