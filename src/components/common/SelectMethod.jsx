import React from 'react'
import Layout from './Layout'
import LeftHeader from './header/LeftHeader'
import BackImg from "@/assets/icons/header_back.png";
import styled from 'styled-components';

import VerifyImg from '@/assets/icons/verify.png'
import WriteImg from '@/assets/icons/write.png'

const SelectMethod = () => {
  return (
    <Layout overlapHeader>
        <LeftHeader
            title="Review"
            overlay
            leftIcon={BackImg}
            onLeftClick={() => window.history.back()}
        />

        
        <Wrap>
            <PageTitle>Did you visit this place?</PageTitle>
            <Description>Earn extra rewards by verifying your receipt.</Description>
        </Wrap>

        <CardContainer>
            <Card>
                <Icon src={VerifyImg}/>
                <TextBox>
                    <TextTitle>Verify receipt & write a review</TextTitle>
                    <TextSub>Earn 500 points</TextSub>
                </TextBox>
            </Card>
            <Card>
                <Icon src={WriteImg}/>
                <TextBox>
                    <TextTitle>Write a review without receipt</TextTitle>
                    <TextSub>Earn 10 points</TextSub>
                </TextBox>
            </Card>
        </CardContainer>
        

    </Layout>
  )
}

export default SelectMethod

const PageTitle = styled.div`
    color: #000;

    /* head/head 1-em */
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 125%; /* 30px */
    letter-spacing: -0.48px;
`

const Description = styled.div`
    color: #000;

    /* body/body 2 */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;
`

const Wrap = styled.div`
  display: flex;            
  flex-direction: column;
  gap: 10px; 

  padding-top: calc(56px + 21px);

  margin: 0 0 0 20px;
`;

const Card = styled.div`
    display: flex;
    width: 335px;
    height: 119px;
    padding: 10px;
    align-items: center;
    gap: 15px;
    flex-shrink: 0;

    border-radius: 12px;
    border: 1px solid #B8B8B8;
    background: #FAFAFA;
`

const CardContainer = styled.div`
    display: flex;            
    flex-direction: column;
    gap: 18px;
    margin: 34px 0 0 20px;
`

const Icon = styled.img`
    display: flex;
    width: 40px;
    height: 40px;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
`

const TextBox = styled.div`
    display: flex;
    width: 241px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    flex-shrink: 0;
`

const TextTitle = styled.div`
    align-self: stretch;    
    color: #000;

    /* head/head 3-em */
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 125%; /* 22.5px */
    letter-spacing: -0.36px;
`

const TextSub = styled.div`
    align-self: stretch; 
    color: #000;

    /* body/body 2 */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;
`