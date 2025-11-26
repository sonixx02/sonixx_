import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'Trimurti Gems',
      description:
        'A comprehensive jewelry and diamond e-commerce platform. Features include 3D diamond viewing, custom jewelry set building, and a robust admin panel for CRUD operations on inventory. Users can compare items, filter extensively, and submit inquiries directly to the admin.',
      image: '/trimurtigems.png',
      technologies: ['React', 'Node.js', 'MongoDB', '3D Visualization', 'Admin Panel'],
      link: 'https://sonixx02.github.io/trimurtigems/',
      github: 'https://github.com/sonixx02/trimurtigems'
    },
    {
      id: 2,
      title: 'Ridaan Trading Co',
      description:
        'A B2B marketplace for construction parts and materials. The platform offers a detailed product catalog with advanced filtration, allowing users to easily find specific construction components. Designed for efficiency and ease of navigation.',
      image: '/ridaantradingco.png',
      technologies: ['React', 'Node.js', 'Catalog System', 'Advanced Filtering'],
      link: 'https://ridanntradingco.vercel.app/',
      github: 'https://github.com/sonixx02/ridanntradingco'
    },
    {
      id: 3,
      title: 'CineVerse',
      description:
        'Full-stack video-sharing app with authentication, playlists, likes/dislikes, and NSFW detection (90%+ accuracy). Designed JWT-based auth and modular API endpoints for seamless video management.',
      image: '/cineverse.png',
      technologies: ['MongoDB', 'Express.js', 'Node.js', 'React.js'],
      link: 'https://cine-verse-lilac.vercel.app/',
      github: 'https://github.com/sonixx02/CineVerse'
    },
    {
      id: 4,
      title: 'Twits',
      description:
        'Full-stack social media application using React.js and Appwrite. Implemented user authentication, post creation with text/image support, global feed, and CRUD functionality.',
      image: '/twits.png',
      technologies: ['React.js', 'Appwrite', 'TinyURL API'],
      link: 'https://twits-nine.vercel.app/',
      github: 'https://github.com/sonixx02/Twits'
    },
    {
      id: 5,
      title: 'Apakarakshak',
      description:
        'AI-powered safety and legal aid platform. Features complaint registration, LLM-driven legal guidance (LawBot), safe route mapping, and a 3D virtual companion bot for user support.',
      image: '/apkarakshak.png',
      technologies: ['React.js', 'MongoDB', 'Node.js', 'Python', 'AI/ML'],
      link: 'https://github.com/sonixx02/Apkarakshak',
      github: 'https://github.com/sonixx02/Apkarakshak'
    }
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            A collection of my work spanning full-stack development, AI integration, and innovative solutions.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;