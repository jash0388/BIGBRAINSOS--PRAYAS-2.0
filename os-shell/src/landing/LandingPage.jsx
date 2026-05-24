import React from 'react';
import Hero from './sections/Hero';
import About from './sections/About';
import Features from './sections/Features';
import ProblemSolution from './sections/ProblemSolution';

const LandingPage = () => {
  return (
    <div className="bg-black font-sans text-primary overflow-x-hidden h-screen overflow-y-auto">
      <Hero />
      <About />
      <Features />
      <ProblemSolution />
    </div>
  );
};

export default LandingPage;
