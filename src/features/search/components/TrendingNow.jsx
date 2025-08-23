import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiClient from "@/shared/api/apiClient";
import { useNavigate } from "react-router-dom"; 

export default function TrendingNow() {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTrendingStores() {
      try {
        const res = await apiClient.get("/store/", {
          params: { sort_by: "reviews", limit: 4 },
        });

        const formatted = (res.data?.results || res.data || []).map((s) => ({
          id: s.store_id,
          name: s.store_name,
          englishName: s.store_english,
          imageUrl: s.store_image,
          reviewCount: s.review_count || 0,
          firstMenu: s.menu_list?.[0] || null,
        }));

        setStores(formatted.slice(0, 4)); // ✅ 무조건 4개만
      } catch (err) {
        console.error("❌ TrendingNow 가게 불러오기 실패:", err);
      }
    }
    loadTrendingStores();
  }, []);


  return (
    <Wrap>
      <Title>Trending Now</Title>
      <List>
        {stores.map((store) => (
          <Row
            key={store.id}
            onClick={() => navigate(`/store/${store.id}`)}
          >
            <Thumb
              style={{
                backgroundImage: store.imageUrl
                  ? `url(${store.imageUrl})`
                  : undefined,
              }}
            />
            <Col>
              <Top>
                <Name>
                  {store.name} <EngName>{store.englishName}</EngName>
                </Name>
              </Top>

              {store.firstMenu && (
                <MenuInfo>
                  {store.firstMenu.korean} · {store.firstMenu.price}
                </MenuInfo>
              )}

              <Meta>
                <span>리뷰 {store.reviewCount}개</span>
              </Meta>
            </Col>
          </Row>
        ))}
      </List>
    </Wrap>
  );
}

/* === styled === */
const Wrap = styled.section`
  margin: 20px 0;
`;

const Title = styled.div`
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 125%;
  letter-spacing: -0.4px;
  padding-bottom: 12px;
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
  border-radius: 6px;
  padding: 6px 4px;
`;

const Thumb = styled.div`
  width: 56px;
  height: 56px;
  flex: 0 0 56px;
  border-radius: 8px;
  background: #EAEAEA center/cover no-repeat;
`;

const Col = styled.div`
  flex: 1;
  min-width: 0;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EngName = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: #666;
  margin-left: 4px;
`;

const MenuInfo = styled.div`
  margin-top: 2px;
  font-size: 13px;
  font-weight: 500;
  color: #444;
`;

const Meta = styled.div`
  margin-top: 2px;
  font-size: 12px;
  color: #999;
`;
