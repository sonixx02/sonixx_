import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useBlogPosts } from '../hooks/useLocalStorage';
import AdminAuth from '../components/AdminAuth';

const languages = ['javascript', 'python', 'java', 'c++', 'typescript', 'markdown'];

const BlogEditor: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState('#ffffff');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const { addPost } = useBlogPosts();

  const handleSave = async () => {
    try {
      const newPost = {
        title,
        content,
        code,
        language,
        fontSize,
        fontColor,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };

      await addPost(newPost);
      navigate('/blog/posts');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error saving blog post');
    }
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 flex flex-col items-center">
      <div className="max-w-5xl w-full bg-gray-900 rounded-xl p-4 sm:p-6 md:p-8 border border-gray-800 shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-emerald-400">Create a New Blog Post</h1>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full mb-4 sm:mb-6 px-4 py-2 rounded bg-gray-800 text-white text-base sm:text-lg border border-gray-700 focus:outline-none focus:border-emerald-400"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <div className="space-y-4 sm:space-y-6">
            <div className="sticky top-4 sm:top-6">
              <textarea
                placeholder="Write your blog content here (Markdown supported)"
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={12}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white text-sm sm:text-base border border-gray-700 focus:outline-none focus:border-emerald-400"
              />
              <div className="mt-4 sm:mt-6">
                <label className="block text-gray-400 mb-2 text-sm sm:text-base">Add Code Snippet</label>
                <div className="flex flex-wrap gap-2 sm:gap-4 mb-2">
                  <select
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    className="flex-grow px-3 py-1 rounded bg-gray-800 text-white text-sm border border-gray-700"
                    title="Select language"
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2">
                    <label className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">Size</label>
                    <input 
                      type="number" 
                      min={12} 
                      max={32} 
                      value={fontSize} 
                      onChange={e => setFontSize(Number(e.target.value))} 
                      className="w-14 sm:w-16 px-2 py-1 rounded bg-gray-800 text-white text-sm border border-gray-700" 
                      title="Font size" 
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">Color</label>
                    <input 
                      type="color" 
                      value={fontColor} 
                      onChange={e => setFontColor(e.target.value)} 
                      className="w-8 h-8 border-none rounded" 
                      title="Font color" 
                    />
                  </div>
                </div>
                <textarea
                  placeholder="Paste your code here"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-emerald-400 font-mono text-sm sm:text-base"
                  style={{ fontSize: `${fontSize}px`, color: fontColor }}
                />
              </div>
            </div>
          </div>
          <div className="border-t lg:border-t-0 lg:border-l border-gray-700 pt-4 lg:pt-0 lg:pl-8">
            <h2 className="text-lg sm:text-xl text-emerald-400 mb-4 sticky top-4 sm:top-6">Preview</h2>
            <div className="prose prose-invert max-w-none prose-sm sm:prose-base">
              <ReactMarkdown
                components={{
                  code({node, inline, className, children, ...props}: any) {
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
              >
                {content}
              </ReactMarkdown>
              {code && (
                <div className="mt-4">
                  <div className="text-gray-400 mb-2">Code Snippet ({language})</div>
                  <SyntaxHighlighter
                    style={oneDark}
                    language={language}
                    customStyle={{ fontSize: `${fontSize}px`, color: fontColor }}
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-emerald-400 text-black rounded-lg font-semibold hover:bg-emerald-500 transition-colors duration-200"
          >
            Save Blog Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
