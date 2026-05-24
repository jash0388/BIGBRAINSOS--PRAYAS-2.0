import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { WordsPullUpMultiStyle } from '../ui/Animations';

// Reusable card component with staggered entrance animation
const FeatureCard = ({ children, index, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={`rounded-3xl overflow-hidden relative ${className}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ 
        delay: index * 0.15, 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      {children}
    </motion.div>
  );
};

// Check list item component
const CheckItem = ({ text }) => (
  <div className="flex items-start gap-3 text-gray-400 text-xs sm:text-sm">
    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={3} />
    <span>{text}</span>
  </div>
);

const Features = () => {
  const headerSegments = [
    { text: "Studio-grade workflows for visionary creators. ", className: "text-[#E1E0CC]" },
    { text: "Built for pure vision. Powered by art.", className: "text-gray-500" }
  ];

  return (
    <section className="min-h-screen bg-black relative py-24 md:py-32 px-4 md:px-6">
      {/* Subtle Noise Background */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal max-w-4xl mb-16 md:mb-24 leading-tight tracking-tight">
          <WordsPullUpMultiStyle segments={headerSegments} className="justify-start" />
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-3 lg:gap-2 lg:h-[480px]">
          
          {/* Card 1: Video Canvas */}
          <FeatureCard index={0} className="lg:col-span-1 h-[400px] lg:h-full bg-[#151515]">
            <video 
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              autoPlay loop muted playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-[#E1E0CC] font-medium text-lg">
              Your creative canvas.
            </div>
          </FeatureCard>

          {/* Card 2: Storyboard */}
          <FeatureCard index={1} className="bg-[#212121] p-8 flex flex-col h-full border border-white/5">
            <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85" alt="Icon" className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-black/50 p-2 mb-6" />
            <h3 className="text-[#E1E0CC] font-medium text-lg mb-8 flex items-center justify-between">
              Project Storyboard. <span className="text-gray-500 text-sm">01</span>
            </h3>
            <div className="flex flex-col gap-4 flex-1">
              <CheckItem text="Drag-and-drop scene ordering" />
              <CheckItem text="Real-time script synchronization" />
              <CheckItem text="Visual mood board integration" />
              <CheckItem text="Export directly to timeline" />
            </div>
            <a href="#" className="flex items-center gap-2 text-primary text-sm font-medium mt-8 group hover:text-[#E1E0CC] transition-colors">
              Learn more 
              <ArrowRight className="w-4 h-4 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </FeatureCard>

          {/* Card 3: Critiques */}
          <FeatureCard index={2} className="bg-[#212121] p-8 flex flex-col h-full border border-white/5">
            <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85" alt="Icon" className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-black/50 p-2 mb-6" />
            <h3 className="text-[#E1E0CC] font-medium text-lg mb-8 flex items-center justify-between">
              Smart Critiques. <span className="text-gray-500 text-sm">02</span>
            </h3>
            <div className="flex flex-col gap-4 flex-1">
              <CheckItem text="AI-driven framing analysis" />
              <CheckItem text="Automated creative notes" />
              <CheckItem text="Third-party tool integrations" />
            </div>
            <a href="#" className="flex items-center gap-2 text-primary text-sm font-medium mt-8 group hover:text-[#E1E0CC] transition-colors">
              Learn more 
              <ArrowRight className="w-4 h-4 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </FeatureCard>

          {/* Card 4: Capsule */}
          <FeatureCard index={3} className="bg-[#212121] p-8 flex flex-col h-full border border-white/5">
            <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85" alt="Icon" className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-black/50 p-2 mb-6" />
            <h3 className="text-[#E1E0CC] font-medium text-lg mb-8 flex items-center justify-between">
              Immersion Capsule. <span className="text-gray-500 text-sm">03</span>
            </h3>
            <div className="flex flex-col gap-4 flex-1">
              <CheckItem text="Global notification silencing" />
              <CheckItem text="Adaptive ambient soundscapes" />
              <CheckItem text="Deep-work schedule syncing" />
            </div>
            <a href="#" className="flex items-center gap-2 text-primary text-sm font-medium mt-8 group hover:text-[#E1E0CC] transition-colors">
              Learn more 
              <ArrowRight className="w-4 h-4 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </FeatureCard>

        </div>
      </div>
    </section>
  );
};

export default Features;
