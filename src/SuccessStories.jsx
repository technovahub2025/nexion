import "./App.css";
import redTaxiPreview from "./assets/stories/redtaxi.png";
import trackPulsePreview from "./assets/stories/trackpulse.png";
import midasPreview from "./assets/stories/midas.png";

const SUCCESS_SITES = [
  {
    id: "red-taxi",
    name: "Red Taxi",
    url: "https://www.redtaxi.co.in/",
    image: redTaxiPreview,
    category: "Mobility - Platform Growth",
    service: "Website & Performance Marketing",
    metricA: "+72%",
    metricALabel: "Booking Leads",
    metricB: "+140%",
    metricBLabel: "Visibility Growth",
  },
  {
    id: "trackpulse",
    name: "TrackPulse",
    url: "https://tracking-app-landing-page-self.vercel.app/",
    image: trackPulsePreview,
    category: "SaaS - Product Launch",
    service: "UI/UX, Website and SEO",
    metricA: "+310%",
    metricALabel: "Conversion Rate",
    metricB: "98%",
    metricBLabel: "Feature Adoption Rate",
  },
  {
    id: "midas",
    name: "Midas Interiors and Traders",
    url: "https://www.midasinteriorsandtraders.com/",
    image: midasPreview,
    category: "Interiors - Local Business",
    service: "Brand Site + Organic Strategy",
    metricA: "+84%",
    metricALabel: "Organic Traffic",
    metricB: "+120%",
    metricBLabel: "Keyword Growth",
  },
];

export const SuccessStories = () => {
  return (
    <section className="stories-section" id="stories">
      <div className="stories-container">
        <div className="stories-header">
          <h2>Your Growth Is Our Goal. Let's Build Winning Digital Stories.</h2>
          <p>
            We create measurable outcomes through strategy, design, and
            optimization. Explore a few live projects that reflect our approach.
          </p>
        </div>

        <div className="stories-grid">
          {SUCCESS_SITES.map((site) => (
            <article className="story-card" key={site.id}>
              <div className="story-preview">
                <img src={site.image} alt={`${site.name} preview`} className="story-image" />
                <div className="story-overlay"></div>
                <div className="story-browser-top">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="story-ribbon">{site.category}</div>
                <div className="story-url">{site.url.replace("https://", "")}</div>
                <a
                  className="story-visit"
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
              </div>

              <div className="story-content">
                <h3>{site.name}</h3>
                <p>{site.service}</p>

                <div className="story-metrics">
                  <div>
                    <strong>{site.metricA}</strong>
                    <span>{site.metricALabel}</span>
                  </div>
                  <div>
                    <strong>{site.metricB}</strong>
                    <span>{site.metricBLabel}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="stories-actions">
          <a href="#contact" className="hero-cta-primary">
            Talk to Us Now
          </a>
        </div>
      </div>
    </section>
  );
};

