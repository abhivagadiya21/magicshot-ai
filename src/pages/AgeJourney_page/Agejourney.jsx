import { useEffect, useRef, useState } from 'react';
import usePopup from '../../hooks/usePopup';
import Upload_img from '../../components/upload_img_re_compo/Upload_img';
import './ageJourney.css';
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
        window.dispatchEvent(new Event("creditsUpdated"));
    };

    return (
        <div className="main-ageJourney">
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

            <div className="left-main-ageJourney">
                {/* Header + How it Works Popup */}
                <div className="inner-left-1-ageJourney">
                    <h4>AI Age Journey</h4>
                    <button onClick={openHowWork} className="btn-pop-up-howWork">
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

                {/* Image Upload Section */}
                <div className="inner-left-2-ageJourney">
                    <label className="uplod-button-ageJourney" htmlFor="parent1Input">
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
                                <p>Parent 1</p>
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
                                <img width="10" height="10" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/delete-sign.png" alt="delete-sign" />
                                cancel
                            </button>
                        )}
                    </div>

                    {/* Image Cropper Popup */}
                    {parent1Upload.showCropper && (
                        <div className="overlay">
                            <div className="popup">
                                <button
                                    className="close-btn"
                                    onClick={() => parent1Upload.setShowCropper(false)}
                                >
                                    <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/delete-sign.png" alt="delete-sign" />
                                </button>
                                <CropImage
                                    imageSrc={parent1Upload.selectedFile}
                                    onCropDone={parent1Upload.handleCropComplete}
                                    onCancel={() => parent1Upload.setShowCropper(false)}
                                />
                            </div>
                        </div>
                    )}

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
                </div>

                {/* Generate Button */}
                <div className="inner-left-3-ageJourney">
                    <div className="inner-1-for-left-3-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M15.3618 15.7052C15.2218 15.9452 14.9718 16.0752 14.7218 16.0752C14.5918 16.0752 14.4518 16.0352 14.3318 15.9652L11.6018 14.3252C11.3718 14.1952 11.2318 13.9452 11.2318 13.6852V10.1552C11.2318 9.73516 11.5718 9.40516 11.9818 9.40516C12.3918 9.40516 12.7318 9.73516 12.7318 10.1552V13.2552L15.1018 14.6852C15.4618 14.8952 15.5818 15.3552 15.3618 15.7052ZM12.1518 5.03516C7.75187 5.03516 4.17188 8.61516 4.17188 13.0152C4.17188 17.4152 7.75187 20.9952 12.1518 20.9952C16.5518 20.9952 20.1318 17.4152 20.1318 13.0152C20.1318 8.61516 16.5518 5.03516 12.1518 5.03516Z"
                                fill="white" />
                        </svg>
                        <p>Est. time: 30s - 50s</p>
                    </div>

                    <div className="inner-2-for-left-3">
                        <button className="ageJourney-left-3-btn-1">See Pricing</button>
                        <button className="ageJourney-left-3-btn-2" onClick={handleClickGenerate}>
                            Generate
                            <div className="ageJourney-left-3-btn-2-icon">
                                <img src={star} alt="star icon" />
                                <span>-0.5</span>
                            </div>
                        </button>

                        {/* Generated Image Popup */}
                        {showImagePopup && genraterImageurl && (
                            <GetImage_pop
                                getimage_details={{
                                    onClose: closeImagePopup,
                                    image: genraterImageurl,
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="right-main-ageJourney">
                <Upload_img uploadDetails={{ image: journeyImage }} />
            </div>
        </div>
    );
}

export default AgeJourney;
