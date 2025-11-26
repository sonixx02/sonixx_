import React, { useState } from 'react';
import { useBlogPosts } from '../hooks/useLocalStorage';
import { X, Lock, Trash2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ADMIN_PIN = '0209';

const ManagePosts: React.FC = () => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { posts, deletePost } = useBlogPosts();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect PIN');
      setPin('');
    }
  };

  const handleDeleteClick = (slug: string) => {
    setPostToDelete(slug);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      try {
        await deletePost(postToDelete);
        setShowConfirmation(false);
        setPostToDelete(null);
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Error deleting post');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen px-4 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-zinc-900/50 backdrop-blur-md rounded-2xl p-8 border border-zinc-800 shadow-2xl"
        >
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="p-4 bg-emerald-500/10 rounded-full text-emerald-400">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Access</h1>
            <p className="text-zinc-400 text-center text-sm">Please enter your PIN to manage blog posts.</p>
          </div>
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-950/50 text-white border border-zinc-800 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all text-center tracking-widest text-lg"
              autoFocus
            />
            <button
              type="submit"
              className="w-full px-4 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Authenticate
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-bold text-white">Manage Posts</h1>
          <div className="px-4 py-2 bg-zinc-900 rounded-full border border-zinc-800 text-zinc-400 text-sm">
            Total Posts: <span className="text-emerald-400 font-semibold">{posts.length}</span>
          </div>
        </div>

        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-zinc-800 border-dashed">
              <p className="text-zinc-500">No blog posts found.</p>
            </div>
          ) : (
            <AnimatePresence>
              {posts.map((post) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="group bg-zinc-900/50 hover:bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">{post.title}</h3>
                    <p className="text-sm text-zinc-500">{post.date}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteClick(post.slug)}
                    className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-white hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                  >
                    <Trash2 size={18} />
                    <span className="text-sm font-medium">Delete</span>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-500/10 rounded-full text-red-400">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Delete Post?</h2>
                  <p className="text-zinc-400 text-sm">This action cannot be undone.</p>
                </div>
              </div>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowConfirmation(false);
                    setPostToDelete(null);
                  }}
                  className="px-4 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium shadow-lg shadow-red-500/20"
                >
                  Delete Post
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManagePosts;