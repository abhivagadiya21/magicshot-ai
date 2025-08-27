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
import { changeHaircutAPI } from '../../services/imageBase';
import { blobUrlToFile } from '../../utils/blobToFile';
import { toast } from "react-toastify";
import GetImage_pop from "../../components/popUp/getimage_pop/getImage_pop.jsx";


function ChangehaircutPage() {
    const { showPopup: showHowWork, handleOpen: openHowWork, handleClose: closeHowWork } = usePopup();
    const { showPopup: showImagePopup, handleOpen: openImagePopup, handleClose: closeImagePopup } = usePopup();

    const [genraterImageurl, setGenraterImageurl] = useState(null);

    const [selectedGender, setSelectedGender] = useState("boy");
    const [activeTab, setActiveTab] = useState('tab1');
    const parent1Upload = useUploadImg();

    const [hairColor, setHairColor] = useState("default");
    const [hairstyle, setHairstyle] = useState(null);

    const styles = [
        { name: "Random", img: style1 },
        { name: "Bob", img: style2 },
        { name: "Lob", img: style3 },
        { name: "Layered", img: style4 },
        { name: "Pixie cut", img: style5 },
        { name: "Messy bun", img: style6 },
        { name: "High Ponytail", img: style7 },
    ];

    const HairColor = [
        { name: "Random", img: color1 },
        { name: "Black", img: color2 },
        { name: "Dark Brown", img: color3 },
        { name: "Medium Brown", img: color4 },
        { name: "Light Brown", img: color5 },
        { name: "Brunette", img: color6 },
        { name: "Blonde", img: color7 },
    ];

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

        try {
            const uploadPhoto = await blobUrlToFile(
                parent1Upload.croppedImage,
                "parent1.jpg"
            );
            console.log("Upload Photo:", uploadPhoto);

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

            const response = await changeHaircutAPI(imageFiles, otherData);
            console.log("Response from API:", response);

            if (response?.data?.file) {
                setGenraterImageurl(response.data.file);
                toast.success("🎉 Age journey image generated successfully!");
            } else {
                toast.error("❌ No image returned from server.");
            }

            toast.success("🎉 Haircut image generated successfully!");
        } catch (error) {
            console.error("Error generating image:", error);
            toast.error(error?.response?.data?.message || "❌ Failed to generate image. Please try again.")
        }
    };

    const handleClickGenerate = async () => {
        await handleGenerate();
        openImagePopup();
        window.dispatchEvent(new Event("creditsUpdated"));
    };


    return (
        <>
            <div className="main-changeHair">
                <div className="left-main-changeHair">
                    <div className="inner-left-1-changeHair">
                        <h4>Al Change Hairstyle</h4>
                        <button onClick={openHowWork} className='btn-pop-up-howWork'>
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
                                className={`tab-btn-1-chageHair ${activeTab === 'tab1' ? 'active-tab1' : ''}`}

                            >Hairstyle</button>
                            <button onClick={() => setActiveTab('tab2')}
                                // className='tab-btn-2-chageHair'
                                className={`tab-btn-2-chageHair ${activeTab === 'tab2' ? 'active-tab1' : ''}`}
                            >hair Color</button>
                        </div>
                        <div className="inner-2-left-in-tab-btnshow-div-changeHair">
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


                    </div>
                    <div className="inner-left-3-changeHair">
                        <div className='inner-1-for-left-3'>
                            <p>Est. time: 30 seconds to 50 seconds</p>
                        </div>
                        <div className="inner-2-for-left-3">
                            <button className='changeHair-left-3-btn-1'>See Pricing</button>
                            <button className='changeHair-left-3-btn-2' onClick={handleClickGenerate}>
                                Generate
                                <div className="changeHair-left-3-btn-2-icon">
                                    <img src={star} alt="" />
                                    <span>-0.5</span>
                                </div>
                            </button>
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
                <div className="right-main-changeHair">
                    <Upload_img uploadDetails={{ image: hairImage }} />
                </div>
            </div>
        </>
    )
}
export default ChangehaircutPage;
