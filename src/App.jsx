import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Navbar } from './Navbar.jsx';
import { Hero } from './Hero.jsx';
import { BrandStrip } from './BrandStrip.jsx';
import { WhyWhatsApp } from './WhyWhatsApp.jsx';
import { Features } from './Features.jsx';
import { UseCases } from './UseCases.jsx';
import { Pricing } from './Pricing.jsx';
import { ScrollToTop } from './ScrollToTop.jsx';
import { FloatingCTA } from './FloatingCTA.jsx';
import { Contact } from './Contact.jsx';
import { Products } from './Products.jsx';
import { Testimonials } from './Testimonials.jsx';

function App() {
  return (
    <>
      <Navbar />
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
      <Testimonials />
      <ScrollToTop />
      <FloatingCTA />
      <Contact />
      <footer className="footer">
        © 2026 <span>TechnovaHub</span>. All Rights Reserved.
      </footer>
    </>
  )
}

export default App
