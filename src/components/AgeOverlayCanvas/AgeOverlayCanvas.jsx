import React, { useEffect, useRef } from "react";
import gradientImg from "../Popup/GetImagePopup/GetImagePopupImage/Black-Fade-PNG-Isolated-HD.png";

const AgeOverlayCanvas = ({ imageSrc, metadata }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imageSrc || !metadata?.upload_img) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const bottomImg = new Image();
    const gradientOverlay = new Image();

    bottomImg.src = imageSrc;
    gradientOverlay.src = gradientImg;

    const drawCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      const imgAspect = bottomImg.width / bottomImg.height;
      const canvasAspect = canvas.width / canvas.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgAspect > canvasAspect) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgAspect;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgAspect;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      // Clear and draw base image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bottomImg, offsetX, offsetY, drawWidth, drawHeight);

      // Draw gradient overlay
      ctx.drawImage(gradientOverlay, offsetX, offsetY, drawWidth, drawHeight);

      // ✅ Draw text on top of everything
      if (metadata.predict_age) {
        ctx.font = `bold 78px Poppins`;
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          `${metadata.predict_age}`,
          canvas.clientWidth / 2,
          canvas.clientHeight / 1.2
        );
      }
    };

    // Wait for both images to load before drawing
    let imagesLoaded = 0;
    const onImageLoad = () => {
      imagesLoaded += 1;
      if (imagesLoaded === 2) drawCanvas();
    };

    bottomImg.onload = onImageLoad;
    gradientOverlay.onload = onImageLoad;
  }, [imageSrc, metadata]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "16px",
        padding: "10px",
      }}
    />
  );
};

export default AgeOverlayCanvas;


