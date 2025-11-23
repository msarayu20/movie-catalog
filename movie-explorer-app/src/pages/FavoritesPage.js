import React, { useState, useEffect, useCallback } from 'react';
import { movieService } from '../services/movieService';
import { useLocalStorage } from '../hooks/useCustomHooks';
import { MovieGrid } from '../components/MovieGrid/MovieGrid';
import { MovieDetailsModal } from '../components/MovieDetailsModal/MovieDetailsModal';

/**
 * FavoritesPage - Display user's favorite movies
 */
export const FavoritesPage = ({ searchQuery = '' }) => {
  const [favorites, setFavorites] = useLocalStorage('movie-favorites', []);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const allMovies = movieService.getAllMovies();
    let favMovies = allMovies.filter(movie => favorites.includes(movie.id));
    
    // Filter by search query if present
    if (searchQuery) {
      favMovies = movieService.searchMovies(searchQuery).filter(movie => 
        favorites.includes(movie.id)
      );
    }
    
    setFavoriteMovies(favMovies);
  }, [favorites, searchQuery]);

  const handleMovieSelect = useCallback((movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMovie(null), 300);
  }, []);

  const handleToggleFavorite = useCallback((movieId) => {
    setFavorites(prevFavorites => {
      return prevFavorites.filter(id => id !== movieId);
    });
  }, [setFavorites]);

  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1014]">
      {/* Page Header */}
      <div className="border-b border-gray-700/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3">
                <span>❤️</span>
                <span>{searchQuery ? `Search in Favorites: "${searchQuery}"` : 'My Favorites'}</span>
              </h1>
              <p className="text-gray-400">
                {favoriteMovies.length === 0 
                  ? (searchQuery ? 'No favorites match your search' : 'No favorites yet. Start adding movies you love!')
                  : `${favoriteMovies.length} ${favoriteMovies.length === 1 ? 'movie' : 'movies'} ${searchQuery ? 'found' : 'in your collection'}`
                }
              </p>
            </div>
            
            {/* View Mode Toggle */}
            {favoriteMovies.length > 0 && (
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-400 font-medium">View:</label>
                <div className="flex bg-[#1a1d29] rounded-full p-1 border border-gray-600">
                  <button
                    type="button"
                    onClick={() => handleViewModeChange('grid')}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                    aria-label="Grid view"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleViewModeChange('list')}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      viewMode === 'list'
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                    aria-label="List view"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="py-8 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {favoriteMovies.length === 0 ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center max-w-md">
                <div className="mb-6">
                  <span className="text-8xl">💔</span>
                </div>
                <h2 className="text-3xl font-semibold text-white mb-4">No Favorites Yet</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Start exploring movies and click the heart icon to add them to your favorites!
                </p>
                <a 
                  href="/"
                  className="inline-block px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
                >
                  Browse Movies
                </a>
              </div>
            </div>
          ) : (
            <MovieGrid
              movies={favoriteMovies}
              viewMode={viewMode}
              favorites={favorites}
              onMovieSelect={handleMovieSelect}
              onToggleFavorite={handleToggleFavorite}
              onLoadMore={() => {}}
              hasMore={false}
              paginationMode="pages"
            />
          )}
        </div>
      </main>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          isFavorite={favorites.includes(selectedMovie.id)}
          onToggleFavorite={() => handleToggleFavorite(selectedMovie.id)}
        />
      )}
    </div>
  );
};
