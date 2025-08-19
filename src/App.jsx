// src/App.jsx
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

// 메인
import Home from '@/features/home/pages/Home';

// 인증/가입
import Login from '@/features/auth/pages/Login';
import SignUp from '@/features/auth/pages/SignUp';
import SignUpProfile from '@/features/auth/pages/SignUpProfile';
import SignUpProfileSub from '@/features/auth/pages/SignUpProfileSub';
import SignUpComplete from '@/features/auth/pages/SignUpComplete';
import OnboardingEnd from '@/features/auth/pages/OnboardingEnd';

// 기타
import Receipt from '@/features/receipt/pages/Receipt';

// AI 챗 시뮬레이터
import AIChatSimulatorChat from '@/features/chat/pages/ChatSimulator';

// 마켓(이번 브랜치에서 추가된 상세 페이지)
import MarketDetail from '@/features/market/pages/MarketDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<Home />} />

        {/* 영수증 */}
        <Route path="/receipt" element={<Receipt />} />

        {/* 인증 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/profile" element={<SignUpProfile />} />
        <Route path="/signup/profile-sub" element={<SignUpProfileSub />} />
        <Route path="/signup/complete" element={<SignUpComplete />} />
        <Route path="/signup/end" element={<OnboardingEnd />} />

        {/* AI 챗 시뮬레이터 */}
        <Route path="/chat/simulator" element={<AIChatSimulatorChat />} />

        {/* 마켓 상세 (임시 경로) */}
        <Route path="/market" element={<MarketDetail />} />

        {/* 없는 경로 → 홈 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
