import { useState } from "react";
import { toast } from "react-toastify";

import usePopup from "../../hooks/usePopup.jsx";
import useUploadImg from "../../hooks/useUploadImg.jsx";

import { agePredictorAPI } from "../../services/imageBase.jsx";
import { blobUrlToFile } from "../../utils/blobToFile.js";
import { useCredits } from "../../components/GlobalCom/Context.jsx";
import  UploadSection  from "../../components/UploadSection/UploadSection.jsx";

import UploadImg from "../../components/Upload-image/UploadImage.jsx";
import CropImage from "../../components/CropImage/CropImage.jsx";
import HowtiWorkPop from "../../components/Popup/HowItWorkPopup/HowtiWorkpopup.jsx";
import GetImagePop from "../../components/Popup/GetImagePopup/GetImagePopup.jsx";
import Loader from "../../components/Loader/Loader.jsx";

import popPassImg2 from "../BabyGenerator/baby-img/poppassimg2.png";
import starIcon from "../BabyGenerator/baby-img/star.svg";
import predictorImage from "./predictor-image/agePredictor.png";
import questionMarkIcon from "../BabyGenerator/baby-img/question.svg";
import profileIcon1 from "../BabyGenerator/baby-img/profile-1.svg";
import uploadIcon from "../BabyGenerator/baby-img/upload.svg";
import closeIcon from "../../components/Heading/heading-img/close.svg";
import timeIcon from "../AgeJourney/journey-image/time.svg";


function AgePredictor() {
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
  const [predictedAge, setPredictedAge] = useState();
  const [loading, setLoading] = useState(false);
  const { dispatch, fetchUser } = useCredits();

  const parent1Upload = useUploadImg();

  const handleGenerate = async () => {
    if (!parent1Upload.croppedImage) {
      toast.error("❌ Please upload both parent images.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?.id) {
      toast.error("❌ User not logged in.");
      return;
    }

    const parent1File = await blobUrlToFile(
      parent1Upload.croppedImage,
      "agePredictor.png"
    );

    const imageFiles = {
      agePredictorUpload: parent1File,
    };

    const otherData = {
      userId: storedUser.id,
      transactionId: 1,
      predictAge: 60,
    };

    console.log("📸 Image Files:", imageFiles);
    console.log("📊 Other Data:", otherData);

    setLoading(true);

    try {
      const response = await agePredictorAPI(imageFiles, otherData);
      console.log("✅ Response from API:", response);
      const data = response.data;

      if (data?.file) {
        setLoading(false);
        setGeneratedImageUrl(data.file);
        setPredictedAge(data.agePrediction);
        toast.success("🎉 Age prediction generated successfully!");
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

  const handleClick = async () => {
    await handleGenerate();
    openImagePopup();
  };

  return (
    <div className="main-container">
      {loading && <Loader />}
      {/* Left Section */}
      <div className="left-container">
        {/* Header */}
        <div className="header-section">
          <p className="Baby-hading">AI Age Predictor</p>
          <button onClick={openHowWork} className="button-popup-howtowork">
            <img src={questionMarkIcon} alt="Help icon" />
            <span>How It Works</span>
          </button>

          {showHowWork && (
            <HowtiWorkPop
              howWorkPopDetails={{
                onClose: closeHowWork,
                image: popPassImg2,
                message: "Predict your age with AI. Upload and guess!",
              }}
            />
          )}
        </div>

        {/* Upload Section */}
        <div className="upload-image-buttons">
          <div className="upload-image-buttons-baby">
            <UploadSection label="Upload Your Image" uploadHook={parent1Upload} inputId="parent1Input" />
          </div>
        </div>

        <div className="left-main-babyG-footer">
          <div className="time-estimation-container">
            <div className="time-estimation">
              <img src={timeIcon} alt="" />
              <p>Est. time: 30 to 50 seconds</p>
            </div>
          </div>
          <div className="action-buttons-container">
            <button className="pricing-button">See Pricing</button>
            <button className="generate-button" onClick={handleClick}>
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
        <GetImagePop
          getimage_details={{
            onClose: () => {
              setGeneratedImageUrl(null);
              closeImagePopup();
            },
            image: generatedImageUrl,
            getingAge: predictedAge,
            imgname: "age-predictor",
          }}
        />
      )}

      <div className="right-main-agePredictor">
        <UploadImg uploadDetails={{ image: predictorImage }} />
      </div>
    </div>
  );
}

export default AgePredictor;
