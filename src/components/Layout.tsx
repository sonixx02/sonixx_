import React, { useEffect, useRef } from 'react';
import { Github, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import Navigation from './Navigation';
import gsap from 'gsap';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }
    if (emailRef.current) {
      gsap.fromTo(
        emailRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Social Sidebar */}
      <div ref={sidebarRef} className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col space-y-6">
        <a href="https://github.com/sonixx02" target="_blank" rel="noopener noreferrer" 
           className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
          <Github size={24} />
        </a>
        {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
           className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
          <Twitter size={24} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
           className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
          <Instagram size={24} />
        </a> */}
        <a href="https://www.linkedin.com/in/soni-darshan-18125124a/" target="_blank" rel="noopener noreferrer"
           className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
          <Linkedin size={24} />
        </a>
        
      </div>

      {/* Email Icon */}
      <div ref={emailRef} className="fixed right-8 top-8 z-50">
        <a
          href="mailto:soni.darshan0209@gmail.com"
          className="text-gray-400 hover:text-emerald-400 transition-colors duration-300"
          title="Send email to soni.darshan0209@gmail.com"
        >
          <Mail size={24} />
        </a>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
};

export default Layout;