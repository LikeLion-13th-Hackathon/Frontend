import React from 'react'
import styled from 'styled-components'
import MapIcon from '@/assets/icons/map.png'

// 네이버 지도 검색 URL 생성 (검색은 가게명으로)
const buildNaverMapUrl = (storeName) =>
  `https://map.naver.com/v5/search/${encodeURIComponent(storeName)}`

const StoreLocation = ({ roadAddress, storeName }) => {
  if (!roadAddress || !storeName) return null

  return (
    <Wrap
      as="a"
      href={buildNaverMapUrl(storeName)}   // 클릭 시 가게명 검색
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`네이버 지도에서 열기: ${storeName}`}
    >
      <Icon src={MapIcon} alt="" aria-hidden />
      <Addr title={roadAddress}>{roadAddress}</Addr> {/* 화면에는 주소 */}
    </Wrap>
  )
}

export default StoreLocation

/* --- styled-components --- */
const Wrap = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 1px;
`

const Icon = styled.img`
    width: 24px;
    height: 24px;
`

const Addr = styled.span`
    color: #404040;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
    text-decoration-line: underline;
`