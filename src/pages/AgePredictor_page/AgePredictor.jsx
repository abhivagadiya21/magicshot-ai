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
import GetImage_pop from "../../components/popUp/getimage_pop/getImage_pop.jsx";
import { blobUrlToFile } from "../../utils/blobToFile";
import { toast } from "react-toastify";
import { useCredits } from "../../components/global_com/context.jsx";

function AgePredictor() {
  const { showPopup: showHowWork, handleOpen: openHowWork, handleClose: closeHowWork } = usePopup();
  const { showPopup: showImagePopup, handleOpen: openImagePopup, handleClose: closeImagePopup } = usePopup();
  const [genraterImageurl, setGenraterImageurl] = useState(null);
  const [gettingAge, setGettingAge] = useState();
  const [loading, setLoading] = useState(false);
  const { dispatch,fetchUser } = useCredits();

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
      Predict_age: 60,
    };
    console.log("📸 Image Files:", imageFiles);
    console.log("📸 Image Files:", otherData);

    setLoading(true);

    try {
      const response = await agePredictorAPI(imageFiles, otherData);
      console.log("✅ Response from API:", response);
      const data = response.data;

      if (data?.file) {
        setLoading(false);
        setGenraterImageurl(data.file);
        setGettingAge(data.agepredic);
        toast.success("🎉 Baby image generated successfully!");
        fetchUser()

        // }, 5000);
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
    <div className="main-agePredictor">
      {loading && (
        <div className="loader-overlay">
          <div className="loader-wrapper">
            <div className="loader"></div>
            <span class="loader-letter">G</span>
            <span class="loader-letter">e</span>
            <span class="loader-letter">n</span>
            <span class="loader-letter">e</span>
            <span class="loader-letter">r</span>
            <span class="loader-letter">a</span>
            <span class="loader-letter">t</span>
            <span class="loader-letter">i</span>
            <span class="loader-letter">n</span>
            <span class="loader-letter">g</span>
          </div>
        </div>
      )}
      {/* Left Section */}
      <div className="left-container">
        {/* Header */}
        <div className="inner-left-1-agePredictor">
          <p className="bagy-hading">AI Age Predictor</p>
          <button onClick={openHowWork} className="btn-pop-up-howWork">
            <img src={questionMark} alt="Help icon" />
            <span>How It Works</span>
          </button>

          {showHowWork && (
            <Howworkpop
              howworkpopDetails={{
                onClose: closeHowWork,
                image: poppassimg2,
                message: "Predict your age with AI. Upload and guess!",
              }}
            />
          )}
        </div>
        {/* Upload Section */}
        <div className="uplod-image-button-Parent-agePredictor ">
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
                <div className="cropper-header">
                  <p>Crop Image</p>
                </div>
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
        <div className="left-main-babyG-footer">
          <div className="time-estimation-container">
            <div className="time-estimation">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.3618 15.7052C15.2218 15.9452 14.9718 16.0752 14.7218 16.0752C14.5918 16.0752 14.4518 16.0352 14.3318 15.9652L11.6018 14.3252C11.3718 14.1952 11.2318 13.9452 11.2318 13.6852V10.1552C11.2318 9.73516 11.5718 9.40516 11.9818 9.40516C12.3918 9.40516 12.7318 9.73516 12.7318 10.1552V13.2552L15.1018 14.6852C15.4618 14.8952 15.5818 15.3552 15.3618 15.7052ZM12.1518 5.03516C7.75187 5.03516 4.17188 8.61516 4.17188 13.0152C4.17188 17.4152 7.75187 20.9952 12.1518 20.9952C16.5518 20.9952 20.1318 17.4152 20.1318 13.0152C20.1318 8.61516 16.5518 5.03516 12.1518 5.03516Z"
                  fill="white"
                />
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
      </div>
      {showImagePopup && genraterImageurl && <GetImage_pop
              getimage_details={{
                onClose: () => {
                  setGenraterImageurl(null);
                  closeImagePopup()
                },
                image: genraterImageurl,
                getingAge: gettingAge,
                imgname: "age-predictor"
              }}
            />}

      {/* Right Section */}
      <div className="right-main-agePredictor">
        <Upload_img uploadDetails={{ image: predictorImage }} />
      </div>
    </div>
  );
}
export default AgePredictor;