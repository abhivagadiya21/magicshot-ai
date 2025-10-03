import { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import ProfileImage from "./Profile-image/Profile-icon.svg"
import GreterThan from "../../components/Heading/heading-img/moblienavarrow.svg"
import StarIcon from "../BabyGenerator/baby-img/star.svg"
import ProfileInfo from "./Profile-image/profile-info.svg"
import BackArrow from "./Profile-image/backArrow.png"
import { useCredits } from "../../components/GlobalCom/Context";


export default function profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split('/').pop();
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("ref") || "/";
  // const [userEmail, setUserEmail] = useState("");

  const { state, dispatch, fetchUser } = useCredits();
  const { name, email } = state;

  // useEffect(() => {
  //   const loadUser = () => {
  //     const savedUser = localStorage.getItem("user");
  //     if (savedUser) {
  //       const user = JSON.parse(savedUser);
  //       setUserEmail(user.email || "");
  //     }
  //   };

  //   loadUser();
  //   window.addEventListener("userUpdated", loadUser);

  //   return () => {
  //     window.removeEventListener("userUpdated", loadUser);
  //   };
  // }, []);

  const isActive = (path) => currentPath === path;

  return (
    <>
      <div className=" main-container">
        {/* <div className="left-container profile-left-container"> */}
        <div
          className={`left-container profile-left-container ${currentPath === "profile" ? "show-on-mobile" : "hide-on-mobile"
            }`}
        >

          <div className="back-icon-container">
            <img className="back-icon-image" src={BackArrow} onClick={() => {
              if (currentPath === "profile") {
                navigate('/');
              } else {
                navigate(-1);
              }
            }} alt="" />
          </div>

          <div className="profile-info">
            <div className="profile-info-image-container">
              <img width="100" height="100" src={ProfileImage} alt="user" />
            </div>
            <span className="profile-name">{name}</span>
            <span className="profile-name">{email}</span>
          </div>

          {currentPath && (
            <div className="user-details-button-container">
              <Link to="personal-info" className={`link-button ${isActive("personal-info") ? "active-profile-info" : ""}`}>

                <button className={`personal-info-button `}>
                  <img width="24" height="24" src={ProfileInfo} alt="user" />
                  Personal Info
                </button>

                <span className="detail-arrow">
                  <img width="15" height="15" src={GreterThan} alt="" />
                </span>
              </Link>

              <Link to="credits-history" className={`link-button ${isActive("credits-history") ? "action-credit-info" : ""} `}>
                <button className={`credit-history-button `}>
                  <img width="24" height="24" src={StarIcon} alt="" />
                  Credits Histroy
                </button>
                <span className="detail-arrow">
                  <img width="15" height="15" src={GreterThan} alt="" />
                </span>
              </Link>
            </div>
          )}
        </div>
        <div className="right-main-profile">

          <Outlet />

        </div>


      </div>

    </>
  )
}

{/* <NavLink to="personal-info">Personal Info</NavLink> |{" "}
  <NavLink to="credits-history">Credits History</NavLink> */}