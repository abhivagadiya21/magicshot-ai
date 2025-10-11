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
            <div className='image-history-main-container'>
                <div className='image-history-container'>

                    {imagedata.images && imagedata.images.map((item, index) => {
                        // ✅ Parse metadata safely (string → object)
                        // const metadata =
                        //     typeof item.metadata === "string"
                        //         ? JSON.parse(item.metadata)
                        //         : item.metadata;

                        // ✅ Log metadata in console for each image
                        // console.log(`Metadata for image ${index}:`, metadata.upload_img);

                        return (
                            <div className='image-card' key={index}>
                                <img src={item.generator_img} alt={`Generated ${index}`} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )

}


export default ImageHistory
