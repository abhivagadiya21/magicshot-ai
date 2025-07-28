import { useState } from 'react';
import usePopup from '../../hooks/usePopup';
import '../BabyGenrator_page/babyPage.css';
import Upload_img from '../../components/upload_img_re_compo/Upload_img';
import Howworkpop from '../../components/popUp/how_it_work_pop/Howworkpop';

import star from './babyG-img/star.svg';
import babyImage from './babyG-img/babyG.png';
import questionMark from './babyG-img/question.svg';
import poppassimage1 from './babyG-img/poppassimg1.png';

function BabyPage() {
    const { showPopup, handleOpen, handleClose } = usePopup();
    const [gender, setGender] = useState('male');

    return (
        <div className="main-baby-genrartor">
            <div className="left-main-babyG">
                {/* Header + How It Works */}
                <div className="inner-left-1-babyG">
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

                {/* Upload Sections */}
                <div className='inner-left-2-babyG'>
                    <div className='upload-image-buttons'>
                        <div className='uplod-image-button'>
                            <p className='Upload-img-lebal'>Your Image</p>
                            <button className='uplod-button-babyG'>
                                <p className='plus-iocn'>+</p>
                                <p className='icon-text'>Upload</p>
                            </button>
                        </div>

                        <div className='uplod-image-button'>
                            <p className='Upload-img-lebal'>Your Partner's Image</p>
                            <button className='uplod-button-babyG'>
                                <p className='plus-iocn'>+</p>
                                <p className='icon-text'>Upload</p>
                            </button>
                        </div>
                    </div>

                    {/* Gender Selection */}
                    <p className='baby-gender'>Baby's Gender</p>
                    <div className="gender-main-container">
                        <button
                            className={`gender-btn male-main ${gender === 'male' ? 'active' : 'inactive'}`}
                            onClick={() => setGender('male')}
                        >
                            Male
                        </button>
                        <button
                            className={`gender-btn female-main ${gender === 'female' ? 'active' : 'inactive'}`}
                            onClick={() => setGender('female')}
                        >
                            Female
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="inner-left-3-babyG">
                    <div className='inner-1-for-left-3'>
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
            <div className="right-main-babyG">
                <Upload_img uploadDetails={{ image: babyImage }} />
            </div>
        </div>
    );
}

export default BabyPage;
