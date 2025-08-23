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
import ChatLoading from './features/chat/pages/ChatLoading';


// 마켓
import MarketDetail from '@/features/market/pages/MarketDetail';

// 리뷰 페이지
import ReviewRestaurant from '@/features/review/pages/ReviewRestaurant';
import ReviewFresh from '@/features/review/pages/ReviewFresh';
import ReviewGoods from '@/features/review/pages/ReviewGoods';
import ReviewSnack from '@/features/review/pages/ReviewSnack';
import ReviewConversation from "@/features/review/pages/ReviewConversation";
import ReviewFeedback from '@/features/review/pages/ReviewFeedback';
import ReviewComplete from './features/review/pages/ReviewComplete';

// 가게
import StoreDetail from '@/features/store/pages/StoreDetail';

// 마이페이지
import Mypage from '@/features/mypage/pages/Mypage';
import MyReviews from './features/mypage/pages/MyReviews';

// 검색
import SearchPage from './features/search/pages/Search';
import Reward from './features/reward/pages/Reward';


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
        <Route path="/onboarding-end" element={<OnboardingEnd />} />

        {/* AI 챗 시뮬레이터 */}
        <Route path="/chat" element={<ChatLoading />} />
        <Route path="/chat/simulator" element={<ChatSimulator />} />


        {/* 리뷰 */}
        {/* 개별 1단계 */}
        <Route path="/review" element={<ReviewRestaurant />} />
        <Route path="/review/fresh" element={<ReviewFresh />} />
        <Route path="/review/goods" element={<ReviewGoods />} />
        <Route path="/review/snack" element={<ReviewSnack />} />

        {/* 공통 2단계 */}
        <Route path="/review/conversation" element={<ReviewConversation />} />
          
        {/* 공통 3단계 */}
        <Route path="/review/feedback" element={<ReviewFeedback />} />
          
        {/* 공통 4단계 */}
        <Route path="/review/complete" element={<ReviewComplete />} />

        {/* 마켓 상세 */}
        <Route path="/market" element={<MarketDetail />} />

        {/* 스토어 상세 */}
        <Route path="/store/:id" element={<StoreDetail />} />

        {/* 없는 경로 → 홈 */}
        <Route path="*" element={<Navigate to="/" replace />} />
            
        {/* 마이페이지 */}
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/reviews" element={<MyReviews />} />

        {/* 검색 */}
        <Route path="/search" element={<SearchPage />} />

        {/* 리워드 */}
        <Route path="/reward" element={<Reward />} />
        
      </Routes>
    </BrowserRouter>
  );
}
