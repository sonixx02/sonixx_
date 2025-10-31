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
    className="flex justify-center"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
  >
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 hover:scale-[1.02] hover:border-emerald-400/50 shadow-lg w-full max-w-sm">
      <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
      <div className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm sm:text-base mb-4 line-clamp-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span key={index} className="px-2 py-1 bg-gray-800 rounded-md text-xs text-gray-300">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Demo
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

export default ProjectCard;