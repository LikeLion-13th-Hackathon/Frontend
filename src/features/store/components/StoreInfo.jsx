import React from 'react';
import styled from 'styled-components';
import StoreTag from './StoreTag';
import StoreSignatureMenu from './StoreSignatureMenu';
import StoreLocation from './StoreLocation';

const StoreInfo = ({ store }) => {
  if (!store) return null;

  const { store_name, store_english, address, menus } = store;

  return (
    <Wrapper>
      <StoreContainer>
        {/* 시장 + 카테고리 태그 */}
        <StoreTag store={store} />

        {/* 가게명 */}
        <StoreTitle>
          {store_name && <TitleKO as="h2">{store_name}</TitleKO>}
          {store_english && <TitleEN as="h3">{store_english}</TitleEN>}
        </StoreTitle>

        {/* 대표 메뉴 (최대 3개 표시) */}
        <StoreSignatureMenu items={store.menus || store.menu_list || []} />
      </StoreContainer>

      <StoreLocation roadAddress={store.road_address} />
    </Wrapper>
  );
};

export default StoreInfo;

const Wrapper = styled.div`
  display: flex;
  width: 335px;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  margin: 20px 16px;
`;

const StoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const StoreTitle = styled.div`
  display: flex;
  width: 134px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const TitleKO = styled.h2`
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
`;

const TitleEN = styled.h3`
  font-size: 14px;
  color: #777;
  white-space: nowrap;
  font-weight: 400;
`;
