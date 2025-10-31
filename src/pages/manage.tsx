import React, { useState } from 'react';
import { useBlogPosts } from '../hooks/useLocalStorage';
import { X, Lock, Plus } from 'lucide-react';
// import { getAvailableNotionBlogs, importNotionBlog } from '../utils/notionImport';

const ADMIN_PIN = '0209'; // You can change this to your desired PIN

const ManagePosts: React.FC = () => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { posts, deletePost, addPost } = useBlogPosts();
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
      <div className="min-h-screen px-8 py-16 flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="text-emerald-400" size={24} />
            <h1 className="text-2xl font-semibold text-emerald-400">Admin Access</h1>
          </div>
          <form onSubmit={handlePinSubmit}>
            <input
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full mb-4 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-emerald-400 text-black rounded-lg font-semibold hover:bg-emerald-500 transition-colors duration-200"
            >
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

//   const [isImporting, setIsImporting] = useState(false);

//   const handleImportNotion = async () => {
//     try {
//       setIsImporting(true);
//       const blogs = getAvailableNotionBlogs();
//       for (const blog of blogs) {
//         try {
//           const importedBlog = await importNotionBlog(blog);
//           await addPost(importedBlog);
//         } catch (error) {
//           console.error(`Error importing blog "${blog.title}":`, error);
//           // Continue with other blogs even if one fails
//         }
//       }
//       alert('Successfully imported available blogs');
//     } catch (error) {
//       alert('Error importing blogs: ' + (error instanceof Error ? error.message : String(error)));
//     } finally {
//       setIsImporting(false);
//     }
//   };

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 py-12 sm:py-16 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-emerald-400">Manage Blog Posts</h1>
          {/* <button
            onClick={handleImportNotion}
            disabled={isImporting}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-400 text-black rounded-lg hover:bg-emerald-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center sm:justify-start"
          >
            <Plus size={20} />
            <span>{isImporting ? 'Importing...' : 'Import from Notion'}</span>
          </button> */}
        </div>
        <div className="space-y-4 sm:space-y-6">
          {posts.length === 0 ? (
            <div className="text-gray-400 text-center py-8">No blog posts found.</div>
          ) : (
            posts.map((post) => (
              <div
                key={post.slug}
                className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0"
              >
                <div className="w-full sm:w-auto">
                  <div className="text-sm text-gray-400 mb-1">{post.date}</div>
                  <div className="text-lg sm:text-xl text-white">{post.title}</div>
                </div>
                <button
                  onClick={() => handleDeleteClick(post.slug)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors w-full sm:w-auto flex justify-center sm:justify-start items-center gap-2 border border-red-400/20 sm:border-0 rounded-lg sm:rounded-none"
                  title="Delete post"
                >
                  <X size={20} />
                  <span className="sm:hidden">Delete Post</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800 max-w-md w-full mx-4">
            <h2 className="text-lg sm:text-xl text-white mb-3 sm:mb-4">Confirm Deletion</h2>
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 sm:justify-end">
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setPostToDelete(null);
                }}
                className="w-full sm:w-auto px-4 py-2 text-gray-300 hover:text-white transition-colors border border-gray-600 rounded-lg sm:border-0 sm:rounded-none"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePosts;