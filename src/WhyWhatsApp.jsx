import React from "react";
import "./App.css";

export const WhyWhatsApp = () => {
  return (
    <section className="whywa-section " id="whywhatsapp">
      <div className="whywa-glow-right"></div>
      <div className="whywa-container">
        <h2 className="whywa-title">Why WhatsApp?</h2>
        <p className="whywa-subtitle">
          Customers respond faster on WhatsApp. Use Nexion to broadcast updates, automate
          conversations, and drive conversions on the channel people open every day.
        </p>

        <div className="whywa-grid">
          <div className="whywa-card">
            <div className="whywa-value">98%</div>
            <div className="whywa-label">Open Rate</div>
          </div>

          <div className="whywa-card">
            <div className="whywa-value">45–60%</div>
            <div className="whywa-label">Click Rate</div>
          </div>

          <div className="whywa-card">
            <div className="whywa-value">2.7B+</div>
            <div className="whywa-label">Active Users</div>
          </div>

          <div className="whywa-card">
            <div className="whywa-value">70%</div>
            <div className="whywa-label">Engagement</div>
          </div>
        </div>
      </div>
    </section>
  );
};
