import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ImageSlider from '../components/mainPage/ImageSlider';
import styled from 'styled-components';
import SearchBar from '../components/mainPage/SearchBar';
import Category from '../components/mainPage/Category';
import StoreCard from '../components/mainPage/StoreCard';
import Divider from '../components/Divider';
import MarketInfo from '../components/mainPage/MarketInfo';

const Home = () => {
    const [selectedId, setSelectedId] = useState(1);

  return (
    <>
        <Layout overlapHeader>
            <ImageSlider />
            <SearchBar />
            <Category selectedId={selectedId} onSelect={setSelectedId}/>
            <StoreCard />

            <Divider />

            <MarketInfo />

        </Layout>
        {/* <Link to="/receipt">영수증 페이지로 이동</Link> */}
    </>
  )
}

export default Home
