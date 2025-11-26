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

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    className="group relative"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur opacity-20"></div>
    <div className="relative h-full bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, index) => (
            <span 
              key={index} 
              className="px-2.5 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-full text-xs font-medium text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-emerald-400 transition-colors"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-emerald-400 transition-colors"
            >
              <Github size={16} />
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

export default ProjectCard;