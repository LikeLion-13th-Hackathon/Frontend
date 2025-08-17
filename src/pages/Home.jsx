import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ImageSlider from '../components/ImageSlider';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import Category from '../components/Category';
import StoreCard from '../components/mainPage/StoreCard';

const Home = () => {
    const [selectedId, setSelectedId] = useState(1);

  return (
    <>
        <Layout overlapHeader>
            <ImageSlider />

            <SearchBar />

            <Category selectedId={selectedId} onSelect={setSelectedId}/>

            <StoreCard />
        </Layout>
        {/* <Link to="/receipt">영수증 페이지로 이동</Link> */}
    </>
  )
}

export default Home
