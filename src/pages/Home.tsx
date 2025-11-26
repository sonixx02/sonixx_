import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

import GlitchText from './GlitchText';
import FuzzyText from './FuzzyText';
import CrosshairButton from './CrosshairButton';

const Home: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const x = clientX - containerRef.current.offsetLeft;
      const y = clientY - containerRef.current.offsetTop;

      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_var(--mouse-x)_var(--mouse-y),rgba(220,38,38,0.06),transparent_80%)] z-0 transition-opacity duration-500" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-500/5 blur-[120px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-orange-500/5 blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] rounded-full bg-rose-500/5 blur-[120px] animate-blob animation-delay-4000" />
      </div>

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 lg:px-24 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-7xl mx-auto text-center flex flex-col items-center justify-center"
        >
          
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mb-8 sm:mb-10 justify-center"
          >
            <div className="h-[2px] w-12 sm:w-16 bg-red-600" />
            <GlitchText
              speed={1.5}
              enableShadows={true}
              enableOnHover={false}
              className="text-red-600 font-bold tracking-widest text-sm sm:text-base"
            >
              Error404
            </GlitchText>
          </motion.div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-[1.1] mb-6 sm:mb-8">
            Building digital<br/>
            <FuzzyText
              className="text-red-500 inline-block"
              baseIntensity={0.5}
              hoverIntensity={0.8}
              fontSize="inherit"
            >
              experiences.
            </FuzzyText>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-zinc-400 max-w-3xl mx-auto mb-12 sm:mb-16 leading-relaxed font-light">
            I'm a Full Stack Developer passionate about crafting accessible, pixel-perfect user interfaces that blend form and function.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center w-full sm:w-auto">
            <CrosshairButton to="/projects" color="#ef4444">
              View Projects
            </CrosshairButton>

            <CrosshairButton to="/about" color="#ef4444">
              View About Me
            </CrosshairButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
