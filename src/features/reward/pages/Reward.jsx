import React, { useState } from 'react'
import Layout from "@/components/common/Layout";
import TabBar from '../../../components/common/TabBar';
import styled from 'styled-components';
import LeftHeader from '../../../components/common/header/LeftHeader';
import ReviewProfile from '../../mypage/components/ReviewProfile';
import SearchImg from '@/assets/icons/search.png';
import BackImg from "@/assets/icons/header_back.png";
import Divider from '@/components/common/Divider';
import InfoImg from '@/assets/icons/info.png';

import { loadUser } from '../../../shared/api/auth';
import defaultAvatar from '@/assets/icons/basic_profile.png';
import RedeemCard from '../components/RedeemCard';
import PointHistory from '../components/PointHistory';
import InfoModal from '../components/InfoModal';

import ReceiptUploader from '@/components/receipt/ReceiptUploader';
import ReceiptMatchModal from '@/components/receipt/ReceiptMatchModal';
import { getReceiptMatches } from '@/shared/api/receipt';
import { useNavigate } from 'react-router-dom';

//
import { postReward } from '@/shared/api/reward'; // base.js의 api 사용

const Reward = () => {
    //
    const [seeding, setSeeding] = useState(false);

    //
    async function seedHistory() {
    // 중복 시드를 막고 싶으면 localStorage 플래그 사용
    if (localStorage.getItem('reward_seeded') === '1') return alert('이미 시드됨');
    setSeeding(true);
    const steps = [
        { delta: 1000, caption: '가입 보너스' },
        { delta: 300,  caption: '리뷰 보너스' },
        { delta: 2000, caption: '이벤트 지급' },
        { delta: 150,  caption: '출석 보너스' },
        { delta: 700,  caption: '영수증 추가 보너스' },
        { delta: -500,  caption: '온누리 5,000원 교환' },
        { delta: -1000, caption: '온누리 10,000원 교환' },
        { delta: -300,  caption: '카페 결제' },
        { delta: 1200, caption: '추천인 보너스' },
        { delta: -800,  caption: '온누리 8,000원 교환' },
    ];
    try {
        for (const s of steps) {
        await postReward(s); // 토큰은 base.js 인터셉터가 자동 첨부
        }
        localStorage.setItem('reward_seeded', '1');
        setRefreshKey(k => k + 1); // PointHistory 새로고침
    } catch (e) {
        alert(e.message || '시드 실패');
    } finally {
        setSeeding(false);
    }
    }


    const [openInfo, setOpenInfo] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    // 로그인 시 저장된 유저 불러오기
    const user = loadUser();

    const rewards = user?.reward_count ?? 0;
    const placesLabel = `${rewards} ${rewards === 1 ? 'point' : 'points'}`;
    const [liveBalance, setLiveBalance] = useState(null);

    // 프로필 표시값 매핑
    const raw = (user?.profile_image && String(user.profile_image).trim()) || '';
    const avatarUrl = /^https?:\/\//i.test(raw) ? raw : defaultAvatar;
    
    const name = (user?.nickname && user.nickname.trim()) || user?.username || 'User';
    const sub =
        user?.subtitle || user?.nationality || user?.email || '';

    // 영수증
    const [lastReceipt, setLastReceipt] = useState(null);

    const navigate = useNavigate();
    const [matchOpen, setMatchOpen] = useState(false);
    const [matchData, setMatchData] = useState({ receipt: null, candidates: [] });

    //
    // --- DEV용 모달 프리뷰 데이터 ---
    const MOCK_RECEIPT = {
    id: 9999,
    store_name: '아스론가',
    store_address: '서울 은평구 연서로29길 17-3 1층',
    payment_date: '2025-08-21',
    };

    const MOCK_CANDIDATES = [
    {
        id: 101,
        store_id: 4,
        store_name: '아스론가 연신내',
        select_type: 'roadname',
        score: 97.7,
        road_address: '서울 은평구 연서로29길 17-3 1층',
        street_address: '서울 은평구 갈현동 454-8',
    },
    {
        id: 102,
        store_id: 2,
        store_name: '수목식당',
        select_type: 'roadname',
        score: 58.1,
        road_address: '서울 동작구 서달로14나길 28',
        street_address: '서울 동작구 흑석동 54-146',
    },
    {
        id: 103,
        store_id: 1,
        store_name: '다이소',
        select_type: 'roadname',
        score: 56.0,
        road_address: '서울 동작구 상도로 277',
        street_address: '서울 동작구 상도1동 753',
    },
    {
        id: 104,
        store_id: 7,
        store_name: '아스론가 본점',
        select_type: 'roadname',
        score: 45.2,
        road_address: '서울 은평구 뭐뭐로 12',
        street_address: '',
    },
    ];


  return (
    <Layout overlapHeader bottomPadding={66}>
        <Background>
            <LeftHeader
                title="Rewards"
                leftIcon={BackImg}
                rightIcon={SearchImg}
                overlay
                onLeftClick={() => window.history.back()}
                onRightClick={() => console.log("검색 클릭")}
            />

            <ReviewProfile
                avatarUrl={avatarUrl}
                name={name}
                sub={sub}
            />

            <Card>
                <CardText>
                    <CardTitle>Rewards</CardTitle>
                    <CardDivider aria-hidden>|</CardDivider>
                    <CardMeta>
                        {liveBalance != null ? `${liveBalance.toLocaleString('ko-KR')} points` : placesLabel}
                    </CardMeta>
                </CardText>
            </Card>
        </Background>

        <HeroOverlapSpacer height={30} />

        <FlexRow>
            <TextBox>
                <Title>Quick Review Submission</Title>
                <Description>Snap your receipt (OCR) to write a review and earn rewards in one go.</Description>
            </TextBox>

            {/* <UploadBlock>
                <UploadIcon src={UploadImg} alt="upload" />
            </UploadBlock> */}
            <ReceiptUploader
                onUploaded={async (saved) => {
                try {
                    const data = await getReceiptMatches(saved.id);
                    // 서버가 이미 점수순 5개를 주지만, 혹시 모르니 score로 정렬
                    const sorted = [...(data?.candidates || [])].sort((a,b)=>b.score-a.score);
                    setMatchData({ receipt: data?.receipt || saved, candidates: sorted });
                    setMatchOpen(true);
                } catch (e) {
                    alert(e.message || '매칭 실패');
                    }
                }}
            />
        </FlexRow>

        <ReceiptMatchModal
            open={matchOpen}
            onClose={() => setMatchOpen(false)}
            receipt={matchData.receipt}
            candidates={matchData.candidates}
            onSelect={(store) => {
                // 🔗 리뷰 페이지 라우팅 (현재 미구현이라 placeholder 경로)
                // TODO: 완성되면 올바른 경로로 교체
                navigate(`/reviews/new?store_id=${store.store_id}&receipt_id=${matchData.receipt?.id ?? ''}`);
            }}
        />

        <Divider />

        <InfoRow>
            <Title>Redeem for Gift Card</Title>
            <InfoIcon 
                src={InfoImg} 
                alt="info"
                role="button"
                tabIndex={0}
                onClick={() => setOpenInfo(true)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpenInfo(true)}
            />
        </InfoRow>
        
        <InfoDescription>
            Exchange your reward for 온누리상품권 (Onnuri gift certificates),
            usable at markets in Dongjak-gu.
        </InfoDescription>
        
        <RedeemCard onRedeemed={() => setRefreshKey(k => k + 1)}/>

        <PointHistory refreshKey={refreshKey} onBalanceChange={setLiveBalance}/>

        <InfoModal open={openInfo} onClose={() => setOpenInfo(false)} />

        {/* JSX 어딘가(dev일 때만 보이게) */}
        {import.meta.env.DEV && (
        <div style={{padding: '0 20px 8px'}}>
            <button onClick={seedHistory} disabled={seeding}>
            {seeding ? 'Seeding…' : 'Seed test history'}
            </button>
        </div>
        )}

        {import.meta.env.DEV && (
        <div style={{padding:'0 20px 8px'}}>
            <button
            onClick={() => { localStorage.removeItem('reward_seeded'); alert('플래그 삭제됨'); }}
            >
            Reset seed flag
            </button>
        </div>
        )}

        {import.meta.env.DEV && (
        <div style={{ padding: '0 20px 8px' }}>
            <button
            onClick={() => {
                setMatchData({ receipt: MOCK_RECEIPT, candidates: MOCK_CANDIDATES });
                setMatchOpen(true);
            }}
            >
            Preview match modal
            </button>
        </div>
        )}


        <TabBar/>
    </Layout>
  )
}

