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
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6 md:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-red-500/10 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-[20%] left-[20%] w-[30%] h-[30%] bg-orange-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-4xl w-full mx-auto text-center z-10">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Welcome to my <span className="text-gradient">Space.</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Building ideas into impact — one project and blog at a time.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <motion.button
            className="group inline-flex items-center justify-center gap-2 bg-red-500 text-white px-8 py-3 rounded-full font-medium transition-all hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExplore}
          >
            <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Explore Articles</span>
          </motion.button>

          <motion.button
            className="group inline-flex items-center justify-center gap-2 bg-zinc-800/50 text-zinc-300 border border-zinc-700/50 px-8 py-3 rounded-full font-medium transition-all hover:bg-zinc-800 hover:text-white backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRandom}
          >
            <Shuffle size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            <span>Random Read</span>
          </motion.button>
        </div>

        <div className="flex items-center justify-center gap-4 mb-8 opacity-50">
          <div className="h-px w-12 bg-zinc-700"></div>
          <span className="text-zinc-500 text-sm uppercase tracking-widest">Trending Topics</span>
          <div className="h-px w-12 bg-zinc-700"></div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {tags.map((tag, index) => (
            <motion.button
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-red-400 hover:border-red-500/50 rounded-full text-sm transition-all duration-300"
              onClick={() => navigate(`/blog/posts?tag=${encodeURIComponent(tag)}`)}
            >
              {tag}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;