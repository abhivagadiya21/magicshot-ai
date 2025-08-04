import { useState } from "react";
import getCroppedImg from "../utils/cropUtils";

function useUploadImg() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }

    event.target.value = "";
  };

  const handleCropComplete = async (croppedAreaPixels, rotation = 0) => {
    try {
      const croppedImg = await getCroppedImg(
        selectedFile,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImg);
      setShowCropper(false);
    } catch (error) {
      console.error("Crop failed:", error);
    }
  };

  const resetImage = () => {
    setSelectedFile(null);
    setCroppedImage(null);
    setShowCropper(false);
  };

  return {
    selectedFile,
    croppedImage,
    showCropper,
    setShowCropper,
    handleFileUpload,
    handleCropComplete,
    resetImage,
  };
}

export default useUploadImg;
