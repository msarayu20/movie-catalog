import React, { useEffect } from 'react';
import { formatRating } from '../../services/movieService';

/**
 * MovieModal Component
 * 
 * An immersive full-screen modal for movie details featuring:
 * - Backdrop blur effect for modern aesthetics
 * - Smooth enter/exit animations
 * - Comprehensive movie information display
 * - Keyboard navigation and accessibility
 * - Responsive design for all screen sizes
 */
export const MovieModal = ({ movie, isOpen, onClose, isFavorite, onToggleFavorite }) => {
  // Handle escape key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  const rating = formatRating(movie.rating);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="movie-modal-backdrop" onClick={handleBackdropClick}>
      <div className="movie-modal">
        {/* Close Button */}
        <button
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Movie Poster */}
        <div className="modal-poster">
          <img
            src={movie.poster}
            alt={`${movie.title} poster`}
            className="modal-poster-image"
          />
        </div>

        {/* Movie Details */}
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title">{movie.title}</h1>
            <button
              className={`modal-favorite-button ${isFavorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(movie.id)}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              ❤️
            </button>
          </div>

          <div className="modal-meta">
            <span className="meta-item">{movie.year}</span>
            <span className="meta-divider">•</span>
            <span className="meta-item">Rating: {rating.numeric}/10</span>
            <span className="meta-divider">•</span>
            <span className="meta-item">{rating.stars}</span>
          </div>

          <div className="modal-genres">
            {movie.genre && movie.genre.map((genre) => (
              <span key={genre} className="modal-genre-tag">
                {genre}
              </span>
            ))}
          </div>

          <div className="modal-description">
            <h3>Description</h3>
            <p>{movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};