import moviesData from '../data/movies.json';

// Fallback data in case JSON import fails
const fallbackMovies = {
  "movies": [
    {
      "id": 1,
      "title": "Inception",
      "year": 2010,
      "genre": ["Sci-Fi", "Action"],
      "rating": 8.8,
      "poster": "https://picsum.photos/200/300?random=1",
      "description": "A thief who enters people's dreams to steal secrets must perform inception on a business magnate's son."
    },
    {
      "id": 2,
      "title": "The Dark Knight",
      "year": 2008,
      "genre": ["Action", "Drama"],
      "rating": 9.0,
      "poster": "https://picsum.photos/200/300?random=2",
      "description": "Batman faces off against the Joker, a criminal mastermind bent on plunging Gotham into chaos."
    },
    {
      "id": 3,
      "title": "Interstellar",
      "year": 2014,
      "genre": ["Sci-Fi", "Drama"],
      "rating": 8.6,
      "poster": "https://picsum.photos/200/300?random=3",
      "description": "A group of explorers travel through a wormhole in search of a new home for humanity."
    },
    {
      "id": 4,
      "title": "The Matrix",
      "year": 1999,
      "genre": ["Sci-Fi", "Action"],
      "rating": 8.7,
      "poster": "https://picsum.photos/200/300?random=4",
      "description": "A hacker discovers the true nature of reality and begins a rebellion against its controllers."
    },
    {
      "id": 5,
      "title": "Parasite",
      "year": 2019,
      "genre": ["Drama", "Thriller"],
      "rating": 8.6,
      "poster": "https://picsum.photos/200/300?random=5",
      "description": "A poor family infiltrates a wealthy household, leading to unexpected consequences."
    },
    {
      "id": 6,
      "title": "Avengers: Endgame",
      "year": 2019,
      "genre": ["Action", "Sci-Fi"],
      "rating": 8.4,
      "poster": "https://picsum.photos/200/300?random=6",
      "description": "The Avengers assemble one final time to reverse the catastrophic events brought by Thanos."
    },
    {
      "id": 7,
      "title": "La La Land",
      "year": 2016,
      "genre": ["Romance", "Drama"],
      "rating": 8.0,
      "poster": "https://picsum.photos/200/300?random=7",
      "description": "A jazz musician and an aspiring actress struggle to balance love and artistic ambition."
    },
    {
      "id": 8,
      "title": "Joker",
      "year": 2019,
      "genre": ["Drama", "Crime"],
      "rating": 8.4,
      "poster": "https://picsum.photos/200/300?random=8",
      "description": "A mentally troubled comedian's descent into darkness leads him to become Gotham's criminal mastermind."
    }
  ]
};

/**
 * Movie Service
 * 
 * This service handles all movie-related data operations.
 * It demonstrates proper separation of concerns and provides
 * a clean API for data manipulation.
 */
class MovieService {
  constructor() {
    // Use imported data or fallback
    const dataSource = moviesData && moviesData.movies ? moviesData : fallbackMovies;
    this.movies = dataSource.movies || [];
    
    this.genres = this.extractUniqueGenres();
  }

  /**
   * Get all movies
   * @returns {Array} Array of movie objects
   */
  getAllMovies() {
    return [...this.movies]; // Return a copy to prevent external mutations
  }

  /**
   * Get movie by ID
   * @param {number} id - Movie ID
   * @returns {object|null} Movie object or null if not found
   */
  getMovieById(id) {
    return this.movies.find(movie => movie.id === parseInt(id)) || null;
  }

  /**
   * Extract unique genres from all movies
   * @private
   * @returns {Array} Array of unique genres
   */
  extractUniqueGenres() {
    const genreSet = new Set();
    this.movies.forEach(movie => {
      if (movie.genre && Array.isArray(movie.genre)) {
        movie.genre.forEach(g => genreSet.add(g));
      }
    });
    return Array.from(genreSet).sort();
  }

  /**
   * Get all available genres
   * @returns {Array} Array of genre strings
   */
  getGenres() {
    return [...this.genres];
  }

  /**
   * Search movies by title with fuzzy matching
   * @param {string} query - Search query
   * @returns {Array} Array of matching movies
   */
  searchMovies(query) {
    if (!query || query.trim() === '') {
      return this.getAllMovies();
    }

    const searchTerm = query.toLowerCase().trim();
    
    return this.movies.filter(movie => {
      const title = movie.title.toLowerCase();
      
      // Exact match gets highest priority
      if (title.includes(searchTerm)) {
        return true;
      }

      // Fuzzy matching for typos (simple implementation)
      const words = searchTerm.split(' ');
      return words.some(word => 
        title.includes(word) && word.length > 2
      );
    });
  }

