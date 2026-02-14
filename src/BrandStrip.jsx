import "./App.css";

const BRANDS = [
  {
    alt: "PTS Shopping",
    src: "src/assets/brand/mrf.png",
  },
  {
    alt: "CLEANSO",
    src: "src/assets/brand/tvs.png",
  },
  {
    alt: "TECH VASEEGRAH",
    src: "src/assets/brand/eaton.jpg",
  },
  {
    alt: "NEXION COMMERCE",
    src: "src/assets/brand/rane.png",
  },
  {
    alt: "VOICEFLOW LABS",
    src: "src/assets/brand/sg.jpg",
  },
  {
    alt: "GREENLINE RETAIL",
    src: "src/assets/brand/polc.png",
  },
  {
    alt: "GREENLINE RETAIL",
    src: "src/assets/brand/mgm.png",
  },
  {
    alt: "GREENLINE RETAIL",
    src: "src/assets/brand/solara.png",
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
              <img src="src/assets/brand/meta_PNG4.png" alt="Meta" height="45" width="55"/>
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
