import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './features/auth/pages/Home';
import Receipt from './features/auth/pages/Receipt';
import Login from './features/auth/pages/Login';
import SignUp from './features/auth/pages/SignUp';
import SignUpProfile from './features/auth/pages/SignUpProfile';
import SignUpProfileSub from './features/auth/pages/SignUpProfileSub';
import SignUpComplete from './features/auth/pages/SignUpComplete';
import OnboardingEnd from './features/auth/pages/OnboardingEnd';

import React from 'react'
import './App.css'
import Main from './pages/Main';
import MarketDetail from './pages/MarketDetail';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<Main />} />
        <Route path="/receipt" element={<Receipt />} />

        {/* 인증 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 회원가입 단계 진행 */}
        <Route path="/signup/profile" element={<SignUpProfile />} />
        <Route path="/signup/profile-sub" element={<SignUpProfileSub />} />
        <Route path="/signup/complete" element={<SignUpComplete />} />
        <Route path="/signup/end" element={<OnboardingEnd />} />

        {/* 시장 */}
        <Route path="/market" element={<MarketDetail />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
