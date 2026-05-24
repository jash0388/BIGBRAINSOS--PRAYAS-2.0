import React from 'react';
import Hero from './sections/Hero';
import About from './sections/About';
import Features from './sections/Features';

const LandingPage = () => {
  return (
    <div className="bg-black text-primary overflow-x-hidden h-screen overflow-y-auto">
      <Hero />
      <About />
      <Features />
    </div>
  );
};

export default LandingPage;
