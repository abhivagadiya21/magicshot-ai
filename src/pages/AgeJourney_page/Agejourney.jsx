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


function AgeJourney() {
    const { showPopup, handleOpen, handleClose } = usePopup();
    const [selectedGender, setSelectedGender] = useState(null);
    const parent1Upload = useUploadImg();

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };

    const sliderInputRef = useRef(null);
    const sliderThumbRef = useRef(null);
    const sliderLineRef = useRef(null);

    const [sliderValue, setSliderValue] = useState(50); 

    const showSliderValue = () => {
        const slider_input = sliderInputRef.current;
        const slider_thumb = sliderThumbRef.current;
        const slider_line = sliderLineRef.current;

        if (!slider_input || !slider_thumb || !slider_line) return;

        setSliderValue(slider_input.value); // Update state
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

    return (
        <div className="main-ageJourney">
            <div className="left-main-ageJourney">
                <div className="inner-left-1-ageJourney">
                    <h4>AI Age Journey</h4>
                    <button onClick={handleOpen} className="btn-pop-up-howWork">
                        <img src={questionMark} alt="" />
                        <span>How It Works</span>
                    </button>
                    {showPopup && (
                        <Howworkpop
                            howworkpopDetails={{
                                onClose: handleClose,
                                image: poppassimg3,
                                message: "Generate your age journey in seconds with help of AI."
                            }}
                        />
                    )}
                </div>

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
                                    parent1Upload.resetImage(); // ✅ clean state
                                    const input = document.getElementById("parent1Input");
                                    if (input) input.value = ""; // reset file input
                                }}
                            >
                                ✖ Cancel
                            </button>
                        )}
                    </div>
                    {parent1Upload.showCropper && (
                        <div className="overlay">
                            <div className="popup">
                                <button
                                    className="close-btn"
                                    onClick={() => parent1Upload.setShowCropper(false)}
                                >
                                    ✖
                                </button>
                                <CropImage
                                    imageSrc={parent1Upload.selectedFile}
                                    onCropDone={parent1Upload.handleCropComplete}
                                    onCancel={() => parent1Upload.setShowCropper(false)}
                                />
                            </div>
                        </div>
                    )}


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

                <div className="inner-left-3-ageJourney">
                    <div className="inner-1-for-left-3-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M15.3618 15.7052C15.2218 15.9452 14.9718 16.0752 14.7218 16.0752C14.5918 16.0752 14.4518 16.0352 14.3318 15.9652L11.6018 14.3252C11.3718 14.1952 11.2318 13.9452 11.2318 13.6852V10.1552C11.2318 9.73516 11.5718 9.40516 11.9818 9.40516C12.3918 9.40516 12.7318 9.73516 12.7318 10.1552V13.2552L15.1018 14.6852C15.4618 14.8952 15.5818 15.3552 15.3618 15.7052ZM12.1518 5.03516C7.75187 5.03516 4.17188 8.61516 4.17188 13.0152C4.17188 17.4152 7.75187 20.9952 12.1518 20.9952C16.5518 20.9952 20.1318 17.4152 20.1318 13.0152C20.1318 8.61516 16.5518 5.03516 12.1518 5.03516Z"
                                fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M6.7984 4.40196C7.1514 4.18396 7.2604 3.72196 7.0424 3.36996C6.8234 3.01696 6.3614 2.90796 6.0104 3.12596C4.6374 3.97296 3.4374 5.11596 2.5404 6.43096C2.3074 6.77296 2.3954 7.23996 2.7374 7.47296C2.8664 7.56196 3.0134 7.60396 3.1594 7.60396C3.3994 7.60396 3.6344 7.48896 3.7794 7.27696C4.5594 6.13396 5.6034 5.13996 6.7984 4.40196Z"
                                fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M21.7798 6.43147C20.8738 5.10147 19.6698 3.95447 18.2988 3.11447C17.9458 2.89847 17.4838 3.00847 17.2668 3.36147C17.0508 3.71547 17.1608 4.17647 17.5138 4.39347C18.7068 5.12347 19.7528 6.12047 20.5408 7.27647C20.6858 7.48947 20.9208 7.60347 21.1608 7.60347C21.3058 7.60347 21.4528 7.56147 21.5828 7.47347C21.9248 7.24047 22.0128 6.77347 21.7798 6.43147Z"
                                fill="white" />
                        </svg>
                        <p>Est. time: 30 seconds to 50 seconds</p>
                    </div>

                    <div className="inner-2-for-left-3">
                        <button className="ageJourney-left-3-btn-1">See Pricing</button>
                        <button className="ageJourney-left-3-btn-2">
                            Generate
                            <div className="ageJourney-left-3-btn-2-icon">
                                <img src={star} alt="star icon" />
                                <span>-0.5</span>
                            </div>
                        </button>
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