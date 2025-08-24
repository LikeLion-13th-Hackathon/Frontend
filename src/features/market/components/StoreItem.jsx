import React from 'react'
import styled from 'styled-components'
import ReviewIcon from '@/assets/icons/review.png'
import MenuImg from '@/assets/icons/tag_restaurants.png'

const StoreItem = ({ store }) => {
    const nameKo = store?.store_name || store?.nameKo || '';
    const nameEn = store?.store_english || store?.nameEn || '';
    const image  = store?.store_image || '';
    const reviewCount = store?.review_count ?? store?.reviewCount ?? 0;

    // 대표 메뉴 1개
    const primary = store?.menu_list?.[0] || store?.menus?.[0] || null;
    const menuName = primary?.korean || primary?.name || '-';
    const menuPrice = primary?.price;

  return (
    <Wrapper>
        <StoreContainer>
            <StoreImage src={image} />

            <TextBox>
                <StoreTitle>
                    <span className="ko">{nameKo}</span>
                    {nameEn && <span className="en"> {nameEn}</span>}
                </StoreTitle>

                <SubTextBox>
                    <MenuContainer>
                        <MenuIcon src={MenuImg} alt="메뉴"/>
                        <MenuTitle>{menuName}</MenuTitle>
                        <MenuCost>{menuPrice}</MenuCost>
                    </MenuContainer>

                    <ReviewContainer>
                        <Icon src={ReviewIcon} alt="리뷰" />
                        {/* <ReviewNum>120</ReviewNum> */}
                        <ReviewNum>{reviewCount}</ReviewNum>
                    </ReviewContainer>
                </SubTextBox>
            </TextBox>
        </StoreContainer>
    </Wrapper>
  )
}

export default StoreItem

const Wrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    margin: 20px;
`

const StoreContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
`

const StoreImage = styled.img`
    width: 72px;
    height: 72px;
    background: #D9D9D9;
    border-radius: 8px;
`

const TextBox = styled.div`
    display: flex;
    width: 247px;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
`

const SubTextBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
`

const StoreTitle = styled.div`
    color: #000;

    /* body/body 1 */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    letter-spacing: -0.32px;
`

const MenuContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`

const MenuIcon = styled.img`
    width: 16px;
    height: 16px;
`

const MenuTitle = styled.div`
    color: #858585;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`

const MenuCost = styled.div`
    color: #858585;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`

const ReviewContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`
const Icon = styled.img`
    width: 16px;
    height: 16px;
`

const ReviewNum = styled.div`
    color: #858585;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`