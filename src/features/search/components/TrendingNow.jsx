import React, { useEffect, useState } from "react";
import styled from "styled-components";
import apiClient from "@/shared/api/apiClient";
import { useNavigate } from "react-router-dom";
import ReviewIcon from "@/assets/icons/review.png";
import MenuImg from "@/assets/icons/tag_restaurants.png";

export default function TrendingNow() {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTrendingStores() {
      try {
        const res = await apiClient.get("/store/", {
          params: { sort_by: "reviews", limit: 4 },
        });

        const list = res.data?.results || res.data || [];
        setStores(list.slice(0, 4));
      } catch (err) {
        console.error("❌ TrendingNow fetch 실패:", err);
      }
    }
    loadTrendingStores();
  }, []);

  return (
    <Wrap>
      <Title>Trending Now</Title>
      <List>
        {stores.map((s) => (
          <Row
            key={s.store_id}
            onClick={() => navigate(`/store/${s.store_id}`)}
          >
            <Thumb src={s.store_image} alt={s.store_name} />
            <Info>
              <Name>{s.store_name}</Name>
              {s.store_english && <EngName>{s.store_english}</EngName>}

              <MetaRow>
                <MenuBox>
                  <MenuIcon src={MenuImg} alt="메뉴" />
                  <MenuText>
                    {s.menu_list?.[0]?.korean || "-"}{" "}
                    {s.menu_list?.[0]?.price &&
                      `· ${s.menu_list[0].price}`}
                  </MenuText>
                </MenuBox>

                <ReviewBox>
                  <Icon src={ReviewIcon} alt="리뷰" />
                  <ReviewNum>{s.review_count ?? 0}</ReviewNum>
                </ReviewBox>
              </MetaRow>
            </Info>
          </Row>
        ))}
      </List>
    </Wrap>
  );
}

/* === styled-components === */
const Wrap = styled.section`
  margin: 0;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 8px 4px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #f9f9f9;
  }
`;

const Thumb = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background: #eaeaea;
  object-fit: cover;
  flex-shrink: 0;
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Name = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #111;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EngName = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: #666;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between; /* 메뉴 왼쪽, 리뷰 오른쪽 */
  align-items: center;
`;

const MenuBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MenuIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const MenuText = styled.div`
  font-size: 13px;
  color: #444;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReviewBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

const ReviewNum = styled.div`
  font-size: 12px;
  color: #858585;
`;
