import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { useBlogPosts } from '../hooks/useLocalStorage';
import AdminAuth from '../components/AdminAuth';
import { 
  Save, Code, Type, Layout, Eye, Bold, Italic, Underline, 
  Strikethrough, Highlighter, Image, Link as LinkIcon, 
  Video, FileText, List, ListOrdered, Quote, Palette,
  Heading1, Heading2, Heading3, X, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = ['javascript', 'python', 'java', 'c++', 'typescript', 'markdown', 'bash', 'json', 'html', 'css'];

const BlogEditor: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [fontSize, setFontSize] = useState(14);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const [showUrlInput, setShowUrlInput] = useState<{ type: 'link' | 'image' | 'video' | 'file' | null, url: string }>({ type: null, url: '' });
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const { addPost } = useBlogPosts();

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    try {
      const newPost = {
        title,
        content,
        code,
        language,
        fontSize,
        fontColor: '#ffffff',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };

      await addPost(newPost);
      navigate('/blog/posts');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error saving blog post');
    }
  };

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
    
    setContent(newText);
    
    // Restore selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const handleUrlSubmit = () => {
    const { type, url } = showUrlInput;
    if (!url) {
      setShowUrlInput({ type: null, url: '' });
      return;
    }

    switch (type) {
      case 'link':
        insertText('[', `](${url})`);
        break;
      case 'image':
        insertText(`![Image](${url})`);
        break;
      case 'video':
        insertText(`<video src="${url}" controls width="100%"></video>`);
        break;
      case 'file':
        insertText(`[Download File](${url})`);
        break;
    }
    setShowUrlInput({ type: null, url: '' });
  };

  const colors = [
    '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', 
    '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#ffffff'
  ];

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create New Post</h1>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Save size={18} />
            Publish
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-180px)]">
          {/* Editor Column */}
          <div className={`flex flex-col gap-6 ${activeTab === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="space-y-4 h-full flex flex-col">
              <div className="relative group shrink-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                  <Type size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Post Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                />
              </div>

              <div className="flex-grow flex flex-col bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-1 p-2 border-b border-zinc-800 bg-zinc-900/80">
                  <div className="flex items-center gap-1 pr-2 border-r border-zinc-800">
                    <button onClick={() => insertText('# ')} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded" title="Heading 1"><Heading1 size={16} /></button>
                    <button onClick={() => insertText('## ')} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded" title="Heading 2"><Heading2 size={16} /></button>
                    <button onClick={() => insertText('### ')} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded" title="Heading 3"><Heading3 size={16} /></button>
                  </div>
                  
                  <div className="flex items-center gap-1 px-2 border-r border-zinc-800">
                    <button onClick={() => insertText('**', '**')} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded" title="Bold"><Bold size={16} /></button>
                    <button onClick={() => insertText('*', '*')} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded" title="Italic"><Italic size={16} /></button>
                    <button onClick={() => insertText('<u>', '</u>')} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded" title="Underline"><Underline size={16} /></button>
                    <button onClick={() => insertText('~~', '~~')} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded" title="Strikethrough"><Strikethrough size={16} /></button>
                    <button onClick={() => insertText('<mark>', '</mark>')} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded" title="Highlight"><Highlighter size={16} /></button>
                    
                    <div className="relative">
                      <button 
                        onClick={() => setShowColorPicker(!showColorPicker)} 
                        className={`p-1.5 rounded ${showColorPicker ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                        title="Text Color"
                      >
                        <Palette size={16} />
                      </button>
                      <AnimatePresence>
                        {showColorPicker && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute top-full left-0 mt-2 p-2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 grid grid-cols-4 gap-1 w-32"
                          >
                            {colors.map(color => (
                              <button
                                key={color}
                                onClick={() => {
                                  insertText(`<span style="color: ${color}">`, '</span>');
                                  setShowColorPicker(false);
                                }}
                                className="w-6 h-6 rounded-full border border-zinc-700 hover:scale-110 transition-transform"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 px-2 border-r border-zinc-800">
                    <button onClick={() => insertText('- ')} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded" title="Bullet List"><List size={16} /></button>
                    <button onClick={() => insertText('1. ')} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded" title="Ordered List"><ListOrdered size={16} /></button>
                    <button onClick={() => insertText('> ')} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded" title="Quote"><Quote size={16} /></button>
                    <button onClick={() => insertText('```\n', '\n```')} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded" title="Code Block"><Code size={16} /></button>
                  </div>

                  <div className="flex items-center gap-1 pl-2">
                    <button onClick={() => setShowUrlInput({ type: 'link', url: '' })} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded" title="Link"><LinkIcon size={16} /></button>
                    <button onClick={() => setShowUrlInput({ type: 'image', url: '' })} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded" title="Image"><Image size={16} /></button>
                    <button onClick={() => setShowUrlInput({ type: 'video', url: '' })} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded" title="Video"><Video size={16} /></button>
                    <button onClick={() => setShowUrlInput({ type: 'file', url: '' })} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded" title="Document"><FileText size={16} /></button>
                  </div>

                  <div className="ml-auto flex gap-2 lg:hidden">
                    <button 
                      onClick={() => setActiveTab('write')}
                      className={`px-3 py-1 rounded-md text-xs font-medium ${activeTab === 'write' ? 'bg-emerald-500/10 text-emerald-400' : 'text-zinc-400'}`}
                    >
                      Write
                    </button>
                    <button 
                      onClick={() => setActiveTab('preview')}
                      className={`px-3 py-1 rounded-md text-xs font-medium ${activeTab === 'preview' ? 'bg-emerald-500/10 text-emerald-400' : 'text-zinc-400'}`}
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {/* URL Input Modal/Popover */}
                <AnimatePresence>
                  {showUrlInput.type && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-zinc-900/90 border-b border-zinc-800 px-4 py-3 flex items-center gap-2"
                    >
                      <input
                        type="text"
                        placeholder={`Enter ${showUrlInput.type} URL...`}
                        value={showUrlInput.url}
                        onChange={e => setShowUrlInput({ ...showUrlInput, url: e.target.value })}
                        className="flex-grow bg-zinc-800 border border-zinc-700 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                        autoFocus
                        onKeyDown={e => e.key === 'Enter' && handleUrlSubmit()}
                      />
                      <button onClick={handleUrlSubmit} className="p-1.5 bg-emerald-500 text-white rounded hover:bg-emerald-600"><Check size={14} /></button>
                      <button onClick={() => setShowUrlInput({ type: null, url: '' })} className="p-1.5 bg-zinc-700 text-zinc-300 rounded hover:bg-zinc-600"><X size={14} /></button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <textarea
                  ref={textareaRef}
                  placeholder="Write your story... (Markdown & HTML supported)"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="flex-grow w-full p-4 bg-transparent text-zinc-300 resize-none focus:outline-none font-mono text-sm leading-relaxed custom-scrollbar"
                />
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden shrink-0">
                <div className="flex items-center gap-4 px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
                  <Code size={16} className="text-zinc-400" />
                  <span className="text-sm font-medium text-zinc-300">Additional Code Snippet</span>
                  <select
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    className="ml-auto bg-zinc-800 text-zinc-300 text-xs rounded px-2 py-1 border-none focus:ring-0 cursor-pointer"
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
                <textarea
                  placeholder="Paste code here..."
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  rows={4}
                  className="w-full p-4 bg-transparent text-zinc-300 resize-none focus:outline-none font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Preview Column */}
          <div className={`bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden flex flex-col ${activeTab === 'write' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
              <Eye size={16} className="text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Live Preview</span>
            </div>
            <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
              <div className="prose prose-invert prose-emerald max-w-none">
                <h1>{title || 'Untitled Post'}</h1>
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({node, inline, className, children, ...props}: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{ background: '#18181b', borderRadius: '0.75rem', border: '1px solid #27272a' }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-emerald-400 text-sm" {...props}>
                          {children}
                        </code>
                      );
                    },
                    img: ({src, alt}) => (
                      <img src={src} alt={alt} className="rounded-xl border border-zinc-800 shadow-lg my-6 w-full object-cover" />
                    ),
                    video: ({src, ...props}) => (
                      <video src={src} className="rounded-xl border border-zinc-800 shadow-lg my-6 w-full" controls {...props} />
                    )
                  }}
                >
                  {content || '*No content yet...*'}
                </ReactMarkdown>
                {code && (
                  <div className="mt-6 not-prose">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{language}</span>
                    </div>
                    <SyntaxHighlighter
                      style={oneDark}
                      language={language}
                      customStyle={{ background: '#18181b', borderRadius: '0.75rem', border: '1px solid #27272a', fontSize: '14px' }}
                    >
                      {code}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
