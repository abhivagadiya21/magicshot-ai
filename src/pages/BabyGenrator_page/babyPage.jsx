import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePopup from "../../hooks/usePopup";
import useUploadImg from "../../hooks/useUploadImg";
import { babyuploadeAPI } from "../../services/imageBase";
import "../BabyGenrator_page/babyPage.css";
import Upload_img from "../../components/upload_img_re_compo/Upload_img";
import CropImage from "../../components/CropImage/CropImage";
import Howworkpop from "../../components/popUp/how_it_work_pop/Howworkpop";
import star from "./babyG-img/star.svg";
import babyImage from "./babyG-img/babyG.png";
import questionMark from "./babyG-img/question.svg";
import poppassimage1 from "./babyG-img/poppassimg1.png";
import Profileicon1 from "./babyG-img/profile-1.svg";
import upload from "./babyG-img/upload.svg";
import boyIcon from "../BabyGenrator_page/babyG-img/boy.png";
import girlIcon from "../BabyGenrator_page/babyG-img/girl.png";
import GetImage_pop from "../../components/popUp/getimage_pop/getImage_pop.jsx";
import { blobUrlToFile } from "../../utils/blobToFile";
import { useCredits } from "../../components/global_com/context.jsx";
import Loader from "../../components/Loader/Loader";

