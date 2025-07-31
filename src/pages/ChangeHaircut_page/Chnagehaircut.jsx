import usePopup from '../../hooks/usePopup';
import Upload_img from '../../components/upload_img_re_compo/Upload_img';
import './chnageHaircut.css';
import star from '../BabyGenrator_page/babyG-img/star.svg';
import hairImage from './hairstyle_image/changehaircut.png'
import poppassimg4 from '../BabyGenrator_page/babyG-img/poppassimg4.png';
import questionMark from '../BabyGenrator_page/babyG-img/question.svg';
import Howworkpop from '../../components/popUp/how_it_work_pop/Howworkpop';

function ChangehaircutPage() {
    const { showPopup, handleOpen, handleClose } = usePopup();
    return (
        <>
            <div className="main-changeHair">
                <div className="left-main-changeHair">
                    <div className="inner-left-1-changeHair">
                        <h4>Change Hairstyle</h4>
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
