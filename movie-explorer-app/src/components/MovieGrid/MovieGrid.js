import React from 'react';
import { MovieCard } from '../MovieCard/MovieCard';
import { useIntersectionObserver } from '../../hooks/useCustomHooks';

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
    <div className="w-full">
      <div className={`${
        viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
          : 'flex flex-col space-y-4'
      } animate-fade-in`}>
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
          className="flex flex-col items-center justify-center py-12"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <span className="text-gray-400 text-sm">Loading more movies...</span>
          </div>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && movies.length > 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-glass backdrop-blur-sm rounded-2xl border border-white/10 shadow-glass px-6 py-4">
            <p className="text-gray-300 text-sm">You've seen all {movies.length} movies! 🎬</p>
          </div>
        </div>
      )}
    </div>
  );
};