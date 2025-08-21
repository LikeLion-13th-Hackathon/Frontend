import React from 'react'
import Layout from '@/components/common/Layout';
import LeftHeader from '../../../components/common/header/LeftHeader';
import styled from 'styled-components';
import SearchImg from '@/assets/icons/search.png';
import BackImg from "@/assets/icons/header_back.png";
import ReviewProfile from '../components/ReviewProfile';
import UserReview from '../components/review/UserReview';

const MyReviews = () => {
    // 임시 카운트 (추후 API 값으로 대체)
    const visits = 4;
    const placesLabel = `${visits} ${visits === 1 ? 'place' : 'places'}`;

  return (
    <Layout overlapHeader>
        <Background>
            <LeftHeader
                title="My Reviews"
                leftIcon={BackImg}
                rightIcon={SearchImg}
                overlay
                onLeftClick={() => window.history.back()}
                onRightClick={() => console.log("검색 클릭")}
            />

            <ReviewProfile
                avatarUrl=""
                name="didii"
                sub="멋쟁이전통시장마스터처럼"
            />

            <Card>
                <CardText>
                    <CardTitle>My Visits</CardTitle>
                    <Divider aria-hidden>|</Divider>
                    <CardMeta>{placesLabel}</CardMeta>
                </CardText>
            </Card>
        </Background>

        <HeroOverlapSpacer height={40} />

        <UserReview />
    </Layout>
  )
}

export default MyReviews

const Background = styled.div`
    position: relative;
    width: 100%;
    height: 175px;
    flex-shrink: 0;
    background: #DDD;
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
    background: #ECECEC;
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


const Divider = styled.span`
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
