import React from 'react';
import { MovieExplorer } from './components/MovieExplorer/MovieExplorer';
import './styles/GlobalStyles.css';

/**
 * Main App Component
 * 
 * This is the root component that renders the Movie Explorer application.
 * It serves as the entry point and maintains a clean, single-responsibility structure.
 */
function App() {
  return (
    <div className="App">
      <MovieExplorer />
    </div>
  );
}

export default App;
