import React from 'react'
import styled from 'styled-components'
import MapIcon from '@/assets/icons/map.png'

const buildNaverMapUrl = (address) =>
  `https://map.naver.com/v5/search/${encodeURIComponent(address)}`

const StoreLocation = ({ address }) => {
    if (!address) return null

  return (
    <Wrap
        as="a"
        href={buildNaverMapUrl(address)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`네이버 지도에서 열기: ${address}`}
    >
        <Icon src={MapIcon} alt="" aria-hidden/>
        <Addr title={address}>{address}</Addr>
    </Wrap>
  )
}

export default StoreLocation

const Wrap = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 14px;
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