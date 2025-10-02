import React from "react";
import ProfileImage from "./Profile-image/Profile-icon.svg"
import { useCredits } from "../../components/GlobalCom/Context";
import backArrow from "./Profile-image/backArrow.png";
import { useNavigate } from "react-router-dom";


function PersonalInfo() {
  const { state, dispatch, fetchUser } = useCredits();
  const { name, email } = state;
  const navigate = useNavigate();
  return (
    <>
      <div className="right-main-container">
        <div className="right-container">
          <img className="credits-back-arrow" onClick={() => navigate(`/`)} src={backArrow} alt="" />
          <p>Personal Info</p>
        </div>
      </div>

      <div className="right-main-info-container">
        <div className="right-image-profile-info-container">
          <div className="right-profile-info-container">
            <img width="100" height="100" src={ProfileImage} alt="user" />
          </div>
          <span className="right-profile-name">change image</span>
        </div>
        <div className="name-and-button-container">
          <p className="profile-name">Name</p>
          <button className="edit-details-button">Edit Details</button>
        </div>

        <div className="right-name-container">
          <p className="right-name">{name}</p>
        </div>
        <p className="profile-name">Username</p>
        <div className="right-name-container">
          <p className="right-name">Not Set</p>
        </div>
        <p className="profile-name">Bio</p>
        <div className="right-name-container">
          <p className="right-name">Not Set</p>
        </div>

        <div className="divayder"></div>
        <p className="profile-name">Email</p>
        <div className="right-name-container">
          <p className="right-name">{email}</p>
        </div>
        <div className="divayder"></div>

        <p className="profile-name">Password</p>
        <div className="right-name-container">
          <div className="name-and-button-container">
            <p className="right-name">Change Password</p>
            <button className="edit-details-button">Change Password</button>
          </div>
        </div>
        <div className="divayder"></div>
      </div>

    </>
  )

}

export default PersonalInfo;
