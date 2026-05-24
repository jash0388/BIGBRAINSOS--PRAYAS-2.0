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

  const paragraphText = "Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.";
  const chars = paragraphText.split('');

  const headingSegments = [
    { text: "I am Marcus Chen, ", className: "font-normal" },
    { text: "a self-taught director. ", className: "font-serif italic text-primary/90" },
    { text: "I have skills in color grading, visual effects, and narrative design.", className: "font-normal" }
  ];

  return (
    <section className="bg-black py-24 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto bg-[#101010] rounded-[2rem] p-8 md:p-16 lg:p-24 flex flex-col items-center text-center">
        
        {/* Label */}
        <span className="text-primary text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-10">
          Visual arts
        </span>

        {/* Heading */}
        <div className="text-[#E1E0CC] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] tracking-tight mb-16">
          <WordsPullUpMultiStyle segments={headingSegments} />
        </div>

        {/* Scroll-revealed Bio Paragraph */}
        <div ref={containerRef} className="max-w-2xl mx-auto">
          <p className="text-[#DEDBC8] text-xs sm:text-sm md:text-base leading-relaxed tracking-wide text-justify md:text-center">
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
