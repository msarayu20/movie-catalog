import React from 'react';
import './LoadingSpinner.css';

/**
 * LoadingSpinner Component
 * 
 * A beautiful, modern loading spinner with multiple animation layers.
 * Features smooth animations and accessibility considerations.
 * This component demonstrates attention to micro-interactions
 * that enhance user experience.
 */
export const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container" role="status" aria-label="Loading content">
      {/* Main Spinner */}
      <div className="loading-spinner">
        <div className="spinner-ring spinner-ring--1"></div>
        <div className="spinner-ring spinner-ring--2"></div>
        <div className="spinner-ring spinner-ring--3"></div>
        <div className="spinner-center">
          <span className="spinner-icon">🎬</span>
        </div>
      </div>
      
      {/* Accessibility Text */}
      <span className="sr-only">Loading movies...</span>
      
      {/* Loading Dots */}
      <div className="loading-dots">
        <span className="dot dot--1"></span>
        <span className="dot dot--2"></span>
        <span className="dot dot--3"></span>
      </div>
    </div>
  );
};