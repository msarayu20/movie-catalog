import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { movieService } from '../services/movieService';
import { useDebounce, useLocalStorage } from '../hooks/useCustomHooks';
import { FilterControls } from '../components/FilterControls/FilterControls';
import { MovieGrid } from '../components/MovieGrid/MovieGrid';
import { MovieDetailsModal } from '../components/MovieDetailsModal/MovieDetailsModal';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';
import { Pagination } from '../components/Pagination/Pagination';
import { ShareURL } from '../components/ShareURL/ShareURL';

/**
 * AllMoviesPage - Complete movie browsing with filters
 */
export const AllMoviesPage = ({ searchQuery = '' }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('rating-desc');
  const [viewMode, setViewMode] = useState('grid');
  
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [displayCount, setDisplayCount] = useState(12);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [paginationMode, setPaginationMode] = useState('infinite');
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(12);
  
  const [favorites, setFavorites] = useLocalStorage('movie-favorites', []);
  
  const availableGenres = useMemo(() => {
    return movieService.getGenres();
  }, []);
  
  const displayedMovies = useMemo(() => {
    if (paginationMode === 'infinite') {
      return filteredMovies.slice(0, displayCount);
    } else {
      const startIndex = (currentPage - 1) * moviesPerPage;
      const endIndex = startIndex + moviesPerPage;
      return filteredMovies.slice(startIndex, endIndex);
    }
  }, [filteredMovies, displayCount, paginationMode, currentPage, moviesPerPage]);
  
  const totalPages = useMemo(() => {
    return Math.ceil(filteredMovies.length / moviesPerPage);
  }, [filteredMovies.length, moviesPerPage]);
  
  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 100));
        const allMovies = movieService.getAllMovies();
        setMovies(allMovies);
      } finally {
        setLoading(false);
      }
    };
    
    loadMovies();
  }, []);
  
  useEffect(() => {
    const filtered = movieService.getFilteredMovies({
      search: searchQuery,
      genre: selectedGenre,
      sort: sortBy
    });
    
    setFilteredMovies(filtered);
    
    if (paginationMode === 'infinite') {
      setDisplayCount(12);
      setHasMoreMovies(filtered.length > 12);
    } else {
      setCurrentPage(1);
    }
  }, [searchQuery, selectedGenre, sortBy, paginationMode]);
  
  const handleGenreChange = useCallback((genre) => {
    setSelectedGenre(genre);
  }, []);
  
  const handleSortChange = useCallback((sort) => {
    setSortBy(sort);
  }, []);
  
  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
  }, []);
  
  const handleMovieSelect = useCallback((movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }, []);
  
  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMovie(null), 300);
  }, []);
  
  const handleLoadMore = useCallback(() => {
    const newDisplayCount = displayCount + 12;
    setDisplayCount(newDisplayCount);
    setHasMoreMovies(filteredMovies.length > newDisplayCount);
  }, [displayCount, filteredMovies.length]);
  
  const handleToggleFavorite = useCallback((movieId) => {
    setFavorites(prevFavorites => {
      const isCurrentlyFavorite = prevFavorites.includes(movieId);
      if (isCurrentlyFavorite) {
        return prevFavorites.filter(id => id !== movieId);
      } else {
        return [...prevFavorites, movieId];
      }
    });
  }, [setFavorites]);
  
  const handleClearFilters = useCallback(() => {
    setSelectedGenre('all');
    setSortBy('rating-desc');
    setCurrentPage(1);
  }, []);
  
  const handlePaginationModeChange = useCallback((mode) => {
    setPaginationMode(mode);
    if (mode === 'infinite') {
      setDisplayCount(12);
      setHasMoreMovies(filteredMovies.length > 12);
    } else {
      setCurrentPage(1);
    }
  }, [filteredMovies.length]);
  
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1014] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#0f1014]">
      {/* Page Header with Filters */}
      <div className="sticky top-0 z-40 bg-[#0f1014] border-b border-gray-700/30 py-6 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title and Count */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                {searchQuery ? `Search: "${searchQuery}"` : 'All Movies'}
              </h1>
              <p className="text-gray-400 text-sm">
                {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'} available
              </p>
            </div>
          </div>
          
          {/* Filter Controls - Inline */}
          <FilterControls
            genres={availableGenres}
            selectedGenre={selectedGenre}
            onGenreChange={handleGenreChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            paginationMode={paginationMode}
            onPaginationModeChange={handlePaginationModeChange}
            onClearFilters={handleClearFilters}
          />
        </div>
      </div>
      
      {/* Movie Grid */}
      <main className="py-8 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredMovies.length === 0 ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center max-w-md">
                <h2 className="text-3xl font-semibold text-white mb-4">No movies found</h2>
                <p className="text-gray-400 text-lg mb-8">Try adjusting your filters</p>
                <button 
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg font-medium transition-colors"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <>
              <MovieGrid
                movies={displayedMovies}
                viewMode={viewMode}
                favorites={favorites}
                onMovieSelect={handleMovieSelect}
                onToggleFavorite={handleToggleFavorite}
                onLoadMore={handleLoadMore}
                hasMore={hasMoreMovies}
                paginationMode={paginationMode}
              />
              
              {paginationMode === 'pages' && filteredMovies.length > moviesPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </main>
      
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
