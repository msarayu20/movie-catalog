import React, { useState, useEffect, useRef, useMemo } from 'react';
import { movieService } from '../services/movieService';
import { MovieCard } from '../components/MovieCard/MovieCard';
import { MovieDetailsModal } from '../components/MovieDetailsModal/MovieDetailsModal';
import { HeroCarousel } from '../components/HeroCarousel/HeroCarousel';
import { useLocalStorage } from '../hooks/useCustomHooks';

/**
 * HomePage - Movies organized by genre with horizontal scrolling
 */
export const HomePage = ({ searchQuery = '' }) => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useLocalStorage('movie-favorites', []);

  // Get featured movies for carousel (top rated)
  const featuredMovies = useMemo(() => {
    const allMovies = movieService.getAllMovies();
    return allMovies
      .filter(movie => movie.rating >= 8.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }, []);

  useEffect(() => {
    const allMovies = movieService.getAllMovies();
    
    // Filter movies by search query if present
    const filteredMovies = searchQuery 
      ? movieService.searchMovies(searchQuery)
      : allMovies;
    
    // Define main genres to show
    const mainGenres = ['Action', 'Sci-Fi', 'Drama'];
    
    // Organize movies by genre
    const organized = {};
    
    // Add main genres
    mainGenres.forEach(genre => {
      const genreMovies = filteredMovies.filter(movie => 
        movie.genre && movie.genre.includes(genre)
      );
      if (genreMovies.length > 0) {
        organized[genre] = genreMovies;
      }
    });
    
    // Collect remaining movies (not in main genres)
    const remainingMovies = filteredMovies.filter(movie => {
      if (!movie.genre) return false;
      // Check if movie has any genre that's not in mainGenres
      return !movie.genre.some(g => mainGenres.includes(g));
    });
    
    // Add "More Movies" section if there are remaining movies
    if (remainingMovies.length > 0) {
      organized['More Movies'] = remainingMovies;
    }
    
    setMoviesByGenre(organized);
  }, [searchQuery]);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMovie(null), 300);
  };

  const handleToggleFavorite = (movieId) => {
    setFavorites(prevFavorites => {
      const isCurrentlyFavorite = prevFavorites.includes(movieId);
      if (isCurrentlyFavorite) {
        return prevFavorites.filter(id => id !== movieId);
      } else {
        return [...prevFavorites, movieId];
      }
    });
  };

  const hasResults = Object.keys(moviesByGenre).length > 0;

  return (
    <div className="min-h-screen bg-[#0f1014]">
      {/* Hero Carousel - Only show when not searching */}
      {!searchQuery && featuredMovies.length > 0 && (
        <HeroCarousel
          movies={featuredMovies}
          onMovieSelect={handleMovieSelect}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Genre Sections */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Browse by Genre'}
            </h2>
            <p className="text-gray-400">
              {searchQuery 
                ? `Found ${Object.values(moviesByGenre).flat().length} movies`
                : 'Explore movies organized by categories'
              }
            </p>
          </div>

          {/* Genre Sections or No Results */}
          {hasResults ? (
            <>
              <div className="space-y-10">
                {Object.entries(moviesByGenre).map(([genre, movies]) => (
                  movies.length > 0 && (
                    <GenreSection
                      key={genre}
                      genre={genre}
                      movies={movies}
                      favorites={favorites}
                      onMovieSelect={handleMovieSelect}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  )
                ))}
              </div>
              
            </>
          ) : (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center max-w-md">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-white mb-2">No movies found</h3>
                <p className="text-gray-400">Try searching for something else</p>
              </div>
            </div>
          )}
        </div>
      </div>

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

/**
 * GenreSection - Horizontal scrolling section for a genre
 */
const GenreSection = ({ genre, movies, favorites, onMovieSelect, onToggleFavorite }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, [movies]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="genre-section">
      {/* Genre Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-2xl font-bold text-white">{genre}</h3>
          <span className="text-sm text-gray-400">{movies.length} movies</span>
        </div>
        
        {/* Explore More Link */}
        <a
          href="/all-movies"
          className="flex items-center space-x-1 text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors group"
        >
          <span>Explore More</span>
          <svg 
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Scrollable Container */}
      <div className="relative group">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/80 hover:bg-black/90 
                       rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 
                       transition-opacity duration-300 shadow-xl"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Movies Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie, index) => (
            <div key={movie.id} className="flex-shrink-0 w-64">
              <MovieCard
                movie={movie}
                viewMode="grid"
                isFavorite={favorites.includes(movie.id)}
                onSelect={() => onMovieSelect(movie)}
                onToggleFavorite={() => onToggleFavorite(movie.id)}
                animationDelay={index * 50}
              />
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/80 hover:bg-black/90 
                       rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 
                       transition-opacity duration-300 shadow-xl"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
