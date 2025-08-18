import { useRef, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
// import Receipt from './pages/Receipt';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/receipt" element={<Receipt />} /> */}
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
