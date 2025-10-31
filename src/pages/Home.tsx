import React from 'react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
    >
      <div className="max-w-4xl w-full mx-auto">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 sm:mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
        >
          Hey, I'm <span className="text-emerald-400">Darshan</span>, a passionate{' '}
          <span className="text-gray-300">Full-Stack Developer</span>
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          who's curious about <span className="text-emerald-400">AI & Innovation.</span>
        </motion.h1>
        
        {/* <div className="mb-8 sm:mb-12">
          <motion.div
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-6 sm:mb-8 rounded-full overflow-hidden bg-gray-800 ring-4 ring-emerald-400/20"
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
        </div> */}
        
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          I develop full-stack applications. 4x Hackathon winner 
          passionate about creating innovative solutions that make a difference.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Home;