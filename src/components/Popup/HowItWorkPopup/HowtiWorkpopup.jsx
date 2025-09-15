import questionMarkIcon from "../../../pages/BabyGenerator/baby-img/question.svg";
import closeIcon from "../GetImagePopup/GetImagePopupImage/close.svg";

import "./howWorkPop.css";

function HowtiWorkpopup({ howWorkPopDetails }) {
  return (
    <div className="popup-overlay-how-work">
      <div className="popup-box-how-work-main">
        <div className="inner-1-pop-how-work">
          <div className="inner-1-1-pop-how-work">
            <img
              className="pop-question-img"
              src={questionMarkIcon}
              alt="question"
            />
            <span>How it Works</span>
          </div>
          <button
            className="how-work-pop-close-btn"
            onClick={howWorkPopDetails.onClose}
          >
            <img width="20" height="20" src={closeIcon} alt="close" />
          </button>
        </div>

        <div className="inner-2-pop-how-work">
          <img
            className="pop-pass-image-work"
            src={howWorkPopDetails.image}
            alt="popup-illustration"
          />
        </div>

        <div className="inner-3-pop-how-work">
          <p>{howWorkPopDetails.message}</p>
        </div>
      </div>
    </div>
  );
}

export default HowtiWorkpopup;
