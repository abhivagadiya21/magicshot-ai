import React, { useState } from 'react';
import './heding.css';
import Logo from "../heding/hedingimg/logo.png";

const options = [
  "Kissing Booth",
  "Avatar Generator",
  "Professional Headshot",
  "Baby Generator",
  "Change Hair Style",
  "AI Video Effects"
];

export default function Heading() {
  const [selected, setSelected] = useState("Change Hair Style");

  return (
    <nav className="navbar navbar-expand-lg custom-navbar nevbar">
      <div className="container-fluid">
        <img src={Logo} alt="Logo" className='logo-img' />

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

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="dropdown me-3">
            <button
              className="btn btn-dark dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selected}
            </button>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton">
              <li>
                <h6 className="dropdown-header">Photo Generator</h6>
              </li>
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

          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
