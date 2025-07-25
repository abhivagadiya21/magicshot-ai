import './App.css'
import React from 'react'
import Headers from './components/heding/heding.jsx'
import BabyPage from './pages/BabyGenrator_page/babyPage.jsx';
import ChagehaircutPage from './pages/ChangeHaircut_page/chnagehaircut.jsx';
import AgeJourney from './pages/AgeJourney_page/Agejourney.jsx';
import AgePredictor from './pages/AgePredictor_page/AgePredictor.jsx';

function App() {
  return (
    <>
    <Headers />
      <BabyPage />
      {/* <ChagehaircutPage /> */}
      {/* <AgeJourney /> */}
      {/* <AgePredictor /> */}
    </>
  )
}

export default App
