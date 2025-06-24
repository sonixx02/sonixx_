import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  github?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      className="bg-gray-900/50 rounded-lg overflow-hidden border border-gray-800 hover:border-emerald-400/30 transition-all duration-300 group"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(16, 185, 129, 0.15)' }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 60 }}
    >
      <div className="aspect-video bg-gray-800 overflow-hidden flex flex-col items-center justify-center">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {project.image.includes('placeholder') && (
          <span className="text-xs text-gray-400 mt-2 block">Placeholder Image</span>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-light mb-4 text-white group-hover:text-emerald-400 transition-colors duration-300">
          {project.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span key={tech} className="text-xs px-3 py-1 bg-gray-800 rounded-full text-gray-300 border border-gray-700">
              {tech}
            </span>
          ))}
        </div>
        
        <p className="text-gray-400 mb-6 leading-relaxed text-sm">
          {project.description}
        </p>
        
        <div className="flex gap-3">
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors duration-300 text-white text-sm flex-1 justify-center"
          >
            <span>Live Demo</span>
            <ExternalLink size={14} />
          </a>
          
          {project.github && project.github !== '#' && (
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors duration-300 text-white text-sm"
            >
              <Github size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;