import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'CineVerse',
      description: 'Designed and developed using MongoDB and Express.js, enabling user authentication, profile updates, video uploads, and cover image management. Implemented features for comments, likes/dislikes, and playlist management. Integrated a Python script to automatically detect and block NSFW videos during uploads..',
      image: 'https://via.placeholder.com/600x400?text=Project+Image',
      technologies: ['MongoDB', 'Express.js', 'Node.js', 'React.js'],
      link: 'https://cine-verse-lilac.vercel.app/',
      github: 'https://github.com/sonixx02/CineVerse'
    },
    {
      id: 2,
      title: 'Twits',
      description: 'Developed a full-stack social media application using React.js and Appwrite. Implemented user authentication, post creation with text and image support using TinyURL API, global feed, and CRUD functionality.',
      image: 'https://via.placeholder.com/600x400?text=Project+Image',
      technologies: ['React.js', 'Appwrite', 'TinyURL API'],
      link: 'https://twits-nine.vercel.app/',
      github: 'https://github.com/sonixx02/Twits'
    },
    {
      id: 3,
      title: 'Apakarakshak',
      description: 'A web application that empowers users to make safer travel and lifestyle decisions by providing real-time, crowdsourced safety information and crime data. The platform features two interfaces—one for the public and one for law enforcement.      Users can report incidents, view heat maps, check recent criminal activity, and explore categorized safe and risky travel routes. Law enforcement has access to an interactive dashboard with live crime data, AI-powered criminal identification through image analysis, and comprehensive crime reports. The system combines real-time web-scraped data from official sources with user reports for a reliable, data-driven safety solution.',
      image: 'https://via.placeholder.com/600x400?text=Project+Image',
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
      className="min-h-screen px-8 py-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-light mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
        >
          <span className="text-emerald-400">Pro</span>jects
        </motion.h1>
        <motion.p
          className="text-gray-400 mb-16 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          A collection of my work spanning full-stack development, AI integration, and innovative solutions.
        </motion.p>
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
    </motion.div>
  );
};

export default Projects;