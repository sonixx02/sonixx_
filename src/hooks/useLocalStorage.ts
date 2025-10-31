import { useState, useEffect } from 'react';

interface BlogPost {
  title: string;
  content: string;
  code?: string;
  language?: string;
  fontSize?: number;
  fontColor?: string;
  date: string;
  slug: string;
  excerpt?: string;
}

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Get from localStorage on mount
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
};

export const useBlogPosts = () => {
  const [posts, setPosts] = useLocalStorage<BlogPost[]>('blogPosts', []);

  const addPost = (newPost: BlogPost) => {
    try {
      // Validate required fields
      if (!newPost.title.trim()) {
        throw new Error('Title is required');
      }
      if (!newPost.content.trim()) {
        throw new Error('Content is required');
      }

      // Check for duplicate slugs
      if (posts.some(post => post.slug === newPost.slug)) {
        throw new Error('A post with this title already exists');
      }

      setPosts([newPost, ...posts]);
      return true;
    } catch (error) {
      console.error('Error adding blog post:', error);
      throw error;
    }
  };

  const getPost = (slug: string) => {
    try {
      const post = posts.find(p => p.slug === slug);
      if (!post) {
        throw new Error('Blog post not found');
      }
      return post;
    } catch (error) {
      console.error(`Error retrieving blog post with slug "${slug}":`, error);
      throw error;
    }
  };

  const getRandomPost = () => {
    try {
      if (posts.length === 0) {
        throw new Error('No blog posts available');
      }
      return posts[Math.floor(Math.random() * posts.length)];
    } catch (error) {
      console.error('Error getting random post:', error);
      throw error;
    }
  };

  const deletePost = async (slug: string) => {
    try {
      const postIndex = posts.findIndex(p => p.slug === slug);
      if (postIndex === -1) {
        throw new Error('Blog post not found');
      }

      const updatedPosts = [...posts];
      updatedPosts.splice(postIndex, 1);
      setPosts(updatedPosts);
      return true;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  };

  return {
    posts,
    addPost,
    getPost,
    getRandomPost,
    deletePost,
  };
};