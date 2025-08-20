import React from 'react'
import styled from 'styled-components'
import StoreTag from './StoreTag'
import StoreSignatureMenu from './StoreSignatureMenu';
import StoreLocation from './StoreLocation';

const MOCK_STORE = {
  nameKo: '흑석 갈비',
  nameEn: 'Heukseok Galbi',
  line: '9호선',
  category: 'fresh',
  address: '서울특별시 동작구 서달로14나길 28',
};

const StoreInfo = ({ store = MOCK_STORE }) => {
    const { nameKo, nameEn } = store || {};

  return (
    <Wrapper>
        <StoreContainer>
            <StoreTag store={store}/>

            <StoreTitle>
                {nameKo && <TitleKO as="h2">{nameKo}</TitleKO>}
                {nameEn && <TitleEN as="h3">{nameEn}</TitleEN>}
            </StoreTitle>

            <StoreSignatureMenu items={store.menus} />
        </StoreContainer>

        <StoreLocation address={store.address} provider="naver"/>
    </Wrapper>
  )
}

export default StoreInfo

const Wrapper = styled.div`
    display: flex;
    width: 335px;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    margin: 20px 16px;
`

const StoreContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
`

const StoreTitle = styled.div`
    display: flex;
    width: 134px;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
`

const TitleKO = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 125%; /* 30px */
  letter-spacing: -0.48px;
  margin: 0;

  /* 길이 대응 */
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;        /* 2줄까지 */
  -webkit-box-orient: vertical;
`;

const TitleEN = styled.div`
    color: #000;

    /* head/head 2 */
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 125%; /* 25px */
    letter-spacing: -0.4px;
    
    white-space: nowrap;           /* 영어는 한 줄 말줄임 추천 */
`;