import React from 'react'
import styled from 'styled-components'

const TabBar = () => {
  return (
    <TabBarContainer>
        <TabItem>
            <TabIcon src="/icons/home.svg" alt="홈" />
            <TabLabel>Search</TabLabel>
        </TabItem>
        <TabItem>
            <TabIcon src="/icons/home.svg" alt="홈" />
            <TabLabel>Home</TabLabel>
        </TabItem>
        <TabItem>
            <TabIcon src="/icons/home.svg" alt="홈" />
            <TabLabel>Mypage</TabLabel>
        </TabItem>
    </TabBarContainer>
  )
}

export default TabBar

const TabBarContainer = styled.div`
    display: flex;
    width: 375px;
    height: 48px;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
    background-color: white;

    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
`

const TabItem = styled.div`
    display: flex;
    width: 67px;
    height: 39px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    background-color: blanchedalmond;
`

const TabIcon = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

const TabLabel = styled.span`
  align-self: stretch;
  color: var(--pri, #6D6D6D);
  text-align: center;
  font-family: Pretendard;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 15px */
  letter-spacing: -0.2px;
`;