function UploadSection({ label, uploadHook, inputId }) {
  return (
    <div className="uplod-image-button-container">
      <label className="uplod-image-button" htmlFor={inputId}>
        {uploadHook.croppedImage ? (
          <img src={uploadHook.croppedImage} alt={label} className="preview-img" />
        ) : (
          <>
            <div className="profile-icon-container">
              <img src={Profileicon1} alt={`${label} Icon`} className="Parent-Icon" />
            </div>
            <p>{label}</p>
          </>
        )}
      </label>
      <div className="image-upload-button-container">
        <input
          type="file"
          accept="image/*"
          id={inputId}
          className="hidden"
          onChange={uploadHook.handleFileUpload}
          disabled={!!uploadHook.croppedImage}
        />

        {!uploadHook.croppedImage ? (
          <label htmlFor={inputId} className="uplod-button">
            <img className="upload-image-icon" src={upload} alt="Upload Icon" />
            <p>Upload</p>
          </label>
        ) : (
          <button
            type="button"
            className="uplod-button"
            onClick={() => {
              uploadHook.resetImage();
              const input = document.getElementById(inputId);
              if (input) input.value = "";
            }}>
            <img
              width="10"
              height="10"
              src="https://img.icons8.com/ios-glyphs/30/FFFFFF/delete-sign.png"
              alt="delete"
            />
            Cancel
          </button>
        )}
      </div>

      {uploadHook.showCropper && (
        <div className="overlay">
          <div className="crop-popup">
            <button className="close-popup-button" onClick={() => uploadHook.setShowCropper(false)}>
              <img
                width="20"
                height="20"
                src="https://img.icons8.com/ios-glyphs/30/FFFFFF/delete-sign.png"
                alt="close"
              />
            </button>
            <div className="cropper-header">
              <p>Crop Image</p>
            </div>
            <CropImage
              imageSrc={uploadHook.selectedFile}
              onCropDone={uploadHook.handleCropComplete}
              onCancel={() => uploadHook.setShowCropper(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function GenderOption({ gender, selectedGender, handleSelect, icon }) {
  const isSelected = selectedGender === gender;
  return (
    <button
      type="button"
      className={`gender-option ${isSelected ? "selected" : ""}`}
      onClick={() => handleSelect(gender)}>
      <div className="gender-avatar-container">
        <img src={icon} alt={`${gender} Avatar`} className="gender-avatar-img" />
        <span className="avatar-text">{gender.charAt(0).toUpperCase() + gender.slice(1)}</span>
      </div>
      <div className={`button-container ${isSelected ? "checked" : ""}`}>
        {isSelected && (
          <span className="checkmark">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/FFFFFF/external-verified-check-circle-for-approved-valid-content-basic-bold-tal-revivo.png"
              alt="checkmark"
            />
          </span>
        )}
      </div>
    </button>
  );
}

function BabyPage() {
  const { showPopup: showHowWork, handleOpen: openHowWork, handleClose: closeHowWork } = usePopup();
  const { showPopup: showImagePopup, handleOpen: openImagePopup, handleClose: closeImagePopup } = usePopup();
  const [selectedGender, setSelectedGender] = useState("boy");
  const [genraterImageurl, setGenraterImageurl] = useState(null);
  const [loading, setLoading] = useState(false);
  const parent1Upload = useUploadImg();
  const parent2Upload = useUploadImg();
  const fixedRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (fixedRef.current) {
        fixedRef.current.style.transform = `translateY(-${window.scrollY}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { dispatch, fetchUser } = useCredits();
  const handleGenerate = async () => {
    if (!parent1Upload.croppedImage || !parent2Upload.croppedImage) {
      toast.error("⚠️ Please upload both parent images.");
      return;
    }
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?.id) {
      toast.error("❌ User not logged in.");
      return;
    }

    const parent1File = await blobUrlToFile(parent1Upload.croppedImage, "parent1.png");
    const parent2File = await blobUrlToFile(parent2Upload.croppedImage, "parent2.png");

    const imageFiles = {
      parent1: parent1File,
      parent2: parent2File,
    };
    console.log("Image Files:", imageFiles);

    const otherData = {
      userid: storedUser.id,
      gender: selectedGender,
      transactionId: 1,
    };
    console.log("Other Data:", otherData);

    setLoading(true);

    try {
      const response = await babyuploadeAPI(imageFiles, otherData);
      console.log("Response from API:", response);
      const data = response.data;
      if (data?.file) {
        setLoading(false);
        setGenraterImageurl(data.file);
        toast.success("🎉 Baby image generated successfully!");
        fetchUser()
      } else {
        toast.error("❌ No image returned from server.");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "❌ Failed to generate image.");
      setLoading(false);
    }
  };

  const handleclick = async () => {
    await handleGenerate();
    openImagePopup();
  };

  return (
    <>
      <div className="main-container main-baby-genrartor-midia">
        {loading && <Loader />}
        {/* Left Section */}
        <div className="left-container">
          <div className="header-section">
            <p className="Baby-hading">AI Baby Generator</p>
            <button onClick={openHowWork} className="button-popup-howtowork">
              <img src={questionMark} alt="Help icon" />
              <span>How It Works</span>
            </button>
            {showHowWork && (
              <Howworkpop
                howworkpopDetails={{
                  onClose: closeHowWork,
                  image: poppassimage1,
                  message: "Upload your photos, and AI quickly generates an image of your future baby.",
                }}
              />
            )}
          </div>

         
            <div className="upload-image-buttons-baby">
              <UploadSection label="Parent 1" uploadHook={parent1Upload} inputId="parent1Input" />
              <UploadSection label="Parent 2" uploadHook={parent2Upload} inputId="parent2Input" />
            </div>

            <p className="Baby-gender">Baby's Gender</p>
            <div className="gender-main-container">
              <GenderOption
                gender="boy"
                selectedGender={selectedGender}
                handleSelect={setSelectedGender}
                icon={boyIcon}
              />
              <GenderOption
                gender="girl"
                selectedGender={selectedGender}
                handleSelect={setSelectedGender}
                icon={girlIcon}
              />
            </div>
          
        </div>

        <div className="left-main-babyG-footer" ref={fixedRef}>
          <div className="time-estimation-container">
            <div className="time-estimation">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.3618 15.7052C15.2218 15.9452 14.9718 16.0752 14.7218 16.0752C14.5918 16.0752 14.4518 16.0352 14.3318 15.9652L11.6018 14.3252C11.3718 14.1952 11.2318 13.9452 11.2318 13.6852V10.1552C11.2318 9.73516 11.5718 9.40516 11.9818 9.40516C12.3918 9.40516 12.7318 9.73516 12.7318 10.1552V13.2552L15.1018 14.6852C15.4618 14.8952 15.5818 15.3552 15.3618 15.7052ZM12.1518 5.03516C7.75187 5.03516 4.17188 8.61516 4.17188 13.0152C4.17188 17.4152 7.75187 20.9952 12.1518 20.9952C16.5518 20.9952 20.1318 17.4152 20.1318 13.0152C20.1318 8.61516 16.5518 5.03516 12.1518 5.03516Z"
                  fill="white"/>
              </svg>
              <p>Est. time: 30 to 50 seconds</p>
            </div>
          </div>

          <div className="action-buttons-container">
            <button className="pricing-btn">See Pricing</button>
            <button className="generate-btn" onClick={handleclick}>
              Generate
              <div className="generate-btn-icon">
                <img src={star} alt="star icon" />
                <span>-0.5</span>
              </div>
            </button>
          </div>
        </div>

        {showImagePopup && genraterImageurl && <GetImage_pop
          getimage_details={{
            onClose: () => {
              setGenraterImageurl(null);
              closeImagePopup()
            },
            image: genraterImageurl,
            imgname: "baby-image"
          }}
        />}

        <div className="right-main-babyG-1">
          <h1>AI Baby Generator</h1>
          <Upload_img uploadDetails={{ image: babyImage }} />
        </div>
      </div>
    </>
  );
}

export default BabyPage;