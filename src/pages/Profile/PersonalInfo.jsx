import React, { use, useEffect, useState } from "react";
import ProfileImage from "./Profile-image/Profile-icon.svg";
import { useCredits } from "../../components/GlobalCom/Context";
import { updateUserProfileAPI } from "../../services/imageBase";
import { toast } from "react-toastify";
import backArrow from "./Profile-image/backArrow.png";
import { useNavigate, useLocation } from "react-router-dom";

function PersonalInfo() {
  const { state, fetchUser } = useCredits();
  const { name, email, userName, bio } = state;
  console.log("User Info:", { name, email, userName, bio });
  const navigate = useNavigate();
  // const location = useLocation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
  });

  useEffect(() => {
    setFormData({
      username: userName,
      bio: bio,
    });
  }, [userName, bio]);


  const updateUserInfo = async () => {
    const cleanedData = {
      username: formData.username.trim() === "" ? "Not set" : formData.username.trim(),
      bio: formData.bio.trim() === "" ? "Not set" : formData.bio.trim(),
    };
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated");
      return;
    }
    try {
      const { data } = await updateUserProfileAPI(token, cleanedData);
      console.log("Update response:", data);
      if (data.username || data.bio) {
        toast.success("Profile updated successfully!");
        await fetchUser();
      }
      else {
        toast.error(data.message || "Failed to update profile info");
      }

      // const response = await fetch("http://localhost:3000/auth/profile", {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      //   body: JSON.stringify(cleanedData),
      // });
      // const data = await response.json();

      // if (!response.ok) {
      //   toast.error(data.error || "Not   update profile info");
      //   setLoading(false);
      //   return;
      // }
      // // toast.success("Profile updated successfully!");
      // await fetchUser();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "❌ Failed to generate image."
      );
    }
  }


  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Input Change:", name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    updateUserInfo();
    setIsEditing(false);
  };

  return (
    <>
      <div className="right-main-container">
        <div className="right-container">
          <img
            className="credits-back-arrow"
            onClick={() => navigate(`/profile`)}
            src={backArrow}
            alt=""
          />
          <p>Personal Info</p>
        </div>
      </div>

      <div className="right-main-info-container">
        <div className="right-image-profile-info-container">
          <div className="right-profile-info-container">
            <img width="100" height="100" src={ProfileImage} alt="user" />
          </div>
          <button className="right-profile-name">Change Image</button>
        </div>

        <div className="name-and-button-container">
          <p className="profile-name">Name</p>
          <button
            className="edit-details-button"
            onClick={isEditing ? handleSave : handleEditToggle}
          >
            {isEditing ? "Save" : "Edit Details"}
          </button>
        </div>

        <div className="right-name-container">
          <p className="right-name">{name}</p>
        </div>

        <p className="profile-name">Username</p>
        <div className="right-name-container">
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="edit-input"
              placeholder="Enter username"
            />
          ) : (
            <p className="right-name">
              {userName || "Not Set"}
            </p>
          )}
        </div>

        <p className="profile-name">Bio</p>
        <div className="right-name-container">
          {isEditing ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="edit-input"
              placeholder="Write something about yourself..."
            />
          ) : (
            <p className="right-name">
              {bio || "Not Set"}
            </p>
          )}
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
  );
}

export default PersonalInfo;
