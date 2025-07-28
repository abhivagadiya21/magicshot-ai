import usePopup from '../../hooks/usePopup';
import Upload_img from '../../components/upload_img_re_compo/Upload_img';
// import './ageJourney.css';
import poppassimg3 from '../BabyGenrator_page/babyG-img/poppassimg3.png';
import star from '../BabyGenrator_page/babyG-img/star.svg';
import journeyImage from './journey_image/agejourney.png'
import questionMark from '../BabyGenrator_page/babyG-img/question.svg';
import Howworkpop from '../../components/popUp/how_it_work_pop/Howworkpop';
function AgeJourney() {
    const { showPopup, handleOpen, handleClose } = usePopup();
    return (
        <>
            <div className="main-baby-genrartor">
                <div className="left-main-babyG">
                    <div className="inner-left-1-babyG">
                        <h4>AI Age Journey</h4>
                        <button onClick={handleOpen} className='btn-pop-up-howWork'>
                            <img src={questionMark} alt="" />
                            <span>How It Works</span>
                        </button>
                        {showPopup && (
                            <Howworkpop
                                howworkpopDetails={{
                                    onClose: handleClose ,
                                    image: poppassimg3,
                                    message:"Generate your age journey in seconds with help of AI."
                                }}
                            />
                        )}
                    </div>
                    <div className='inner-left-2-babyG'>

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
                    <Upload_img uploadDetails={{ image: journeyImage }} />
                </div>
            </div>
        </>
    )
}
export default AgeJourney;
