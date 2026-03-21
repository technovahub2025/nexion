import "./App.css";
import { openPricingSection } from "./pricingNavigation";

export const FloatingCTA = ({ visible = true }) => {
  const handleRegister = () => {
    openPricingSection();
  };

  if (!visible) return null;

  return (
    <button
      className="floating-cta"
      onClick={handleRegister}
      aria-label="Register Now"
    >
      Register Now
    </button>
  );
};
