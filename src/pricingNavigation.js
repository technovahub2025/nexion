export const isEmbeddedLanding = () => window.top !== window.self;

export const scrollToPricingSection = () => {
  const pricingSection = document.getElementById("pricing");
  if (pricingSection) {
    pricingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }

  if (window.location.hash !== "#pricing") {
    window.location.hash = "#pricing";
  }

  return false;
};

export const openPricingSection = () => {
  if (isEmbeddedLanding()) {
    scrollToPricingSection();
    return;
  }

  scrollToPricingSection();
};
