import React from 'react';

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
    <header className="relative py-12 bg-gradient-to-br from-dark-900 to-dark-800 border-b border-white/10 overflow-hidden animate-slide-up">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center relative z-10">
          {/* Brand Section */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-5xl animate-float filter drop-shadow-lg">🎬</span>
              <h1 className="text-5xl font-extrabold">
                <span className="gradient-text">Movie</span>
                <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">Explorer</span>
              </h1>
            </div>
            <p className="text-gray-400 text-lg font-normal opacity-0 animate-fade-in ml-20" style={{animationDelay: '0.5s'}}>
              Discover your next favorite film
            </p>
          </div>
          
          {/* Stats Section */}
          {movieCount !== undefined && totalMovies !== undefined && (
            <div className="flex items-center space-x-8 glass rounded-3xl px-8 py-6 opacity-0 animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="flex flex-col items-center text-center">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Showing</span>
                <span className="text-2xl font-bold gradient-text">{movieCount.toLocaleString()}</span>
              </div>
              <div className="text-gray-500 text-lg font-light">of</div>
              <div className="flex flex-col items-center text-center">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Total</span>
                <span className="text-2xl font-bold gradient-text">{totalMovies.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-48 h-48 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full opacity-10 -top-24 right-1/4 animate-float"></div>
          <div className="absolute w-36 h-36 bg-gradient-to-r from-pink-500 to-red-500 rounded-full opacity-10 -bottom-18 left-1/12 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute w-24 h-24 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full opacity-10 top-1/2 right-1/12 animate-float" style={{animationDelay: '4s'}}></div>
        </div>
      </div>
    </header>
  );
};