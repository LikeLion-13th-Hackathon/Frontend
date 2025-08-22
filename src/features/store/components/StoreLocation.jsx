import React from 'react'
import styled from 'styled-components'
import MapIcon from '@/assets/icons/map.png'

// 네이버 지도 검색 URL 생성
const buildNaverMapUrl = (roadAddress) =>
  `https://map.naver.com/v5/search/${encodeURIComponent(roadAddress)}`

const StoreLocation = ({ roadAddress }) => {
  if (!roadAddress) return null

  return (
    <Wrap
      as="a"
      href={buildNaverMapUrl(roadAddress)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`네이버 지도에서 열기: ${roadAddress}`}
    >
      <Icon src={MapIcon} alt="" aria-hidden />
      <Addr title={roadAddress}>{roadAddress}</Addr>
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

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: none;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;
`;
