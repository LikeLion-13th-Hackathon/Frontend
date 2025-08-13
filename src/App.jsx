import { useRef, useState } from 'react'
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const contentRef = useRef(null);

  return (
    <>
      <Header title='헤더' />

      <div className="outer">
        <div className="inner">

          <main className="app-content" ref={contentRef}>
            <section className="section">
              <h1>테스트데스트</h1>
              {[...Array(120)].map((_, i) => (
                <p key={i}>테스트테스트 {i + 1}</p>
              ))}
            </section>
          </main>

          {/* <Footer /> */}
        </div>
      </div>
    </>

  )
}

export default App
