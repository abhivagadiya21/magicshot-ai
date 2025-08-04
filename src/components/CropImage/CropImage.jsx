import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import rotateicon from "../../pages/BabyGenrator_page/babyG-img/rotate-left.svg";
import reaseticon from "../../pages/BabyGenrator_page/babyG-img/reaset.svg";
import rotateicon2 from "../../pages/BabyGenrator_page/babyG-img/rotate-right.svg";

function CropImage({ imageSrc, onCropDone }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleRotateLeft = () => setRotation((prev) => prev - 90);
  const handleRotateRight = () => setRotation((prev) => prev + 90);
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
        />
        <div className="crop-buttons">
          <div className="ratio-select">
            <label htmlFor="aspect-select">Aspect Ratio:</label>
            <select
              id="aspect-select"
              onChange={(e) =>
                setAspect(e.target.value === "free" ? null : parseFloat(e.target.value))
              }
            >
              <option value={1}>1:1</option>
              <option value={4 / 3}>4:3</option>
              <option value={16 / 9}>16:9</option>
            </select>
          </div>
          <button className="left-rotesan" onClick={handleRotateLeft}><img className="Parent-Icon" src={rotateicon} alt="Rotate Left" /></button>
          <button className="left-rotesan" onClick={handleResetRotation}><img className="Parent-Icon" src={reaseticon} alt="Reset" /></button>
          <button className="left-rotesan" onClick={handleRotateRight}><img className="Parent-Icon" src={rotateicon2} alt="Rotate Right" /></button>
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