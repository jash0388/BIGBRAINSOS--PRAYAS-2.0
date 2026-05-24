import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { WordsPullUpMultiStyle, AnimatedLetter } from '../ui/Animations';

const About = () => {
  const containerRef = useRef(null);
  
  // Track scroll progress for the paragraph
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const paragraphText = "Over the past several months, we have built BigBrainsOS from scratch to bring desktop-grade applications like VS Code, Terminal, and Chromium directly into your web browser without requiring any local installation or powerful hardware.";
  const chars = paragraphText.split('');

  const headingSegments = [
    { text: "Built by Jashwanth, ", className: "font-normal" },
    { text: "N. Abhilash, Abhiram, ", className: "font-serif italic text-primary/90" },
    { text: "and Yousuf Uddin.", className: "font-normal" }
  ];

  return (
    <section className="bg-black py-24 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto bg-[#101010] rounded-[2rem] p-8 md:p-16 lg:p-24 flex flex-col items-center text-center">
        
        {/* Label */}
        <span className="text-primary text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-10">
          Cloud Operating System
        </span>

        {/* Heading */}
        <div className="text-[#E1E0CC] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] tracking-tight mb-16">
          <WordsPullUpMultiStyle segments={headingSegments} />
        </div>

        {/* Scroll-revealed Bio Paragraph */}
        <div ref={containerRef} className="max-w-3xl mx-auto">
          <p className="text-[#E1E0CC] text-sm sm:text-base md:text-lg leading-relaxed tracking-wide text-justify md:text-center drop-shadow-[0_0_12px_rgba(225,224,204,0.4)]">
            {chars.map((char, i) => (
              <AnimatedLetter 
                key={i} 
                progress={scrollYProgress} 
                index={i} 
                total={chars.length}
              >
                {char}
              </AnimatedLetter>
            ))}
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;
