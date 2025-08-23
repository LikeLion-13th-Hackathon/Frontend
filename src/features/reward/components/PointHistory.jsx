import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import PlusImg from '@/assets/icons/plus.png';
import MinusImg from '@/assets/icons/minus.png';
import { getRewardHistory } from '@/shared/api/reward';

const PointHistory = ({ refreshKey, onBalanceChange }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const rows = await getRewardHistory();
        if (!alive) return;
        setItems(rows);
        console.log('[PointHistory] rows', rows); // 🔍 확인용
        const latest =
        rows?.[0]?.created > rows?.at(-1)?.created ? rows[0] : rows.at(-1);
        onBalanceChange?.(latest?.balance ?? 0);
      } catch (e) {
        if (!alive) return;
        setErr(e.message || 'Failed to load history');
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [refreshKey]);

  const fmt = (n) => Number(n).toLocaleString('ko-KR');
  const top3 = items.slice(0, 3);
  const list = expanded ? items : top3;

  return (
    <Wrap>
      <Title>Redemption History</Title>
      {loading && (<><Skeleton/><Skeleton/><Skeleton/></>)}
      {!loading && err && (<EmptyText>{err}</EmptyText>)}
      {!loading && !err && (
        <HistoryRow>
          {items.length === 0 ? (
            <EmptyText>No history ..</EmptyText>
          ) : list.map(it => {
            const plus = Number(it.point) >= 0;
            return (
              <ContentRow key={it.id}>
                <RightContent>
                  <Icon src={plus ? PlusImg : MinusImg} alt={plus ? 'plus' : 'minus'} />
                  <TextBox>
                    <HistoryTitle>{it.caption}</HistoryTitle>
                    <HistoryMemo>
                      {plus ? `${fmt(it.point)} points added`
                            : `${fmt(Math.abs(it.point))} points used`}
                    </HistoryMemo>
                  </TextBox>
                </RightContent>
                <LeftContent>
                  <PointChange $plus={plus}>
                    {plus ? '+' : '-'} {fmt(Math.abs(it.point))} points
                  </PointChange>
                  <PointRemain>{fmt(it.balance)} points</PointRemain>
                </LeftContent>
              </ContentRow>
            );
          })}
        </HistoryRow>
      )}
      {items.length > 3 ? (
        <ViewText
            role="button"
            tabIndex={0}
            onClick={() => setExpanded((v) => !v)}
            onKeyDown={(e)=> (e.key==='Enter'||e.key===' ') && setExpanded((v)=>!v)}
        >
            {expanded ? 'Collapse' : 'View all Redemption'}
        </ViewText>
    ) : <ViewText style={{opacity:.5}}>View all Redemption</ViewText>}
    </Wrap>
  );
};

export default PointHistory

const Wrap = styled.div`
    display: flex;
    width: 335px;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
    margin: 49px 20px;
`

const Title = styled.div`
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

const ContentRow = styled.div`
    display: flex;
    padding: 10px 0;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
`

const HistoryRow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
`

const RightContent = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 6px;
`

const Icon = styled.img`
    width: 24px;
    height: 24px;
`

const TextBox = styled.div`
    display: flex;
    width: 156px;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
`

const HistoryTitle = styled.div`
    color: #000;

    /* body/body 2-em */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;
`

const HistoryMemo = styled.div`
    align-self: stretch;
    color: #858585;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`

const LeftContent = styled.div`
    display: flex;
    width: 105px;
    flex-direction: column;
    align-items: flex-end;
`

const PointChange = styled.div`
    color: ${({ $plus }) => ($plus ? '#FA684E' : '#3273FF')};

    /* body/body 2-em */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 21px */
    letter-spacing: -0.28px;
`

const PointRemain = styled.div`
    color: #858585;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`

const ViewText = styled.div`
    align-self: stretch;
    color: #858585;
    text-align: right;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-skip-ink: none;
    text-decoration-thickness: auto;
    text-underline-offset: auto;
    text-underline-position: from-font;
`

const shimmer = keyframes`
  0% { background-position: 100% 0; }
  100% { background-position: 0 0; }
`;

const Skeleton = styled.div`
  height: 52px;
  width: 100%;
  border-radius: 8px;
  background: linear-gradient(90deg, #f2f2f2 25%, #eee 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;

const EmptyText = styled.div`
    align-self: stretch;
    color: #858585;
    text-align: center;

    /* caption/caption 1 */
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.24px;
`