import React from "react";
import checkmarkIcon from "../../components/Heading/heading-img/checkmark.svg";

function GenderOption({ gender, selectedGender, handleSelect, icon }) {
    const isSelected = selectedGender === gender;
    return (
        <button
            type="button"
            className={`gender-option ${isSelected ? "selected" : ""}`}
            onClick={() => handleSelect(gender)}>
            <div className="gender-avatar-container">
                <img src={icon} alt={`${gender} Avatar`} className="gender-avatar-img" />
                <span className="avatar-text">{gender.charAt(0).toUpperCase() + gender.slice(1)}</span>
            </div>
            <div className={`button-container ${isSelected ? "checked" : ""}`}>
                {isSelected && (
                    <span className="checkmark">
                        <img width="24" height="24" src={checkmarkIcon} alt="checkmark" />
                    </span>
                )}
            </div>
        </button>
    );
}

export default GenderOption;