
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ← only import Routes/Route
import Headers from './components/heding/heding.jsx';
import BabyPage from './pages/BabyGenrator_page/babyPage.jsx';
import ChagehaircutPage from './pages/ChangeHaircut_page/chnagehaircut.jsx';
import AgeJourney from './pages/AgeJourney_page/Agejourney.jsx';
import AgePredictor from './pages/AgePredictor_page/AgePredictor.jsx';

function App() {
  return (
    <>
      <Headers />
      <Routes>
        <Route path="/" element={<BabyPage />} />
        <Route path="/age-predictor" element={<AgePredictor />} />
        <Route path="/age-journey" element={<AgeJourney />} />
        <Route path="/change-haircut" element={<ChagehaircutPage />} />
      </Routes>
    <Headers />
    </>
  );
}

export default App;
