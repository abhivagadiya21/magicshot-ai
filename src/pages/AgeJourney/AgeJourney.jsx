import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// Services & Utils
import { AgejournyAPI } from "../../services/imageBase.jsx";
import { blobUrlToFile } from "../../utils/blobToFile.js";

// Hooks
import usePopup from "../../hooks/usePopup.jsx";
import useUploadImg from "../../hooks/useUploadImg.jsx";
import { useCredits } from "../../components/GlobalCom/Context.jsx";

// Components
import Loader from "../../components/Loader/Loader.jsx";
import HowWorkPopup from "../../components/Popup/HowItWorkPopup/HowtiWorkpopup.jsx";
import CropImage from "../../components/CropImage/CropImage.jsx";
import GetImagePopup from "../../components/Popup/GetImagePopup/GetImagePopup.jsx";
import UploadImg from "../../components/upload_img_re_compo/UploadImage.jsx";

// Assets
import starIcon from "../BabyGenerator/baby-img/star.svg";
import questionMarkIcon from "../BabyGenerator/baby-img/question.svg";
import popPassImg3 from "../BabyGenerator/baby-img/poppassimg3.png";
import profileIcon1 from "../BabyGenerator/baby-img/profile-1.svg";
import uploadIcon from "../BabyGenerator/baby-img/upload.svg";
import journeyImage from "./journey-image/agejourney.png";
import timeIcon from "./journey-image/time.svg";
import closeIcon from "../../components/Heading/heading-img/close.svg";

// Styles
import "./age-journey.css";



