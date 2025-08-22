import './getimage_pop.css';

function getImage_pop({getimage_details}) {
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
                    <img className='pop-pass-image-work' src={getimage_details.image} alt="" />
                </div>
                <div className="inner-3-pop-getimage">
                    <button onClick={handleDownload}>download</button>
                </div>
            </div>
        </div>
    );
}
export default getImage_pop;