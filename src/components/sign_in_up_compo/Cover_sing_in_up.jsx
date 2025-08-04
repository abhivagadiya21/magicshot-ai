import './sing_page.css'
import { Link, Outlet, useLocation  } from "react-router-dom"
import containtImg from './sign_in_up_img/containt.png';
function CoverPagesing() {
      const location = useLocation();
        const currentPath = location.pathname.split('/').pop();

    return (
        <>
            <div className="main-cover-sign-page-compo">
                <div className="inner-main-cover-sing-page">
                    <div className="left-inner-main-cover-sing">
                        <img className='containt-left-sign-page' src={containtImg} alt="" />
                    </div>
                    <div className="right-inner-main-cover-sing">

                        <div className="form-container">
                            <div className="form-header">
                                <Link to="signin">
                                    <button className={currentPath === "signin" ? "active-tab" : ""}>
                                        Sign In
                                    </button>
                                </Link>
                                <Link to="signup">
                                    <button className={currentPath === "signup" ? "active-tab" : ""}>
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                            <div className="form-body">
                                <Outlet />
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}
export default CoverPagesing;
