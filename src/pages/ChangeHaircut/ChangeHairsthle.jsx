import { useState } from "react";
import { toast } from "react-toastify";

import usePopup from "../../hooks/usePopup.jsx";
import useUploadImg from "../../hooks/useUploadImg.jsx";

import "./change-hairstyle.css";

import UploadImg from "../../components/upload_img_re_compo/UploadImage.jsx";
import HowWorkPop from "../../components/Popup/HowItWorkPopup/HowtiWorkpopup.jsx";
import CropImage from "../../components/CropImage/CropImage.jsx";
import GetImagePop from "../../components/Popup/GetImagePopup/GetImagePopup.jsx";
import { useCredits } from "../../components/GlobalCom/Context.jsx";
import Loader from "../../components/Loader/Loader.jsx";

import star from "../BabyGenerator/baby-img/star.svg";
import hairImage from "./hairstyle-image/changeHaircut.png";
import popPassImg4 from "../BabyGenerator/baby-img/poppassimg4.png";
import questionMark from "../BabyGenerator/baby-img/question.svg";
import profileIcon1 from "../BabyGenerator/baby-img/profile-1.svg";
import uploadIcon from "../BabyGenerator/baby-img/upload.svg";
import boyIcon from "../BabyGenerator/baby-img/boy.png";
import girlIcon from "../BabyGenerator/baby-img/girl.png";

import { changeHaircutApi } from "../../services/imageBase.jsx";
import { blobUrlToFile } from "../../utils/blobToFile.js";

import hairStyles from "../../utils/hairstyles.json";
import hairColors from "../../utils/haircolors.json";

const importAll = (r) => {
    let images = {};
    r.keys().forEach((key) => (images[key.replace("./", "")] = r(key)));
    return images;
};

const hairstyleImages = import.meta.glob("./hairstyle-image/*.{png,jpg,jpeg,svg}", {
    eager: true,
    import: "default",
});
const haircolorImages = import.meta.glob("./hairstyle-image/*.{png,jpg,jpeg,svg}", {
    eager: true,
    import: "default",
});

