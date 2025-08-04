
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Headers from './components/heding/heding.jsx';
import BabyPage from './pages/BabyGenrator_page/babyPage.jsx';
import ChagehaircutPage from './pages/ChangeHaircut_page/chnagehaircut.jsx';
import AgeJourney from './pages/AgeJourney_page/Agejourney.jsx';
import CoverPagesing from './components/sign_in_up_compo/Cover_sing_in_up.jsx';
import AgePredictor from './pages/AgePredictor_page/AgePredictor.jsx';
import AuthLayout from './layout/AuthLayout.jsx';
import MainLayout from './layout/MainLayout.jsx';
import SignIn from './components/sign_in_up_compo/SignIn.jsx'
import SignUp from './components/sign_in_up_compo/SignUp.jsx'
import ForgotPassword from './components/sign_in_up_compo/ForgotPassword.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<BabyPage />} />
          <Route path="/age-predictor" element={<AgePredictor />} />
          <Route path="/age-journey" element={<AgeJourney />} />
          <Route path="/change-haircut" element={<ChagehaircutPage />} />
        </Route>
       
        <Route path="/sign-in-up" element={<CoverPagesing />} >
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
     
      </Routes>
    </>
  );
}

export default App;
