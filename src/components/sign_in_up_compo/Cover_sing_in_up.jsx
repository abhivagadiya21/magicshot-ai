import './cover_sing_page.css';
import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import containtImg from './sign_in_up_img/containt.png';
import Logo from "../heding/hedingimg/logo.png";

function CoverPagesing() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split('/').pop();
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("ref") || "/";

  return (
    <div className="main-cover-sign-page-compo">
      <div className="inner-main-cover-sing-page">
        <div className="left-inner-main-cover-sing">
          <img className="containt-left-sign-page" src={containtImg} alt="Illustration" />
        </div>

        <div className="right-inner-main-cover-sing">
          <img width="20" height="20" className='cloase-button'
            onClick={() => navigate(redirectPath)} src="https://img.icons8.com/ios-filled/50/FFFFFF/cancel.png" alt="cancel" />
          <img src={Logo} alt="Logo" className="right-side-main-logo" />

          <div className="form-container">
            {/* ✅ Hide tabs on forgot-password */}
            {currentPath !== "forgot-password" && (
              <div className="form-header">
                <Link to="signin">
                  <button className={currentPath === "signin" ? "active-tab" : ""}>Sign In</button>
                </Link>
                <Link to="signup">
                  <button className={currentPath === "signup" ? "active-tab" : ""}>Sign Up</button>
                </Link>
              </div>
            )}

            <div className="form-body">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverPagesing;