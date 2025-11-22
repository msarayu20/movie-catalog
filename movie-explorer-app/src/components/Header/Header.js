import React from 'react';
import './Header.css';

/**
 * Header Component
 * 
 * A polished application header featuring:
 * - Elegant branding with gradient text
 * - Real-time movie count display
 * - Responsive design
 * - Smooth animations
 * 
 * @param {object} props - Component properties
 * @param {number} props.movieCount - Number of filtered movies
 * @param {number} props.totalMovies - Total number of movies
 */
export const Header = ({ movieCount, totalMovies }) => {
  return (
    <header className="app-header">
      <div className="container">
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
        
        {/* Decorative Elements */}
        <div className="header-decoration">
          <div className="decoration-circle decoration-circle-1"></div>
          <div className="decoration-circle decoration-circle-2"></div>
          <div className="decoration-circle decoration-circle-3"></div>
        </div>
      </div>
    </header>
  );
};