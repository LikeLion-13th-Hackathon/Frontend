import React from 'react'
import styled from 'styled-components'
import MenuIcon from '@/assets/icons/tag_restaurants.png'

const MOCK_MENUS = [
  { id: 1, nameKo: '라멘',   nameEn: 'Ramen',    price: 8000 },
  { id: 2, nameKo: '우동',   nameEn: 'Udon',     price: 9000 },
  { id: 3, nameKo: '가츠동', nameEn: 'Katsudon', price: 11000 },
];

const StoreSignatureMenu = ({ items = [] }) => {
  const displayKRW = (v) => {
    if (!v) return "-";
    return typeof v === "number" ? `₩ ${v.toLocaleString()}` : v;
  };


  // DB에서 내려오는 메뉴 데이터 → 컴포넌트용으로 매핑
  const data = (items?.length ? items : MOCK_MENUS)
  .slice(0, 3)
  .map((m, i) => ({
    id: m.menu_id ?? m.id ?? i,
    nameKo: m.korean ?? m.nameKo,
    nameEn: m.english ?? m.nameEn,
    price: m.price,  // 문자열 그대로 둠
  }));

  if (!data.length) return null;

  return (
    <Wrap>
      {data.map((m) => (
        <MenuContainer key={m.id}>
          <Left>
            <Icon src={MenuIcon} alt="" aria-hidden /> 
            <NameKO title={m.nameKo}>{m.nameKo}</NameKO>
            <NameEN title={m.nameEn}>{m.nameEn}</NameEN>
          </Left>
          <Price>{displayKRW(m.price)}</Price>
        </MenuContainer>
      ))}
    </Wrap>
  )
}

export default StoreSignatureMenu

const Wrap = styled.div`
    display: flex;
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;

    border-radius: 12px;
    border: 1px solid #E8E8E8;
`

const MenuContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
`

const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    /* min-width: 0; ellipsis가 잘 먹도록 */
`;

const NameKO = styled.div`
    color: #404040;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`;

const NameEN = styled.div`
    color: #404040;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`;

const Price = styled.div`
  color: #404040;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`;

const Icon = styled.img`
    width: 16px;
    height: 16px;
`