import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ExchangeRate from './pages/ExchangeRate';
import ErrorPage from './pages/ErrorPage';
import Header from './components/Header';


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exchange-rate" element={<ExchangeRate />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
