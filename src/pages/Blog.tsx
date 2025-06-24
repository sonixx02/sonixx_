import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Shuffle, Calendar, Clock } from 'lucide-react';

const Blog: React.FC = () => {
  const tags = ['#fullstack', '#hackathons', '#ai', '#webdev', '#innovation'];

  return (
    <motion.div
      className="min-h-screen px-8 py-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-light mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
        >
          Hey, welcome to my <span className="text-emerald-400">Space.</span>
        </motion.h1>
        
        <motion.p
          className="text-xl text-gray-300 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Building ideas into impact — one project and blog at a time.
        </motion.p>
        
        {/* Coming Soon Section */}
        <motion.div
          className="bg-gray-900/50 border border-gray-800 rounded-lg p-12 mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7, type: 'spring' }}
        >
          <div className="flex items-center justify-center mb-6">
            <Calendar className="text-emerald-400 mr-3" size={32} />
            <h2 className="text-2xl font-light text-white">Coming Soon</h2>
          </div>
          <p className="text-gray-300 text-lg mb-8">
            I'm currently working on some exciting blog posts about my hackathon experiences, 
            full-stack development journey, and AI innovations. Stay tuned for insights on:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            <div className="flex items-center text-gray-300">
              <Clock className="text-emerald-400 mr-2 flex-shrink-0" size={16} />
              <span>My 3x Hackathon winning strategies</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Clock className="text-emerald-400 mr-2 flex-shrink-0" size={16} />
              <span>Building full-stack apps with MERN</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Clock className="text-emerald-400 mr-2 flex-shrink-0" size={16} />
              <span>AI integration in modern web apps</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Clock className="text-emerald-400 mr-2 flex-shrink-0" size={16} />
              <span>From idea to deployment</span>
            </div>
          </div>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <motion.button
            className="inline-flex items-center space-x-2 bg-transparent border border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black px-8 py-3 rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            <ArrowUpRight size={20} />
            <span>Explore</span>
          </motion.button>
          
          <motion.button
            className="inline-flex items-center space-x-2 bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white px-8 py-3 rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
          >
            <Shuffle size={20} />
            <span>Random</span>
          </motion.button>
        </div>
        
        <div className="flex items-center justify-center mb-12">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-6 text-gray-400 text-lg">OR</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          {tags.map((tag) => (
            <button
              key={tag}
              className="px-6 py-2 border border-gray-600 text-gray-300 hover:border-emerald-400 hover:text-emerald-400 rounded-full transition-colors duration-300"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;