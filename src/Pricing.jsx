import "./App.css";

export const Pricing = () => {
  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-container">
        <h2 className="pricing-title">Commercial Plans</h2>
        <p className="pricing-subtitle">
          Choose a plan that fits your business. Scale anytime with Nexion.
        </p>

        <div className="pricing-grid">
          {/* STARTER */}
          <div className="pricing-card">
            <h3>Starter</h3>
            <p className="price">
              ₹2,999<span>/month</span>
            </p>

            <ul>
              <li>Inbound call automation</li>
              <li>Basic IVR menus</li>
              <li>Up to 1,000 voice minutes</li>
              <li>Email support</li>
            </ul>

            <button className="btn-outline">Get Started</button>
          </div>

          {/* GROWTH */}
          <div className="pricing-card featured">
            <span className="badge">Most Popular</span>
            <h3>Growth</h3>
            <p className="price">
              ₹7,999<span>/month</span>
            </p>

            <ul>
              <li>Inbound & outbound automation</li>
              <li>AI voice bot conversations</li>
              <li>Voice broadcasts</li>
              <li>Advanced analytics</li>
              <li>Up to 5,000 voice minutes</li>
            </ul>

            <button className="btn-primary">Start Free Trial</button>
          </div>

          {/* ENTERPRISE */}
          <div className="pricing-card">
            <h3>Enterprise</h3>
            <p className="price custom">Custom</p>

            <ul>
              <li>Unlimited call automation</li>
              <li>Custom AI voice & flows</li>
              <li>Dedicated infrastructure</li>
              <li>CRM & API integrations</li>
              <li>Priority support & SLA</li>
            </ul>

            <button className="btn-outline">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  );
};
