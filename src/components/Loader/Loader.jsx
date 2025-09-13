import React from "react";
import "./loader.css"; 

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-wrapper">
        <div className="loader"></div>
        <span className="loader-letter">G</span>
        <span className="loader-letter">e</span>
        <span className="loader-letter">n</span>
        <span className="loader-letter">e</span>
        <span className="loader-letter">r</span>
        <span className="loader-letter">a</span>
        <span className="loader-letter">t</span>
        <span className="loader-letter">i</span>
        <span className="loader-letter">n</span>
        <span className="loader-letter">g</span>
      </div>
    </div>
  );
}