export default Reward

const Background = styled.div`
    position: relative;
    width: 100%;
    height: 175px;
    flex-shrink: 0;
    background: #FFF7ED;
`

const Card = styled.div`
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, -50%);
    z-index: 5;

    display: flex;
    width: 335px;
    padding: 16px 0;
    justify-content: center;
    align-items: center;

    border-radius: 12px;
    background: #FFEDD4;
`

const CardTitle = styled.div`
    width: 160px;

    color: #000;
    text-align: center;

    /* body/body 1 */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
`;

const HeroOverlapSpacer = styled.div`
    height: ${(p) => p.height || 84}px;
`;


const CardDivider= styled.span`
    color: #000;
    text-align: center;

    /* body/body 1 */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
`;

const CardText = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;                  /* " | "와 간격 */
`;

const CardMeta = styled.span`
    width: 159px;
    flex-shrink: 0;

    color: #000;
    text-align: center;

    /* body/body 1-em */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
`;

const Title = styled.div`
    color: #000;

    /* head/head 3-em */
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 125%; /* 22.5px */
    letter-spacing: -0.36px;
`

const Description = styled.div`
    color: #858585;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`

const TextBox = styled.div`
    display: flex;
    width: 215px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
`

const UploadBlock = styled.div`
    display: flex;
    width: 72px;
    height: 63px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    border-radius: 8px;
    background: var(--pri, #6D6D6D);
`

const FlexRow = styled.div`
    display: flex;
    justify-content: space-between;  /* 좌-우 끝에 배치 */
    align-items: center;
    padding: 0 20px;
    margin: 20px 0; /* 위아래/좌측 20px */
`;

const InfoRow = styled.div`
    display: flex;
    width: 335px;
    justify-content: space-between;
    align-items: flex-start;
    margin: 20px 20px 5px;
`

const InfoIcon = styled.img`
  width: 20px;   /* 필요 시 조정 */
  height: 20px;  /* 필요 시 조정 */
  flex-shrink: 0;
`;

const InfoDescription = styled.p`
  padding: 0 20px;     /* 이 줄만 좌우 20px */
  margin: 0 0 20px;    /* 아래 간격만 */
  color: #858585;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.24px;
`;

const UploadIcon = styled.img`
  width: 24px;   /* 원하는 크기 */
  height: 24px;
  object-fit: contain;
`;
