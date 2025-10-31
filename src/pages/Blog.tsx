import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Shuffle } from 'lucide-react';
import { useBlogPosts } from '../hooks/useLocalStorage';

const Blog: React.FC = () => {
  const tags = ['#ai', '#webdev', '#innovation', '#dsa', '#interview'];
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/blog/posts');
  };

  const { getRandomPost } = useBlogPosts();

  const handleRandom = () => {
    try {
      const randomPost = getRandomPost();
      navigate(`/blog/posts/${randomPost.slug}`);
    } catch (error) {
      console.error('Error getting random post:', error);
      navigate('/blog/posts');
    }
  };

  return (
    <motion.div
      className="min-h-screen px-4 sm:px-6 md:px-8 py-12 sm:py-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-light mb-6 sm:mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
        >
          Hey, welcome to my <span className="text-emerald-400">Space.</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Building ideas into impact — one project and blog at a time.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-10 px-4 sm:px-0">
          <motion.button
            className="inline-flex items-center justify-center space-x-2 bg-transparent border border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black px-6 sm:px-8 py-3 rounded-lg transition-all duration-300 w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExplore}
          >
            <ArrowUpRight size={20} />
            <span>Explore</span>
          </motion.button>

          <motion.button
            className="inline-flex items-center justify-center space-x-2 bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white px-6 sm:px-8 py-3 rounded-lg transition-all duration-300 w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRandom}
          >
            <Shuffle size={20} />
            <span>Random</span>
          </motion.button>
        </div>

        <div className="flex items-center justify-center mb-6 sm:mb-8 px-4 sm:px-0">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-4 sm:px-6 text-gray-400 text-base sm:text-lg">OR</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 px-4 sm:px-0">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`px-4 sm:px-6 py-2 border border-gray-600 text-sm sm:text-base text-gray-300 hover:border-emerald-400 hover:text-emerald-400 rounded-full transition-colors duration-300`}
              onClick={() => navigate(`/blog/posts?tag=${encodeURIComponent(tag)}`)}
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