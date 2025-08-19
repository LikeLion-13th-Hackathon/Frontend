import React from 'react'
import styled from 'styled-components'

const MarketInfo = () => {
    const infos = [
        {
            id: 1,
            title: '흑석시장',
            subtitle: '– Small, Local, and Full of Life',
            description: 'This cozy neighborhood market invites you to shop, snack, and mingle with locals.'
        },
        {
            id: 2,
            title: '상도전통시장',
            subtitle: '– Alleys of Local Flavors',
            description: 'Step into the bustling alleys of Sangdo Traditional Market, where fresh produce, sizzling street food fill every corner.'
        },
        {
            id: 3,
            title: '노량진수산시장',
            subtitle: '– Seoul’s Seafood Hub',
            description: 'Explore the vibrant world of Noryangjin Fish Market, where endless rows of fresh seafood meet the lively energy.'
        }
  ]
  return (
    <>
        <Title>Learn more about the market</Title>

        <Wrapper>
            {infos.map(info => (
                <InfoCard
                    key={info.id}
                    title={info.title}
                    subtitle={info.subtitle}
                    description={info.description}
                    image={info.image}   
                />
            ))}
        </Wrapper>
    </>
  )
}

export default MarketInfo

const InfoCard = ({ title, subtitle, description, image }) => {
  return (
    <Card>
      <ImageBox style={ image ? { backgroundImage: `url(${image})` } : {} } />
      <TextBox>
        <TitleText>
            {title} <SubText>{subtitle}</SubText>
        </TitleText>
        <DescText>{description}</DescText>
      </TextBox>
    </Card>
  )
}

const Title = styled.div`
    color: #000;

    /* head/head 2-em */
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 125%; /* 25px */
    letter-spacing: -0.4px;
    padding: 20px 26px 16px;
`

const Wrapper = styled.div`
    display: flex;
    width: 335px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin: 0 20px;
    /* padding: 0 20px; */
`

const Card = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
`

const ImageBox = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 8px;
    background: #efefef;
    /* background-size: cover;
    background-position: center; */
`

const TextBox = styled.div`
    display: flex;
    width: 256px;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
`

const TitleText = styled.div`
    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
`

const SubText = styled.span`
    color: #000;

    /* body/body 1 */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.32px;
`;

const DescText = styled.div`
    align-self: stretch;
    color: #858585;

    /* caption/caption 2 */
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 15px */
    letter-spacing: -0.2px;
`