import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Layout from "@/components/common/Layout";
import LeftHeader from "@/components/common/header/LeftHeader";
import SearchBar from "@/features/home/components/SearchBar";
import CheckThisOut from "@/features/search/components/CheckThisOut";
import { suggestAll, fetchTrendingAll, searchAll } from "@/shared/api/searchAll";

// 아이콘
import BackImg from "@/assets/icons/header_back.png";

// 공통 형태로 맞추기
const adapt = (x = {}) => ({
  key: `${x.type ?? "item"}:${x.id ?? Math.random().toString(36).slice(2)}`,
  type: x.type ?? "item",
  id: x.id,
  name: x.name || x.title || "-",
  subtitle: x.subtitle || x.desc || x.marketName || "",
  thumbnailUrl: x.thumbnailUrl || x.image || null,
  price: x.price ?? x.menuPrice ?? null,
  reviewCount: x.reviewCount ?? x.reviews ?? null,
});

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [suggests, setSuggests] = useState([]);
  const [warm, setWarm] = useState([]);     // 웜 상태(트렌딩)
  const [items, setItems] = useState([]);   // 검색 결과
  const [cursor, setCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  const moreRef = useRef(null);
  const abortRef = useRef(null);

  const isWarm = q.trim().length === 0;

  // 초기 트렌딩: 비어있으면 모의데이터 사용
  useEffect(() => {
    (async () => {
      try {
        const r = await fetchTrendingAll({ limit: 8 });
        const list = (r || []).map(adapt);
        setWarm(list.length ? list : Array.from({length:2}).map((_,i)=>adapt({
          id:`warm-${i}`, name:"수목식당 Sumok Sikdang", subtitle:"갈비찜 ₩ 8,000"
        })));
      } catch {
        setWarm(Array.from({length:2}).map((_,i)=>adapt({
          id:`warm-${i}`, name:"수목식당 Sumok Sikdang", subtitle:"갈비찜 ₩ 8,000"
        })));
      }
    })();
  }, []);

  // 자동완성 (간단)
  useEffect(() => {
    if (!q) { setSuggests([]); return; }
    const ac = new AbortController();
    suggestAll(q, { signal: ac.signal })
      .then(setSuggests)
      .catch(() => {});
    return () => ac.abort();
  }, [q]);

  // 검색 실행
  const runSearch = useCallback(() => {
    const keyword = q.trim();
    if (!keyword) return;

    abortRef.current?.abort?.();
    const ac = new AbortController();
    abortRef.current = ac;

    setLoading(true);
    searchAll({ q: keyword, limit: 20, cursor: null, signal: ac.signal })
      .then(({ items, nextCursor }) => {
        setItems((items || []).map(adapt));
        setCursor(nextCursor ?? null);
      })
      .finally(() => setLoading(false));
  }, [q]);

  // 무한 스크롤
  useEffect(() => {
    const el = moreRef.current;
    if (!el) return;

    const io = new IntersectionObserver(async (ents) => {
      if (!ents.some((e) => e.isIntersecting)) return;
      if (loading || isWarm || !cursor) return;

      const ac = new AbortController();
      abortRef.current = ac;
      setLoading(true);
      try {
        const { items: more, nextCursor } = await searchAll({
          q: q.trim(),
          limit: 20,
          cursor,
          signal: ac.signal,
        });
        setItems((prev) => [...prev, ...(more || []).map(adapt)]);
        setCursor(nextCursor ?? null);
      } finally {
        setLoading(false);
      }
    }, { rootMargin: "220px 0px" });

    io.observe(el);
    return () => io.disconnect();
  }, [cursor, loading, isWarm, q]);

  // 아이템 클릭 (TODO: 라우팅 연결)
  const handleClickItem = (it) => {
    console.log("go ->", it);
  };

  return (
    <Layout>
      <LeftHeader
        title="Search"
        leftIcon={BackImg}
        onLeftClick={() => window.history.back()}
      />

      <Wrap>
        <H2>Looking for something?</H2>

        <SearchBar
          value={q}
          onChange={setQ}
          onSubmit={runSearch}
          placeholder="Heukseok Market"
        />

        {isWarm ? (
          <>
            {/* Check this place out 섹션 (API 준비 전에도 스켈레톤/모의데이터 표시) */}
            <CheckThisOut onClickItem={handleClickItem} />

            <Section>
              <SubTitle>Trending Now</SubTitle>
              <List>
                {warm.slice(0, 6).map((it) => (
                  <Row key={it.key} onClick={() => handleClickItem(it)}>
                    <Thumb style={{ backgroundImage: it.thumbnailUrl ? `url(${it.thumbnailUrl})` : undefined }} />
                    <Col>
                      <Top><Name title={it.name}>{it.name}</Name></Top>
                      {it.subtitle && <Sub title={it.subtitle}>{it.subtitle}</Sub>}
                      <Meta>
                        {it.price != null && <span>₩ {Number(it.price).toLocaleString()}</span>}
                        <span>리뷰 {it.reviewCount ?? 0}</span>
                      </Meta>
                    </Col>
                  </Row>
                ))}
                {!warm.length && (
                  <>
                    {Array.from({length:2}).map((_,i)=>(
                      <Row key={`sk${i}`}>
                        <Thumb />
                        <Col>
                          <SkLine w="60%" />
                          <SkLine w="40%" />
                        </Col>
                      </Row>
                    ))}
                  </>
                )}
              </List>
            </Section>
          </>
        ) : (
          <Section>
            {/* 자동완성 드롭다운(선택): 클릭 시 입력만 변경 */}
            {suggests.length > 0 && (
              <SuggestBox>
                {suggests.map((s, i) => {
                  const text = typeof s === "string" ? s : s.text;
                  return (
                    <SuggestRow key={i} onClick={() => setQ(text)}>
                      {text}
                    </SuggestRow>
                  );
                })}
              </SuggestBox>
            )}

            <SubTitle>Results</SubTitle>
            <List>
              {items.map((it) => (
                <Row key={it.key} onClick={() => handleClickItem(it)}>
                  <Thumb style={{ backgroundImage: it.thumbnailUrl ? `url(${it.thumbnailUrl})` : undefined }} />
                  <Col>
                    <Top><Name title={it.name}>{it.name}</Name></Top>
                    {it.subtitle && <Sub title={it.subtitle}>{it.subtitle}</Sub>}
                    <Meta>
                      {it.price != null && <span>₩ {Number(it.price).toLocaleString()}</span>}
                      {it.reviewCount != null && <span>리뷰 {it.reviewCount}</span>}
                    </Meta>
                  </Col>
                </Row>
              ))}
              {loading && <Loading>Loading…</Loading>}
              {!loading && items.length === 0 && <Empty>검색 결과가 없어요</Empty>}
            </List>
            <Sentinel ref={moreRef} />
          </Section>
        )}
      </Wrap>
    </Layout>
  );
}

