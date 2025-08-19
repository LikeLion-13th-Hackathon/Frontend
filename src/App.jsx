// src/App.jsx
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

// 메인 페이지
import Home from '@/features/home/pages/Home';

// 인증/가입
import Login from '@/features/auth/pages/Login';
import SignUp from '@/features/auth/pages/SignUp';
import SignUpProfile from '@/features/auth/pages/SignUpProfile';
import SignUpProfileSub from '@/features/auth/pages/SignUpProfileSub';
import SignUpComplete from '@/features/auth/pages/SignUpComplete';
import OnboardingEnd from '@/features/auth/pages/OnboardingEnd';

// 영수증
import Receipt from '@/features/auth/pages/Receipt';

// ✅ 챗 시뮬레이터
import ChatSimulator from '@/features/chat/pages/ChatSimulator';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<Home />} />
        <Route path="/receipt" element={<Receipt />} />

        {/* 인증 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 회원가입 단계 진행 */}
        <Route path="/signup/profile" element={<SignUpProfile />} />
        <Route path="/signup/profile-sub" element={<SignUpProfileSub />} />
        <Route path="/signup/complete" element={<SignUpComplete />} />
        <Route path="/signup/end" element={<OnboardingEnd />} />

        {/* 챗 시뮬레이터 */}
        <Route path="/chat/simulator" element={<ChatSimulator />} />

        {/* 없는 경로는 홈으로 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
