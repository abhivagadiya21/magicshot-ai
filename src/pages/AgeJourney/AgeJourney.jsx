import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { ageJourneyAPI } from "../../services/imageBase.jsx";
import { blobUrlToFile } from "../../utils/blobToFile.js";
import  UploadSection  from "../../components/UploadSection/UploadSection.jsx";

import usePopup from "../../hooks/usePopup.jsx";
import useUploadImg from "../../hooks/useUploadImg.jsx";
import { useCredits } from "../../components/GlobalCom/Context.jsx";

import Loader from "../../components/Loader/Loader.jsx";
import HowWorkPop from "../../components/Popup/HowItWorkPopup/HowtiWorkpopup.jsx";
import GetImagePopup from "../../components/Popup/GetImagePopup/GetImagePopup.jsx";
import UploadImg from "../../components/Upload-image/UploadImage.jsx";

import starIcon from "../BabyGenerator/baby-img/star.svg";
import questionMarkIcon from "../BabyGenerator/baby-img/question.svg";
import popPassImg3 from "../BabyGenerator/baby-img/poppassimg3.png";
import journeyImage from "./journey-image/agejourney.png";
import timeIcon from "./journey-image/time.svg";

function AgeJourney() {

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
    };

    setLoading(true);
    try {
      const { data } = await ageJourneyAPI(imageFiles, otherData);
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
            <img src={questionMarkIcon} alt="Help icon" />
            <span>How It Works</span>
          </button>
          {showHowWork && (
            <HowWorkPop
              howWorkPopDetails={{
                onClose: closeHowWork,
                image: popPassImg3,
                message: "Upload your photos, and AI quickly generates an image of your future baby.",
              }}
            />
          )}
        </div>

        <div className="upload-image-buttons">
          <div className="upload-image-buttons-baby">
            <UploadSection label="Upload Your Image" uploadHook={parentUpload} inputId="parent1Input" />
          </div>
        </div>

        <div className="main-slider-container">
          <div className="select-age-hader">
            Select End Age <strong>{sliderValue}</strong>
          </div>

          <div className="slider-container">
            <div className="slider-icon">👶</div>
            <div className="age-slider">
              <div
                ref={sliderThumbRef}
                id="sliderThumb"
                className="age-slider-thumb"
              ></div>
              <div className="age-slider-line">
                <div
                  ref={sliderLineRef}
                  id="sliderLine"
                  className="age-slider-line-fill"
                ></div>
              </div>
              <input
                ref={sliderInputRef}
                id="sliderInput"
                className="age-slider-input"
                type="range"
                defaultValue="50"
                min="0"
                max="100"
              />
            </div>
            <div className="slider-icon">👴🏻</div>
          </div>
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
            <button className="pricing-button">See Pricing</button>
            <button className="generate-button" onClick={handleClickGenerate}>
              Generate
              <div className="generate-button-icon">
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