function ChangehaircutPage() {
    const { showPopup: showHowWork, handleOpen: openHowWork, handleClose: closeHowWork } = usePopup();
    const { showPopup: showImagePopup, handleOpen: openImagePopup, handleClose: closeImagePopup } = usePopup();
    const [genraterImageurl, setGenraterImageurl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedGender, setSelectedGender] = useState("boy");
    const [activeTab, setActiveTab] = useState('tab1');
    const parent1Upload = useUploadImg();
    const [hairColor, setHairColor] = useState("default");
    const [hairstyle, setHairstyle] = useState(null);
    const { dispatch, fetchUser } = useCredits();

    const styles = hairStyles.map((s) => ({
        ...s,
        img: hairstyleImages[`./hairstyle-image/${s.img}`],
    }));

    const HairColor = hairColors.map((c) => ({
        ...c,
        img: haircolorImages[`./hairstyle-image/${c.img}`],
    }));

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };

    const handleGenerate = async () => {
        if (!parent1Upload.croppedImage) {
            toast.error("⚠ Please upload an image of Parent 1.");
            return;
        }
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser?.id) {
            toast.error("❌ User not logged in.");
            return;
        }
        const uploadPhoto = await blobUrlToFile(
            parent1Upload.croppedImage,
            "parent1.jpg"
        );
        const imageFiles = {
            parent1: uploadPhoto,
        };
        const otherData = {
            hairstyle: hairstyle,
            hairColor: hairColor,
            userid: storedUser.id,
            gender: selectedGender,
            transactionId: 1,
        };

        setLoading(true);

        try {
            const { data } = await changeHaircutApi(imageFiles, otherData);
            console.log("Response from API:", data);

            if (data?.file) {
                setLoading(false);
                setGenraterImageurl(data.file);
                openImagePopup();
                toast.success("🎉 Hairstyle image generated successfully!");
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

    const handleClickGenerate = async () => {
        await handleGenerate();
        openImagePopup();
    };

    return (
        <>
            <div className="main-changeHair">
                {loading && <Loader />}
                <div className="left-container">
                    <div className="header-section">
                        <p className="Baby-hading">Al Change Hairstyle</p>
                        <button onClick={openHowWork} className="button-popup-howtowork">
                            <img src={questionMark} alt="" />
                            <span>How It Works</span>
                        </button>
                        {showHowWork && (
                            <HowWorkPop
                                howWorkPopDetails={{
                                    onClose: closeHowWork,
                                    image: popPassImg4,
                                    message: "Generate your age journey in seconds with help of AI."
                                }}
                            />
                        )}
                    </div>

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
                                    <img className="upload-img-icon" src={uploadIcon} alt="Upload" />
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
                                <div className="crop-popup">
                                    <div className="cropper-header">
                                        <p>Crop Image</p>
                                    </div>
                                    <button
                                        className="close-popup-button"
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

                    <p className='Gender-hading'> Gender</p>
                    <div className="gender-main-container">
                        {/* Boy Option */}
                        <button
                            className={`gender-option ${selectedGender === "boy" ? "selected" : ""}`}
                            onClick={() => handleGenderSelect("boy")}
                        >
                            <div className="avatar-container">
                                <img src={boyIcon} alt="Boy Avatar" className="gender-avatar-img" />
                                <span className="avatar-text">Boy</span>
                            </div>
                            <div
                                className={`button-container ${selectedGender === "boy" ? "checked" : ""
                                    }`}
                            >
                                {selectedGender === "boy" && (
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

                        {/* Girl Option */}
                        <button
                            className={`gender-option ${selectedGender === "girl" ? "selected" : ""}`}
                            onClick={() => handleGenderSelect("girl")}
                        >
                            <div className="avatar-container">
                                <img
                                    src={girlIcon}
                                    alt="Girl Avatar"
                                    className="gender-avatar-img"
                                />
                                <span className="avatar-text">Girl</span>
                            </div>
                            <div className={`button-container ${selectedGender === "girl" ? "checked" : ""}`} >
                                {selectedGender === "girl" && (
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
                    </div>

                    <div className="tabs-container">
                        <button
                            onClick={() => setActiveTab("tab1")}
                            className={`tab-button-1-chageHair ${activeTab === "tab1" ? "active-tab1" : ""}`}
                        >
                            Hair style
                        </button>
                        <button
                            onClick={() => setActiveTab("tab2")}
                            className={`tab-button-2-chageHair ${activeTab === "tab2" ? "active-tab1" : ""}`}
                        >
                            Hair color
                        </button>
                    </div>

                        {activeTab === "tab1" && (
                            <div className="tab-images-container">
                                {styles.map((style, idx) => (
                                    <div
                                        key={idx}
                                        className={`tab1-inner-1-content ${hairstyle === style.name ? "selected" : ""
                                            }`}
                                        onClick={() => setHairstyle(style.name)}>
                                        <div>
                                            <img
                                                src={style.img}
                                                alt={style.name}
                                                className="tab-image"
                                            />
                                        </div>
                                        <p>{style.name}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "tab2" && (
                            <div className="tab-images-container">
                                {HairColor.map((color, idx) => (
                                    <div
                                        key={idx}
                                        className={`tab1-inner-1-content ${hairColor === color.name ? "selected" : ""
                                            }`}
                                        onClick={() => setHairColor(color.name)}
                                    >
                                        <div>
                                            <img
                                                src={color.img}
                                                alt={color.name}
                                                className="tab-image"
                                            />
                                        </div>
                                        <p>{color.name}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        
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
                            <button className='pricing-btn'>See Pricing</button>
                            <button className='generate-btn' onClick={handleClickGenerate}>
                                Generate
                                <div className="generate-btn-icon">
                                    <img src={star} alt="" />
                                    <span>-0.5</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                {showImagePopup && genraterImageurl && (
                    <GetImagePop
                        getimage_details={{
                            onClose: () => {
                                setGenraterImageurl(null);
                                closeImagePopup()
                            },
                            image: genraterImageurl,
                            imgname: "change-haircut"
                        }}
                    />
                )}
                <div className="right-main-changeHair">
                    <UploadImg uploadDetails={{ image: hairImage }} />
                </div>
            </div>
        </>
    )
}
export default ChangehaircutPage;