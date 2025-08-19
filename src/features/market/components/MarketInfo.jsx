import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DropDwonIcon from '@/assets/icons/dropdown.png';

const MarketInfo = () => {

    const [images, setImages] = useState([
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150'
    ])

    // 나중에 API 연동 시
    useEffect(() => {
        // fetch('/api/markets/1/images')
        //   .then(res => res.json())
        //   .then(data => setImages(data.images))
    }, [])

  return (
    <Wrapper>
        <Container>
            <MarketTitle>
                <Rectangle />
                <Title>흑석시장</Title>
                <Icon src={DropDwonIcon} alt="드롭다운" />
            </MarketTitle>
        </Container>

        <DescContainer>
            <SubDescription>Traditional market in Dongjak-gu, Seoul</SubDescription>
            <Description>englishenglishenglishenglishenglishenglishenglis henglishenglishenglishenglishenglishenglishengl</Description>
        </DescContainer>

        <ImgContainer>
            {images.map((src, idx) => (
                <Image key={idx} src={src} alt={`market-${idx}`} />
            ))}
        </ImgContainer>
    </Wrapper>
  )
}

export default MarketInfo

const Wrapper = styled.div`
    display: flex;
    width: 637px;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    margin: 20px 23px;
`
const Container = styled.div`
    display: flex;
    width: 334px;
    justify-content: space-between;
    align-items: center;
`

const MarketTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`

const Rectangle = styled.div`
    width: 32px;
    height: 32px;
    background: #D9D9D9;
`

const Title = styled.div`
    color: #000;

    /* head/head 1-em */
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 125%; /* 30px */
    letter-spacing: -0.48px;
`
const Icon = styled.img`
    display: flex;
    width: 16px;
    height: 16px;
    justify-content: center;
    align-items: center;
`

const DescContainer = styled.div`
    display: flex;
    width: 334px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
`

const SubDescription = styled.div`
    align-self: stretch;
    color: #000;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`

const Description = styled.div`
    align-self: stretch;
    color: #000;

    /* body/body 1 */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
`

const ImgContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
`

const Image = styled.div`
    display: flex;
    width: 188px;
    height: 254px;
    padding: 10px;
    align-items: flex-start;
    gap: 10px;

    background: #D9D9D9;
`