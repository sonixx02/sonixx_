import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useBlogPosts } from '../../hooks/useLocalStorage';
import { ArrowLeft, Calendar, Clock, Share2, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getPost } = useBlogPosts();

  let post = null;
  try {
    if (slug) {
      post = getPost(slug);
    }
  } catch (error) {
    console.error('Error loading post:', error);
  }

  useEffect(() => {
    if (!post && slug) {
       const timer = setTimeout(() => navigate('/blog/posts'), 2000);
       return () => clearTimeout(timer);
    }
  }, [post, slug, navigate]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Post Not Found</h2>
          <p>Redirecting to blog list...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 py-12 sm:py-20">
      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <button 
          onClick={() => navigate('/blog/posts')}
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 sm:mb-12"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Posts</span>
        </button>

        <header className="mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-400 font-medium mb-6 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              {post.date}
            </div>
            <span className="text-zinc-700">•</span>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              {Math.ceil((post.content?.length || 0) / 1000)} min read
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-8">
            {post.title}
          </h1>

          <div className="h-px w-full bg-gradient-to-r from-emerald-500/50 via-zinc-800 to-transparent" />
        </header>

        <div className="prose prose-invert prose-lg prose-emerald max-w-none">
          <ReactMarkdown
            components={{
              code({node, inline, className, children, ...props}: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="relative group my-8">
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                    <div className="relative">
                      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-t-xl border-b-0">
                        <span className="text-xs font-medium text-zinc-400 uppercase">{match[1]}</span>
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                        </div>
                      </div>
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{ 
                          margin: 0,
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 0,
                          borderBottomLeftRadius: '0.75rem',
                          borderBottomRightRadius: '0.75rem',
                          background: '#09090b',
                          border: '1px solid #27272a',
                        }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                ) : (
                  <code className="bg-zinc-800/50 text-emerald-400 px-1.5 py-0.5 rounded font-medium text-sm border border-zinc-700/50" {...props}>
                    {children}
                  </code>
                );
              },
              h2: ({children}) => (
                <h2 className="text-3xl font-bold text-white mt-16 mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-emerald-500 rounded-full" />
                  {children}
                </h2>
              ),
              p: ({children}) => (
                <p className="text-zinc-300 leading-relaxed mb-6 text-lg">
                  {children}
                </p>
              ),
              blockquote: ({children}) => (
                <blockquote className="border-l-4 border-emerald-500 pl-6 py-2 my-8 bg-zinc-900/50 rounded-r-lg italic text-zinc-300">
                  {children}
                </blockquote>
              ),
            }}
          >
            {post.content || ''}
          </ReactMarkdown>
        </div>

        {post.code && (
          <div className="mt-12 mb-8">
            <div className="flex items-center gap-2 mb-4 text-zinc-400 text-sm uppercase tracking-wider font-medium">
              <Code size={16} />
              Additional Snippet ({post.language})
            </div>
            <SyntaxHighlighter
              style={oneDark}
              language={post.language}
              customStyle={{ 
                fontSize: `${post.fontSize}px`, 
                color: post.fontColor, 
                borderRadius: '1rem', 
                background: '#09090b', 
                padding: '1.5rem',
                border: '1px solid #27272a'
              }}
            >
              {post.code}
            </SyntaxHighlighter>
          </div>
        )}

        <div className="mt-20 pt-8 border-t border-zinc-800 flex justify-between items-center">
          <div className="text-zinc-500 text-sm">
            Thanks for reading!
          </div>
          <button className="flex items-center gap-2 text-zinc-400 hover:text-emerald-400 transition-colors">
            <Share2 size={18} />
            <span className="text-sm font-medium">Share Article</span>
          </button>
        </div>
      </motion.article>
    </div>
  );
};

export default BlogPostDetail;
