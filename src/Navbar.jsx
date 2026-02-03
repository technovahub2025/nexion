import React, { useState } from "react";
import "./App.css";
import logo from "./assets/logo(2).jpeg";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LEFT: Logo */}
        <div className="navbar-left">
          <img src={logo} alt="Nexio Logo" className="logo-icon" />
          <span className="logo-text">
            NEX<span>ION</span>
          </span>
        </div>

        {/* RIGHT: Navigation + Hamburger */}
        <div className="navbar-right">
          <nav className={`navbar-links ${menuOpen ? "active" : ""}`}>
            <a href="#features">Features</a>
            <a href="#products">Products</a>
            <a href="#usecases">Use Cases</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>

            <button className="btn-login">Login</button>
            <button className="btn-register">Register Now</button>
          </nav>

          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

      </div>
    </header>
    
  );
};

