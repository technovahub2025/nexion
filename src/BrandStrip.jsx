import "./App.css";
import mrfLogo from "./assets/brand/mrf.png";
import tvsLogo from "./assets/brand/tvs.png";
import eatonLogo from "./assets/brand/eaton.jpg";
import raneLogo from "./assets/brand/rane.png";
import sgLogo from "./assets/brand/sg.jpg";
import polcLogo from "./assets/brand/polc.png";
import mgmLogo from "./assets/brand/mgm.png";
import solaraLogo from "./assets/brand/solara.png";
import metaLogo from "./assets/brand/meta_PNG4.png";

const BRANDS = [
  {
    alt: "PTS Shopping",
    src: mrfLogo,
  },
  {
    alt: "CLEANSO",
    src: tvsLogo,
  },
  {
    alt: "TECH VASEEGRAH",
    src: eatonLogo,
  },
  {
    alt: "NEXION COMMERCE",
    src: raneLogo,
  },
  {
    alt: "VOICEFLOW LABS",
    src: sgLogo,
  },
  {
    alt: "GREENLINE RETAIL",
    src: polcLogo,
  },
  {
    alt: "GREENLINE RETAIL",
    src: mgmLogo,
  },
  {
    alt: "GREENLINE RETAIL",
    src: solaraLogo,
  },
];

const loopedBrands = [...BRANDS, ...BRANDS];

export const BrandStrip = () => {
  return (
    <section className="brand-strip-section">
      <div className="brand-strip-container">
        <h3 className="brand-strip-title mb-5">Trusted by 200+ brands across 5+ countries</h3>

        <div className="brand-proof-row mb-5">
          <div className="meta-proof">
            <div className="meta-proof-icon">
              <img src={metaLogo} alt="Meta" height="45" width="55" />
            </div>
            <div>
              <strong>Meta</strong>
              <p>Tech Provider</p>
            </div>
          </div>

          <div className="g2-proof">
            <strong>4.7/5</strong>
            <span className="stars">*****</span>
            <span>RATING ON G2</span>
          </div>
        </div>
      </div>

      <div className="brand-marquee">
        <div className="brand-track">
          {loopedBrands.map((brand, idx) => (
            <div className="brand-pill" key={`${brand.alt}-${idx}`}>
              <img className="brand-logo" src={brand.src} alt={brand.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
