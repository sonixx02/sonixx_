import React from 'react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center px-8 text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-5xl md:text-6xl font-light mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
        >
          Hey, I'm <span className="text-emerald-400">Darshan</span>, a passionate{' '}
          <span className="text-gray-300">Full-Stack Developer</span>
          <br />
          who's curious about <span className="text-emerald-400">AI & Innovation.</span>
        </motion.h1>
        
        <div className="mb-12">
          <motion.div
            className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden bg-gray-800 ring-4 ring-emerald-400/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
          >
            <img 
              src="https://www.svgrepo.com/show/382106/avatar-placeholder.svg"
              alt=""
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>
        
        <motion.p
          className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          I develop full-stack applications . 3x Hackathon winner 
          passionate about creating innovative solutions that make a difference.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Home;