import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

function CropImage({ imageSrc, onCropDone }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleRotateLeft = () =>
    setRotation((prev) => (prev - 90 + 360) % 360);

  const handleRotateRight = () =>
    setRotation((prev) => (prev + 90) % 360);
  
  const handleResetRotation = () => setRotation(0);

  const handleAspectChange = (e) => {
    const value = e.target.value;
    setAspect(value === "free" ? null : parseFloat(value));
  };

  const handleCropDone = useCallback(async () => {
    if (!croppedAreaPixels) return;
    onCropDone(croppedAreaPixels, rotation);
  }, [croppedAreaPixels, rotation, onCropDone]);

  return (
    <>
    <div className="cropper-wrapper">
      <div className="cropper-container">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropComplete={(_, croppedPixels) => setCroppedAreaPixels(croppedPixels)}
          style={{
            containerStyle: {
              backgroundColor: "#3a4752", // ✅ custom background
            },
            mediaStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
        
      </div>
      <div className="crop-buttons">
          <div className="ratio-select">
            <label htmlFor="aspect-select"></label>
            <select
              id="aspect-select"
              className="aspect-select"
              onChange={(e) =>
                setAspect(e.target.value === "free" ? null : parseFloat(e.target.value))

              }
            >
              <option value={1}>1:1</option>
              <option value={4 / 3}>4:3</option>
              <option value={16 / 9}>16:9</option>
            </select>
          </div>
          <button className="left-rotesan" onClick={handleRotateLeft}><img width="18" height="18" src="https://img.icons8.com/ios-filled/50/FFFFFF/rotate-left.png" alt="rotate-left" /></button>
          <button className="left-rotesan" onClick={handleResetRotation}><img width="18" height="18" src="https://img.icons8.com/ios-filled/50/FFFFFF/refresh--v1.png" alt="refresh--v1" /></button>
          <button className="left-rotesan" onClick={handleRotateRight}><img width="18" height="18" src="https://img.icons8.com/ios-filled/50/FFFFFF/rotate-right.png" alt="rotate-right" /></button>
        </div>
      </div>
      <div className="action-buttons">
        <button className="select-img-button" onClick={handleCropDone}>
          Select Image
        </button>
      </div>
    </>
  );
}

export default CropImage;