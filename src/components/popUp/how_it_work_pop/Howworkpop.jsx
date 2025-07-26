import '../how_it_work_pop/howworkpop.css';
import questionMark from '../../../pages/BabyGenrator_page/babyG-img/question.svg';
function Howworkpop({ howworkpopDetails }) {
    return (
        <div className="popup-overlay-how-work">
            <div className="popup-box-how-work-main">
                <div className="inner-1-pop-how-work">
                    <div className="inner-1-1-pop-how-work">
                        <img className='pop-question-img' src={questionMark} alt="" />
                        <span>How it Work</span>
                    </div>
                    <button className='how-work-pop-close-btn' onClick={howworkpopDetails.onClose}>X</button>
                </div>
                <div className="inner-2-pop-how-work">
                    <img className='pop-pass-image-work' src={howworkpopDetails.image} alt="" />
                </div>
                <div className="inner-3-pop-how-pop">
                    <p>{howworkpopDetails.message}</p>
                </div>
            </div>
        </div>
    )
}
export default Howworkpop;