  /**
   * Filter movies by genre
   * @param {string} genre - Genre to filter by
   * @param {Array} movies - Movies to filter (optional, defaults to all)
   * @returns {Array} Filtered movies
   */
  filterByGenre(genre, movies = this.movies) {
    if (!genre || genre === 'all') {
      return movies;
    }

    return movies.filter(movie => 
      movie.genre && movie.genre.includes(genre)
    );
  }

  /**
   * Sort movies by various criteria
   * @param {Array} movies - Movies to sort
   * @param {string} sortBy - Sort criteria ('title', 'year', 'rating', 'rating-desc')
   * @returns {Array} Sorted movies
   */
  sortMovies(movies, sortBy) {
    const moviesCopy = [...movies];

    switch (sortBy) {
      case 'title':
        return moviesCopy.sort((a, b) => 
          a.title.localeCompare(b.title)
        );
      
      case 'year':
        return moviesCopy.sort((a, b) => b.year - a.year);
      
      case 'rating':
        return moviesCopy.sort((a, b) => a.rating - b.rating);
      
      case 'rating-desc':
        return moviesCopy.sort((a, b) => b.rating - a.rating);
      
      default:
        return moviesCopy;
    }
  }

  /**
   * Get movies with combined search, filter, and sort
   * This is the main method that combines all filtering capabilities
   * 
   * @param {object} options - Filter options
   * @param {string} options.search - Search query
   * @param {string} options.genre - Genre filter
   * @param {string} options.sort - Sort criteria
   * @returns {Array} Processed movies array
   */
  getFilteredMovies({ search = '', genre = 'all', sort = 'rating-desc' } = {}) {
    let filteredMovies = this.getAllMovies();

    // Apply search filter
    if (search) {
      filteredMovies = this.searchMovies(search);
    }

    // Apply genre filter
    if (genre && genre !== 'all') {
      filteredMovies = this.filterByGenre(genre, filteredMovies);
    }

    // Apply sorting
    filteredMovies = this.sortMovies(filteredMovies, sort);

    return filteredMovies;
  }

  /**
   * Get movie statistics for dashboard/analytics
   * @returns {object} Statistics object
   */
  getMovieStats() {
    const movies = this.getAllMovies();
    
    const totalMovies = movies.length;
    const averageRating = movies.reduce((sum, movie) => sum + movie.rating, 0) / totalMovies;
    const yearRange = {
      oldest: Math.min(...movies.map(m => m.year)),
      newest: Math.max(...movies.map(m => m.year))
    };
    const genreCount = this.genres.length;

    // Get top rated movies (rating >= 8.5)
    const topRated = movies
      .filter(movie => movie.rating >= 8.5)
      .sort((a, b) => b.rating - a.rating);

    return {
      totalMovies,
      averageRating: parseFloat(averageRating.toFixed(1)),
      yearRange,
      genreCount,
      topRated,
      genres: this.genres
    };
  }
}

// Create and export a singleton instance
export const movieService = new MovieService();

/**
 * Utility Functions
 */

/**
 * Format rating for display with stars
 * @param {number} rating - Movie rating (0-10)
 * @returns {object} Formatted rating with stars
 */
export const formatRating = (rating) => {
  const stars = Math.round(rating / 2); // Convert 10-point to 5-star scale
  const starsFilled = '★'.repeat(stars);
  const starsEmpty = '☆'.repeat(5 - stars);
  
  return {
    numeric: rating.toFixed(1),
    stars: starsFilled + starsEmpty,
    percentage: (rating / 10) * 100
  };
};

/**
 * Format year range for display
 * @param {number} year - Movie year
 * @returns {string} Formatted year string
 */
export const formatYear = (year) => {
  return year.toString();
};

/**
 * Generate movie card background gradient based on genre
 * @param {Array} genres - Movie genres
 * @returns {string} CSS gradient string
 */
export const getGenreGradient = (genres) => {
  if (!genres || genres.length === 0) {
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }

  const genreColors = {
    'Action': '#ff6b6b, #4ecdc4',
    'Adventure': '#45b7d1, #96ceb4',
    'Animation': '#f9ca24, #f0932b',
    'Biography': '#6c5ce7, #a29bfe',
    'Crime': '#2d3436, #636e72',
    'Drama': '#74b9ff, #0984e3',
    'Family': '#00b894, #00cec9',
    'Music': '#fd79a8, #e84393',
    'Mystery': '#2d3436, #636e72',
    'Romance': '#fd79a8, #fdcb6e',
    'Sci-Fi': '#00cec9, #6c5ce7',
    'Thriller': '#636e72, #2d3436'
  };

  const primaryGenre = genres[0];
  const colors = genreColors[primaryGenre] || '#667eea, #764ba2';
  
  return `linear-gradient(135deg, ${colors})`;
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};