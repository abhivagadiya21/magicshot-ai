import { useState } from "react";
import { toast } from "react-toastify";

// hooks
import usePopup from "../../hooks/usePopup.jsx";
import useUploadImg from "../../hooks/useUploadImg.jsx";

// services & utils
import { agePredictorApi } from "../../services/imageBase.jsx";
import { blobUrlToFile } from "../../utils/blobToFile.js";
import { useCredits } from "../../components/GlobalCom/Context.jsx";

// components
import UploadImg from "../../components/upload_img_re_compo/UploadImage.jsx";
import CropImage from "../../components/CropImage/CropImage.jsx";
import HowtiWorkPop from "../../components/Popup/HowItWorkPopup/HowtiWorkpopup.jsx";
import GetImagePop from "../../components/Popup/GetImagePopup/GetImagePopup.jsx";
import Loader from "../../components/Loader/Loader.jsx";

// assets (icons & images)
import popPassImg2 from "../BabyGenerator/baby-img/poppassimg2.png";
import starIcon from "../BabyGenerator/baby-img/star.svg";
import predictorImage from "./predictor-image/agePredictor.png";
import questionMarkIcon from "../BabyGenerator/baby-img/question.svg";
import profileIcon1 from "../BabyGenerator/baby-img/profile-1.svg";
import uploadIcon from "../BabyGenerator/baby-img/upload.svg";
import closeIcon from "../../components/Heading/heading-img/close.svg";
import timeIcon from "../AgeJourney/journey-image/time.svg";

// styles
import "./age-predictor.css";


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
      const response = await agePredictorApi(imageFiles, otherData);
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
          <label className="uplod-image-button" htmlFor="parent1Input">
            {parent1Upload.croppedImage ? (
              <img
                src={parent1Upload.croppedImage}
                alt="Parent 1"
                className="preview-img"
              />
            ) : (
              <>
                <div className="profile-icon-container">
                  <img
                    src={profileIcon1}
                    alt="Parent 1 Icon"
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
              onChange={parent1Upload.handleFileUpload}
              disabled={!!parent1Upload.croppedImage}
            />

            {!parent1Upload.croppedImage ? (
              <label htmlFor="parent1Input" className="uplod-button">
                <img
                  className="upload-img-icon"
                  src={uploadIcon}
                  alt="Upload"
                />
                <p>Upload</p>
              </label>
            ) : (
              <button
                type="button"
                className="uplod-button"
                onClick={() => {
                  parent1Upload.resetImage();
                  const input = document.getElementById("parent1Input");
                  if (input) input.value = "";
                }}
              >
                <img width="10" height="10" src={closeIcon} alt="delete" />
                Cancel
              </button>
            )}
          </div>

          {/* Crop Popup */}
          {parent1Upload.showCropper && (
            <div className="overlay">
              <div className="crop-popup">
                <div className="cropper-header">
                  <p>Crop Image</p>
                </div>
                <button
                  className="close-popup-button"
                  onClick={() => parent1Upload.setShowCropper(false)}
                >
                  <img width="20" height="20" src={closeIcon} alt="close" />
                </button>
                <CropImage
                  imageSrc={parent1Upload.selectedFile}
                  onCropDone={parent1Upload.handleCropComplete}
                  onCancel={() => parent1Upload.setShowCropper(false)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="left-main-babyG-footer">
          <div className="time-estimation-container">
            <div className="time-estimation">
              <img src={timeIcon} alt="" />
              <p>Est. time: 30 to 50 seconds</p>
            </div>
          </div>
          <div className="action-buttons-container">
            <button className="pricing-btn">See Pricing</button>
            <button className="generate-btn" onClick={handleClick}>
              Generate
              <div className="generate-btn-icon">
                <img src={starIcon} alt="star icon" />
                <span>-0.5</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Popup Image */}
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

      {/* Right Section */}
      <div className="right-main-agePredictor">
        <UploadImg uploadDetails={{ image: predictorImage }} />
      </div>
    </div>
  );
}

export default AgePredictor;
