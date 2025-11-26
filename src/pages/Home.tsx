
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Code, Database, Layout, Server, Smartphone, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  const techStack = [
    { icon: <Layout className="w-6 h-6" />, name: 'Frontend', items: 'React, TypeScript, Tailwind' },
    { icon: <Server className="w-6 h-6" />, name: 'Backend', items: 'Node.js, Express, Python' },
    { icon: <Database className="w-6 h-6" />, name: 'Database', items: 'PostgreSQL, MongoDB, Redis' },
    { icon: <Smartphone className="w-6 h-6" />, name: 'Mobile', items: 'React Native, Flutter' },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Interactive Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_var(--mouse-x)_var(--mouse-y),rgba(16,185,129,0.06),transparent_80%)] z-0 transition-opacity duration-500" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-cyan-500/5 blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] rounded-full bg-purple-500/5 blur-[120px] animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-24 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[1px] w-12 bg-emerald-500" />
            <span className="text-emerald-400 font-medium tracking-wider uppercase text-sm">Error 404</span>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-8 tracking-tight leading-tight">
            Building digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-[length:200%_auto] animate-gradient">
              experiences
            </span> that matter.
          </h1>

          <p className="text-xl sm:text-2xl text-zinc-400 max-w-2xl mb-12 leading-relaxed font-light">
            I'm a Full Stack Developer passionate about crafting accessible, pixel-perfect user interfaces that blend form and function.
          </p>

          <div className="flex flex-wrap gap-6">
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-emerald-500 text-white rounded-full font-semibold overflow-hidden shadow-lg shadow-emerald-500/25"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative flex items-center gap-2">
                  View Projects
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>
            
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-zinc-900 text-white border border-zinc-800 rounded-full font-semibold hover:bg-zinc-800 transition-colors"
              >
                About Me
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Tech Stack Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/60 hover:border-emerald-500/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-800/50 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {tech.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{tech.name}</h3>
              <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">{tech.items}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
