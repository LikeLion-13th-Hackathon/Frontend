import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components';
import SortButtons from './SortButtons';
import StoreItem from './StoreItem';
import { filterStoresByMarketAndCategory } from '@/shared/api/store';

const categories = ["Fresh", "Snacks", "Goods", "Restaurants"];

const StoreList = ({ marketId }) => {
    const [activeCategory, setActiveCategory] = useState("Fresh"); // 기본값 fresh
    const [activeSort, setActiveSort] = useState('default');
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(false);

    const activeIndex = Math.max(0, categories.indexOf(activeCategory));
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const btnRefs = useRef([]);

    useEffect(() => {
    if (btnRefs.current[activeIndex]) {
        const el = btnRefs.current[activeIndex];
        setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        });
    }
    }, [activeIndex, stores]);


    useEffect(() => {
        if (!marketId) {
        console.warn('[StoreList] missing marketId');
        setStores([]);
        return;
        }

        const fetchData = async () => {
        setLoading(true);
        try {
            console.log('[StoreList] fetch start', { marketId, activeCategory });

            // (1) category 포함 조회
            const res = await filterStoresByMarketAndCategory(marketId, activeCategory);
            const list =
            Array.isArray(res.data) ? res.data : (res.data?.results ?? []);

            console.log('[StoreList] result (with category)', list.length, list);
            setStores(list);

        } catch (err) {
            console.error('[StoreList] fetch error', err);
            setStores([]);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [marketId, activeCategory]);

    const safeStores = Array.isArray(stores) ? stores : [];

    const sorted = useMemo(() => {
        const name = (s) => (s.store_english || s.store_name || '').toLowerCase();
        const arr = [...safeStores];
        if (activeSort === 'most reviewed') {
        return arr.sort(
            (a, b) =>
            ((b.review_count ?? 0) - (a.review_count ?? 0)) ||
            name(a).localeCompare(name(b), 'en')
        );
        }
        return arr.sort((a, b) => name(a).localeCompare(name(b), 'en'));
    }, [safeStores, activeSort]);

  return (
    <>
        <Wrapper>
        {categories.map((cat, idx) => (
            <CategoryButton
                key={cat}
                ref={(el) => (btnRefs.current[idx] = el)}
                $active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
            >
                {cat}
            </CategoryButton>
        ))}
            <Indicator style={indicatorStyle} />
        </Wrapper>

        <SortButtons value={activeSort} onChange={setActiveSort} />

        {/* <StoreItem /> */}
        <ListWrapper>
            {!loading &&
            sorted.map((s) => (
                <StoreItem key={s.store_id ?? `${s.store_name}-${s.road_address}`} store={s} />
            ))}
        </ListWrapper>
    </>
    
  )
}

export default StoreList

const Wrapper = styled.div`
    position: relative;     
    border-bottom: 1px solid #E8E8E8;
    display: flex;
    width: 375px;
    align-items: flex-start;
`

const CategoryButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  cursor: pointer;

  color: ${(props) => (props.$active ? "#000" : "#707070")};
  font-family: Pretendard;
  font-size: 18px;
  font-weight: ${(props) => (props.$active ? 600 : 400)};
  line-height: 125%; /* 22.5px */
    letter-spacing: -0.36px;
    font-style: normal;
  transition: color 0.2s ease;
`;

const ListWrapper = styled.div`
  width: 375px;
`
const Indicator = styled.div`
  position: absolute;
  bottom: 0;
  height: 2px;
  background: #FF6900;
  transition: left 0.3s ease, width 0.3s ease;
`;