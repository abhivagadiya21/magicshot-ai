import React from "react";
import CropImage from "../../components/CropImage/CropImage.jsx";
import profileIcon1 from "../../pages/BabyGenerator/baby-img/profile-1.svg";
import uploadIcon from "../../pages/BabyGenerator/baby-img/upload.svg";
import closeIcon from "../../components/Heading/heading-img/close.svg";

function UploadSection({ label, uploadHook, inputId }) {
    return (
        <div className="uplod-image-button-container">
            <label className="uplod-image-button" htmlFor={inputId}>
                {uploadHook.croppedImage ? (
                    <img src={uploadHook.croppedImage} alt={label} className="preview-img" />
                ) : (
                    <>
                        <div className="profile-icon-container">
                            <img src={profileIcon1} alt={`${label} Icon`} />
                        </div>
                        <p>{label}</p>
                    </>
                )}
            </label>

            <div className="image-upload-button-container">
                <input
                    type="file"
                    accept="image/*"
                    id={inputId}
                    className="hidden"
                    onChange={uploadHook.handleFileUpload}
                    disabled={!!uploadHook.croppedImage}
                />

                {!uploadHook.croppedImage ? (
                    <label htmlFor={inputId} className="uplod-button">
                        <img className="upload-image-icon" src={uploadIcon} alt="Upload Icon" />
                        <p>Upload</p>
                    </label>
                ) : (
                    <button
                        type="button"
                        className="uplod-button"
                        onClick={() => {
                            uploadHook.resetImage();
                            const input = document.getElementById(inputId);
                            if (input) input.value = "";
                        }}>
                        <img width="10" height="10" src={closeIcon} alt="delete" />
                        Cancel
                    </button>
                )}
            </div>

            {uploadHook.showCropper && (
                <div className="overlay">
                    <div className="crop-popup">
                        <button className="close-popup-button" onClick={() => uploadHook.setShowCropper(false)}>
                            <img width="20" height="20" src={closeIcon} alt="close" />
                        </button>
                        <div className="cropper-header">
                            <p>Crop Image</p>
                        </div>
                        <CropImage
                            imageSrc={uploadHook.selectedFile}
                            onCropDone={uploadHook.handleCropComplete}
                            onCancel={() => uploadHook.setShowCropper(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default UploadSection;