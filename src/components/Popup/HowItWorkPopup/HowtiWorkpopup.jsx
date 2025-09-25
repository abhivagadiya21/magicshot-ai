import questionMarkIcon from "../../../pages/BabyGenerator/baby-img/question.svg";
import closeIcon from "../GetImagePopup/GetImagePopupImage/close.svg";


function HowtiWorkpopup({ howWorkPopDetails }) {
  return (
    <div className="popup-overlay-how-work">
      <div className="popup-box-how-work-main">
        <div className="inner-1-popup-how-work">
          <div className="inner-1-1-popup-how-work">
            <img
              className="popup-question-image"
              src={questionMarkIcon}
              alt="question"
            />
            <span>How it Works</span>
          </div>
          <button
            className="how-work-popup-close-button"
            onClick={howWorkPopDetails.onClose}
          >
            <img width="20" height="20" src={closeIcon} alt="close" />
          </button>
        </div>

        <div className="inner-2-popup-how-work">
          <img
            className="popup-pass-image-work"
            src={howWorkPopDetails.image}
            alt="popup-illustration"
          />
        </div>

        <div className="inner-3-popup-how-work">
          <p>{howWorkPopDetails.message}</p>
        </div>
      </div>
    </div>
  );
}

export default HowtiWorkpopup;
