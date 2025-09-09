import React from "react";
import "./Loader.css"; // 👈 alag CSS rakho

export default function Loader({ text = "Generating" }) {
    return (
        <div className="loader-overlay">
            <div className="loader-wrapper">
                <div className="loader"></div>
                <span class="loader-letter">G</span>
                <span class="loader-letter">e</span>
                <span class="loader-letter">n</span>
                <span class="loader-letter">e</span>
                <span class="loader-letter">r</span>
                <span class="loader-letter">a</span>
                <span class="loader-letter">t</span>
                <span class="loader-letter">i</span>
                <span class="loader-letter">n</span>
                <span class="loader-letter">g</span>
            </div>
        </div>
    );
}
