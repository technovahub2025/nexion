import "./App.css";

const TESTIMONIALS = [
  {
    id: 1,
    stars: "★★★★★",
    text: "Overall we are very happy with the reliability and general service. We use this to communicate with our customers and automate their requests over WhatsApp.",
    highlight: "reliability",
    name: "Dan M.",
    company: "TechSolutions",
    image: "/testimonials/person-1.jpg",
  },
  {
    id: 2,
    stars: "★★★★☆",
    text: "Good and affordable alternative to official WhatsApp Business API. Uptime is good compared to similar services.",
    highlight: "affordable alternative to official WhatsApp Business API",
    name: "Ranjid E.",
    company: "GlobalConnect",
    image: "/testimonials/person-2.jpg",
  },
  {
    id: 3,
    stars: "★★★★★",
    text: "Great tool to send marketing campaigns over WhatsApp, would recommend for anyone in need of a reliable WhatsApp API.",
    highlight: "Great tool to send marketing campaigns over WhatsApp",
    name: "Sarah W.",
    company: "DevSync",
    image: "/testimonials/person-3.jpg",
  },
  {
    id: 4,
    stars: "★★★★☆",
    text: "The integration was seamless and the documentation is top-notch. Our team was able to implement WhatsApp messaging features in record time.",
    highlight: "integration was seamless",
    name: "Leon T.",
    company: "BrightApps",
    image: "/testimonials/person-4.jpg",
  },
  {
    id: 5,
    stars: "★★★★★",
    text: "Customer support is exceptional. Any issues we encountered were resolved quickly, and the team is always responsive.",
    highlight: "Customer support is exceptional",
    name: "Aisha K.",
    company: "SnapTech",
    image: "/testimonials/person-5.jpg",
  },
  {
    id: 6,
    stars: "★★★★★",
    text: "The analytics dashboard provides valuable insights into our messaging campaigns. It's been crucial for optimizing our communication strategy.",
    highlight: "analytics dashboard",
    name: "James L.",
    company: "AppVibe",
    image: "/testimonials/person-6.jpg",
  },
];

const renderTextWithHighlight = (text, highlight) => {
  const parts = text.split(highlight);
  if (parts.length < 2) return text;

  return (
    <>
      {parts[0]}
      <span>{highlight}</span>
      {parts.slice(1).join(highlight)}
    </>
  );
};

export const Testimonials = () => {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <div className="top-stars">★★★★★</div>
          <h2>
            See why our customers are <span>excited</span>
          </h2>
          <p>
            Trusted by 5,000+ developers worldwide to elevate their apps with
            WhatsApp integration.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((item) => (
            <article className="testimonial-card" key={item.id}>
              <div className="testimonial-stars">{item.stars}</div>
              <p className="testimonial-copy">
                {renderTextWithHighlight(item.text, item.highlight)}
              </p>

              <div className="testimonial-author">
                <img src={item.image} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.company}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="testimonials-actions">
          <a href="#contact" className="hero-cta-primary">
            Share Your Experience
          </a>
        </div>
      </div>
    </section>
  );
};
