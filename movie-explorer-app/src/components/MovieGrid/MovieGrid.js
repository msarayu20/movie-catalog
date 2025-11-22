import React from 'react';
import { MovieCard } from '../MovieCard/MovieCard';
import { useIntersectionObserver } from '../../hooks/useCustomHooks';
import './MovieGrid.css';

/**
 * MovieGrid Component
 * 
 * Displays movies in either grid or list view with:
 * - Responsive layout that adapts to screen size
 * - Infinite scroll with intersection observer
 * - Smooth animations and transitions
 * - Optimized performance with proper key usage
 * 
 * @param {object} props - Component properties
 * @param {Array} props.movies - Array of movie objects to display
 * @param {string} props.viewMode - 'grid' or 'list' view mode
 * @param {Array} props.favorites - Array of favorite movie IDs
 * @param {function} props.onMovieSelect - Handler for movie selection
 * @param {function} props.onToggleFavorite - Handler for favorite toggle
 * @param {function} props.onLoadMore - Handler for loading more movies
 * @param {boolean} props.hasMore - Whether there are more movies to load
 */
export const MovieGrid = ({
  movies,
  viewMode = 'grid',
  favorites = [],
  onMovieSelect,
  onToggleFavorite,
  onLoadMore,
  hasMore = false
}) => {
  const [loadMoreRef, isLoadMoreVisible] = useIntersectionObserver();

  // Trigger load more when the sentinel becomes visible
  React.useEffect(() => {
    if (isLoadMoreVisible && hasMore) {
      onLoadMore();
    }
  }, [isLoadMoreVisible, hasMore, onLoadMore]);

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="movie-grid-container">
      <div className={`movie-grid movie-grid--${viewMode}`}>
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            viewMode={viewMode}
            isFavorite={favorites.includes(movie.id)}
            onSelect={() => onMovieSelect(movie)}
            onToggleFavorite={() => onToggleFavorite(movie.id)}
            animationDelay={index * 50} // Stagger animations
          />
        ))}
      </div>

      {/* Load More Trigger */}
      {hasMore && (
        <div 
          ref={loadMoreRef}
          className="load-more-trigger"
          aria-hidden="true"
        >
          <div className="load-more-spinner">
            <div className="spinner-ring"></div>
            <span>Loading more movies...</span>
          </div>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && movies.length > 0 && (
        <div className="end-of-results">
          <p>You've seen all {movies.length} movies! 🎬</p>
        </div>
      )}
    </div>
  );
};