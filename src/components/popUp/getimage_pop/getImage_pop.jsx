import './getimage_pop.css';
import graduant from './Black-Fade-PNG-Isolated-HD.png'

function getImage_pop({ getimage_details }) {
    const handleDownload = async () => {
        try {
            const response = await fetch(getimage_details.image); // get from backend
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "baby-image.png"; // file name
            document.body.appendChild(link);
            link.click();

            // cleanup
            link.remove();
            window.URL.revokeObjectURL(url);


            // setTimeout(() => {
            //     window.location.reload();
            // }, 1000);
        } catch (err) {
            console.error("Download failed:", err);
        }
    };

    return (
        <div className="popup-overlay-getimage">
            <div className="popup-box-getimage">
                <div className="inner-1-pop-getimage">
                    <span>Generated Image</span>
                    <button className="getimage-pop-close-btn" onClick={getimage_details.onClose}>
                        <img
                            width="20"
                            height="20"
                            src="https://img.icons8.com/ios-glyphs/30/FFFFFF/delete-sign.png"
                            alt="close"
                        />
                    </button>
                </div>
                <div className="inner-2-pop-getimage">
                    <div className='pop-pass-image-get'>
                    <img className='pop-pass-image-get' src={getimage_details.image} alt="" />
                    </div>
                     <img className='pop-pass-image-black' src={graduant} alt="" />
                    <p className='age-img'>{getimage_details.getingAge}</p>
                </div>
                <div className="inner-3-pop-getimage">


                    <div className="installer" onClick={handleDownload}>
                        <label htmlFor="progressLinux"><input id="progressLinux" type="radio" /><span></span></label>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default getImage_pop;