import React from "react";
import "./App.css";

export const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-badge">Official WhatsApp API + AI Automation</div>

        <h1 className="hero-title">
          Grow revenue faster with <span>WhatsApp-first</span> customer engagement
        </h1>

        <p className="hero-subtitle">
          Run broadcasts, automate replies, qualify leads, and convert customers using an
          AI-powered WhatsApp marketing platform built on official APIs.
        </p>

        <div className="hero-actions">
          <button className="hero-cta-primary">Get a Demo</button>
          <a className="hero-cta-secondary" href="#features">See Features</a>
        </div>
      </div>
    </section>
  );
};
