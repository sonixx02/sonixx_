import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/about', label: 'about' },
    { path: '/projects', label: 'projects' },
    { path: '/blog', label: 'blog' },
  ];

  return (
    <nav className="fixed top-0 w-full z-40 bg-zinc-950/90 backdrop-blur-sm border-b border-gray-800/50">
      <div className="max-w-6xl mx-auto px-8 py-6 flex justify-between items-center">
        <Link to="/" className="text-3xl font-light text-emerald-400 hover:text-emerald-300 transition-colors duration-300">
          ds
        </Link>
        
        <div className="flex space-x-12">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-lg font-light transition-colors duration-300 relative ${
                location.pathname === item.path
                  ? 'text-emerald-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-emerald-400 rounded-full"></div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;