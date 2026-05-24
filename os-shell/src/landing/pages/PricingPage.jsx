import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-6">
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />
      <div className="relative z-10 max-w-lg">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20">
          <span className="text-2xl">🚧</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#E1E0CC] mb-4 tracking-tight">Pricing Prototype</h1>
        <p className="text-primary/70 text-base md:text-lg mb-10 leading-relaxed">
          This is just a prototype. Pricing details and subscription tiers will be integrated in the next iteration of Prisma.
        </p>
        <Link 
          to="/" 
          className="group inline-flex items-center gap-2 bg-primary text-black rounded-full pl-6 pr-2 py-2 hover:gap-4 transition-all duration-300"
        >
          <span className="font-medium text-sm md:text-base">Return to Home</span>
          <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <ArrowRight className="w-4 h-4 text-primary" strokeWidth={2.5} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PricingPage;
