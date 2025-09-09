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
                <div className="download-button-container">
                    <button
                        className="download-btn pixel-corners"
                        onClick={handleDownload}
                        disabled={downloadingRef.current}
                    >
                        <div className="button-content">
                            <div className="svg-container">
                                <svg
                                    className="download-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479 6.908l-4-4h3v-4h2v4h3l-4 4z"
                                    />
                                </svg>
                            </div>
                            <div className="text-container">
                                <div className="text">
                                    {downloadingRef.current ? "Preparing..." : "Download"}
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GetImagePop;
