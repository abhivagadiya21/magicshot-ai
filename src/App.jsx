import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // ✅ styling import

import Headers from './components/heding/heding.jsx';
import BabyPage from './pages/BabyGenrator_page/babyPage.jsx';
import ChagehaircutPage from './pages/ChangeHaircut_page/chnagehaircut.jsx';
import AgeJourney from './pages/AgeJourney_page/Agejourney.jsx';
import CoverPagesing from './components/sign_in_up_compo/Cover_sing_in_up.jsx';
import AgePredictor from './pages/AgePredictor_page/AgePredictor.jsx';
import AuthLayout from './layout/AuthLayout.jsx';
import MainLayout from './layout/MainLayout.jsx';
import SignIn from './components/sign_in_up_compo/SignIn.jsx';
import SignUp from './components/sign_in_up_compo/SignUp.jsx';
import ForgotPassword from './components/sign_in_up_compo/ForgotPassword.jsx';
import Profile from './pages/profile_page/profile.jsx';
import { CreditProvider } from './components/global_com/context.jsx';

function App() {
  return (
    <>
      <CreditProvider>
        {/* ✅ Toast container ek vaar top level par */}
        <ToastContainer
          position="top-right"
          autoClose={3000}  // 3s ma band
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<BabyPage />} />
            <Route path="/age-predictor" element={<AgePredictor />} />
            <Route path="/age-journey" element={<AgeJourney />} />
            <Route path="/change-haircut" element={<ChagehaircutPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/auth" element={<CoverPagesing />}>
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </CreditProvider>
    </>
  );
}

export default App;
