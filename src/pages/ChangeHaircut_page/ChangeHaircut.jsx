import { useState } from 'react';
import usePopup from '../../hooks/usePopup.jsx';
import Upload_img from '../../components/upload_img_re_compo/Upload_img.jsx';
import './chnageHaircut.css';
import star from '../BabyGenrator_page/babyG-img/star.svg';
import hairImage from './hairstyle_image/changehaircut.png'
import poppassimg4 from '../BabyGenrator_page/babyG-img/poppassimg4.png';
import questionMark from '../BabyGenrator_page/babyG-img/question.svg';
import Howworkpop from '../../components/popUp/how_it_work_pop/Howworkpop.jsx';
import Profileicon1 from '../BabyGenrator_page/babyG-img/profile-1.svg';
import upload from '../BabyGenrator_page/babyG-img/upload.svg';
import boyIcon from '../BabyGenrator_page/babyG-img/boy.png';
import girlIcon from '../BabyGenrator_page/babyG-img/girl.png';
import CropImage from "../../components/CropImage/CropImage.jsx";
import useUploadImg from "../../hooks/useUploadImg.jsx";
import { changeHaircutAPI } from '../../services/imageBase.jsx';
import { blobUrlToFile } from '../../utils/blobToFile.js';
import { toast } from "react-toastify";
import GetImage_pop from "../../components/popUp/getimage_pop/getImage_pop.jsx";
import { useCredits } from "../../components/global_com/context.jsx";
import closeIcon from "../../components/heding/hedingimg/close.svg";
import timeIcon from "../AgeJourney_page/journey_image/time.svg";
import checkmarkIcon from "../../components/heding/hedingimg/checkmark.svg";
import Loader from "../../components/Loader/Loader";
import hairstyles from '../../utils/hairstyles.json';
import haircolors from '../../utils/haircolors.json';


const importAll = (r) => {
    let images = {};
    r.keys().forEach((key) => (images[key.replace("./", "")] = r(key)));
    return images;
};

