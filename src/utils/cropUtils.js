
export default function getCroppedImg(imageSrc, crop, rotation = 0) {
  return new Promise((resolve, reject) => {
    console.log("getCroppedImg called with:", crop, rotation);
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrc;

    image.onload = () => {
      // Main canvas for rotation & positioning
      const mainCanvas = document.createElement("canvas");
      const mainCtx = mainCanvas.getContext("2d");

      if (rotation == 90 || rotation == 270) {
        mainCanvas.width = image.height;
        mainCanvas.height = image.width;
      } else {
        mainCanvas.width = image.width;
        mainCanvas.height = image.height;
      }

      // const safeArea = Math.max(image.width, image.height) * 1;

      // Move pivot to center and rotate
      // mainCtx.translate(safeArea / 2, safeArea / 2);
      // mainCtx.rotate(rotation);
      mainCtx.translate(mainCanvas.width / 2, mainCanvas.height / 2);
      mainCtx.rotate((rotation * Math.PI) / 180);

      // mainCtx.translate(-safeArea / 2, -safeArea / 2);

      // Draw rotated image
      mainCtx.drawImage(
        image,
        -image.width / 2,
        -image.height / 2
      );


      // Cropping canvas
      const cropCanvas = document.createElement("canvas");
      const cropCtx = cropCanvas.getContext("2d");

      cropCanvas.width = crop.width;
      cropCanvas.height = crop.height;

      // Extract cropped image data from rotated canvas
      const imageData = mainCtx.getImageData(crop.x, crop.y, crop.width, crop.height);
      cropCtx.putImageData(imageData, 0, 0);

      // Export blob
      cropCanvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        resolve(URL.createObjectURL(blob));
      }, "image/jpeg");
    };

    image.onerror = (err) => reject(err);
  });
}
