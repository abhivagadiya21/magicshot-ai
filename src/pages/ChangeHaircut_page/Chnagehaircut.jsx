import { useState } from 'react';
import usePopup from '../../hooks/usePopup';
import Upload_img from '../../components/upload_img_re_compo/Upload_img';
import './chnageHaircut.css';
import star from '../BabyGenrator_page/babyG-img/star.svg';
import hairImage from './hairstyle_image/changehaircut.png'
import poppassimg4 from '../BabyGenrator_page/babyG-img/poppassimg4.png';
import questionMark from '../BabyGenrator_page/babyG-img/question.svg';
import Howworkpop from '../../components/popUp/how_it_work_pop/Howworkpop';
import Profileicon1 from '../BabyGenrator_page/babyG-img/profile-1.svg';
import upload from '../BabyGenrator_page/babyG-img/upload.svg';
import boyIcon from '../BabyGenrator_page/babyG-img/boy.png';
import girlIcon from '../BabyGenrator_page/babyG-img/girl.png';
import style1 from './hairstyle_image/hairstyle1.png';
import style2 from './hairstyle_image/hairstyle2.png';
import style3 from './hairstyle_image/hairstyle3.png';
import style4 from './hairstyle_image/hairstyle4.png';
import style5 from './hairstyle_image/hairstyle5.png';
import style6 from './hairstyle_image/hairstyle6.png';
import style7 from './hairstyle_image/hairstyle7.png';
import color1 from './hairstyle_image/haircolor1.png';
import color2 from './hairstyle_image/haircolor2.png';
import color3 from './hairstyle_image/haircolor3.png';
import color4 from './hairstyle_image/haircolor4.png';
import color5 from './hairstyle_image/haircolor5.png';
import color6 from './hairstyle_image/haircolor6.png';
import color7 from './hairstyle_image/haircolor7.png';
import CropImage from "../../components/CropImage/CropImage";
import useUploadImg from "../../hooks/useUploadImg";

function ChangehaircutPage() {
    const { showPopup, handleOpen, handleClose } = usePopup();
    const [selectedGender, setSelectedGender] = useState("boy");
    const [activeTab, setActiveTab] = useState('tab1');
    const parent1Upload = useUploadImg();


    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };
    return (
        <>
            <div className="main-changeHair">
                <div className="left-main-changeHair">
                    <div className="inner-left-1-changeHair">
                        <h4>Al Change Hairstyle</h4>
                        <button onClick={handleOpen} className='btn-pop-up-howWork'>
                            <img src={questionMark} alt="" />
                            <span>How It Works</span>
                        </button>
                        {showPopup && (
                            <Howworkpop
                                howworkpopDetails={{
                                    onClose: handleClose,
                                    image: poppassimg4,
                                    message:
                                        "Upload your photo, choose from a variety of hairstyles and hair colors, and let AI instantly transform your look. No editing skills needed—just pick, preview, and download your new hairstyle in seconds."
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
                            {/* Cropper Modal */}
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

                        </div>


                        <p className='baby-gender'> Gender</p>

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
                                                src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/FFFFFF/external-verified-check-circle-for-approved-valid-content-basic-bold-tal-revivo.png"
                                                alt="checkmark"
                                            />
                                        </span>
                                    )}
                                </div>
                            </button>
                        </div>

                        <div className="inner-2-left-in-tab-btn-changeHair">
                            <button onClick={() => setActiveTab('tab1')}
                                className={`tab-btn-1-chageHair ${activeTab === 'tab1' ? 'active-tab' : ''}`}

                            >Hairstyle</button>
                            <button onClick={() => setActiveTab('tab2')}
                                // className='tab-btn-2-chageHair'
                                className={`tab-btn-2-chageHair ${activeTab === 'tab2' ? 'active-tab' : ''}`}
                            >hair Color</button>
                        </div>
                        <div className="inner-2-left-in-tab-btnshow-div-changeHair">
                            {activeTab === 'tab1' && (
                                <div className="tab1-content-changeHair">
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={style1} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Random</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={style1} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Random</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={style1} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Random</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={style1} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Random</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={style1} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Random</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={style1} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Random</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={style2} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Bob</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={style3} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Lob</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={style4} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Layered</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={style5} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Pixie cut</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={style6} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Messy bun</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={style7} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>High Ponytail</p>
                                    </div>
                                </div>
                            )}
                            {activeTab === 'tab2' && (
                                <div className="tab1-content-changeHair">
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={color1} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Random</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={color1} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Random</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={color1} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Random</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={color1} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Random</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={color1} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Random</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={color1} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Random</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={color2} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Black</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={color3} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Dark brown</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={color4} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Medium Brown</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={color5} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Light brown</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={color6} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Brunette</p>
                                    </div>
                                    <div className='tab1-inner-1-content'>
                                        <div className='tab1-inner-1-content-img-div-hair'>
                                            <img src={color7} alt="Style 1" className='tab1-content-inner-1-img-hair' />
                                        </div>
                                        <p>Blonde</p>
                                    </div>
                                </div>
                            )}
                        </div>


                    </div>
                    <div className="inner-left-3-changeHair">
                        <div className='inner-1-for-left-3'>
                            <p>Est. time: 30 seconds to 50 seconds</p>
                        </div>
                        <div className="inner-2-for-left-3">
                            <button className='changeHair-left-3-btn-1'>See Pricing</button>
                            <button className='changeHair-left-3-btn-2'>
                                Generate
                                <div className="changeHair-left-3-btn-2-icon">
                                    <img src={star} alt="" />
                                    <span>-0.5</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="right-main-changeHair">
                    <Upload_img uploadDetails={{ image: hairImage }} />
                </div>
            </div>
        </>
    )
}
export default ChangehaircutPage;
