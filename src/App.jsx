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
import ChatSimulator from '@/features/chat/pages/ChatSimulator';
import ChatLoading from '@/features/chat/pages/ChatLoading';

// 마켓
import MarketDetail from '@/features/market/pages/MarketDetail';

// 리뷰 페이지
import ReviewRestaurant from '@/features/review/pages/ReviewRestaurant';
import ReviewFresh from '@/features/review/pages/ReviewFresh';
import ReviewGoods from '@/features/review/pages/ReviewGoods';
import ReviewSnack from '@/features/review/pages/ReviewSnack';
import ReviewConversation from '@/features/review/pages/ReviewConversation';
import ReviewFeedback from '@/features/review/pages/ReviewFeedback';
import ReviewComplete from '@/features/review/pages/ReviewComplete';

// 가게
import StoreDetail from '@/features/store/pages/StoreDetail';

// 마이페이지
import Mypage from '@/features/mypage/pages/Mypage';
import MyReviews from '@/features/mypage/pages/MyReviews';

// 검색/리워드
import SearchPage from '@/features/search/pages/Search';
import Reward from '@/features/reward/pages/Reward';

/* ===== 라우트 가드 (간단 버전) ===== */
const hasAccessToken = () => !!localStorage.getItem('access_token');

function ProtectedRoute({ children }) {
  return hasAccessToken() ? children : <Navigate to="/login" replace />;
}

// 로그인 상태면 접근 막고 /home으로
function PublicOnlyRoute({ children }) {
  return hasAccessToken() ? <Navigate to="/home" replace /> : children;
}
/* ================================= */

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 앱 시작 시 로그인으로 */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 로그인/회원가입/온보딩: 로그인 되어 있으면 /home 으로 보냄 */}
        <Route path="/login" element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        } />
        <Route path="/signup" element={
          <PublicOnlyRoute>
            <SignUp />
          </PublicOnlyRoute>
        } />
        <Route path="/signup/profile" element={
          <PublicOnlyRoute>
            <SignUpProfile />
          </PublicOnlyRoute>
        } />
        <Route path="/signup/profile-sub" element={
          <PublicOnlyRoute>
            <SignUpProfileSub />
          </PublicOnlyRoute>
        } />
        <Route path="/signup/complete" element={
          <PublicOnlyRoute>
            <SignUpComplete />
          </PublicOnlyRoute>
        } />
        <Route path="/onboarding-end" element={
          <PublicOnlyRoute>
            <OnboardingEnd />
          </PublicOnlyRoute>
        } />

        {/* 홈: 로그인 필요 */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        {/* 이하 페이지들도 로그인 필요로 보호 */}
        <Route path="/receipt" element={
          <ProtectedRoute>
            <Receipt />
          </ProtectedRoute>
        } />

        <Route path="/chat" element={
          <ProtectedRoute>
            <ChatLoading />
          </ProtectedRoute>
        } />
        <Route path="/chat/simulator" element={
          <ProtectedRoute>
            <ChatSimulator />
          </ProtectedRoute>
        } />

        {/* 리뷰 */}
        <Route path="/review/restaurant" element={
          <ProtectedRoute><ReviewRestaurant /></ProtectedRoute>
        } />
        <Route path="/review/fresh" element={
          <ProtectedRoute><ReviewFresh /></ProtectedRoute>
        } />
        <Route path="/review/goods" element={
          <ProtectedRoute><ReviewGoods /></ProtectedRoute>
        } />
        <Route path="/review/snack" element={
          <ProtectedRoute><ReviewSnack /></ProtectedRoute>
        } />
        <Route path="/review/conversation" element={
          <ProtectedRoute><ReviewConversation /></ProtectedRoute>
        } />
        <Route path="/review/feedback" element={
          <ProtectedRoute><ReviewFeedback /></ProtectedRoute>
        } />
        <Route path="/review/complete" element={
          <ProtectedRoute><ReviewComplete /></ProtectedRoute>
        } />

        {/* 마켓/스토어 */}
        <Route path="/market" element={
          <ProtectedRoute><MarketDetail /></ProtectedRoute>
        } />
        <Route path="/store/:id" element={
          <ProtectedRoute><StoreDetail /></ProtectedRoute>
        } />

        {/* 마이페이지 */}
        <Route path="/mypage" element={
          <ProtectedRoute><Mypage /></ProtectedRoute>
        } />
        <Route path="/mypage/reviews" element={
          <ProtectedRoute><MyReviews /></ProtectedRoute>
        } />

        {/* 검색/리워드 */}
        <Route path="/search" element={
          <ProtectedRoute><SearchPage /></ProtectedRoute>
        } />
        <Route path="/reward" element={
          <ProtectedRoute><Reward /></ProtectedRoute>
        } />

        {/* 없는 경로 → 로그인으로 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
