import { useState } from "react";
import usePopup from "../../hooks/usePopup";
import useUploadImg from "../../hooks/useUploadImg";
import { agePredictorAPI } from "../../services/imageBase"; 

import Upload_img from "../../components/upload_img_re_compo/Upload_img";
import CropImage from "../../components/CropImage/CropImage";
import Howworkpop from "../../components/popUp/how_it_work_pop/Howworkpop";

import "./agePredictor.css";

import poppassimg2 from "../BabyGenrator_page/babyG-img/poppassimg2.png";
import star from "../BabyGenrator_page/babyG-img/star.svg";
import predictorImage from "./predictor_image/agepredictor.png";
import questionMark from "../BabyGenrator_page/babyG-img/question.svg";
import Profileicon1 from "../BabyGenrator_page/babyG-img/profile-1.svg";
import upload from "../BabyGenrator_page/babyG-img/upload.svg";
import { blobUrlToFile } from "../../utils/blobToFile";
import { toast } from "react-toastify";


function AgePredictor() {
  const { showPopup, handleOpen, handleClose } = usePopup();
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
    Predict_age: 30,
  };
  console.log("📸 Image Files:", imageFiles);
  console.log("📸 Image Files:", otherData);

  try {
    const response = await agePredictorAPI(imageFiles, otherData);
    console.log("✅ Response from API:", response);

    toast.success("🎉 Age prediction generated successfully!");
  } catch (error) {
    console.error("❌ Error predicting age:", error);
    toast.error("Failed to generate image. Please try again.");
  }
};


  return (
    <div className="main-agePredictor">
      {/* Left Section */}
      <div className="left-main-agePredictor">
        {/* Header */}
        <div className="inner-left-1-agePredictor">
          <h4>AI Age Predictor</h4>
          <button onClick={handleOpen} className="btn-pop-up-howWork">
            <img src={questionMark} alt="Help icon" />
            <span>How It Works</span>
          </button>

          {showPopup && (
            <Howworkpop
              howworkpopDetails={{
                onClose: handleClose,
                image: poppassimg2,
                message: "Predict your age with AI. Upload and guess!",
              }}
            />
          )}
        </div>

        {/* Upload Section */}
        <div className="uplod-image-button-Parent-2">
          <label className="uplod-button-agePredictor" htmlFor="parent1Input">
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
                    src={Profileicon1}
                    alt="Parent 1 Icon"
                    className="Parent-Icon"
                  />
                </div>
                <p>Parent 1</p>
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
                <img className="upload-img-icon" src={upload} alt="Upload" />
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

          {/* Crop Popup */}
          {parent1Upload.showCropper && (
            <div className="overlay">
              <div className="popup">
                <button
                  className="close-btn"
                  onClick={() => parent1Upload.setShowCropper(false)}
                >
                  <img
                    width="20"
                    height="20"
                    src="https://img.icons8.com/ios-glyphs/30/FFFFFF/delete-sign.png"
                    alt="close"
                  />
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
        <div className="inner-left-3-agePredictor">
          <div className="inner-1-for-left-3">
            <p>Est. time: 30s to 50s</p>
          </div>
          <div className="inner-2-for-left-3">
            <button className="agePredictor-left-3-btn-1">See Pricing</button>
            <button className="agePredictor-left-3-btn-2" onClick={handleGenerate}>
              Generate
              <div className="agePredictor-left-3-btn-2-icon">
                <img src={star} alt="star" />
                <span>-0.5</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-main-agePredictor">
        <Upload_img uploadDetails={{ image: predictorImage }} />
      </div>
    </div>
  );
}

export default AgePredictor;
