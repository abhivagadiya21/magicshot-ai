import React, { use, useEffect, useState } from "react";
import ProfileImage from "./Profile-image/Profile-icon.svg";
import { useCredits } from "../../components/GlobalCom/Context";
import { updateUserProfileInfoAPI } from "../../services/imageBase";
import { updateUserProfileImageAPI } from "../../services/imageBase";
import { getUserProfileAPI } from "../../services/imageBase";
import { toast } from "react-toastify";
import backArrow from "./Profile-image/backArrow.png";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileCropImage from "../../components/ProfilecropImage/ProfilecropImage";

function PersonalInfo() {

  const [profileImg, setProfileImg] = useState(ProfileImage); // default image
  const [getProfileImg, setGetProfileImg] = useState(null);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const { state, fetchUser } = useCredits();
  const { name, email } = state;
  console.log("User Info:", { name, email });

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formDataFields, setFormDataFields] = useState({
    username: '',
    bio: '',
  });
  const [gettingProfile, setGettingProfile] = useState({
    username: '',
    bio: '',
  });

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated");
      return;
    }
    try {
      const { data } = await getUserProfileAPI(token);
      console.log("Profile Data:", data);
      if (data.username || data.bio) {
        setGettingProfile({
          username: data.username,
          bio: data.bio,
        });
        console.log("Profile fetched successfully", gettingProfile);
      }
      if (data.profileImage) {
        setProfileImg(data.profileImage);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "❌ Failed to fetch profile."
      );
    }
  }

  const updateUserInfo = async () => {
    const cleanedData = {
      username: formDataFields.username.trim() === "" ? "Not set" : formDataFields.username.trim(),
      bio: formDataFields.bio.trim() === "" ? "Not set" : formDataFields.bio.trim(),
    };
    console.log("Cleaned Data:", cleanedData)
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated");
      return;
    }
    try {
      const { data } = await updateUserProfileInfoAPI(token, cleanedData);
      console.log("Update response:", data);
      if (data.username || data.bio) {
        toast.success("Profile updated successfully!");
        await fetchUser();
      }
      else {
        toast.error(data.message || "Failed to update profile info");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "❌ Failed to generate image."
      );
    }
  }

  function base64ToFile(base64String, filename) {
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1]; // get MIME type
    const bstr = atob(arr[1]); // decode base64
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const updateUserProfileIMG = async (imageBase64) => {
    console.log("Updating profile image with:", imageBase64);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated");
      return;
    }

    try {
      // Convert base64 to File
      const file = base64ToFile(imageBase64, "profile.png");
      console.log("Converted file:", file);
      // const formData = new FormData();
      // formData.append("profileImage", file);

      const { data } = await updateUserProfileImageAPI(token, file);
      if (data.profileImage) {
        toast.success("Profile image updated!");
        setGetProfileImg(data.profileImage);
        console.log("Image upload response:", data.profileImage);
         await getProfile();
        await fetchUser();
      } else {
        toast.error(data.message || "Failed to update image");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error(
        error?.response?.data?.message || "❌ Failed to upload image."
      );
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    setFormDataFields({
      username: gettingProfile.username,
      bio: gettingProfile.bio,
    });
  }, [gettingProfile.username, gettingProfile.bio]);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Input Change:", name, value);
    setFormDataFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    console.log("Saved Data:", formDataFields);
    await updateUserInfo();
    await getProfile();
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
    return croppedImage;
    // await updateUserProfileIMG(croppedImage);
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
              src={getProfileImg?getProfileImg:profileImg}
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
              value={formDataFields.username}
              onChange={handleChange}
              className="edit-input"
              placeholder="Enter username"
            />
          ) : (
            <p className="right-name">
              {gettingProfile.username || "Not Set"}
            </p>
          )}
        </div>

        <p className="profile-name">Bio</p>
        <div className="right-name-container">
          {isEditing ? (
            <textarea
              name="bio"
              value={formDataFields.bio}
              onChange={handleChange}
              className="edit-input"
              placeholder="Write something about yourself..."
            />
          ) : (
            <p className="right-name">
              {gettingProfile.bio || "Not Set"}
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

      {/* ✅ Crop Modal */}
      {isCropOpen && (
        <div className="crop-modal">
          <div className="crop-modal-content">
            <ProfileCropImage imageSrc={imageSrc} onCropDone={handleCropDone} onSelectIMG={(croppedImage) => updateUserProfileIMG(croppedImage)} />
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