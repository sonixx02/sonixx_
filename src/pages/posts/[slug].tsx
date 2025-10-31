import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useBlogPosts } from '../../hooks/useLocalStorage';

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
    setTimeout(() => navigate('/blog/posts'), 2000); // Redirect after showing error message
  }

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Blog post not found.</div>;
  }

  return (
    <div className="min-h-screen px-8 py-16 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-lg">
        <div className="text-gray-400 text-sm mb-2">{post.date}</div>
        <h1 className="text-3xl font-semibold mb-6 text-white">{post.title}</h1>
        <div className="prose prose-invert mb-8 text-gray-200">
          <ReactMarkdown
            children={post.content}
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>{children}</code>
                );
              }
            }}
          />
        </div>
        {post.code && (
          <div className="mb-8">
            <div className="text-gray-400 mb-2">Code Snippet ({post.language})</div>
            <SyntaxHighlighter
              style={oneDark}
              language={post.language}
              customStyle={{ fontSize: post.fontSize, color: post.fontColor, borderRadius: '0.5rem', background: '#23272e', padding: '1rem' }}
            >
              {post.code}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostDetail;
