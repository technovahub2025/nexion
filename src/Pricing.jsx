import "./App.css";

export const Pricing = () => {
  const salesWhatsAppLink =
    "https://wa.me/918682057193?text=Hi%20Nexion%20team,%20I%20want%20to%20know%20more%20about%20the%20Enterprise%20plan.";
  const handleStartTrialClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-container">
        <h2 className="pricing-title">Commercial Plans</h2>
        <p className="pricing-subtitle">
          Choose a plan that fits your business. Scale anytime with Nexion.
        </p>

        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Starter</h3>
            <p className="price">
              INR 2,999<span>/month</span>
            </p>

            <ul>
              <li>Inbound call automation</li>
              <li>Basic IVR menus</li>
              <li>Up to 1,000 voice minutes</li>
              <li>Email support</li>
            </ul>

            <button className="btn-outline">Get Started</button>
          </div>

          <div className="pricing-card featured">
            <span className="badge">Most Popular</span>
            <h3>Growth</h3>
            <p className="price">
              INR 4,999<span>/month</span>
            </p>

            <ul>
              <li>Inbound and outbound automation</li>
              <li>AI voice bot conversations</li>
              <li>Voice broadcasts</li>
              <li>Advanced analytics</li>
              <li>Up to 5,000 voice minutes</li>
            </ul>

            <button type="button" className="btn-primary" onClick={handleStartTrialClick}>
              Start Free Trial
            </button>
          </div>

          <div className="pricing-card">
            <h3>Enterprise</h3>
            <p className="price custom">Custom</p>

            <ul>
              <li>Unlimited call automation</li>
              <li>Custom AI voice and flows</li>
              <li>Dedicated infrastructure</li>
              <li>CRM and API integrations</li>
              <li>Priority support and SLA</li>
            </ul>

            <button
              type="button"
              className="btn-outline"
              onClick={() => window.open(salesWhatsAppLink, "_blank", "noopener,noreferrer")}
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
