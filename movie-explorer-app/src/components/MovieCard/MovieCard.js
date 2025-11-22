import React, { useState } from 'react';
import { formatRating, getGenreGradient, truncateText } from '../../services/movieService';
import './MovieCard.css';

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
      className={`movie-card movie-card--${viewMode} ${imageLoaded ? 'movie-card--loaded' : ''}`}
      onClick={onSelect}
      onKeyPress={handleKeyPress}
      tabIndex="0"
      role="button"
      aria-label={`View details for ${movie.title}`}
      style={{
        '--gradient': gradient,
        '--animation-delay': `${animationDelay}ms`
      }}
    >
      {/* Movie Poster */}
      <div className="movie-poster">
        {!imageError ? (
          <img
            src={movie.poster}
            alt={`${movie.title} poster`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className="poster-image"
            loading="lazy"
          />
        ) : (
          <div className="poster-placeholder">
            <span className="placeholder-icon">🎬</span>
            <span className="placeholder-text">No Image</span>
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="rating-badge">
          <span className="rating-stars">{rating.stars}</span>
          <span className="rating-number">{rating.numeric}</span>
        </div>
        
        {/* Favorite Button */}
        <button
          className={`favorite-button ${isFavorite ? 'favorite-button--active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            className="heart-icon"
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
        <div className="poster-overlay">
          <div className="play-button">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="5,3 19,12 5,21"></polygon>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Movie Info */}
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        
        <div className="movie-meta">
          <span className="movie-year">{movie.year}</span>
          <span className="meta-divider">•</span>
          <div className="movie-genres">
            {movie.genre && movie.genre.slice(0, 2).map((genre, index) => (
              <span key={genre} className="genre-tag">
                {genre}
              </span>
            ))}
            {movie.genre && movie.genre.length > 2 && (
              <span className="genre-more">+{movie.genre.length - 2}</span>
            )}
          </div>
        </div>
        
        {viewMode === 'list' && (
          <p className="movie-description">
            {truncateText(movie.description, 120)}
          </p>
        )}
        
        {/* Card Footer */}
        <div className="card-footer">
          <div className="rating-display">
            <span className="rating-label">Rating:</span>
            <span className="rating-value">{rating.numeric}/10</span>
          </div>
          
          <button className="view-details-button">
            View Details
          </button>
        </div>
      </div>
    </article>
  );
};