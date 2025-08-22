import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import ChevronDown from '@/assets/icons/chevron_down.png'

const GROUP_META = {
  snacks: {
    'review tags':  { type: 'multi'  },
    'portion size': { type: 'single' },
    'spicy level':  { type: 'single' },
  },
  fresh: {
    'review tags':  { type: 'multi'  },
    'freshness':    { type: 'single' },
  },
  goods: {
    'review tags':  { type: 'multi'  },
    'usefulness':   { type: 'single' },
  },
  restaurants: {
    'review tags':          { type: 'multi'  },
    'dietary restrictions': { type: 'multi'  },
    'spicy level':          { type: 'single' },
  },
};

const GROUP_ORDER = {
  snacks:       ['Review Tags', 'Portion Size', 'Spicy Level'],
  fresh:        ['Review Tags', 'Freshness'],
  goods:        ['Review Tags', 'Usefulness'],
  restaurants:  ['Review Tags', 'Dietary Restrictions', 'Spicy Level'],
};

const norm = (s) => (s || '').toLowerCase().trim();

const ReviewTags = ({
  category = 'restaurants',
  items = [],
  defaultOpen = false,
}) => {
    const [open, setOpen] = useState(defaultOpen);

    // 1) 해당 카테고리 것만 필터 → 2) group별로 tag 묶기 → 3) 정렬
    const groups = useMemo(() => {
        const byGroup = new Map();

        (items || [])
            .filter(it => norm(it.category) === norm(category))
            .forEach(it => {
                const title = it.group || '';
                if (!byGroup.has(title)) byGroup.set(title, new Set());
                byGroup.get(title).add(it.tag);
        });

        const result = Array.from(byGroup.entries()).map(([title, set]) => {
            const meta = GROUP_META[category]?.[norm(title)] || { type: 'multi' }; // 기본 multi
            return { title, type: meta.type, tags: Array.from(set) };
        });

        const order = GROUP_ORDER[category] || [];
        return result.sort((a, b) => {
            const ia = order.indexOf(a.title);
            const ib = order.indexOf(b.title);
            return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
        });
    }, [category, items]);

  return (
    <Card $open={open}>
        {/* 받아온 태그들 */}
        <Content>
            {groups.map(g => (
                <Group key={g.title} $single={g.type === 'single'}>
                    {g.type === 'single' && <GroupTitle>{g.title}</GroupTitle>}
                    <Options $single={g.type === 'single'}>
                        {g.tags.map(t => (
                        <Pill key={`${g.title}-${t}`} $single={g.type === 'single'}>
                            {t}
                        </Pill>
                        ))}
                    </Options>
                </Group>
            ))}
        </Content>

        <Toggle
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-label={open ? '태그 접기' : '태그 펼치기'}
        >
            <Chevron src={ChevronDown} alt="" aria-hidden $open={open} />
        </Toggle>
        
    </Card>
  )
}

export default ReviewTags

const Card = styled.div`
    position: relative; 
    border-radius: 12px;
    background: #F8F8F8;
    padding: 10px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    align-self: stretch;

    ${({ $open }) => $open ? '' : `
        height: 46px;                /* 접힘: 1줄 높이 */
        overflow: hidden;            /* 넘치면 감춤 */
    `}
`

/* 우측 끝 화살표 버튼 */
const Toggle = styled.button`
  position: absolute;
  top: 8px;
  right: 6px;
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;


const Chevron = styled.img`
  width: 18px;
  height: 18px;
  transition: transform .2s ease;
  transform: rotate(${p => (p.$open ? 180 : 0)}deg);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Group = styled.div`
  display: flex;            /* 플렉스 컨테이너 */
  flex-direction: ${p => (p.$single ? 'row' : 'column')};
  align-items: ${p => (p.$single ? 'center' : 'stretch')};
  gap: 8px;                 /* 제목과 옵션 사이 간격 8px */
`

const GroupTitle = styled.div`
    color: #818181;
    text-align: center;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;


const Pill = styled.button`
    display: flex;
    padding: 4px 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 6px;
    color: #818181;
    text-align: center;
    font-family: Pretendard, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;

    border: ${p => (p.$single ? '1px solid #D9D9D9' : 'none')};
    background: ${p => (p.$single ? 'transparent' : '#EAEAEA')};
    cursor: default;   /* 읽기 전용 */

`