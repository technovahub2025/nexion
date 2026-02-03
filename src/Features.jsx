import React from "react";
import "./App.css";

export const Features = () => {
  return (
    <section className="features-section" id="features">
      <div className="features-container">

        <h2 className="features-title">
          Powerful Communication Automation for Businesses
        </h2>
        <p className="features-subtitle">
          Automate WhatsApp messages and handle thousands of inbound & outbound calls using intelligent voice workflows — no human agents required.
        </p>
        

        <div className="features-grid">

          <div className="feature-card">
            <div className="feature-icon">📢</div>
            <h4>WhatsApp Broadcast</h4>
            <p>
              Send bulk promotional or transactional WhatsApp messages instantly with delivery and read tracking.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚙️</div>
            <h4>Smart Automation</h4>
            <p>
              Trigger automated replies, workflows, and follow-ups based on user actions or schedules.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h4>Template Messaging</h4>
            <p>
              Manage approved WhatsApp templates for campaigns, alerts, and notifications.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📞</div>
            <h4>AI Voice Broadcast</h4>
            <p>
              Launch large-scale voice call campaigns with one click. Your AI voice delivers messages to thousands of users automatically.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎧</div>
            <h4>Inbound Call Automation (IVR + AI)</h4>
            <p>
              Automatically answer incoming calls, guide callers through IVR menus, collect inputs, and respond intelligently without agents.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h4>Smart Call Routing & Analytics</h4>
            <p>
              Route calls based on rules, time, priority, or caller input and track call performance with real-time analytics.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
