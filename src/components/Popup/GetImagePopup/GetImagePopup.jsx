import { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

import graduant from './GetImagePopupImage/Black-Fade-PNG-Isolated-HD.png';
import closeIcon from "./GetImagePopupImage/close.svg";
import downloadIcon from "./GetImagePopupImage/download.svg";


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
                   allowTaint: true,
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
                <div className="Generat-image-heading">
                    <span>Generated Image</span>
                    <button
                        className="getimage-pop-close-button"
                        onClick={getimage_details.onClose}
                    >
                        <img width="20" height="20" src={closeIcon} alt="close" />
                    </button>
                </div>

                <div className="generated-image" ref={imageRef}>
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
                        className="download-button pixel-corners"
                        onClick={handleDownload}
                        disabled={downloadingRef.current}
                    >
                        <div className="button-content">
                            <div className="svg-container">
                                <img src={downloadIcon} alt="" />
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
