import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export const WordsPullUp = ({ text, className = "", showAsterisk = false }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const words = text.split(' ');

  return (
    <div ref={containerRef} className={`flex flex-wrap justify-center ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre relative mr-[0.25em]"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{
            delay: i * 0.08,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          {word}
          {showAsterisk && i === words.length - 1 && (
            <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
          )}
        </motion.span>
      ))}
    </div>
  );
};

export const WordsPullUpMultiStyle = ({ segments, className = "" }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  // Flatten segments into an array of { word, className, index }
  const flatWords = [];
  let globalIndex = 0;
  segments.forEach((segment) => {
    const words = segment.text.split(' ');
    words.forEach((word) => {
      flatWords.push({
        word,
        className: segment.className || '',
        index: globalIndex++
      });
    });
  });

  return (
    <div ref={containerRef} className={`flex flex-wrap justify-center ${className}`}>
      {flatWords.map((item, i) => (
        <motion.span
          key={i}
          className={`inline-block whitespace-pre mr-[0.25em] ${item.className}`}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{
            delay: i * 0.08,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          {item.word}
        </motion.span>
      ))}
    </div>
  );
};

export const AnimatedLetter = ({ children, progress, index, total }) => {
  const charProgress = index / total;
  // Character fades in quickly, reaching full opacity much faster
  const opacity = useTransform(
    progress,
    [charProgress * 0.5 - 0.1, charProgress * 0.5 + 0.1],
    [0.4, 1]
  );
  
  // Add a persistent brightness/glow effect
  const textShadow = useTransform(
    progress,
    [charProgress * 0.5 - 0.1, charProgress * 0.5 + 0.1],
    ["0px 0px 0px rgba(225,224,204,0)", "0px 0px 15px rgba(225,224,204,0.8)"]
  );

  return (
    <motion.span style={{ opacity, textShadow }} className="transition-opacity duration-300">
      {children}
    </motion.span>
  );
};
