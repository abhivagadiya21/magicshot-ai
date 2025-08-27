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
        // setTimeout(() => {
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
    // window.dispatchEvent(new Event("creditsUpdated"));
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
      <div className="left-main-agePredictor">
        {/* Header */}
        <div className="inner-left-1-agePredictor">
          <h4>AI Age Predictor</h4>
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
        <div className="inner-left-3-agePredictor">
          <div className="inner-1-for-left-3">
            <p>Est. time: 30s to 50s</p>
          </div>
          <div className="inner-2-for-left-3">
            <button className="agePredictor-left-3-btn-1">See Pricing</button>
            <button className="agePredictor-left-3-btn-2" onClick={handleclick}>
              Generate
              <div className="baby-left-3-btn-2-icon">
                <img src={star} alt="star icon" />
                <span>-0.5</span>
              </div>
            </button>
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