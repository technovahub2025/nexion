import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from './Navbar.jsx';
import { Hero } from './Hero.jsx';
import { WhyWhatsApp } from './WhyWhatsApp.jsx';
import { Features } from './Features.jsx';
import { UseCases } from './UseCases.jsx';
import { Pricing } from './Pricing.jsx';
import { ScrollToTop } from './ScrollToTop.jsx';
import { FloatingCTA } from './FloatingCTA.jsx';
import { Contact } from './Contact.jsx';
import { Products } from './Products.jsx';


function App() {
  const [count, setCount] = useState(0)

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
      <Pricing />
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
