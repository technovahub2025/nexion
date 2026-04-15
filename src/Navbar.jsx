import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import logo from "./assets/logo(new).png";
import { openPricingSection } from "./pricingNavigation";

const getStoredToken = () => {
  const tokenKey = import.meta.env.VITE_TOKEN_KEY || "authToken";
  return (
    localStorage.getItem(tokenKey) ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem(tokenKey) ||
    sessionStorage.getItem("authToken") ||
    sessionStorage.getItem("token") ||
    ""
  );
};

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user") || sessionStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
};

export const Navbar = ({ isEmbedded = false, currentUser = null }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const resolvedUserName = useMemo(
    () => currentUser?.username || currentUser?.name || currentUser?.email || userName,
    [currentUser, userName]
  );

  useEffect(() => {
    document.body.classList.toggle("theme-dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const syncAuthState = () => {
      const token = getStoredToken();
      const user = getStoredUser();
      setIsLoggedIn(Boolean(token));
      setUserName(user?.username || user?.name || user?.email || "");
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
    };
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

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
          <a href="#features" onClick={handleNavClick}>Features</a>
          <a href="#products" onClick={handleNavClick}>Products</a>
          <a href="#usecases" onClick={handleNavClick}>Use Cases</a>
          <a href="#stories" onClick={handleNavClick}>Services</a>
          <a href="#pricing" onClick={handleNavClick}>Pricing</a>
          <a href="#contact" onClick={handleNavClick}>Contact</a>
        </nav>

        <div className="navbar-actions">
          {!isEmbedded && !isLoggedIn ? (
            <div className="navbar-auth">
              <button className="btn-login" type="button">Login</button>
              <button className="btn-register" type="button" onClick={openPricingSection}>Register Now</button>
            </div>
          ) : resolvedUserName ? (
            <div className="navbar-auth navbar-auth--logged-in">
              <span className="navbar-user-pill">{resolvedUserName}</span>
            </div>
          ) : null}

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

