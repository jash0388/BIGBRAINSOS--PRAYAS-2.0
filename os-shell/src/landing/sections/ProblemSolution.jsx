import React from 'react';
import { motion } from 'framer-motion';

const ProblemSolution = () => {
  return (
    <section className="bg-black py-24 md:py-32 px-4 md:px-6 border-t border-white/5 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        {/* The Problem */}
        <motion.div 
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 text-red-400 font-bold text-sm">01</span>
            <h2 className="text-xl sm:text-2xl font-serif italic text-primary/80">The Problem</h2>
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1]">
            Hardware bottlenecks <br className="hidden sm:block" /> and complex setups.
          </h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Modern development requires powerful machines, massive RAM, and hours spent configuring local environments, Docker containers, and dependencies. For students, researchers, and developers on the go, being tied to a heavy, expensive laptop is a massive friction point that slows down innovation.
          </p>
        </motion.div>

        {/* The Solution */}
        <motion.div 
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold text-sm">02</span>
            <h2 className="text-xl sm:text-2xl font-serif italic text-primary/80">The Solution</h2>
          </div>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.1]">
            A supercomputer <br className="hidden sm:block" /> inside your browser.
          </h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            We built an ultra-low latency, cloud-native operating system. BigBrainsOS spins up isolated, disposable Linux containers instantly. We stream a full desktop environment—complete with VS Code, a native terminal, and Chromium—directly into any browser tab at 60 FPS. Zero installation, zero hardware constraints.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default ProblemSolution;
