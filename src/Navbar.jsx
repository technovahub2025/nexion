import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/logo(2).jpeg";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.body.classList.toggle("theme-dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <img src={logo} alt="Nexio Logo" className="logo-icon" />
          <span className="logo-text">
            NEX<span>ION</span>
          </span>
        </div>

        <nav className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <a href="#features">Features</a>
          <a href="#products">Products</a>
          <a href="#usecases">Use Cases</a>
          <a href="#stories">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="navbar-actions">
          <div className="navbar-auth">
            <button className="btn-login">Login</button>
            <button className="btn-register">Register Now</button>
          </div>

          <button
            className={`theme-switch ${isDark ? "dark" : "light"}`}
            onClick={() => setIsDark((prev) => !prev)}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            type="button"
          >
            <span className="switch-thumb">
              <span className="switch-icon"></span>
            </span>
          </button>

          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
};
