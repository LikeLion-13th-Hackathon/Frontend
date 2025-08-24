import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { searchStores, fetchDiscover, fetchTrendingAll } from "@/shared/api/searchAll";
import { useNavigate, useSearchParams } from "react-router-dom";

import Layout from "@/components/common/Layout";
import LeftHeader from "@/components/common/header/LeftHeader";
import BackImg from "@/assets/icons/header_back.png";
import SearchImg from "@/assets/icons/search.png";
import CheckThisOut from "@/features/search/components/CheckThisOut";
import TrendingNow from "@/features/search/components/TrendingNow";
import TabBar from '../../../components/common/TabBar';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL 파라미터에서 keyword 읽기
  const initialKeyword = searchParams.get("keyword") || "";

  const [keyword, setKeyword] = useState(initialKeyword);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [discover, setDiscover] = useState([]);
  const [trending, setTrending] = useState([]);

  // 기본 데이터
  useEffect(() => {
    fetchDiscover().then(setDiscover).catch(console.error);
    fetchTrendingAll().then(setTrending).catch(console.error);
  }, []);

  // keyword가 변경되면 자동 검색
  useEffect(() => {
    if (initialKeyword) {
      handleSearch(initialKeyword);
    }
  }, [initialKeyword]);

  const handleSearch = async () => {
    if (!keyword.trim()) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const list = await searchStores({ keyword });

      // store_name 안에 검색어 포함 여부 확인 (list는 이미 매핑된 name 사용 가능)
      const filtered = list.filter((x) =>
        x.name?.toLowerCase().includes(keyword.toLowerCase()) ||
        x.marketName?.toLowerCase().includes(keyword.toLowerCase())
      );

      setItems(filtered);
    } catch (err) {
      console.error("검색 실패:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const showDefault = !keyword.trim() && items.length === 0;

  return (
    <Layout bottomPadding={66}>
      <LeftHeader
        title="Search"
        leftIcon={BackImg}
        rightIcon={SearchImg}
        onLeftClick={() => window.history.back()}
        onRightClick={handleSearch}
      />

      <Content>
        {/* 타이틀 */}
        <Title>Looking for something?</Title>

        {/* 검색박스 */}
        <SearchBox>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search for stores..."
          />
          <SearchButton onClick={handleSearch}>
            <img src={SearchImg} alt="검색" />
          </SearchButton>
        </SearchBox>

        {/* 검색 전 기본화면 */}
        {showDefault && (
          <>
            <Section>
              <CheckThisOut items={discover} />
              <TrendingNow items={trending} />
            </Section>
          </>
        )}

        {/* 검색 결과 */}
        {!showDefault && (
          <>
            {loading && <Loading>검색중...</Loading>}
            {!loading && items.length === 0 && (
              <Empty>검색 결과가 없습니다.</Empty>
            )}

            <List>
              {items.map((item, idx) => (
                 <Row 
                  key={item.id ?? `store-${idx}`} 
                  onClick={() => navigate(`/store/${item.id}`)}
                >
                  <Thumb
                    style={{
                      backgroundImage: item.thumbnailUrl
                        ? `url(${item.thumbnailUrl})`
                        : undefined,
                    }}
                  />
                  <Col>
                    <Top>
                      <Name>
                        {item.name} <EngName>{item.englishName}</EngName>
                      </Name>
                    </Top>

                    {/* 대표 메뉴 */}
                    {item.firstMenu && (
                      <MenuInfo>
                        {item.firstMenu.korean} · {item.firstMenu.price}
                      </MenuInfo>
                    )}

                    <Meta>
                      <span>리뷰 {item.reviewCount}개</span>
                    </Meta>
                  </Col>
                </Row>
              ))}
            </List>
          </>
        )}
      </Content>
      <TabBar />
    </Layout>
  );
}

/* === styled-components === */
const Content = styled.div`
  padding: 16px 20px;
`;

const Title = styled.h2`
  font-size: 21px;
  font-weight: 700;
  color: #111;
  margin-bottom: 18px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 7px;
  padding: 10px 10px;
  margin-bottom: 24px;
  background: #fff;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  color: #111;
  ::placeholder {
    color: #B0B0B0;
  }
`;

const SearchButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 20px;
    height: 20px;
    filter: invert(60%);
  }
`;

const Section = styled.section`
  margin-bottom: 24px;
`;

const H2 = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
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
  &:hover {
    background: #f9f9f9;  
  }
`;

const Thumb = styled.div`
  width: 56px; height: 56px; flex: 0 0 56px;
  border-radius: 8px; background: #EAEAEA center/cover no-repeat;
`;
const Col = styled.div`flex: 1; min-width: 0;`;
const Top = styled.div`display: flex; align-items: center; gap: 8px;`;
const Name = styled.div`
  font-size: 14px; font-weight: 700; color: #111;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`;
const EngName = styled.span`
  font-size: 13px; font-weight: 400; color: #666; margin-left: 4px;
`;
const MenuInfo = styled.div`
  margin-top: 2px; font-size: 13px; font-weight: 500; color: #444;
`;
const Meta = styled.div`
  margin-top: 2px; font-size: 12px; color: #999; display: flex; gap: 10px;
`;
const Loading = styled.div`
  padding: 12px 0; text-align: center; font-size: 13px; color: #666;
`;
const Empty = styled.div`
  padding: 24px 0; text-align: center; font-size: 13px; color: #999;
`;
