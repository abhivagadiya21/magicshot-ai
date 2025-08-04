import usePopup from '../../hooks/usePopup';
import Upload_img from '../../components/upload_img_re_compo/Upload_img';
import './agePredictor.css';
import poppassimg2 from '../BabyGenrator_page/babyG-img/poppassimg2.png';
import star from '../BabyGenrator_page/babyG-img/star.svg'
import predictorImage from './predictor_image/agepredictor.png';
import questionMark from '../BabyGenrator_page/babyG-img/question.svg';
import Howworkpop from '../../components/popUp/how_it_work_pop/Howworkpop';
import Profileicon1 from '../BabyGenrator_page/babyG-img/profile-1.svg';
import upload from '../BabyGenrator_page/babyG-img/upload.svg';
import CropImage from "../../components/CropImage/CropImage";
import useUploadImg from "../../hooks/useUploadImg";
import { useState } from "react";


function AgePredictor() {
    const { showPopup, handleOpen, handleClose } = usePopup();
    const [selectedGender, setSelectedGender] = useState(null);
    const parent1Upload = useUploadImg();

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };

    return (
        <>
            <div className="main-agePredictor">
                <div className="left-main-agePredictor">
                    <div className="inner-left-1-agePredictor">
                        <h4>AI Age Predictor</h4>
                        <button onClick={handleOpen} className='btn-pop-up-howWork'>
                            <img src={questionMark} alt="" />
                            <span>How It Works</span>
                        </button>
                        {showPopup && (
                            <Howworkpop
                                howworkpopDetails={{
                                    onClose: handleClose,
                                    image: poppassimg2,
                                    message: "Predict your age with AI. Upload and guess!"
                                }}
                            />
                        )}
                    </div>
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

                    </div>
                    <div className="inner-left-3-agePredictor">
                        <div className='inner-1-for-left-3'>
                            <p>Est. time: 30 seconds to 50 seconds</p>
                        </div>
                        <div className="inner-2-for-left-3">
                            <button className='agePredictor-left-3-btn-1'>See Pricing</button>
                            <button className='agePredictor-left-3-btn-2'>
                                Generate
                                <div className="agePredictor-left-3-btn-2-icon">
                                    <img src={star} alt="" />
                                    <span>-0.5</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="right-main-agePredictor">
                    <Upload_img uploadDetails={{ image: predictorImage }} />
                </div>
            </div>
        </>
    )
}
export default AgePredictor;