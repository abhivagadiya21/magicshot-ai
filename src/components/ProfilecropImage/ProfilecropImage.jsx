import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

import Rotateleft from "../CropImage/CropImageSvg/rotate-left.svg";
import Refresh from "../CropImage/CropImageSvg/refresh.svg";
import Rotateright from "../CropImage/CropImageSvg/rotate-right.svg";

function ProfileCropImage({ imageSrc, onCropDone, onSelectIMG }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Rotate Left
  const handleRotateLeft = () =>
    setRotation((prev) => (prev - 90 + 360) % 360);

  // Rotate Right
  const handleRotateRight = () =>
    setRotation((prev) => (prev + 90) % 360);

  // Reset Rotation
  const handleResetRotation = () => setRotation(0);

  // Handle Crop Done
  const handleCropDone = useCallback(async () => {
    if (!croppedAreaPixels) return null;
    const croppedImage = await onCropDone(croppedAreaPixels, rotation);
    return croppedImage; // ✅ return cropped image
  }, [croppedAreaPixels, rotation, onCropDone]);

  return (
    <>
      <div className="cropper-wrapper">
        <div className="profile-cropper-round">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropComplete={(_, croppedPixels) =>
              setCroppedAreaPixels(croppedPixels)
            }
            style={{
              containerStyle: {
                backgroundColor: "#3a4752",
              },
              mediaStyle: {
                backgroundColor: "transparent",
              },
            }}
          />
        </div>

        <div className="crop-buttons">
          <button className="left-rotation" onClick={handleRotateLeft}>
            <img width="18" height="18" src={Rotateleft} alt="rotate-left" />
          </button>

          <button className="left-rotation" onClick={handleResetRotation}>
            <img width="18" height="18" src={Refresh} alt="reset" />
          </button>

          <button className="left-rotation" onClick={handleRotateRight}>
            <img width="18" height="18" src={Rotateright} alt="rotate-right" />
          </button>
        </div>
      </div>

      <div className="action-buttons">
        <button className="select-image-button" onClick={async () => {
          const croppedImage = await handleCropDone(); // get cropped image
          console.log("Cropped Image:", croppedImage);
          if (!croppedImage) return;
          onSelectIMG(croppedImage); // send cropped image to parent
        }}>
          Select Image
        </button>
      </div>
    </>
  );
}

export default ProfileCropImage;
