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
  };

  const handleCropComplete = async (croppedAreaPixels) => {
    try {
      const croppedImg = await getCroppedImg(selectedFile, croppedAreaPixels);
      setCroppedImage(croppedImg);
      setShowCropper(false);
    } catch (error) {
      console.error("Crop failed:", error);
    }
  };

  return {
    selectedFile,
    croppedImage,
    showCropper,
    setShowCropper,
    handleFileUpload,
    handleCropComplete,
  };
}

export default useUploadImg;
