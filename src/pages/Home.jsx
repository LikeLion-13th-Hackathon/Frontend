import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ImageSlider from '../components/ImageSlider';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';

const Home = () => {

  return (
    <>
        <Layout>
            <OverlapHeader>
                <ImageSlider />
            </OverlapHeader>

            <SearchBar />
        </Layout>
        {/* <Link to="/receipt">영수증 페이지로 이동</Link> */}
    </>
  )
}

export default Home

const OverlapHeader = styled.div`
  margin-top: calc(-1 * (var(--header-h) + 8px));
`;