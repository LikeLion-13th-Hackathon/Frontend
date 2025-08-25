// src/features/home/components/ImageSlider.jsx
import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import SubwayIcon from "@/assets/icons/subway.svg";

const ImageSlider = ({ markets = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // market_id 기준으로 하드코딩
  const subwayMap = {
    1: [{ line: "9", color: "#BDB193" }],               
    2: [{ line: "7", color: "#758002" }],               
    3: [
      { line: "1", color: "#0253A5" },
      { line: "9", color: "#BDB193" },
    ],                                                  
  };

  // 자동 슬라이드 (3초 간격)
  useEffect(() => {
    if (markets.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === markets.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [markets]);

  if (markets.length === 0) {
    return (
      <>
        <SliderContainer>
          <SlideBox style={{ background: "#ddd" }} />
        </SliderContainer>
        <IndicatorWrapper />
      </>
    );
  }

  return (
    <>
      <SliderContainer>
        <SliderWrapper $index={currentIndex}>
          {markets.map((market) => (
            <SlideBox
              key={market.market_id}
              style={{ backgroundImage: `url(${market.market_image})` }}
            >
              <Overlay>

               <SubwayWrapper>
                {(subwayMap[market.market_id] || []).map((s, i) => (
                  <SubwayBadge key={i} $color={s.color}>
                    <img src={SubwayIcon} alt="subway" />
                    <span>Line {s.line}</span>
                  </SubwayBadge>
                ))}
              </SubwayWrapper>

                <MarketTitle>
                  <Eng>{market.market_english}</Eng>
                  <Kor>{market.market_name}</Kor>
                </MarketTitle>
              </Overlay>
            </SlideBox>
          ))}
        </SliderWrapper>
      </SliderContainer>

      <IndicatorWrapper>
        {markets.map((_, index) => (
          <Dot 
            key={index} 
            $active={index === currentIndex} 
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </IndicatorWrapper>
    </>
  )
}

export default ImageSlider

// === styled ===
const SliderContainer = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
`;

const SliderWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
  transform: translateX(${(props) => -props.$index * 100}%);
`;

const SlideBox = styled.div`
  flex: 0 0 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 16px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.0) 100%
  );
`;

const MarketTitle = styled.div`
  display: flex;
  flex-direction: column; /* ✅ 영어 위, 한글 아래 */
  align-items: flex-start; 
  color: #fff;
  text-shadow: 0 2px 6px rgba(0,0,0,0.6);
`;

const Eng = styled.div`
  font-size: 23px;
  font-weight: 600;
  line-height: 1.2;
`;

const Kor = styled.div`
  font-size: 18px;        /* ✅ 조금 더 작게 */
  font-weight: 400;
  opacity: 0.85;          /* ✅ 연하게 */
`;


const IndicatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
`;

const Dot = styled.div`
  width: ${(props) => (props.$active ? "10px" : "8px")};
  height: ${(props) => (props.$active ? "10px" : "8px")};
  border-radius: 50%;
  transition: all 0.3s ease;
  background-color: ${(props) => (props.$active ? "#555" : "#bbb")};
  box-shadow: ${(props) =>
    props.$active ? "0 0 8px rgba(0, 0, 0, 0.3)" : "none"};
  opacity: ${(props) => (props.$active ? 1 : 0.6)};
  cursor: pointer; /* 손가락 커서 */
  
  &:hover {
    transform: scale(1.2);   /* 마우스 올리면 살짝 커짐 */
  }
`;


const SubwayWrapper = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 6px;
`;

const SubwayBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  color: #fff;
  background: ${(p) => p.$color || "rgba(0,0,0,0.6)"};

  img {
    width: 14px;
    height: 14px;
  }
`;
