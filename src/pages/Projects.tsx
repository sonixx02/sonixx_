import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';


const Projects: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'CineVerse',
      description:
        'Full-stack video-sharing app with authentication, playlists, likes/dislikes, and NSFW detection (90%+ accuracy) via Python script. ' +
        'Designed JWT-based auth and user profiles with modular API endpoints for seamless login, video management, and playlists. ' +
        'Built independent controllers, view models, and MongoDB queries, strengthening backend modularity.',
      image: '/cineverse.png',
      technologies: ['MongoDB', 'Express.js', 'Node.js', 'React.js'],
      link: 'https://cine-verse-lilac.vercel.app/',
      github: 'https://github.com/sonixx02/CineVerse'
    },
    {
      id: 2,
      title: 'Twits',
      description:
        'Developed a full-stack social media application using React.js and Appwrite. ' +
        'Implemented user authentication, post creation with text and image support using TinyURL API, global feed, and CRUD functionality.',
      image: '/twits.png',
      technologies: ['React.js', 'Appwrite', 'TinyURL API'],
      link: 'https://twits-nine.vercel.app/',
      github: 'https://github.com/sonixx02/Twits'
    },
    {
      id: 3,
      title: 'Apakarakshak',
      description:
        'Built an AI-powered safety and legal aid platform combining complaint registration, LLM-driven visual generation, and legal guidance. ' +
        'Integrated Safe Route mapping via scraped Maharashtra incident data to recommend safer travel paths. ' +
        'Developed a LawBot using Crew4AI & Travely AI for IPC guidance and FIR filing support. ' +
        'Added a 3D virtual companion bot for user interaction and mental support.',
      image: '/apkarakshak.png',
      technologies: ['Reactjs', 'mongoDB', 'Node.js', 'python'],
      link: 'https://github.com/sonixx02/Apkarakshak',
      github: 'https://github.com/sonixx02/Apkarakshak'
    },
    // {
    //   id: 4,
    //   title: 'Redux React',
    //   description: 'A comprehensive React application demonstrating Redux state management patterns and best practices for scalable frontend development.',
    //   image: 'https://via.placeholder.com/600x400?text=Project+Image',
    //   technologies: ['React.js', 'Redux', 'JavaScript'],
    //   link: 'https://reduxreact-zeta.vercel.app/',
    //   github: 'https://github.com/sonixx02/reduxreact'
    // },
    // {
    //   id: 5,
    //   title: 'DataTable',
    //   description: 'Interactive data table component with sorting, filtering, and pagination functionality built with modern web technologies.',
    //   image: 'https://via.placeholder.com/600x400?text=Project+Image',
    //   technologies: ['React.js', 'JavaScript', 'CSS'],
    //   link: 'https://datatable-psi.vercel.app/',
    //   github: 'https://github.com/sonixx02/datatable'
    // },
    // {
    //   id: 6,
    //   title: 'E-commerce Basic',
    //   description: 'A foundational e-commerce application showcasing product catalog, shopping cart functionality, and user interface design principles.',
    //   image: 'https://via.placeholder.com/600x400?text=Project+Image',
    //   technologies: ['React.js', 'Node.js', 'Express.js'],
    //   link: 'https://ecommerce-basic-six.vercel.app/',
    //   github: 'https://github.com/sonixx02/ecommerce_basic'
    // },
    // {
    //   id: 7,
    //   title: 'Notebook LLM',
    //   description: 'AI-powered notebook application integrating large language models for enhanced note-taking and content generation capabilities.',
    //   image: 'https://via.placeholder.com/600x400?text=Project+Image',
    //   technologies: ['React.js', 'AI/ML', 'Node.js'],
    //   link: 'https://notebook-llm-eight.vercel.app/',
    //   github: 'https://github.com/sonixx02/notebook_llm_'
    // },
    // {
    //   id: 8,
    //   title: 'Task Manager',
    //   description: 'Comprehensive task management application with project organization, deadline tracking, and team collaboration features.',
    //   image: 'https://via.placeholder.com/600x400?text=Project+Image',
    //   technologies: ['React.js', 'Node.js', 'MongoDB'],
    //   link: 'https://task-eta-ecru.vercel.app/',
    //   github: 'https://github.com/sonixx02/task'
    // }
  ];

  return (
    <motion.div
      className="min-h-screen px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-light mb-3 sm:mb-4 text-center sm:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
        >
          <span className="text-emerald-400">Pro</span>jects
        </motion.h1>
        <motion.p
          className="text-gray-400 mb-8 sm:mb-12 md:mb-16 text-base sm:text-lg text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          A collection of my work spanning full-stack development, AI integration, and innovative solutions.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
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
    </motion.div>
  );
};

export default Projects;