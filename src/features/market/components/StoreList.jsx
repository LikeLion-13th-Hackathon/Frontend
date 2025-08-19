import React, { useMemo, useState } from 'react'
import styled from 'styled-components';
import SortButtons from './SortButtons';
import StoreItem from './StoreItem';

const categories = ["Fresh", "Snacks", "Goods", "Restaurants"];

const StoreList = () => {
    const [activeCategory, setActiveCategory] = useState("Fresh"); // 기본값 fresh
    const [activeSort, setActiveSort] = useState('default');

    // 임시 더미 데이터(6개) -> 나중에 백이랑 연결
    const [stores] = useState([
        { id: 1, nameKo: '수목식당', nameEn: 'Sumok Sikdang', category: 'Restaurants',
        menus: [{ name: '칼제비', price: 8000 }], reviewCount: 120, thumbnail: '' },
        { id: 2, nameKo: '영수분식', nameEn: 'Youngsu Snacks', category: 'Snacks',
        menus: [{ name: '떡볶이', price: 4000 }], reviewCount: 42 },
        { id: 3, nameKo: '상도문구', nameEn: 'Sangdo Goods', category: 'Goods',
        menus: [{ name: '노트', price: 1200 }], reviewCount: 5 },
        { id: 4, nameKo: '바다횟집', nameEn: 'Bada Restaurant', category: 'Restaurants',
        menus: [{ name: '회덮밥', price: 9000 }], reviewCount: 18 },
        { id: 5, nameKo: '흥부네 과일', nameEn: 'Heungbu Fruits', category: 'Fresh',
        menus: [{ name: '사과 1kg', price: 6900 }], reviewCount: 33 },
        { id: 6, nameKo: '흑석정육', nameEn: 'Heukseok Butcher', category: 'Fresh',
        menus: [{ name: '삼겹살 100g', price: 2300 }], reviewCount: 99 },
    ])

    // 1) 카테고리 필터
    const filtered = useMemo(
        () => stores.filter(s => s.category === activeCategory),
        [stores, activeCategory]
    );

    const sorted = useMemo(() => {
        const name = (s) => (s.nameEn || s.nameKo || '').toLowerCase();
        const arr = [...filtered];
        if (activeSort === 'most reviewed') {
            // 리뷰 개수 desc, 동률이면 ABC
            return arr.sort((a, b) =>
            (b.reviewCount - a.reviewCount) || name(a).localeCompare(name(b), 'en'),
            );
        }
        // default: ABC
        return arr.sort((a, b) => name(a).localeCompare(name(b), 'en'));
    }, [filtered, activeSort]);

  return (
    <>
        <Wrapper>
        {categories.map((cat) => (
            <CategoryButton
            key={cat}
            $active={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            >
            {cat}
            </CategoryButton>
        ))}
        </Wrapper>

        <SortButtons value={activeSort} onChange={setActiveSort} />

        {/* <StoreItem /> */}
        <ListWrapper>
            {sorted.map(s => <StoreItem key={s.id} store={s} />)}
        </ListWrapper>
    </>
    
  )
}

export default StoreList

const Wrapper = styled.div`
    display: flex;
    width: 375px;
    align-items: flex-start;
    border-bottom: 1px solid #E8E8E8;
`

const CategoryButton = styled.div`
    display: flex;
    padding: 12px 16px;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    border-bottom: ${(props) =>
        props.$active ? "2px solid #6D6D6D" : "2px solid transparent"};

    color: #000;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    line-height: 125%; /* 22.5px */
    letter-spacing: -0.36px;

    /* 선택 시 굵기만 변경 */
    font-weight: ${(props) => (props.$active ? 600 : 400)};
`;

const ListWrapper = styled.div`
  width: 375px;
`
