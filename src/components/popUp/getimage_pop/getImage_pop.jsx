import './getimage_pop.css';

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
                    <p>{getimage_details.getingAge}</p>

                    <div class="container1" onClick={handleDownload}>
                        <label class="label">
                            <input type="checkbox" class="input" />
                            <span class="circle"
                            ><svg
                                class="icon"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                        d="M12 19V5m0 14-4-4m4 4 4-4"
                                    ></path>
                                </svg>
                                <div class="square"></div>
                            </span>
                            <p class="title">Download</p>
                            <p class="title">Open</p>
                        </label>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default getImage_pop;