function AgeJourney() {
  // Popup hooks
  const {
    showPopup: showHowWork,
    handleOpen: openHowWork,
    handleClose: closeHowWork,
  } = usePopup();
  const {
    showPopup: showImagePopup,
    handleOpen: openImagePopup,
    handleClose: closeImagePopup,
  } = usePopup();

  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const parentUpload = useUploadImg();

  const sliderInputRef = useRef(null);
  const sliderThumbRef = useRef(null);
  const sliderLineRef = useRef(null);
  const { dispatch, fetchUser } = useCredits();

  // Handle slider UI
  const updateSliderUI = () => {
    const sliderInput = sliderInputRef.current;
    const sliderThumb = sliderThumbRef.current;
    const sliderLine = sliderLineRef.current;

    if (!sliderInput || !sliderThumb || !sliderLine) return;

    setSliderValue(sliderInput.value);
    sliderThumb.innerHTML = sliderInput.value;
    const bulletPosition = sliderInput.value / sliderInput.max;
    const space = sliderInput.offsetWidth - sliderThumb.offsetWidth;
    sliderThumb.style.left = bulletPosition * space + "px";
    sliderLine.style.width = sliderInput.value + "%";
  };

  useEffect(() => {
    updateSliderUI();
    const handleResize = () => updateSliderUI();
    window.addEventListener("resize", handleResize);

    const inputEl = sliderInputRef.current;
    if (inputEl) {
      inputEl.addEventListener("input", updateSliderUI);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (inputEl) {
        inputEl.removeEventListener("input", updateSliderUI);
      }
    };
  }, []);

  // API call to generate image
  const handleGenerate = async () => {
    if (!parentUpload.croppedImage) {
      toast.error("⚠️ Please upload an image.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?.id) {
      toast.error("❌ User not logged in.");
      return;
    }

    const parentFile = await blobUrlToFile(
      parentUpload.croppedImage,
      "ageJourney.png"
    );

    const imageFiles = { ageJourneyUpload: parentFile };
    const otherData = {
      userId: storedUser.id,
      selectAge: sliderValue,
      transactionId: 1,
    };

    setLoading(true);
    try {
      const { data } = await AgejournyAPI(imageFiles, otherData);
      if (data?.file) {
        setLoading(false);
        setGeneratedImageUrl(data.file);
        openImagePopup();
        toast.success("🎉 Age journey generated successfully!");
        fetchUser();
      } else {
        toast.error("❌ No image returned from server.");
        setLoading(false);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "❌ Failed to generate image."
      );
      setLoading(false);
    }
  };

  const handleClickGenerate = async () => {
    await handleGenerate();
    openImagePopup();
  };

  return (
    <div className="main-container">
      {loading && <Loader />}

      <div className="left-container">
        <div className="header-section">
          <p className="Baby-hading">AI Age Journey</p>
          <button onClick={openHowWork} className="button-popup-howtowork">
            <img src={questionMarkIcon} alt="question icon" />
            <span>How It Works</span>
          </button>
          {showHowWork && (
            <HowWorkPopup
              howworkpopDetails={{
                onClose: closeHowWork,
                image: popPassImg3,
                message: "Generate your age journey in seconds with help of AI.",
              }}
            />
          )}
        </div>

        <div className="upload-image-buttons">
          <label className="uplod-image-button" htmlFor="parent1Input">
            {parentUpload.croppedImage ? (
              <img
                src={parentUpload.croppedImage}
                alt="Uploaded preview"
                className="preview-img"
              />
            ) : (
              <>
                <div className="profile-icon-container">
                  <img
                    src={profileIcon1}
                    alt="Profile Icon"
                    className="Parent-Icon"
                  />
                </div>
                <p>Upload Your Image</p>
              </>
            )}
          </label>

          <div className="img-upload-button-container">
            <input
              type="file"
              accept="image/*"
              id="parent1Input"
              className="hidden"
              onChange={parentUpload.handleFileUpload}
              disabled={!!parentUpload.croppedImage}
            />

            {!parentUpload.croppedImage ? (
              <label htmlFor="parent1Input" className="uplod-button">
                <img
                  className="upload-img-icon"
                  src={uploadIcon}
                  alt="Upload icon"
                />
                <p>Upload</p>
              </label>
            ) : (
              <button
                type="button"
                className="uplod-button"
                onClick={() => {
                  parentUpload.resetImage();
                  const input = document.getElementById("parent1Input");
                  if (input) input.value = "";
                }}
              >
                <img width="10" height="10" src={closeIcon} alt="close icon" />
                Cancel
              </button>
            )}
          </div>

          {/* Crop Popup */}
          {parentUpload.showCropper && (
            <div className="overlay">
              <div className="crop-popup">
                <div className="cropper-header">
                  <p>Crop Image</p>
                </div>
                <button
                  className="close-popup-button"
                  onClick={() => parentUpload.setShowCropper(false)}
                >
                  <img width="20" height="20" src={closeIcon} alt="close icon" />
                </button>
                <CropImage
                  imageSrc={parentUpload.selectedFile}
                  onCropDone={parentUpload.handleCropComplete}
                  onCancel={() => parentUpload.setShowCropper(false)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Slider */}
        <div>
          <p className="select-age">
            Select End Age <strong>{sliderValue}</strong>
          </p>
        </div>
        <div className="container">
          <div className="ageJourney-rang-slider-icon">👶</div>
          <div className="range-slider">
            <div
              ref={sliderThumbRef}
              id="sliderThumb"
              className="range-slider_thumb"
            ></div>
            <div className="range-slider_line">
              <div
                ref={sliderLineRef}
                id="sliderLine"
                className="range-slider_line-fill"
              ></div>
            </div>
            <input
              ref={sliderInputRef}
              id="sliderInput"
              className="range-slider_input"
              type="range"
              defaultValue="50"
              min="0"
              max="100"
            />
          </div>
          <div className="ageJourney-rang-slider-icon">👴🏻</div>
        </div>

        {/* Generate Button */}
        <div className="left-main-babyG-footer">
          <div className="time-estimation-container">
            <div className="time-estimation">
              <img src={timeIcon} alt="time icon" />
              <p>Est. time: 30 to 50 seconds</p>
            </div>
          </div>

          <div className="action-buttons-container">
            <button className="pricing-btn">See Pricing</button>
            <button className="generate-btn" onClick={handleClickGenerate}>
              Generate
              <div className="generate-btn-icon">
                <img src={starIcon} alt="star icon" />
                <span>-0.5</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {showImagePopup && generatedImageUrl && (
        <GetImagePopup
          getimage_details={{
            onClose: () => {
              setGeneratedImageUrl(null);
              closeImagePopup();
            },
            image: generatedImageUrl,
            imgname: "age-journey",
          }}
        />
      )}

      <div className="right-main-ageJourney">
        <UploadImg uploadDetails={{ image: journeyImage }} />
      </div>
    </div>
  );
}

export default AgeJourney;
