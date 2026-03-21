import React from "react";
import "./App.css";
import { openPricingSection } from "./pricingNavigation";

export const Hero = () => {
  const openFeaturesSection = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (window.location.hash !== "#features") {
      window.location.hash = "#features";
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-badge">Official WhatsApp API + AI Automation</div>
        <p className="hero-note">
          24/7 AI-powered automation available to engage, respond, and support
          your customers instantly.
        </p>

        <h1 className="hero-title">
          Grow revenue faster with <span>WhatsApp-first</span> customer engagement
        </h1>

        <p className="hero-subtitle">
          Run broadcasts, automate replies, qualify leads, and convert customers using an
          AI-powered WhatsApp marketing platform built on official APIs.
        </p>

        <div className="hero-actions">
          <button className="hero-cta-primary" type="button" onClick={openPricingSection}>
            Get a Demo
          </button>
          <button className="hero-cta-secondary" type="button" onClick={openFeaturesSection}>
            See Features
          </button>
        </div>
      </div>
    </section>
  );
};
