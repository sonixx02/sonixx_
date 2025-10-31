import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBlogPosts } from '../hooks/useLocalStorage';

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
    <div className="min-h-screen px-4 sm:px-6 md:px-8 py-12 sm:py-16 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        {tag && (
          <div className="mb-6 sm:mb-8">
            <button 
              onClick={() => navigate('/blog/posts')}
              className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              ← All Posts
            </button>
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-light mb-8 sm:mb-12 text-left">
          {tag ? `Posts tagged with ${tag}` : 'All Blog Posts'}
        </h1>
        <div className="flex flex-col gap-6 sm:gap-8">
          {filteredPosts.length === 0 ? (
            <div className="text-gray-400 text-center py-8">
              {tag ? `No posts found with tag ${tag}` : 'No blog posts found.'}
            </div>
          ) : (
            filteredPosts.map(post => (
              <div 
                key={post.slug} 
                className="text-left cursor-pointer group p-4 sm:p-6 rounded-lg hover:bg-zinc-900/50 transition-all duration-200" 
                onClick={() => navigate(`/blog/posts/${post.slug}`)}
              >
                <div className="text-gray-400 text-sm mb-2">{post.date}</div>
                <div className="text-xl sm:text-2xl font-semibold text-white group-hover:text-emerald-400 transition-colors duration-200 mb-2">
                  {post.title}
                </div>
                {post.excerpt && (
                  <div className="text-gray-400 text-sm sm:text-base line-clamp-2">
                    {post.excerpt}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;
