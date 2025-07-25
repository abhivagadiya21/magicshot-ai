import React, { useState } from 'react';
import './heding.css';
import Logo from "../heding/hedingimg/logo.png";
import Plan from "../heding/hedingimg/plan.svg";

const options = [
    "baby-generator",
    "age-predictor",
    "age-journey",
    "change-haircut",

];

export default function Heading() {
    const [selected, setSelected] = useState("Change Hair Style");

    return (
        <nav className="navbar navbar-expand-lg custom-navbar nevbar">
            <div className="container-fluid">
                <img src={Logo} alt="Logo" className='logo-img' />
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="dropdown me-3">
                        <button
                            className="btn btn-dark dropdown-toggle dropdown-button "
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {selected}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton">

                            {options.map((option) => (
                                <li key={option}>
                                    <button
                                        className={`dropdown-item d-flex justify-content-between align-items-center ${selected === option ? 'active' : ''}`}
                                        onClick={() => setSelected(option)}
                                    >
                                        {option}
                                        {selected === option && <span className="ms-2">✔</span>}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>



               <div className="d-flex align-items-center justify-content-between gap-3">
              <button className="btn upgrade-btn d-flex align-items-center Upgrade-plan">
        <samp><img src={Plan} alt="" /></samp>
      <span>Upgrade | <span className="text-divayr">50% Off</span></span>
    </button>

    <div className="auth-buttons d-flex align-items-center gap-3">
      <button className="btn text-white bg-transparent border-0">Sign In</button>
      <button className="btn btn-signup">Sign Up</button>
    </div>
               </div>
            </div>
        </nav>
    );
}
