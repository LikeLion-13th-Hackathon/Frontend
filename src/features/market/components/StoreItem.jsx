import React from 'react'
import styled from 'styled-components'
import ReviewIcon from '@/assets/icons/review.png'

const StoreItem = ({ store }) => {
    const primary = store?.menus?.[0];

  return (
    <Wrapper>
        <StoreContainer>
            <StoreImage/>

            <TextBox>
                {/* <StoreTitle>수목식당 Sumok Sikdang</StoreTitle> */}
                <StoreTitle>
                    <span className="ko">{store.nameKo}</span>
                    {store.nameEn && <span className="en"> {store.nameEn}</span>}
                </StoreTitle>

                <SubTextBox>
                    <MenuContainer>
                        <MenuIcon />
                        {/* <MenuTitle>칼제비</MenuTitle> */}
                        <MenuTitle>{primary?.name ?? '-'}</MenuTitle>
                        {/* <MenuCost>W 8,000</MenuCost> */}
                        <MenuCost>
                            {primary?.price != null ? `₩ ${primary.price.toLocaleString()}` : '-'}
                        </MenuCost>
                    </MenuContainer>

                    <ReviewContainer>
                        <Icon src={ReviewIcon} alt="리뷰" />
                        {/* <ReviewNum>120</ReviewNum> */}
                        <ReviewNum>{store.reviewCount ?? 0}</ReviewNum>
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

const StoreImage = styled.div`
    width: 72px;
    height: 72px;
    background: #D9D9D9;
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

const MenuIcon = styled.div`
    width: 16px;
    height: 16px;
    background: #D9D9D9;
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