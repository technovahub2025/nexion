import "./App.css";

export const FloatingCTA = () => {
  const handleRegister = () => {
    // change this to your actual register / signup route
    window.location.href = "#register";
  };

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
