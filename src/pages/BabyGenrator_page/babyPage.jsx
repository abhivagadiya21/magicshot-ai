import usePopup from '../../hooks/usePopup';
import '../BabyGenrator_page/babyPage.css';
import Upload_img from '../../components/upload_img_re_compo/Upload_img';
import star from './babyG-img/star.svg'
import babyImage from './babyG-img/babyG.png'
import questionMark from './babyG-img/question.svg'
import Howworkpop from '../../components/popUp/how_it_work_pop/Howworkpop';
import poppassimage1 from './babyG-img/poppassimg1.png';
import { useState } from 'react';
function babyPage() {
    const { showPopup, handleOpen, handleClose } = usePopup();

    return (
        <>
            <div className="main-baby-genrartor">
                <div className="left-main-babyG">
                    <div className="inner-left-1-babyG">
                        <h4>AI Baby Genrator</h4>
                        <button onClick={handleOpen} className='btn-pop-up-howWork'>
                            <img src={questionMark} alt="" />
                            <span>How It Works</span>
                        </button>
                        {showPopup && (
                            <Howworkpop
                                howworkpopDetails={{
                                    onClose: handleClose ,
                                    image: poppassimage1,
                                    message:"Upload your photos, and AI quickly generates an image of your future baby."
                                }}
                            />
                        )}
                    </div>
                    <div className='inner-left-2-babyG'>
                        <div className='upload-image-buttons'>

                            
                        <div className='uplod-image-button'>
                            <p className='Upload-img-lebal'>Your Image</p>
                            
                            <button className='uplod-button-babyG'><p className='plus-iocn'>+</p><p className='icon-text'>Upload</p></button>

                        </div>
                         <div className='uplod-image-button'>
                            <p className='Upload-img-lebal'>Your Partner's Image</p>
                            
                            <button className='uplod-button-babyG'><p className='plus-iocn'>+</p><p className='icon-text'>Upload</p></button>

                        </div>
                    </div>
                        </div>
                    <div className="inner-left-3-babyG">
                        <div className='inner-1-for-left-3'>
                            <p>Est. time: 30 seconds to 50 seconds</p>
                        </div>
                        <div className="inner-2-for-left-3">
                            <button className='baby-left-3-btn-1'>See Pricing</button>
                            <button className='baby-left-3-btn-2'>Generate
                                < div className="baby-left-3-btn-2-icon">
                                    <img src={star} alt="" />
                                    <span>-0.5</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="right-main-babyG">
                    <Upload_img uploadDetails={{ image: babyImage }} />
                </div>
            </div>
        </>
    )
}
export default babyPage;
