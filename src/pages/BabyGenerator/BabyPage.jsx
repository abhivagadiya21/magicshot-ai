import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import usePopup from "../../hooks/usePopup.jsx";
import useUploadImg from "../../hooks/useUploadImg.jsx";
import { babyUploadAPI } from "../../services/imageBase.jsx";

import UploadImg from "../../components/Upload-image/UploadImage.jsx";
import HowWorkPop from "../../components/Popup/HowItWorkPopup/HowtiWorkpopup.jsx";
import GenderOption from "../../components/GenderOption/GenderOption.jsx";
import UploadSection from "../../components/UploadSection/UploadSection.jsx";

import starIcon from "../BabyGenerator/baby-img/star.svg";
import babyImage from "./baby-img/babyG.png";
import questionMarkIcon from "./baby-img/question.svg";
import popPassImage1 from "./baby-img/poppassimg1.png";
import boyIcon from "./baby-img/boy.png";
import girlIcon from "./baby-img/girl.png";

import GetImagePop from "../../components/Popup/GetImagePopup/GetImagePopup.jsx";

import { blobUrlToFile } from "../../utils/blobToFile.js";
import { useCredits } from "../../components/GlobalCom/Context.jsx";

import timeIcon from "../AgeJourney/journey-image/time.svg";

import Loader from "../../components/Loader/Loader.jsx";

function BabyPage() {
  const { showPopup: showHowWork, handleOpen: openHowWork, handleClose: closeHowWork } = usePopup();
  const { showPopup: showImagePopup, handleOpen: openImagePopup, handleClose: closeImagePopup } = usePopup();
  const [selectedGender, setSelectedGender] = useState("boy");
  const [genraterImageUrl, setGenraterImageUrl] = useState(null);
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
      userId: storedUser.id,
      gender: selectedGender,
      transactionId: 1,
    };
    console.log("Other Data:", otherData);

    setLoading(true);

    try {
      const response = await babyUploadAPI(imageFiles, otherData);
      console.log("Response from API:", response);
      const data = response.data;
      if (data?.file) {
        setLoading(false);
        setGenraterImageUrl(data.file);
        toast.success("🎉 Baby image generated successfully!");
        fetchUser();
      } else {
        toast.error("❌ No image returned from server.");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "❌ Failed to generate image.");
      setLoading(false);
    }
  };

  const handleClickGenerate = async () => {
    await handleGenerate();
    openImagePopup();
  };

  return (
    <>
      <div className="main-container main-baby-genrartor-midia">
        {loading && <Loader />}
        <div className="left-container">
          <div className="header-section">
            <p className="Baby-hading">AI Baby Generator</p>
            <button onClick={openHowWork} className="button-popup-howtowork">
              <img src={questionMarkIcon} alt="Help icon" />
              <span>How It Works</span>
            </button>
            {showHowWork && (
              <HowWorkPop
                howWorkPopDetails={{
                  onClose: closeHowWork,
                  image: popPassImage1,
                  message: "Upload your photos, and AI quickly generates an image of your future baby.",
                }}
              />
            )}
          </div>

          <div className="upload-image-buttons-baby">
            <UploadSection label="Parent 1" uploadHook={parent1Upload} inputId="parent1Input" />
            <UploadSection label="Parent 2" uploadHook={parent2Upload} inputId="parent2Input" />
          </div>

          <p className="Gender-hading">Baby's Gender</p>
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

          <div className="left-main-babyG-footer" ref={fixedRef}>
            <div className="time-estimation-container">
              <div className="time-estimation">
                <img src={timeIcon} alt="" />
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

        {showImagePopup && genraterImageUrl && (
          <GetImagePop
            getimage_details={{
              onClose: () => {
                setGenraterImageUrl(null);
                closeImagePopup();
              },
              image: genraterImageUrl,
              imgName: "baby-image",
            }}
          />
        )}

        <div className="right-main-babyG-1">
          <h1>AI Baby Generator</h1>
          <UploadImg uploadDetails={{ image: babyImage }} />
        </div>
      </div>
    </>
  );
}

export default BabyPage;
