import "./App.css";

export const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* LEFT */}
        <div className="contact-left">
          <h2>Talk to the Nexion Team</h2>
          <p>
            Want to explore how Nexion can automate customer interactions?
            Our team is ready to guide you through the right solution.
          </p>

          <div className="contact-info">
            <div>
              <span>Email</span>
              <p>support@nexion.com</p>
            </div>

            <div>
              <span>Phone</span>
              <p>+91 9XXXXXXXXX</p>
            </div>
          </div>

          <div className="contact-actions">
            <span>Website</span>
            <a
              href="https://www.technovahub.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn primary"
            >
              🌐 TechnovaHub
            </a>
            
            <span>Address</span>
            <a
              href="https://maps.google.com/?q=Technova Hub"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn secondary"
            >
              📍 Location       
            </a>
          </div>

        </div>

        {/* RIGHT */}
        <form className="contact-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Work Email" required />
          <input type="text" placeholder="Company Name" />
          <input type="tel" placeholder="Phone Number" />

          <textarea
            placeholder="Tell us about your requirement"
            rows="4"
          ></textarea>

          <button type="submit">Request a Demo</button>
        </form>
      </div>
    </section>
  );
};
