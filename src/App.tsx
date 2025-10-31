import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogPosts from './pages/posts';
import BlogPostDetail from './pages/posts/[slug]';
import BlogEditor from './pages/create';
import ManagePosts from './pages/manage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/posts" element={<BlogPosts />} />
          <Route path="/blog/create" element={<BlogEditor />} />
          <Route path="/blog/posts/:slug" element={<BlogPostDetail />} />
          <Route path="/blog/manage" element={<ManagePosts />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;