/* styled — 우리 스타일 */
const Wrap = styled.div`
  padding: 0 20px 40px;
`;

const H2 = styled.h2`
  margin: 24px 0 12px;
  font-size: 23px;
  font-weight: 700;
  color: #111;
`;

const Section = styled.section`margin: 20px 0;`;

const SubTitle = styled.h3`
  margin: 12px 0;
  font-size: 20px;
  font-weight: 600;
  color: #111;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  cursor: pointer;
`;

const Thumb = styled.div`
  width: 56px;
  height: 56px;
  flex: 0 0 56px;
  border-radius: 8px;
  background: #EAEAEA center/cover no-repeat;
`;

const Col = styled.div`flex: 1; min-width: 0;`;
const Top = styled.div`display: flex; align-items: center; gap: 8px;`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #111;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`;

const Sub = styled.div`
  margin-top: 2px; font-size: 12px; color: #666;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`;

const Meta = styled.div`
  margin-top: 2px; font-size: 12px; color: #999;
  display: flex; gap: 10px;
`;

const Loading = styled.div`
  padding: 12px 0; text-align: center; font-size: 13px; color: #666;
`;

const Empty = styled.div`
  padding: 24px 0; text-align: center; font-size: 13px; color: #999;
`;

const Sentinel = styled.div`height: 1px;`;

/* skeleton lines for list */
const SkLine = styled.div`
  height: 14px;
  border-radius: 7px;
  background: linear-gradient(90deg,#eee 25%,#f6f6f6 37%,#eee 63%);
  background-size: 400% 100%;
  animation: shimmer 1.2s infinite;
  margin: 6px 0;
  width: ${(p)=>p.w||"80%"};
  @keyframes shimmer { 0%{background-position:100% 0} 100%{background-position:-100% 0} }
`;
