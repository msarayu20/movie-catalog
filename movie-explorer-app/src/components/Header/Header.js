import React from 'react';
import './Header.css';

/**
 * Header Component
 * 
 * A polished application header featuring:
 * - Elegant branding with gradient text
 * - Real-time movie count display
 * - Responsive design with Tailwind CSS
 * - Smooth animations
 * 
 * @param {object} props - Component properties
 * @param {number} props.movieCount - Number of filtered movies
 * @param {number} props.totalMovies - Total number of movies
 */
export const Header = ({ movieCount, totalMovies }) => {
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
            <div className="logo">
              <span className="logo-icon">🎬</span>
              <h1 className="brand-title">
                Movie<span className="brand-accent">Explorer</span>
              </h1>
            </div>
            <p className="brand-subtitle">
              Discover your next favorite film
            </p>
          </div>
          
          {/* Stats Section */}
          {movieCount !== undefined && totalMovies !== undefined && (
            <div className="stats-section">
              <div className="stat-item">
                <span className="stat-label">Showing</span>
                <span className="stat-value">{movieCount.toLocaleString()}</span>
              </div>
              <div className="stat-divider">of</div>
              <div className="stat-item">
                <span className="stat-label">Total</span>
                <span className="stat-value">{totalMovies.toLocaleString()}</span>
              </div>
            </div>
          )}
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