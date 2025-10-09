import ProfileImage from "./Profile-image/Profile-icon.svg";
import React, { useState } from "react";
import { useCredits } from "../../components/GlobalCom/Context";
import backArrow from "./Profile-image/backArrow.png";
import { useNavigate } from "react-router-dom";
import ProfileCropImage from "../../components/ProfilecropImage/ProfilecropImage"; // ✅ fixed import

function PersonalInfo() {
    const { state, dispatch } = useCredits();
  const { name, email } = state;
  const navigate = useNavigate();
 

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
  });

  const [profileImg, setProfileImg] = useState(ProfileImage); // default image
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    setIsEditing(false);
  };

  // 🔹 Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImageSrc(reader.result);
      setIsCropOpen(true); // open crop modal
    });
    reader.readAsDataURL(file);
  };

  // 🔹 Handle final cropped image
  const handleCropDone = async (croppedAreaPixels, rotation) => {
    const croppedImage = await getCroppedImage(imageSrc, croppedAreaPixels, rotation);
    setProfileImg(croppedImage);
    setIsCropOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    dispatch({ type: "SET_USER", payload: null });
    dispatch({ type: "SET_CREDITS", payload: 0 });

    window.dispatchEvent(new Event("userUpdated"));

    setTimeout(() => {
      navigate("/", { replace: true });
    }, 50);
  };

  return (
    <>
      <div className="right-main-container">
        <div className="right-container">
          <img
            className="credits-back-arrow"
            onClick={() => navigate(`/profile`)}
            src={backArrow}
            alt="back"
          />
          <p>Personal Info</p>
        </div>
      </div>

      <div className="right-main-info-container">
        <div className="right-image-profile-info-container">
          <div className="right-profile-info-container">
            <img
              width="100"
              height="100"
              src={profileImg}
              alt="user"
            />
          </div>

          <label className="right-profile-name">
            Change Image
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </label>
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
            <p className="right-name">{formData.username || "Not Set"}</p>
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
            <p className="right-name">{formData.bio || "Not Set"}</p>
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

        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>

      {isCropOpen && (
        <div className="crop-modal">
          <div className="crop-modal-content">
            <ProfileCropImage imageSrc={imageSrc} onCropDone={handleCropDone} />
            <button className="close-crop" onClick={() => setIsCropOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PersonalInfo;

/* ✅ Helper to get cropped image */
async function getCroppedImage(imageSrc, croppedAreaPixels, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const safeArea = Math.max(image.width, image.height) * 2;
  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(
    image,
    safeArea / 2 - image.width / 2,
    safeArea / 2 - image.height / 2
  );

  const data = ctx.getImageData(0, 0, safeArea, safeArea);
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  ctx.putImageData(
    data,
    Math.round(-safeArea / 2 + image.width / 2 - croppedAreaPixels.x),
    Math.round(-safeArea / 2 + image.height / 2 - croppedAreaPixels.y)
  );

  // ✅ Make output circular
  const size = Math.min(canvas.width, canvas.height);
  const roundCanvas = document.createElement("canvas");
  const roundCtx = roundCanvas.getContext("2d");
  roundCanvas.width = size;
  roundCanvas.height = size;

  roundCtx.beginPath();
  roundCtx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
  roundCtx.closePath();
  roundCtx.clip();
  roundCtx.drawImage(canvas, 0, 0, size, size);

  return roundCanvas.toDataURL("image/png");
}

function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}