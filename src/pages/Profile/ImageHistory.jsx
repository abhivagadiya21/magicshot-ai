import React, { Component, useEffect, useState } from 'react'
import { getImageHistoryAPI } from '../../services/imageBase'
import magic from './Profile-image/magic.svg';
import imagegallery from './Profile-image/imageicon.png';
import star from '../BabyGenerator/baby-img/star.svg';
import timeicon from './Profile-image/timeicon.png';
import arrowleft from './Profile-image/arrow-left.svg';

function ImageHistory() {
    const [imagedata, setImagedata] = useState([]);
    //const [getMetaData, setGetMetaData] = useState([]);
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
                                    <img src={arrowleft} alt="Previous" />
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
                                    <img className='transform-image' src={arrowleft} alt="Previous" />
                                </button>
                            )}

                            <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                                <div className="main-container-popup">

                                    <img
                                        className="popup-image"
                                        src={selectedImage.generator_img}
                                        alt="Selected"
                                    />


                                </div>

                                <div className="popup-info-panel">
                                    <div className="popup-close-button" onClick={closePopup}>
                                        ✕
                                    </div>

                                    <div className="prompt-section">
                                        <div className='record-type-container'>
                                            <img src={magic} alt="" />
                                            <p>{selectedImage.record_type}</p>
                                        </div>

                                        <div className='Uoploded-image-container'>
                                            <img src={imagegallery} alt="" />
                                            <p >Uoploded Image</p>
                                        </div>

                                        <div>
                                            {metadata.upload_img && <img className='upload_img_popup' src={metadata.upload_img} alt="" />}
                                        </div>
                                        <div className='uploded-parent-images'>
                                            {metadata.parent_1 && <img className='upload_img_popup' src={metadata.parent_1} alt="" />}
                                            {metadata.parent_2 && <img className='upload_img_popup' src={metadata.parent_2} alt="" />}
                                        </div>
                                        <i class="fa-solid fa-hourglass-end"></i>


                                        <div className='use-credit-container'>
                                            <img src={star} alt="" />
                                            <p>{selectedImage.use_credit}</p>
                                            <p>Use Credit</p>
                                        </div>

                                        <div className='time-date-container'>
                                            <img src={timeicon} alt="" />
                                            <p>{selectedImage.created_at}</p>
                                        </div>
                                    </div>
                                    <div className='dowanload-share-button'>
                                        <button className='download-button-imgde-history'>Share</button>
                                        <button className='download-button-imgde-history'>Download</button>
                                      
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
