import React, { Component, useEffect, useState } from 'react'
import { getImageHistoryAPI } from '../../services/imageBase'
import backArrow from "./Profile-image/backArrow.png";
import ProfileImage from "./Profile-image/Profile-icon.svg";
function ImageHistory() {
    const [imagedata, setImagedata] = useState([]);
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
    return (
        <>
            <div className='image-history-container'>
                <div className='image-card'>
                    {imagedata.images && imagedata.images.map((item, index) => (
                        <img key={index} src={item.generator_img} alt={`Generated ${index}`} />
                    ))}
                </div>
                {/* <div className='image-card'> */}
                    {/* <img src={backArrow} alt="" /> */}
                {/* </div> */}
                {/* <div className='image-card'>
                    <img src={ProfileImage} alt="" />
                </div>
                <div className='image-card'>
                    <img src={backArrow} alt="" />
                </div>
                <div className='image-card'>
                    <img src={ProfileImage} alt="" />
                </div>
                <div className='image-card'>
                    <img src={backArrow} alt="" />
                </div>
                <div className='image-card'>
                    <img src={ProfileImage} alt="" />
                </div>
                <div className='image-card'>
                    <img src={backArrow} alt="" />
                </div>
                <div className='image-card'>
                    <img src={ProfileImage} alt="" />
                </div>
                <div className='image-card'>
                    <img src={backArrow} alt="" />
                </div> */}

            </div>  
        </>
    )

}

export default ImageHistory
