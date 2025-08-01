import { useState } from "react";
import Cropper from "react-easy-crop";

function CropImage({ imageSrc, onCropDone, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  return (
    <div className="cropper-container">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={(_, croppedPixels) =>
          setCroppedAreaPixels(croppedPixels)
        }
      />

      <div className="crop-buttons">
        <button onClick={() => onCropDone(croppedAreaPixels)}>Select Image</button>
      </div>
    </div>
  );
}

export default CropImage;
