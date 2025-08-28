import React, { useState, useEffect, useRef } from 'react';
import './heding.css';
import Logo from "../heding/hedingimg/logo.png";
import Plan from "../heding/hedingimg/plan.svg";
import { useNavigate, useLocation } from 'react-router-dom';
import { useCredits } from '../global_com/context';
import square from "../heding/hedingimg/squarelogo.png";

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

    // ✅ Run fetchUser only if localStorage has user
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            fetchUser();
        }
    }, [location.pathname]);

    // ✅ Proper logout
   const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    dispatch({ type: "SET_USER", payload: null });
    dispatch({ type: "SET_CREDITS", payload: 0 });

    window.dispatchEvent(new Event("userUpdated"));

    // 🚨 small delay so context reset first, then navigate
    setTimeout(() => {
        navigate("/", { replace: true });
    }, 50);
};


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
                            <img src={square} alt="Logo" className="square" />

                            <div className={`navbar-content`}>
                                {location.pathname !== "/profile" && (
                                    <div className="dropdown" ref={dropdownRef}>
                                        <button
                                            className="dropdown-button"
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                        >
                                            {selected}
                                            <span className="arrow">
                                                <svg aria-hidden="true" fill="none" focusable="false" height="1em"
                                                    role="presentation" stroke="currentColor" strokeLinecap="round"
                                                    strokeLinejoin="round" strokeWidth="1.5"
                                                    viewBox="0 0 24 24" width="1em"
                                                    className="absolute end-3 w-4 h-4 transition-transform duration-150 ease motion-reduce:transition-none data-[open=true]:rotate-180">
                                                    <path d="m6 9 6 6 6-6"></path>
                                                </svg>
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
                                                                    <img
                                                                        width="15"
                                                                        height="15"
                                                                        src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/FFFFFF/external-select-checkmark-symbol-to-choose-true-answer-basic-regular-tal-revivo.png"
                                                                        alt="check"
                                                                    />
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
                            <button className="upgrade-btn">
                                <img src={Plan} alt="Upgrade" />
                                <span>Upgrade | <span className="highlight-text">50% Off</span></span>
                            </button>

                            <div className="auth-buttons">
                                {user ? (
                                    <div className='profile-credit-container'>
                                        <div className='credit-show-con'>
                                            Credits: {credits}
                                        </div>

                                        <div className="user-info">
                                            <span className="profile-name">{user.name}</span>
                                            <span className="credits" onClick={handleLogout}>
                                                <img src={Plan} alt="logout" />
                                            </span>
                                        </div>
                                        <button className="profile-btn" onClick={() => navigate('/profile')}>
                                            <img width="30" height="30"
                                                src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/user.png"
                                                alt="user" />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            className="signin-btn"
                                            onClick={() =>
                                                navigate(`/auth/signin?ref=${encodeURIComponent(currentUrl)}`)
                                            }
                                        >
                                            Sign In
                                        </button>
                                        <button
                                            className="signup-btn"
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
