import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import Navigation from './Navigation';
import gsap from 'gsap';
import LeetCode from './icons/LeetCode';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    // Sidebar Animation
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'power3.out' }
      );
    }
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-dark-bg text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col">
      {/* Navigation */}
      <Navigation />

      {/* Social Sidebar - Desktop (Redesigned) */}
      <div ref={sidebarRef} className="fixed left-6 bottom-0 z-50 hidden md:flex flex-col items-center gap-6 after:content-[''] after:w-[1px] after:h-24 after:bg-zinc-700 after:mt-6">
        <a href="https://github.com/sonixx02" target="_blank" rel="noopener noreferrer" 
           className="text-zinc-400 hover:text-emerald-400 hover:-translate-y-1 transition-all duration-300 transform"
           title="Visit my GitHub profile"
           aria-label="GitHub">
          <Github size={20} />
        </a>
        <a href="https://www.linkedin.com/in/soni-darshan-18125124a/" target="_blank" rel="noopener noreferrer"
           className="text-zinc-400 hover:text-emerald-400 hover:-translate-y-1 transition-all duration-300 transform"
           title="Connect with me on LinkedIn"
           aria-label="LinkedIn">
          <Linkedin size={20} />
        </a>
        <a href="https://leetcode.com/u/Sonieng/" target="_blank" rel="noopener noreferrer"
           className="text-zinc-400 hover:text-emerald-400 hover:-translate-y-1 transition-all duration-300 transform"
           title="Check my LeetCode profile"
           aria-label="LeetCode">
          <LeetCode size={20} />
        </a>
        <a
          href="mailto:soni.darshan0209@gmail.com"
          className="text-zinc-400 hover:text-emerald-400 hover:-translate-y-1 transition-all duration-300 transform"
          title="Send email to soni.darshan0209@gmail.com"
        >
          <Mail size={20} />
        </a>
      </div>

      {/* Email Sidebar - Desktop (Redesigned) */}
      <div className="fixed right-6 bottom-0 z-50 hidden md:flex flex-col items-center gap-6 after:content-[''] after:w-[1px] after:h-24 after:bg-zinc-700 after:mt-6">
        <a
          href="mailto:soni.darshan0209@gmail.com"
          className="text-zinc-400 hover:text-emerald-400 transition-all duration-300 vertical-text text-sm tracking-widest hover:-translate-y-1"
          style={{ writingMode: 'vertical-rl' }}
        >
          soni.darshan0209@gmail.com
        </a>
      </div>

      {/* Mobile Social Icons */}
      <div className="fixed bottom-6 left-0 right-0 z-50 md:hidden pointer-events-none">
        <div className="flex justify-center space-x-8 bg-zinc-900/80 backdrop-blur-md py-4 px-8 mx-6 rounded-full border border-white/10 shadow-2xl pointer-events-auto">
          <a href="https://github.com/sonixx02" target="_blank" rel="noopener noreferrer" 
             className="text-zinc-400 hover:text-emerald-400 transition-colors duration-300"
             aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/soni-darshan-18125124a/" target="_blank" rel="noopener noreferrer"
             className="text-zinc-400 hover:text-emerald-400 transition-colors duration-300"
             aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="https://leetcode.com/u/Sonieng/" target="_blank" rel="noopener noreferrer"
             className="text-zinc-400 hover:text-emerald-400 transition-colors duration-300"
             aria-label="LeetCode">
            <LeetCode size={20} />
          </a>
          <a href="mailto:soni.darshan0209@gmail.com"
             className="text-zinc-400 hover:text-emerald-400 transition-colors duration-300"
             aria-label="Email me">
            <Mail size={20} />
          </a>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow pt-20 sm:pt-24 md:pt-28 pb-24 md:pb-0 w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;