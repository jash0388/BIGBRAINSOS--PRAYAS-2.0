import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WordsPullUp } from '../ui/Animations';

const Hero = () => {
  return (
    <section className="h-screen w-full p-4 md:p-6 bg-black">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        
        {/* Background Video */}
        <video 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Noise & Gradient Overlays */}
        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        {/* Navbar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
          <nav className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
            {['Our story', 'Collective', 'Workshops', 'Pricing', 'Inquiries'].map((item) => (
              <Link 
                key={item} 
                to={item === 'Pricing' ? '/pricing' : '#'} 
                className="text-[10px] sm:text-xs md:text-sm whitespace-nowrap transition-colors duration-300"
                style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#E1E0CC'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)'}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* Hero Content (Bottom aligned) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-end">
            
            {/* Giant Title (8 cols) */}
            <div className="md:col-span-8 text-[#E1E0CC]">
              <WordsPullUp 
                text="Prisma" 
                showAsterisk={true}
                className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em] justify-start"
              />
            </div>

            {/* Description & Button (4 cols) */}
            <div className="md:col-span-4 flex flex-col items-start gap-6 pb-2 md:pb-6">
              <motion.p 
                className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.2]"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link 
                  to="/os"
                  className="group flex items-center gap-2 bg-primary text-black rounded-full pl-5 pr-1.5 py-1.5 hover:gap-3 transition-all duration-300"
                >
                  <span className="font-medium text-sm sm:text-base">Continue to OS</span>
                  <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary" strokeWidth={2.5} />
                  </div>
                </Link>
              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
