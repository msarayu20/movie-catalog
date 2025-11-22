import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { movieService } from '../../services/movieService';
import { useDebounce, useLocalStorage, useURLParams, useKeyboardShortcuts } from '../../hooks/useCustomHooks';
import { SearchBar } from '../SearchBar/SearchBar';
import { FilterControls } from '../FilterControls/FilterControls';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import { MovieModal } from '../MovieModal/MovieModal';
import { Header } from '../Header/Header';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import './MovieExplorer.css';

/**
 * MovieExplorer - Main Application Component
 * 
 * This is the core component that orchestrates the entire movie browsing experience.
 * It demonstrates advanced React patterns including:
 * - State management with multiple interconnected states
 * - Performance optimization with debouncing and memoization
 * - URL state persistence for better UX
 * - Keyboard shortcuts for power users
 * - Local storage for favorites persistence
 * 
 * The component follows the container/presentational pattern where this container
 * manages all state and logic, while child components focus on presentation.
 */
export const MovieExplorer = () => {
  // ========== STATE MANAGEMENT ==========
  
  // Core movie data state
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('rating-desc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  // Modal state for movie details
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Pagination state for infinite scroll
  const [displayCount, setDisplayCount] = useState(12);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  
  // Favorites management with localStorage persistence
  const [favorites, setFavorites] = useLocalStorage('movie-favorites', []);
  
  // URL state management for shareable links
  const { params, updateParam } = useURLParams();
  
  // Debounced search for performance optimization
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  // ========== COMPUTED VALUES ==========
  
  // Memoized genres list for filter dropdown
  const availableGenres = useMemo(() => {
    return movieService.getGenres();
  }, []);
  
  // Memoized movie statistics for potential dashboard features
  // const movieStats = useMemo(() => {
  //   return movieService.getMovieStats();
  // }, []);
  
  // Movies to display with pagination
  const displayedMovies = useMemo(() => {
    return filteredMovies.slice(0, displayCount);
  }, [filteredMovies, displayCount]);
  
  // ========== INITIALIZATION ==========
  
  useEffect(() => {
    // Initialize state from URL parameters on component mount
    const initializeFromURL = () => {
      if (params.q) setSearchQuery(params.q);
      if (params.genre) setSelectedGenre(params.genre);
      if (params.sort) setSortBy(params.sort);
      if (params.view) setViewMode(params.view);
    };
    
    // Load initial movie data
    const loadMovies = async () => {
      try {
        setLoading(true);
        // Simulate loading delay for better UX demonstration
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const allMovies = movieService.getAllMovies();
        setMovies(allMovies);
        setError(null);
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
        console.error('Error loading movies:', err);
      } finally {
        setLoading(false);
      }
    };
    
    initializeFromURL();
    loadMovies();
  }, [params]);
  
  // ========== SEARCH AND FILTERING ==========
  
  // Update filtered movies when search or filter criteria change
  useEffect(() => {
    const updateFilteredMovies = () => {
      const filtered = movieService.getFilteredMovies({
        search: debouncedSearchQuery,
        genre: selectedGenre,
        sort: sortBy
      });
      
      setFilteredMovies(filtered);
      setDisplayCount(12); // Reset pagination
      setHasMoreMovies(filtered.length > 12);
    };
    
    updateFilteredMovies();
  }, [debouncedSearchQuery, selectedGenre, sortBy]);
  
  // Sync state changes with URL parameters
  useEffect(() => {
    updateParam('q', searchQuery || null);
  }, [searchQuery, updateParam]);
  
  useEffect(() => {
    updateParam('genre', selectedGenre === 'all' ? null : selectedGenre);
  }, [selectedGenre, updateParam]);
  
  useEffect(() => {
    updateParam('sort', sortBy === 'rating-desc' ? null : sortBy);
  }, [sortBy, updateParam]);
  
  useEffect(() => {
    updateParam('view', viewMode === 'grid' ? null : viewMode);
  }, [viewMode, updateParam]);
  
  // ========== EVENT HANDLERS ==========
  
  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);
  
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
    // Small delay to allow close animation
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
    setSearchQuery('');
    setSelectedGenre('all');
    setSortBy('rating-desc');
  }, []);
  
  // ========== KEYBOARD SHORTCUTS ==========
  
  useKeyboardShortcuts({
    '/': (e) => {
      // Focus search input when pressing "/"
      e.preventDefault();
      const searchInput = document.querySelector('[data-search-input]');
      if (searchInput) searchInput.focus();
    },
    'escape': () => {
      // Close modal when pressing Escape
      if (isModalOpen) handleModalClose();
    },
    'ctrl+k': (e) => {
      // Clear filters with Ctrl+K
      e.preventDefault();
      handleClearFilters();
    }
  });
  
  // ========== ERROR HANDLING ==========
  
  if (error) {
    return (
      <div className="movie-explorer">
        <Header />
        <div className="error-container">
          <div className="error-message">
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // ========== LOADING STATE ==========
  
  if (loading) {
    return (
      <div className="movie-explorer">
        <Header />
        <div className="loading-container">
          <LoadingSpinner />
          <p>Loading amazing movies for you...</p>
        </div>
      </div>
    );
  }
  
  // ========== MAIN RENDER ==========
  
  return (
    <div className="movie-explorer">
      {/* Application Header */}
      <Header 
        movieCount={filteredMovies.length}
        totalMovies={movies.length}
      />
      
      {/* Search and Filter Controls */}
      <div className="controls-section">
        <div className="container">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search movies... (Press '/' to focus)"
          />
          
          <FilterControls
            genres={availableGenres}
            selectedGenre={selectedGenre}
            onGenreChange={handleGenreChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onClearFilters={handleClearFilters}
          />
        </div>
      </div>
      
      {/* Movie Grid */}
      <main className="main-content">
        <div className="container">
          {filteredMovies.length === 0 ? (
            <div className="no-results">
              <div className="no-results-content">
                <h2>No movies found</h2>
                <p>Try adjusting your search criteria or filters</p>
                <button 
                  className="btn btn-secondary"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <MovieGrid
              movies={displayedMovies}
              viewMode={viewMode}
              favorites={favorites}
              onMovieSelect={handleMovieSelect}
              onToggleFavorite={handleToggleFavorite}
              onLoadMore={handleLoadMore}
              hasMore={hasMoreMovies}
            />
          )}
        </div>
      </main>
      
      {/* Movie Detail Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          isFavorite={favorites.includes(selectedMovie.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
      
      {/* Floating Stats (for development - can be removed in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="debug-stats">
          <small>
            Showing {displayedMovies.length} of {filteredMovies.length} movies
            | Total: {movies.length} | Favorites: {favorites.length}
          </small>
        </div>
      )}
    </div>
  );
};