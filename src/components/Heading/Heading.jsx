import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCredits } from "../GlobalCom/Context.jsx";

import Logo from "./heading-img/logo.png";
import Plan from "./heading-img/plan.svg";
import square from "./heading-img/squarelogo.png";
import closeIcon from "./heading-img/close.svg";
import menuIcon from "./heading-img/menu.svg";
import dropdownIcon from "./heading-img/dropdown.svg";
import checkmarkIcon from "./heading-img/checkmark.svg";
import userIcon from "./heading-img/user.svg";
import moblienavIcon from "./heading-img/moblienavarrow.svg";

const options = [
    { label: 'Baby Generator', path: '/' },
    { label: 'Age Predictor', path: '/age-predictor' },
    { label: 'Age Journey', path: '/age-journey' },
    { label: 'Change Haircut', path: '/change-haircut' },
];

export default function Heading() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();
    const currentUrl = location.pathname + location.search;

    const { state, dispatch, fetchUser } = useCredits();
    const { user, credits } = state;

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            fetchUser();
        }
    }, [location.pathname]);


    useEffect(() => {
        const match = options.find(opt => opt.path === location.pathname);
        if (match) {
            setSelected(match.label);
        }
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className='navbar-main-container'>
                <nav className="custom-navbar">
                    <div className="navbar-container">
                        <div className="navbar-left">
                            <div className="navbar-hamburger-container">
                                <button
                                    className="hamburger"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    aria-label="Toggle menu"
                                >
                                    {menuOpen ? (
                                        <img src={closeIcon} alt="Close" />
                                    ) : (
                                        <img src={menuIcon} alt="Menu" />
                                    )}
                                </button>
                            </div>

                            <img src={Logo} alt="Logo" className="logo-img" />
                            <img src={square} alt="Logo" className="square" />

                            <div className={`navbar-content`}>
                                {!["/profile/personal-info", "/profile/credits-history"].includes(location.pathname) && (
                                    <div className="dropdown" ref={dropdownRef}>
                                        <button
                                            className="dropdown-button"
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                        >
                                            {selected}
                                            <span className="arrow">
                                                <img height="20px" width="20px" src={dropdownIcon} alt="" />
                                            </span>
                                        </button>
                                        {dropdownOpen && (
                                            <ul className="dropdown-menu">
                                                {options.map(({ label, path }) => (
                                                    <li key={label}>
                                                        <button
                                                            className={`dropdown-item ${selected === label ? 'active' : ''}`}
                                                            onClick={() => {
                                                                setSelected(label);
                                                                setDropdownOpen(false);
                                                                navigate(path);
                                                            }}
                                                        >
                                                            {label}
                                                            {selected === label && (
                                                                <span className="check">
                                                                    <img width="15" height="15" src={checkmarkIcon} alt="check" />
                                                                </span>
                                                            )}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>

                        </div>

                        <div className="navbar-right">
                            <button className="upgrade-button">
                                <img src={Plan} alt="Upgrade" />
                                <span>Upgrade | <span className="highlight-text">50% Off</span></span>
                            </button>

                            <div className="auth-buttons">
                                {user ? (
                                    <div className='profile-credit-container'>
                                        <div className='credit-show-container'>
                                            Credits: {credits}
                                        </div>

                                        <button className="profile-button" onClick={() => navigate(`/profile/personal-info`)}>
                                            <img width="30" height="30" src={userIcon} alt="user" />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            className="signin-button"
                                            onClick={() =>
                                                navigate(`/auth/signin?ref=${encodeURIComponent(currentUrl)}`)
                                            }
                                        >
                                            Sign In
                                        </button>
                                        <button
                                            className="signup-button"
                                            onClick={() =>
                                                navigate(`/auth/signup?ref=${encodeURIComponent(currentUrl)}`)
                                            }
                                        >
                                            Sign Up
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <div className={`content ${menuOpen ? "show" : ""}`}>
                <div className="mobile-nav">
                    {options.map((opt) => (
                        <div
                            className="mobile-nav-option"
                            key={opt.path}
                            onClick={() => {
                                navigate(opt.path);
                                setMenuOpen(false);
                            }}
                        >
                            <p className="mobile-nav-text">{opt.label}</p>
                            <span>
                                <img height="20px" width="20px" src={moblienavIcon} alt="" />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

}