const hairstyleImages = import.meta.glob("./hairstyle_image/*.{png,jpg,jpeg,svg}", {
    eager: true,
    import: "default",
});
const haircolorImages = import.meta.glob("./hairstyle_image/*.{png,jpg,jpeg,svg}", {
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

       const styles = hairstyles.map((s) => ({
        ...s,
        img: hairstyleImages[`./hairstyle_image/${s.img}`],
    }));

    const HairColor = haircolors.map((c) => ({
        ...c,
        img: haircolorImages[`./hairstyle_image/${c.img}`],
    }));


    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };

    const handleGenerate = async () => {
        if (!parent1Upload.croppedImage) {
            toast.error("⚠️ Please upload an image of Parent 1.");
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
            const { data } = await changeHaircutAPI(imageFiles, otherData);
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
        // window.dispatchEvent(new Event("creditsUpdated"));
    };


    return (
        <>
            <div className="main-changeHair">
                {loading && (
                    <Loader />
                )}


                <div className="left-container left-container-changeHair">
                    <div className="inner-left-1-changeHair">
                        <p className="bagy-hading">Al Change Hairstyle</p>
                        <button onClick={openHowWork} className='btn-pop-up-howWork'>
                            <img src={questionMark} alt="" />
                            <span>How It Works</span>
                        </button>
                        {showHowWork && (
                            <Howworkpop
                                howworkpopDetails={{
                                    onClose: closeHowWork,
                                    image: poppassimg4,
                                    message: "Generate your age journey in seconds with help of AI."
                                }}
                            />
                        )}
                    </div>
                    <div className='inner-left-2-changeHair'>
                        <div className='inner-left-2-in-upload-div'>
                            <label className="uplod-button-changeHair" htmlFor="parent1Input">
                                {parent1Upload.croppedImage ? (
                                    <img
                                        src={parent1Upload.croppedImage}
                                        alt="Parent 1"
                                        className="preview-img"
                                    />
                                ) : (
                                    <>
                                        <div className="profile-icon-container">
                                            <img src={Profileicon1} alt="Parent 1 Icon" className='Parent-Icon' />
                                        </div>
                                        <p>Upload Your Image</p>
                                    </>
                                )}
                            </label>

                            <div className='img-upload-button-container'>
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
                                        <img className="upload-img-icon" src={upload} alt="Upload Icon" />
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
                                        <img width="10" height="10" src={closeIcon} alt="delete-sign" />
                                        cancel
                                    </button>
                                )}
                            </div>
                            {/* Cropper Modal */}
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
                                            <img width="20" height="20" src={closeIcon} alt="delete-sign" />
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

                        <p className='baby-gender-changeHair'> Gender</p>

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
                                                src={checkmarkIcon}
                                                alt="checkmark"
                                            />
                                        </span>
                                    )}
                                </div>
                            </button>

                            {/* Girl Option */}
                            <button
                                className={`gender-option ${selectedGender === "girl" ? "selected" : ""
                                    }`}
                                onClick={() => handleGenderSelect("girl")}
                            >
                                <div className="avatar-container">
                                    <img src={girlIcon} alt="Girl Avatar" className="gender-avatar-img" />
                                    <span className="avatar-text">Girl</span>
                                </div>
                                <div
                                    className={`button-container ${selectedGender === "girl" ? "checked" : ""
                                        }`}
                                >
                                    {selectedGender === "girl" && (
                                        <span className="checkmark">
                                            <img
                                                width="24"
                                                height="24"
                                                src={checkmarkIcon}
                                                alt="checkmark"
                                            />
                                        </span>
                                    )}
                                </div>
                            </button>
                        </div>

                        <div className="inner-2-left-in-tab-btn-changeHair">
                            <button onClick={() => setActiveTab('tab1')}
                                className={`tab-btn-1-chageHair ${activeTab === 'tab1' ? 'active-tab1' : ''}`}

                            >Hairstyle</button>
                            <button onClick={() => setActiveTab('tab2')}
                                // className='tab-btn-2-chageHair'
                                className={`tab-btn-2-chageHair ${activeTab === 'tab2' ? 'active-tab1' : ''}`}
                            >hair Color</button>
                        </div>

                            {activeTab === 'tab1' && (
                                <div className="tab1-content-changeHair">

                                    <div className="tab1-content-changeHair">
                                        {styles.map((style, idx) => (
                                            <div
                                                key={idx}
                                                className={`tab1-inner-1-content ${hairstyle === style.name ? "selected" : ""
                                                    }`}
                                                onClick={() => setHairstyle(style.name)}
                                            >
                                                <div className="tab1-inner-1-content-img-div-hair">
                                                    <img
                                                        src={style.img}
                                                        alt={style.name}
                                                        className="tab1-content-inner-1-img-hair"
                                                    />
                                                </div>
                                                <p>{style.name}</p>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            )}
                            {activeTab === 'tab2' && (
                                <div className="tab1-content-changeHair">
                                    {HairColor.map((color, idx) => (
                                        <div
                                            key={idx}
                                            className={`tab1-inner-1-content ${hairColor === color.name ? "selected" : ""
                                                }`}
                                            onClick={() => setHairColor(color.name)}
                                        >
                                            <div className="tab1-inner-1-content-img-div-hair">
                                                <img
                                                    src={color.img}
                                                    alt={color.name}
                                                    className="tab1-content-inner-1-img-hair"
                                                />
                                            </div>
                                            <p>{color.name}</p>
                                        </div>
                                    ))}
                                </div>

                            )}


                    </div>
                    
                    <div className="left-main-babyG-footer">
                        <div className="time-estimation-container">
                            <div className="time-estimation">
                                <img src={timeIcon} alt="" />
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
                                <GetImage_pop
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
                    <Upload_img uploadDetails={{ image: hairImage }} />
                </div>
            </div>
        </>
    )
}
export default ChangehaircutPage;
