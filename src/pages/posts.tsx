import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBlogPosts } from '../hooks/useLocalStorage';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, ArrowRight } from 'lucide-react';

const BlogPosts: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { posts } = useBlogPosts();

  // Tag filter from query param
  const query = new URLSearchParams(location.search);
  const tag = query.get('tag');
  const filteredPosts = tag
    ? posts.filter(post => post.content?.includes(tag) || post.title?.includes(tag))
    : posts;

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 py-12 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-2 mb-12">
          {tag && (
            <button 
              onClick={() => navigate('/blog/posts')}
              className="text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-2 mb-4 w-fit group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>All Posts</span>
            </button>
          )}
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            {tag ? (
              <span className="flex items-center gap-3">
                <Tag className="text-emerald-400" />
                {tag}
              </span>
            ) : (
              <>
                Writing <span className="text-emerald-400">.</span>
              </>
            )}
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mt-4">
            Thoughts on software engineering, design patterns, and the future of web development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-zinc-900/30 rounded-2xl border border-zinc-800 border-dashed">
              <p className="text-zinc-500 text-lg">
                {tag ? `No posts found with tag "${tag}"` : 'No blog posts found yet.'}
              </p>
            </div>
          ) : (
            filteredPosts.map((post, index) => (
              <motion.div 
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-emerald-500/30 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col h-full"
                onClick={() => navigate(`/blog/posts/${post.slug}`)}
              >
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium mb-4 uppercase tracking-wider">
                  <Calendar size={12} />
                  {post.date}
                </div>
                
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                
                {post.excerpt && (
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex items-center text-sm text-zinc-500 group-hover:text-emerald-400 transition-colors mt-auto pt-4 border-t border-zinc-800/50 group-hover:border-emerald-500/20">
                  Read Article
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;
