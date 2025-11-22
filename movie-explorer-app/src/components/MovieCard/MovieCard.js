import React, { useState } from 'react';
import { formatRating, getGenreGradient, truncateText } from '../../services/movieService';

/**
 * MovieCard Component
 * 
 * A beautifully designed movie card featuring:
 * - Glass-morphism design with dynamic gradients
 * - Smooth hover animations and micro-interactions
 * - Responsive layout for both grid and list views
 * - Favorite functionality with heart animation
 * - Accessibility features and keyboard navigation
 * 
 * This component showcases modern CSS techniques and React best practices.
 */
export const MovieCard = ({
  movie,
  viewMode = 'grid',
  isFavorite = false,
  onSelect,
  onToggleFavorite,
  animationDelay = 0
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const rating = formatRating(movie.rating);
  const gradient = getGenreGradient(movie.genre);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  };
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click
    onToggleFavorite();
  };

  return (
    <article
      className={`${
        viewMode === 'grid' 
          ? 'flex flex-col bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden group hover:scale-[1.02] hover:bg-white/10 transition-all duration-300 cursor-pointer' 
          : 'flex bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden group hover:bg-white/10 transition-all duration-300 cursor-pointer'
      } animate-slide-up`}
      onClick={onSelect}
      onKeyPress={handleKeyPress}
      tabIndex="0"
      role="button"
      aria-label={`View details for ${movie.title}`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Movie Poster */}
      <div className={`relative ${viewMode === 'grid' ? 'aspect-[2/3]' : 'w-32 h-48 flex-shrink-0'} overflow-hidden`}>
        {!imageError ? (
          <img
            src={movie.poster}
            alt={`${movie.title} poster`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center text-gray-400">
            <span className="text-4xl mb-2">🎬</span>
            <span className="text-sm font-medium">No Image</span>
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-md px-1.5 py-0.5 flex items-center space-x-1 text-xs">
          <span className="text-yellow-400">{rating.stars}</span>
          <span className="text-white font-medium">{rating.numeric}</span>
        </div>
        
        {/* Favorite Button */}
        <button
          className={`absolute top-2 right-2 w-7 h-7 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
            isFavorite 
              ? 'bg-red-500 text-white animate-heart-pulse' 
              : 'bg-black/50 text-gray-300 hover:bg-red-500 hover:text-white'
          }`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className="w-4 h-4"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-white ml-1"
            >
              <polygon points="5,3 19,12 5,21"></polygon>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Movie Info */}
      <div className={`${viewMode === 'grid' ? 'p-4' : 'flex-1 p-4'} flex flex-col`}>
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary-300 transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center text-sm text-gray-400 mb-3 flex-wrap gap-2">
          <span className="text-gray-300 font-medium">{movie.year}</span>
          <span className="text-gray-600">•</span>
          <div className="flex flex-wrap gap-1">
            {movie.genre && movie.genre.slice(0, 2).map((genre, index) => (
              <span key={genre} className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs">
                {genre}
              </span>
            ))}
            {movie.genre && movie.genre.length > 2 && (
              <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                +{movie.genre.length - 2}
              </span>
            )}
          </div>
        </div>
        
        {viewMode === 'list' && (
          <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
            {truncateText(movie.description, 120)}
          </p>
        )}
        
        {/* Card Footer */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">Rating:</span>
            <span className="text-sm font-medium text-white">{rating.numeric}/10</span>
          </div>
          
          <button className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-lg text-sm font-medium hover:bg-primary-500/30 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </article>
  );
};