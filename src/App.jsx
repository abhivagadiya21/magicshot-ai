import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import BabyPage from './pages/BabyGenerator/BabyPage.jsx';
import ChangeHaircut from "./pages/ChangeHaircut/ChangeHairstyle.jsx";
import AgeJourney from './pages/AgeJourney/AgeJourney.jsx';
import CoverPagesing from './components/SignInUp/CoverSignInUp.jsx';
import AgePredictor from './pages/AgePredictor/AgePredictor.jsx';
import MainLayout from './layout/MainLayout.jsx';
import SignIn from './components/SignInUp/SignIn.jsx';
import SignUp from './components/SignInUp/SignUp.jsx';
import ForgotPassword from './components/SignInUp/ForgotPassword.jsx';
import Profile from './pages/Profile/Profile.jsx';
import { CreditProvider } from './components/GlobalCom/Context.jsx';
import './styles/main.scss';

function App() {
  return (
    <>
      <CreditProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}  
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
            <Route path="/change-haircut" element={<ChangeHaircut />} />
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
