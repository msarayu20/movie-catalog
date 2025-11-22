import React from 'react';

/**
 * LoadingSpinner Component with Tailwind CSS
 * 
 * A beautiful, modern loading spinner with multiple animation layers.
 * Features smooth animations and accessibility considerations.
 */
export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12" role="status" aria-label="Loading content">
      {/* Main Spinner */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Spinner Rings */}
        <div className="absolute w-full h-full border-3 border-primary-500 border-t-transparent border-r-transparent 
                        rounded-full animate-spin"></div>
        <div className="absolute w-4/5 h-4/5 border-2 border-transparent border-r-primary-600 border-b-primary-600 
                        rounded-full animate-spin" style={{animationDuration: '2s', animationDirection: 'reverse'}}></div>
        <div className="absolute w-3/5 h-3/5 border-2 border-primary-500/50 border-t-transparent border-l-transparent 
                        rounded-full animate-spin" style={{animationDuration: '2.5s'}}></div>
        
        {/* Center Icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <span className="text-2xl opacity-80 animate-pulse-custom">🎬</span>
        </div>
        
        {/* Glow Effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full opacity-10 
                        animate-pulse-custom blur-sm"></div>
      </div>
      
      {/* Accessibility Text */}
      <span className="sr-only">Loading movies...</span>
      
      {/* Loading Dots */}
      <div className="flex space-x-2 items-center">
        <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
        <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
      </div>
    </div>
  );
};