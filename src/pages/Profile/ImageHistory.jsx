import React, { Component, useEffect, useState } from 'react'
import { getImageHistoryAPI } from '../../services/imageBase'
import magic from './Profile-image/magic.svg';
import imagegallery from './Profile-image/imageicon.png';
import star from '../BabyGenerator/baby-img/star.svg';
// import timeicon from './Profile-image/timeicon.png';
import timeIcon from "../AgeJourney/journey-image/time.svg";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import arrowleft from './Profile-image/arrow-left.svg';

function ImageHistory() {
    const [imagedata, setImagedata] = useState([]);
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
    const handleDownload = async (imageUrl) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `image_${Date.now()}.png`; // Or .jpg, depending on your image type
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Cleanup the blob URL after a short delay
            setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };
    const handleShare = async (imageUrl) => {
        try {
            // Fetch the image as a Blob
            const response = await fetch(imageUrl);
            const blob = await response.blob();

            // Create a File object from the blob
            const file = new File([blob], 'shared_image.png', { type: blob.type });

            // Check if the browser supports sharing files
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: 'Check out this image!',
                    text: 'Here’s an image I generated.',
                    files: [file],
                });
            } else {
                // Fallback: just copy the link
                await navigator.clipboard.writeText(imageUrl);
                alert('📋 Your browser does not support image sharing. Link copied!');
            }
        } catch (error) {
            console.error('Error sharing image:', error);
            alert('❌ Failed to share image.');
        }
    };
    const dateDifference = (dateString) => {
        const now = dayjs();
        const pastDate = dayjs(dateString);
        const diff = now.diff(pastDate);
        const durationObj = dayjs.duration(diff);

        if (durationObj.years() > 0) {
            return `${durationObj.years()} year ago`;
        } else if (durationObj.months() > 0) {
            return `${durationObj.months()} month ago`;
        } else if (durationObj.days() > 0) {
            return `${durationObj.days()} day ago`;
        } else if (durationObj.hours() > 0) {
            return `${durationObj.hours()} hour ago`;
        } else if (durationObj.minutes() > 0) {
            return `${durationObj.minutes()} minute ago`;
        }
        else {
            return 'Just now';
        }
    };

    const displayDateFormatted = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }
    const switchRecordType = (type) => {
        switch (type) {
            case 'age_predictor':
                return 'Age Predictor';
            case 'change_hairstyle':
                return 'Change Hairstyle';
            case 'age_journey':
                return 'Age Journey';
            case 'baby_generation':
                return 'Baby Generation';
        }
    }

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
                            }}>
                                <img src={item.generator_img} alt={`Generated ${index}`} />
                                <div className="overlay-1">
                                    <button className="download-button-imgde-history-hover" onClick={(e) => {
                                        e.stopPropagation(); // Prevent opening the popup
                                        handleDownload(item.generator_img);
                                    }}>Download</button>
                                </div>
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
                                            <div>
                                                <img src={magic} alt="" />
                                            </div>
                                            <div>
                                                {/* <p>{selectedImage.record_type}</p> */}
                                                <p>{switchRecordType(selectedImage.record_type)}</p>
                                                <p className='caranttime'>{dateDifference(selectedImage.created_at)}</p>

                                            </div>

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
                                            <p>{selectedImage.use_credit.replace("-", "")}</p>
                                            <p>Use Credit</p>
                                        </div>

                                        <div className='time-date-container'>
                                            <img src={timeIcon} alt="" />
                                            <p>{displayDateFormatted(selectedImage.created_at)}</p>
                                        </div>
                                    </div>
                                    <div className='dowanload-share-button'>
                                        <button className='download-button-imgde-history' onClick={() => handleShare(selectedImage.generator_img)}>Share</button>
                                        <button className='download-button-imgde-history' onClick={() => handleDownload(selectedImage.generator_img)}>Download</button>
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
