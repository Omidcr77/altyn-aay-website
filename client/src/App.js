// client/src/App.js
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PlanSelector from './components/PlanSelector';
import ServiceAreaCheck from './components/ServiceAreaCheck';
import Footer from './components/Footer';
import SiteBackground from "./components/SiteBackground";
import Services from './components/Services';


function App() {
  return (
    <div className="bg-brand-blue text-white min-h-screen">
      <SiteBackground />
      <Header />
      <main>
        <Hero />
        <PlanSelector />
        <Services/>
        <ServiceAreaCheck />
        <Footer/>
      </main>
      {/* You can add ValuePillars and Footer components here */}
    </div>
  );
}
export default App;