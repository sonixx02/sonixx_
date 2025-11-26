import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

const Projects: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  const projects = [
    {
      id: 1,
      title: 'Trimurti Gems',
      category: 'E-Commerce',
      description: 'Comprehensive jewelry platform with 3D diamond viewing and custom set building.',
      image: '/trimurtigems.png',
      tech: ['React', 'Node.js', 'MongoDB', '3D'],
      link: 'https://sonixx02.github.io/trimurtigems/',
      github: 'https://github.com/sonixx02/trimurtigems'
    },
    {
      id: 2,
      title: 'Ridaan Trading',
      category: 'B2B Marketplace',
      description: 'B2B marketplace for construction parts with advanced catalog filtration.',
      image: '/ridaantradingco.png',
      tech: ['React', 'Node.js', 'Catalog'],
      link: 'https://ridanntradingco.vercel.app/',
      github: 'https://github.com/sonixx02/ridanntradingco'
    },
    {
      id: 3,
      title: 'CineVerse',
      category: 'Video Platform',
      description: 'Video-sharing app with NSFW detection and JWT auth.',
      image: '/cineverse.png',
      tech: ['MERN', 'AI/ML', 'JWT'],
      link: 'https://cine-verse-lilac.vercel.app/',
      github: 'https://github.com/sonixx02/CineVerse'
    },
    {
      id: 4,
      title: 'Twits',
      category: 'Social Media',
      description: 'Social app with Appwrite backend and TinyURL integration.',
      image: '/twits.png',
      tech: ['React', 'Appwrite', 'API'],
      link: 'https://twits-nine.vercel.app/',
      github: 'https://github.com/sonixx02/Twits'
    },
    {
      id: 5,
      title: 'Apakarakshak',
      category: 'AI Legal Aid',
      description: 'AI-powered safety platform with LawBot and 3D companion.',
      image: '/apkarakshak.png',
      tech: ['MERN', 'Python', 'AI'],
      link: 'https://github.com/sonixx02/Apkarakshak',
      github: 'https://github.com/sonixx02/Apkarakshak'
    }
  ];

  return (
    <div className="bg-black text-white">
      {/* Intro Section */}
      <div className="h-[50vh] flex flex-col items-center justify-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Selected <span className="text-red-500">Works</span>
        </motion.h1>
        <p className="text-zinc-400 text-lg max-w-xl text-center">
          A showcase of technical depth and creative solutions. Scroll down to explore.
        </p>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-12 text-red-500"
        >
          <ArrowRight className="rotate-90" size={32} />
        </motion.div>
      </div>

      {/* Horizontal Scroll Section (Desktop) */}
      <section ref={targetRef} className="relative h-[300vh] hidden lg:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-12 px-24">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group relative h-[600px] w-[800px] flex-shrink-0 overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-red-500/50 transition-colors"
              >
                {/* Image Background */}
                <div className="absolute inset-0">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="h-full w-full object-cover opacity-40 group-hover:opacity-20 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium border border-red-500/20">
                      {project.category}
                    </span>
                  </div>
                  <h2 className="text-5xl font-bold mb-4">{project.title}</h2>
                  <p className="text-xl text-zinc-300 mb-8 max-w-lg">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tech.map((t) => (
                      <span key={t} className="text-zinc-500 text-sm font-mono">/{t}</span>
                    ))}
                  </div>

                  <div className="flex gap-6">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 text-white hover:text-red-500 transition-colors font-medium text-lg"
                    >
                      Live Demo <ExternalLink size={20} />
                    </a>
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-medium text-lg"
                    >
                      GitHub <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vertical Stack (Mobile/Tablet) */}
      <section className="lg:hidden px-4 pb-20 space-y-12">
        {projects.map((project) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            key={project.id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
            </div>
            <div className="p-6">
              <span className="text-red-500 text-sm font-medium mb-2 block">{project.category}</span>
              <h2 className="text-2xl font-bold mb-3">{project.title}</h2>
              <p className="text-zinc-400 mb-6 text-sm leading-relaxed">{project.description}</p>
              <div className="flex gap-4">
                <a href={project.link} className="text-white hover:text-red-500 text-sm font-medium flex items-center gap-1">
                  Live <ExternalLink size={14} />
                </a>
                <a href={project.github} className="text-zinc-400 hover:text-white text-sm font-medium flex items-center gap-1">
                  Code <Github size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Projects;