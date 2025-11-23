import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchBar } from '../SearchBar/SearchBar';
import './Header.css';

/**
 * Header Component with integrated search and navigation
 * 
 * @param {object} props - Component properties
 * @param {number} props.movieCount - Number of filtered movies
 * @param {number} props.totalMovies - Total number of movies
 * @param {string} props.searchQuery - Current search query
 * @param {function} props.onSearchChange - Search change handler
 * @param {Array} props.movies - All movies for search suggestions
 * @param {function} props.onMovieSelect - Movie selection handler
 */
export const Header = ({ 
  movieCount, 
  totalMovies, 
  searchQuery, 
  onSearchChange, 
  movies, 
  onMovieSelect 
}) => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <header className="app-header relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 opacity-90"></div>
      
      {/* Moving Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/10 to-transparent 
                        transform -skew-y-12 animate-pulse"></div>
      </div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" 
           style={{backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)', 
                   backgroundSize: '40px 40px'}}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="header-content">
          {/* Brand Section */}
          <div className="brand-section">
            <Link to="/" className="logo-link">
              <div className="logo">
                <span className="logo-icon">🎬</span>
                <h1 className="brand-title">
                  Movie<span className="brand-accent">Explorer</span>
                </h1>
              </div>
            </Link>
            <p className="brand-subtitle">
              Discover your next favorite film
            </p>
          </div>
          
          {/* Navigation Links */}
          <nav className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Home</span>
            </Link>
            <Link 
              to="/all-movies" 
              className={`nav-link ${isActive('/all-movies') ? 'active' : ''}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>All Movies</span>
            </Link>
            <Link 
              to="/favorites" 
              className={`nav-link ${isActive('/favorites') ? 'active' : ''}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>Favorites</span>
            </Link>
          </nav>
          
          {/* Search Bar in Right Corner - Always Visible */}
          <div className="search-section">
            <SearchBar
              value={searchQuery || ''}
              onChange={onSearchChange || (() => {})}
              movies={movies || []}
              onMovieSelect={onMovieSelect || (() => {})}
              placeholder="Search movies..."
            />
          </div>
        </div>
        
        {/* Decorative Background Elements with Tailwind CSS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Primary decorative circle - top right */}
          <div className="absolute w-48 h-48 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-full 
                          -top-24 right-[10%] animate-float opacity-20"></div>
          
          {/* Secondary decorative circle - bottom left */}
          <div className="absolute w-36 h-36 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-full 
                          -bottom-18 left-[5%] animate-float opacity-15"
               style={{animationDelay: '2s'}}></div>
          
          {/* Tertiary decorative circle - middle right */}
          <div className="absolute w-24 h-24 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full 
                          top-1/2 right-[5%] animate-float opacity-10"
               style={{animationDelay: '4s'}}></div>
          
          {/* Additional ambient circles for depth */}
          <div className="absolute w-64 h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full 
                          -top-32 -left-32 animate-pulse opacity-30"></div>
          
          <div className="absolute w-40 h-40 bg-gradient-to-bl from-yellow-500/5 to-orange-500/5 rounded-full 
                          bottom-10 right-1/3 animate-pulse opacity-20"
               style={{animationDelay: '3s'}}></div>
          
          {/* Floating particles effect */}
          <div className="absolute w-2 h-2 bg-primary-400/40 rounded-full top-1/4 left-1/4 animate-ping"
               style={{animationDelay: '1s'}}></div>
          <div className="absolute w-1 h-1 bg-pink-400/60 rounded-full top-3/4 left-3/4 animate-ping"
               style={{animationDelay: '2.5s'}}></div>
          <div className="absolute w-1.5 h-1.5 bg-blue-400/50 rounded-full top-1/3 right-1/4 animate-ping"
               style={{animationDelay: '4.2s'}}></div>
        </div>
      </div>
    </header>
  );
};