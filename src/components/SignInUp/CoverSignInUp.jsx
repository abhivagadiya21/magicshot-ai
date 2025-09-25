import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import closeIcon from "../Heading/heading-img/close.svg";
import containtImg from './sign-in-up-img/containt.png';
import Logo from "../Heading/heading-img/logo.png";



function CoverPagesing() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split('/').pop();
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("ref") || "/";

  return (
    <div className="main-cover-sign-page-component">
      <div className="main-cover-sing-page">
        <div className="inner-main-cover-sing-page">
          <div className="left-inner-main-cover-sing">
            <img className="containt-left-sign-page" src={containtImg} alt="Illustration" />
          </div>

          <div className="right-inner-main-cover-sing">
            <img width="20" height="20" className='cloase-button'
              onClick={() => navigate(redirectPath)} src={closeIcon} alt="cancel" />
            <img src={Logo} alt="Logo" className="right-side-main-logo" />

            <div className="form-container">
              <div className="form-container">
                {/* ✅ Hide tabs on forgot-password */}
                {currentPath !== "forgot-password" && (
                  <div className="form-header">
                    <Link to="signin">
                      <button
                        className={`tab-button ${currentPath === "signin" ? "active" : ""}`}
                      >
                        Sign In
                      </button>
                    </Link>
                    <Link to="signup">
                      <button
                        className={`tab-button ${currentPath === "signup" ? "active" : ""}`}
                      >
                        Sign Up
                      </button>
                    </Link>
                  </div>
                )}
              </div>


              <div className="form-body">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverPagesing;