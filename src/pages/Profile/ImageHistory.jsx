import React, { Component, useEffect, useState } from 'react'
import { getImageHistoryAPI } from '../../services/imageBase'
import backArrow from "./Profile-image/backArrow.png";
import ProfileImage from "./Profile-image/Profile-icon.svg";
import { meta } from '@eslint/js';
function ImageHistory() {
    const [imagedata, setImagedata] = useState([]);
    // const [getMetaData, setGetMetaData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const getImage = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const { data } = await getImageHistoryAPI(token);
            console.log("image history data", data);
            if (data.images) {
                setImagedata(data);
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message || "❌ Failed to fetch image-histroy."
            );
        }
    }
    useEffect(() => {
        getImage();
    }, []);
    const showPrevious = () => {
        if (selectedIndex > 0) {
            const newIndex = selectedIndex - 1;
            setSelectedImage(imagedata.images[newIndex]);
            setSelectedIndex(newIndex);
        }
    };

    const showNext = () => {
        if (selectedIndex < imagedata.images.length - 1) {
            const newIndex = selectedIndex + 1;
            setSelectedImage(imagedata.images[newIndex]);
            setSelectedIndex(newIndex);
        }
    };
    const closePopup = () => {
        setSelectedImage(null);
        setSelectedIndex(null);
    };
    const metadata =
        selectedImage && selectedImage.metadata
            ? typeof selectedImage.metadata === "string"
                ? JSON.parse(selectedImage.metadata)
                : selectedImage.metadata
            : {};
    return (
        <>
            <div className='image-history-main-container'>
                <div className='image-history-container'>

                    {imagedata.images && imagedata.images.map((item, index) => {
                        // ✅ Parse metadata safely (string → object)
                        // const metadata =
                        //     typeof item.metadata === "string"
                        //         ? JSON.parse(item.metadata)
                        //         : item.metadata;

                        //✅ Log metadata in console for each image
                        // console.log(`Metadata for image ${index}:`, metadata.upload_img);

                        return (
                            <div className='image-card' key={index} onClick={() => {
                                setSelectedImage(item);
                                setSelectedIndex(index);
                                // setGetMetaData(metadata)
                            }}>
                                <img src={item.generator_img} alt={`Generated ${index}`} />
                            </div>
                        );
                    })}
                    {selectedImage && (
                        <div className="popup-overlay" onClick={closePopup}>
                            {selectedIndex > 0 && (
                                <button
                                    className="side-nav left"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        showPrevious();
                                    }}
                                >
                                    &#8249;
                                </button>
                            )}

                            {selectedIndex < imagedata.images.length - 1 && (
                                <button
                                    className="side-nav right"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        showNext();
                                    }}
                                >
                                    &#8250;
                                </button>
                            )}

                            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                                <div className="main-container">
                                    <div className="popup-image-section">
                                        <img
                                            className="popup-image"
                                            src={selectedImage.generator_img}
                                            alt="Selected"
                                        />
                                    </div>

                                </div>

                                <div className="popup-info-panel">
                                    <div className="popup-close" onClick={closePopup}>
                                        ✕
                                    </div>

                                    <div className="prompt-section">
                                        <div>
                                            <h3>{selectedImage.record_type}</h3>
                                            <h2>{selectedImage.use_credit}</h2>
                                            {/* <img className='upload_img_popup' src={metadata.upload_img} alt="" /> */}
                                            {metadata.upload_img && <img className='upload_img_popup' src={metadata.upload_img} alt="" />}
                                            {metadata.parent_1 && <img className='upload_img_popup' src={metadata.parent_1} alt="" />}
                                            {metadata.parent_2 && <img className='upload_img_popup' src={metadata.parent_2} alt="" />}
                                            <h4>{selectedImage.created_at}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )

}


export default ImageHistory
