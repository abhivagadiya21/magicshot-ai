import './getimage_pop.css';
import graduant from './Black-Fade-PNG-Isolated-HD.png';
import { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

function GetImagePop({ getimage_details }) {
    const imageRef = useRef(null);
    const downloadingRef = useRef(false); 
    const handleDownload = async () => {
        if (downloadingRef.current) return;
        downloadingRef.current = true;

        try {
            if (!imageRef.current) return;

            const canvas = await html2canvas(imageRef.current, {
                useCORS: true, 
                backgroundColor: null, 
                scale: 2, 
            });

            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = (getimage_details.imgname || "downloaded-image") + ".png";
            link.click();
        } catch (err) {
            console.error("Download failed:", err);
        } finally {
            setTimeout(() => {
                downloadingRef.current = false;
            }, 500);
        }
    };

    useEffect(() => {
        return () => {
            downloadingRef.current = false;
        };
    }, []);

    return (
        <div className="popup-overlay-getimage">
            <div className="popup-box-getimage">
                <div className="inner-1-pop-getimage">
                    <span>Generated Image</span>
                    <button
                        className="getimage-pop-close-btn"
                        onClick={getimage_details.onClose}
                    >
                        <img
                            width="20"
                            height="20"
                            src="https://img.icons8.com/ios-glyphs/30/FFFFFF/delete-sign.png"
                            alt="close"
                        />
                    </button>
                </div>

                {/* capture this whole block */}
                <div className="inner-2-pop-getimage" ref={imageRef}>
                    <div className="pop-pass-image-get">
                        <img
                            className="pop-pass-image-get"
                            src={getimage_details.image}
                            alt=""
                        />

                        {getimage_details.getingAge && (
                            <div className="age-overlay">
                                <img
                                    className="pop-pass-image-black"
                                    src={graduant}
                                    alt=""
                                />
                                <p className="age-img">
                                    {getimage_details.getingAge}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="inner-3-pop-getimage">
                    <div className="installer" onClick={handleDownload}>
                        <label htmlFor="progressLinux">
                            <input id="progressLinux" type="radio" />
                            <span></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetImagePop;
