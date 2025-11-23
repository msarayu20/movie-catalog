import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage';
import { AllMoviesPage } from './pages/AllMoviesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { movieService } from './services/movieService';

/**
 * Main App Component with Routing and Global Search
 */
function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const movies = movieService.getAllMovies();

  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleMovieSelect = useCallback((movie) => {
    // Navigate to all movies page and trigger movie selection there
    navigate('/all-movies', { state: { selectedMovieId: movie.id } });
  }, [navigate]);

  return (
    <div className="App">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        movies={movies}
        onMovieSelect={handleMovieSelect}
      />
      <Routes>
        <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
        <Route path="/all-movies" element={<AllMoviesPage searchQuery={searchQuery} />} />
        <Route path="/favorites" element={<FavoritesPage searchQuery={searchQuery} />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
