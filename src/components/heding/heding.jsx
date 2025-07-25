import React, { useState, useEffect, useRef } from 'react';
import './heding.css';
import Logo from "../heding/hedingimg/logo.png";
import Plan from "../heding/hedingimg/plan.svg";
import { useNavigate } from 'react-router-dom';

const options = [
    { label: 'baby-generator', path: '/' },
    { label: 'age-predictor', path: '/age-predictor' },
    { label: 'age-journey', path: '/age-journey' },
    { label: 'change-haircut', path: '/change-haircut' },
];

export default function Heading() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState("change-haircut");
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

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
                                    // Close icon
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="#fff"
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                ) : (
                                    // Hamburger icon
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                        viewBox="0 0 24 24" fill="none" stroke="#fff"
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="3" y1="6" x2="21" y2="6" />
                                        <line x1="3" y1="12" x2="21" y2="12" />
                                        <line x1="3" y1="18" x2="21" y2="18" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <img src={Logo} alt="Logo" className="logo-img" />

                        <div className={`navbar-content`}>
                            <div className="dropdown" ref={dropdownRef}>
                                <button
                                    className="dropdown-button"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    {selected}
                                    <span className="arrow">&#x25BC;</span>
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
                                                    {selected === label && <span className="check">✔</span>}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="navbar-right">
                        <button className="upgrade-btn">
                            <img src={Plan} alt="Upgrade" />
                            <span>Upgrade | <span className="highlight-text">50% Off</span></span>
                        </button>

                        <div className="auth-buttons">
                            <button className="signin-btn">Sign In</button>
                            <button className="signup-btn">Sign Up</button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile menu below navbar */}
            <div className={`content ${menuOpen ? "show" : ""}`}>
                <div className="content-inner">
                    {options.map((opt) => (
                        <div
                            className="baby-text-container"
                            key={opt.path}
                            onClick={() => navigate(opt.path)}
                        >
                            <p className='baby-text'>{opt.label}</p>
                            <span>
                                <svg aria-hidden="true" fill="none" stroke="#fff"
                                    focusable="false" height="1em" role="presentation"
                                    viewBox="0 0 24 24" width="1em"
                                    className="text-default-400 rotate-180"
                                >
                                    <path d="M15.5 19l-7-7 7-7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </span>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}
