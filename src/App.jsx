import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navbar } from "./Navbar.jsx";
import { Hero } from "./Hero.jsx";
import { BrandStrip } from "./BrandStrip.jsx";
import { WhyWhatsApp } from "./WhyWhatsApp.jsx";
import { Features } from "./Features.jsx";
import { UseCases } from "./UseCases.jsx";
import { Pricing } from "./Pricing.jsx";
import { ScrollToTop } from "./ScrollToTop.jsx";
import { FloatingCTA } from "./FloatingCTA.jsx";
import { Contact } from "./Contact.jsx";
import { Products } from "./Products.jsx";
import { Testimonials } from "./Testimonials.jsx";
import { SuccessStories } from "./SuccessStories.jsx";
import { FAQ } from "./FAQ.jsx";
import { PaymentPage } from "./PaymentPage.jsx";
import { useEffect, useState } from "react";
import { scrollToPricingSection } from "./pricingNavigation";

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user") || sessionStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

function App() {
  const isEmbedded = window.top !== window.self;
  const baseUrl = import.meta.env.BASE_URL || "/";
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const currentPath = normalizedBase && window.location.pathname.startsWith(normalizedBase)
    ? (window.location.pathname.slice(normalizedBase.length) || "/")
    : window.location.pathname;
  const isPaymentPage = !isEmbedded && currentPath.startsWith("/payment");
  const [embeddedView, setEmbeddedView] = useState("landing");
  const [embeddedUser, setEmbeddedUser] = useState(() => getStoredUser());
  const workspaceAccessState = String(embeddedUser?.workspaceAccessState || embeddedUser?.subscriptionStatus || "").toLowerCase();
  const isTrialing = workspaceAccessState === "trialing";

  useEffect(() => {
    if (!isEmbedded) return undefined;

    const triggerPricingScroll = () => {
      window.requestAnimationFrame(() => {
        scrollToPricingSection();
      });
    };

    const handleMessage = (event) => {
      const data = event?.data || {};
      if (data.type === "nexion-access-context") {
        if (data.user) {
          setEmbeddedUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
          sessionStorage.setItem("user", JSON.stringify(data.user));
        }
        return;
      }

      if (data.type === "nexion-open-pricing") {
        setEmbeddedView("pricing");
        triggerPricingScroll();
        return;
      }

      if (data.type === "nexion-open-pricing-request") {
        setEmbeddedView("pricing");
        triggerPricingScroll();
      }
    };

    window.addEventListener("message", handleMessage);
    window.parent.postMessage({ type: "nexion-ready" }, "*");
    return () => window.removeEventListener("message", handleMessage);
  }, [isEmbedded]);

  useEffect(() => {
    if (!isEmbedded || embeddedView !== "pricing") return;
    scrollToPricingSection();
  }, [embeddedView, isEmbedded]);

  if (isPaymentPage) {
    return <PaymentPage />;
  }

  return (
    <>
      <Navbar isEmbedded={isEmbedded} currentUser={embeddedUser} />
      <Hero />
      <div className="main-content">
        <Features />
      </div>
      <Products />
      <div className="whyWhatsApp">
        <WhyWhatsApp />
      </div>
      <UseCases />
      <BrandStrip />
      <Pricing />
      <SuccessStories />
      <Testimonials />
      <FAQ />
      <ScrollToTop />
      <FloatingCTA visible={isTrialing} />
      <Contact />
      <footer className="footer">
        (c) 2026 <span>TechnovaHub</span>. All Rights Reserved.
      </footer>
    </>
  );
}

export default App;
