import { useEffect, useRef, useState } from 'react';
import usePopup from '../../hooks/usePopup';
import Upload_img from '../../components/upload_img_re_compo/Upload_img';
import './ageJourney.css';
import "../BabyGenrator_page/babyPage.css";
import poppassimg3 from '../BabyGenrator_page/babyG-img/poppassimg3.png';
import star from '../BabyGenrator_page/babyG-img/star.svg';
import journeyImage from './journey_image/agejourney.png';
import questionMark from '../BabyGenrator_page/babyG-img/question.svg';
import Howworkpop from '../../components/popUp/how_it_work_pop/Howworkpop';
import Profileicon1 from '../BabyGenrator_page/babyG-img/profile-1.svg';
import upload from '../BabyGenrator_page/babyG-img/upload.svg';
import CropImage from "../../components/CropImage/CropImage";
import useUploadImg from "../../hooks/useUploadImg";
import { blobUrlToFile } from "../../utils/blobToFile";
import { AgejournyAPI } from '../../services/imageBase';
import { toast } from "react-toastify";
import GetImage_pop from "../../components/popUp/getimage_pop/getImage_pop.jsx";
import { useCredits } from "../../components/global_com/context.jsx";
import closeIcon from "../../components/heding/hedingimg/close.svg";
import timeIcon from '../AgeJourney_page/journey_image/time.svg';
import Loader from "../../components/Loader/Loader";


function AgeJourney() {
    // Popup hooks
    const { showPopup: showHowWork, handleOpen: openHowWork, handleClose: closeHowWork } = usePopup();
    const { showPopup: showImagePopup, handleOpen: openImagePopup, handleClose: closeImagePopup } = usePopup();

    const [genraterImageurl, setGenraterImageurl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sliderValue, setSliderValue] = useState(50);
    const parent1Upload = useUploadImg();

    const sliderInputRef = useRef(null);
    const sliderThumbRef = useRef(null);
    const sliderLineRef = useRef(null);
    const { dispatch, fetchUser } = useCredits();


    // Handle slider UI
    const showSliderValue = () => {
        const slider_input = sliderInputRef.current;
        const slider_thumb = sliderThumbRef.current;
        const slider_line = sliderLineRef.current;

        if (!slider_input || !slider_thumb || !slider_line) return;

        setSliderValue(slider_input.value);
        slider_thumb.innerHTML = slider_input.value;
        const bulletPosition = slider_input.value / slider_input.max;
        const space = slider_input.offsetWidth - slider_thumb.offsetWidth;
        slider_thumb.style.left = bulletPosition * space + 'px';
        slider_line.style.width = slider_input.value + '%';
    };

    useEffect(() => {
        showSliderValue();
        const handleResize = () => showSliderValue();
        window.addEventListener('resize', handleResize);

        const inputEl = sliderInputRef.current;
        if (inputEl) {
            inputEl.addEventListener('input', showSliderValue);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            if (inputEl) {
                inputEl.removeEventListener('input', showSliderValue);
            }
        };
    }, []);

    // API call to generate image
    const handleGenerate = async () => {
        if (!parent1Upload.croppedImage) {
            toast.error("⚠️ Please upload an image.");
            return;
        }

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser?.id) {
            toast.error("❌ User not logged in.");
            return;
        }

        const parent1File = await blobUrlToFile(parent1Upload.croppedImage, "ageJourney.png");

        const imageFiles = { ageJourneyUpload: parent1File };
        const otherData = { userid: storedUser.id, selectAge: sliderValue, transactionId: 1 };

        setLoading(true);
        try {
            const { data } = await AgejournyAPI(imageFiles, otherData);
            if (data?.file) {
                // setTimeout(() => {
                setLoading(false);
                setGenraterImageurl(data.file);
                openImagePopup();
                toast.success("🎉 Age journey generated successfully!");
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
                        <img src={questionMark} alt="" />
                        <span>How It Works</span>
                    </button>
                    {showHowWork && (
                        <Howworkpop
                            howworkpopDetails={{
                                onClose: closeHowWork,
                                image: poppassimg3,
                                message: "Generate your age journey in seconds with help of AI."
                            }}
                        />
                    )}
                </div>

                <div className="upload-image-buttons">
                    <label className="uplod-image-button" htmlFor="parent1Input">
                        {parent1Upload.croppedImage ? (
                            <img src={parent1Upload.croppedImage} alt="Parent 1" className="preview-img"/>
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
                                <img width="10" height="10" src={closeIcon} alt="delete-sign" />
                                cancel
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

                {/* Slider */}
                <div>
                    <p className="select-age">Select End Age <strong>{sliderValue}</strong></p>
                </div>
                <div className="container">
                    <div className='ageJourney-rang-slider-icon'>👶</div>
                    <div className="range-slider">
                        <div ref={sliderThumbRef} id="slider_thumb" className="range-slider_thumb"></div>
                        <div className="range-slider_line">
                            <div ref={sliderLineRef} id="slider_line" className="range-slider_line-fill"></div>
                        </div>
                        <input
                            ref={sliderInputRef}
                            id="slider_input"
                            className="range-slider_input"
                            type="range"
                            defaultValue="50"
                            min="0"
                            max="100"
                        />
                    </div>
                    <div className='ageJourney-rang-slider-icon'>👴🏻</div>
                </div>


                {/* Generate Button */}
                <div className="left-main-babyG-footer">
                    <div className="time-estimation-container">
                        <div className="time-estimation">
                            <img src={timeIcon} alt="" />
                            <p>Est. time: 30 to 50 seconds</p>
                        </div>
                    </div>

                    <div className="action-buttons-container">
                        <button className="pricing-btn">See Pricing</button>
                        <button className="generate-btn" onClick={handleClickGenerate}>
                            Generate
                            <div className="generate-btn-icon">
                                <img src={star} alt="star icon" />
                                <span>-0.5</span>
                            </div>
                        </button>

                        {/* Generated Image Popup */}

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
                        imgname: "age-journey"
                    }}
                />
            )}

            <div className="right-main-ageJourney">
                <Upload_img uploadDetails={{ image: journeyImage }} />
            </div>
        </div>
    );
}

export default AgeJourney;
