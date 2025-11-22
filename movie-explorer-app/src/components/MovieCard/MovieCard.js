import React, { useState } from 'react';
import { formatRating, getGenreGradient, truncateText } from '../../services/movieService';

/**
 * MovieCard Component - Enhanced UX Version
 * 
 * Sophisticated movie card featuring:
 * - Intelligent data presentation with contextual information
 * - Advanced hover states and micro-interactions
 * - Smart genre color coding and rating visualization
 * - Accessibility features and keyboard navigation
 * - Performance optimizations and lazy loading
 * 
 * Data Utilization Strategy:
 * - Leverages all movie properties for rich information display
 * - Intelligent genre grouping and color coding
 * - Contextual rating display with visual indicators
 * - Smart image loading with fallbacks
 * 
 * UX Enhancement Features:
 * - Smooth animations with staggered delays
 * - Interactive elements with proper feedback
 * - Contextual information on hover/focus
 * - Accessibility-first design approach
 */
export const MovieCard = ({
  movie,
  viewMode = 'grid',
  isFavorite = false,
  onSelect,
  onToggleFavorite,
  animationDelay = 0,
  similarMovies = [], // New prop for enhanced UX
  averageRating = 0   // New prop for contextual data
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const rating = formatRating(movie.rating);
  
  // Enhanced genre analysis for better UX
  const getGenreInsights = (genres, allMovies = []) => {
    if (!genres || !Array.isArray(genres)) return { primary: '', secondary: '', rarity: 'common' };
    
    const primaryGenre = genres[0];
    const secondaryGenre = genres[1];
    
    // Calculate genre rarity for contextual information
    const genreCount = allMovies.filter(m => 
      m.genre && m.genre.includes(primaryGenre)
    ).length;
    
    const rarity = genreCount < 3 ? 'rare' : genreCount < 6 ? 'uncommon' : 'common';
    
    return { primary: primaryGenre, secondary: secondaryGenre, rarity };
  };
  
  // Smart color coding based on genre and rating
  const getSmartStyling = () => {
    const genreColors = {
      'Action': 'from-red-500/20 to-orange-500/20 border-red-500/30',
      'Drama': 'from-blue-500/20 to-purple-500/20 border-blue-500/30',
      'Comedy': 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
      'Sci-Fi': 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30',
      'Horror': 'from-red-800/20 to-gray-900/20 border-red-800/30',
      'Romance': 'from-pink-500/20 to-red-500/20 border-pink-500/30',
      'Thriller': 'from-gray-500/20 to-red-500/20 border-gray-500/30',
      'Adventure': 'from-green-500/20 to-blue-500/20 border-green-500/30',
      'Animation': 'from-purple-500/20 to-pink-500/20 border-purple-500/30'
    };
    
    const primaryGenre = movie.genre?.[0] || 'Drama';
    return genreColors[primaryGenre] || 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
  };
  
  // Enhanced rating context
  const getRatingContext = () => {
    const rating = movie.rating;
    if (rating >= 9.0) return { label: 'Masterpiece', color: 'text-yellow-400', icon: '👑' };
    if (rating >= 8.5) return { label: 'Excellent', color: 'text-green-400', icon: '⭐' };
    if (rating >= 7.5) return { label: 'Great', color: 'text-blue-400', icon: '👍' };
    if (rating >= 6.5) return { label: 'Good', color: 'text-gray-400', icon: '👌' };
    return { label: 'Average', color: 'text-gray-500', icon: '📽️' };
  };
  
  const genreInsights = getGenreInsights(movie.genre, similarMovies);
  const smartStyling = getSmartStyling();
  const ratingContext = getRatingContext();
  
  // Enhanced event handlers
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
    e.stopPropagation();
    onToggleFavorite();
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowTooltip(false);
  };
  
  // Enhanced description truncation
  const getSmartDescription = (description, maxLength = 120) => {
    if (!description) return '';
    if (description.length <= maxLength) return description;
    
    // Smart truncation at sentence boundaries
    const sentences = description.split('. ');
    let result = '';
    
    for (const sentence of sentences) {
      if ((result + sentence + '. ').length <= maxLength) {
        result += sentence + '. ';
      } else {
        break;
      }
    }
    
    return result || description.substring(0, maxLength) + '...';
  };

  return (
    <article
      className={`${viewMode === 'grid' 
          ? `flex flex-col bg-gradient-to-br ${smartStyling} backdrop-blur-sm rounded-xl border overflow-hidden group hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl`
          : `flex bg-gradient-to-r ${smartStyling} backdrop-blur-sm rounded-xl border overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer`
      } animate-slide-up`}
      onClick={onSelect}
      onKeyPress={handleKeyPress}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex="0"
      role="button"
      aria-label={`View details for ${movie.title} - ${ratingContext.label} movie`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Enhanced Movie Poster */}
      <div className={`relative ${viewMode === 'grid' ? 'aspect-[2/3]' : 'w-32 h-48 flex-shrink-0'} overflow-hidden group`}>
        {!imageError ? (
          <>
            <img
              src={movie.poster}
              alt={`${movie.title} poster`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
            {/* Loading shimmer effect */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
            )}
          </>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${smartStyling} flex flex-col items-center justify-center text-gray-300`}>
            <span className="text-4xl mb-2">🎬</span>
            <span className="text-sm font-medium text-center px-2">{movie.title}</span>
          </div>
        )}
        
        {/* Enhanced Rating Badge */}
        <div className={`absolute top-2 left-2 bg-black/80 backdrop-blur-sm rounded-md px-2 py-1 flex items-center space-x-1 text-xs ${ratingContext.color}`}>
          <span>{ratingContext.icon}</span>
          <span className="text-white font-medium">{rating.numeric}</span>
        </div>
        
        {/* Enhanced Favorite Button */}
        <button
          className={`absolute top-2 right-2 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
            isFavorite 
              ? 'bg-red-500 text-white scale-110 animate-heart-pulse' 
              : 'bg-black/60 text-gray-300 hover:bg-red-500 hover:text-white hover:scale-110'
          }`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className="w-4 h-4"
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
        
        {/* Genre Rarity Indicator */}
        {genreInsights.rarity === 'rare' && (
          <div className="absolute bottom-2 left-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-2 py-0.5 text-xs text-yellow-400 font-medium">
            Rare 🎆
          </div>
        )}
        
        {/* Enhanced Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-2 transform scale-75 group-hover:scale-100 transition-transform duration-300 delay-100">
            <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
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
            <span className="text-white text-xs font-medium">{ratingContext.label}</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced Movie Info */}
      <div className={`${viewMode === 'grid' ? 'p-4' : 'flex-1 p-4'} flex flex-col relative`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-primary-300 transition-colors flex-1">
            {movie.title}
          </h3>
          {isHovered && (
            <span className={`ml-2 text-xs px-2 py-1 rounded-full ${ratingContext.color} bg-white/10 font-medium animate-fade-in`}>
              {ratingContext.label}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="flex items-center space-x-2 text-gray-400">
            <span className="text-gray-300 font-medium">{movie.year}</span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center space-x-1">
              <span>{ratingContext.icon}</span>
              <span className={ratingContext.color}>{movie.rating.toFixed(1)}</span>
            </span>
          </div>
        </div>
        
        {/* Enhanced Genre Display */}
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre && movie.genre.slice(0, 3).map((genre, index) => (
            <span 
              key={genre} 
              className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                index === 0 
                  ? 'bg-primary-500/30 text-primary-200 border border-primary-500/30' 
                  : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20'
              }`}
            >
              {genre}
            </span>
          ))}
          {movie.genre && movie.genre.length > 3 && (
            <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded-full text-xs border border-gray-600/30">
              +{movie.genre.length - 3}
            </span>
          )}
        </div>
        
        {/* Smart Description for List View */}
        {viewMode === 'list' && (
          <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
            {getSmartDescription(movie.description, 150)}
          </p>
        )}
        
        {/* Enhanced Card Footer */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center space-x-3">
            {/* Duration or Year Context */}
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.4L16.2,16.2Z" />
              </svg>
              <span>{movie.year}</span>
            </div>
            
            {/* Rating Context */}
            <div className="flex items-center space-x-1 text-xs">
              <span className="text-gray-400">Rating:</span>
              <span className={`font-medium ${ratingContext.color}`}>{movie.rating.toFixed(1)}/10</span>
            </div>
          </div>
          
          <button 
            className="px-3 py-1.5 bg-primary-500/20 text-primary-300 rounded-lg text-sm font-medium hover:bg-primary-500/30 transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            <span className="flex items-center space-x-1">
              <span>Details</span>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
              </svg>
            </span>
          </button>
        </div>
        
        {/* Contextual Information on Hover */}
        {isHovered && viewMode === 'grid' && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 animate-slide-up">
            <p className="text-gray-300 text-xs line-clamp-2 leading-relaxed">
              {getSmartDescription(movie.description, 100)}
            </p>
          </div>
        )}
      </div>
    </article>
  );
};