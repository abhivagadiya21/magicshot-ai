import { useState } from 'react';
import usePopup from '../../hooks/usePopup';
import '../BabyGenrator_page/babyPage.css';
import Upload_img from '../../components/upload_img_re_compo/Upload_img';
import Howworkpop from '../../components/popUp/how_it_work_pop/Howworkpop';
import star from './babyG-img/star.svg';
import babyImage from './babyG-img/babyG.png';
import questionMark from './babyG-img/question.svg';
import poppassimage1 from './babyG-img/poppassimg1.png';
import Profileicon1 from './babyG-img/profile-1.svg';
import Profileicon2 from './babyG-img/profile-2.svg';
import upload from './babyG-img/upload.svg';
import boyIcon from '../BabyGenrator_page/babyG-img/boy.png';
import girlIcon from '../BabyGenrator_page/babyG-img/girl.png';


function BabyPage() {
    const { showPopup, handleOpen, handleClose } = usePopup();
    const [selectedGender, setSelectedGender] = useState(null);

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
    };

    return (
        <div className="main-baby-genrartor-1">
            <div className="left-main-babyG">

                <div className="inner-left-1-babyG-1">
                    <h4>AI Baby Generator</h4>
                    <button onClick={handleOpen} className='btn-pop-up-howWork'>
                        <img src={questionMark} alt="Help icon" />
                        <span>How It Works</span>
                    </button>

                    {showPopup && (
                        <Howworkpop
                            howworkpopDetails={{
                                onClose: handleClose,
                                image: poppassimage1,
                                message: "Upload your photos, and AI quickly generates an image of your future baby."
                            }}
                        />
                    )}
                </div>

                <div className='inner-left-2-babyG'>
                    <div className='upload-image-buttons'>
                        <div className='uplod-image-button'>
                            <button className='uplod-button-babyG'>
                                <div className='profile-icon-container'>
                                    <img src={Profileicon1} alt="" />
                                </div>
                                <div className='icon-text-container'>
                                    <p className='icon-text'>Parent 1</p>

                                </div>
                            </button>
                            <div className='img-upload-button-container'>
                                <button className='uplod-button'>
                                    <img className='upload-img-icon' src={upload} alt="" />
                                    <p>Upload</p>
                                </button>
                            </div>
                        </div>

                        <div className='uplod-image-button-Parent-2'>
                            <button className='uplod-button-babyG-Parent-2'>
                                <div className='profile-icon-container'>
                                    <img src={Profileicon2} alt="" />

                                </div>
                                <div className='icon-text-container'>
                                    <p className='icon-text'>Parent 2</p>

                                </div>

                            </button>
                            <div className='img-upload-button-container'>
                                <button className='uplod-button upload-button-parent-2'>
                                    <img className='upload-img-icon' src={upload} alt="" />
                                    <p>Upload</p>
                                </button>
                            </div>
                        </div>

                    </div>

                    <p className='baby-gender'>Baby's Gender</p>
                    <div className="gender-main-container">
                        {/* Boy Option */}
                        <button
                            className={`gender-option ${selectedGender === 'boy' ? 'selected' : ''}`}
                            onClick={() => handleGenderSelect('boy')}
                        >
                            <div className="avatar-container">
                                <img src={boyIcon} alt="Boy Avatar" className="gender-avatar-img" />
                                <span className="avatar-text">Boy</span>
                            </div>
                            <div className={`button-container ${selectedGender === 'boy' ? 'checked' : ''}`}>
                                {selectedGender === 'boy' && <span className="checkmark">✔</span>}
                            </div>
                        </button>

                        {/* Girl Option */}
                        <button
                            className={`gender-option ${selectedGender === 'girl' ? 'selected' : ''}`}
                            onClick={() => handleGenderSelect('girl')}
                        >
                            <div className="avatar-container">
                                <img src={girlIcon} alt="Girl Avatar" className="gender-avatar-img" />
                                <span className="avatar-text">Girl</span>
                            </div>
                            <div className={`button-container ${selectedGender === 'girl' ? 'checked' : ''}`}>
                                {selectedGender === 'girl' && <span className="checkmark">✔</span>}
                            </div>
                        </button>
                    </div>




                </div>

                {/* Footer */}
                <div className="inner-left-3-babyG">
                    <div className='inner-1-for-left-3-1'>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.3618 15.7052C15.2218 15.9452 14.9718 16.0752 14.7218 16.0752C14.5918 16.0752 14.4518 16.0352 14.3318 15.9652L11.6018 14.3252C11.3718 14.1952 11.2318 13.9452 11.2318 13.6852V10.1552C11.2318 9.73516 11.5718 9.40516 11.9818 9.40516C12.3918 9.40516 12.7318 9.73516 12.7318 10.1552V13.2552L15.1018 14.6852C15.4618 14.8952 15.5818 15.3552 15.3618 15.7052ZM12.1518 5.03516C7.75187 5.03516 4.17188 8.61516 4.17188 13.0152C4.17188 17.4152 7.75187 20.9952 12.1518 20.9952C16.5518 20.9952 20.1318 17.4152 20.1318 13.0152C20.1318 8.61516 16.5518 5.03516 12.1518 5.03516Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M6.7984 4.40196C7.1514 4.18396 7.2604 3.72196 7.0424 3.36996C6.8234 3.01696 6.3614 2.90796 6.0104 3.12596C4.6374 3.97296 3.4374 5.11596 2.5404 6.43096C2.3074 6.77296 2.3954 7.23996 2.7374 7.47296C2.8664 7.56196 3.0134 7.60396 3.1594 7.60396C3.3994 7.60396 3.6344 7.48896 3.7794 7.27696C4.5594 6.13396 5.6034 5.13996 6.7984 4.40196Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M21.7798 6.43147C20.8738 5.10147 19.6698 3.95447 18.2988 3.11447C17.9458 2.89847 17.4838 3.00847 17.2668 3.36147C17.0508 3.71547 17.1608 4.17647 17.5138 4.39347C18.7068 5.12347 19.7528 6.12047 20.5408 7.27647C20.6858 7.48947 20.9208 7.60347 21.1608 7.60347C21.3058 7.60347 21.4528 7.56147 21.5828 7.47347C21.9248 7.24047 22.0128 6.77347 21.7798 6.43147Z" fill="white"></path></svg>
                        <p>Est. time: 30 seconds to 50 seconds</p>
                    </div>

                    <div className="inner-2-for-left-3">
                        <button className='baby-left-3-btn-1'>See Pricing</button>
                        <button className='baby-left-3-btn-2'>
                            Generate
                            <div className="baby-left-3-btn-2-icon">
                                <img src={star} alt="star icon" />
                                <span>-0.5</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Side Image Section */}
            <div className="right-main-babyG-1">
                <h1>AI Baby Generator</h1>
                <Upload_img uploadDetails={{ image: babyImage }} />
            </div>
        </div>
    );
}

export default BabyPage;


