import React, { useState } from 'react'
import styled from 'styled-components';

const ImageSlider = () => {

    // 나중에 백에서 받아올 이미지 배열 (임시 데이터)
    const images = [1, 2, 3];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

  return (
    <SliderContainer onClick = {nextImage}>
        <SlideBox />

        <IndicatorWrapper>
            {images.map((_, index) => (
                <Dot key={index} $active={index === currentIndex} />
            ))}
        </IndicatorWrapper>
    </SliderContainer>
  )
}

export default ImageSlider

const SliderContainer = styled.div`
  width: 100%;
  height: 348px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
`;

const SlideBox = styled.div`
  width: 100%;
  height: 100%;
  background: #ddd; /* 배치 확인용 */
  border-radius: 8px;
`;

const IndicatorWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;

    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 22px;
`

const Dot = styled.div`
  width: ${(props) => (props.$active ? '12px' : '8px')};
  height: ${(props) => (props.$active ? '12px' : '8px')};
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? '#666' : '#B0B0B0')};
  filter: ${(props) =>
    props.active ? 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.30))' : 'none'};
`;