import './App.css'
import React from 'react'
import Headers from './components/heding/heding.jsx'
import BabyPage from './pages/BabyGenrator_page/babyPage.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Headers />
     <Routes>
      <Route path="/" element={<BabyPage />} />
    </Routes>
    </>
  )
}

export default App
