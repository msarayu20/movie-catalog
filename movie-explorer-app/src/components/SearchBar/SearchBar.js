import React, { useRef, useEffect, useState } from 'react';
import './SearchBar.css';

/**
 * SearchBar Component
 * 
 * An advanced search input with modern UX features:
 * - Real-time search with debouncing (handled by parent)
 * - Keyboard shortcuts and focus management
 * - Search suggestions and autocomplete
 * - Elegant animations and feedback
 * - Accessibility features (ARIA labels, keyboard navigation)
 * 
 * @param {object} props - Component properties
 * @param {string} props.value - Current search value
 * @param {function} props.onChange - Search change handler
 * @param {string} props.placeholder - Input placeholder text
 */
export const SearchBar = ({ value, onChange, placeholder = 'Search movies...' }) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Focus management for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Focus search when '/' is pressed (handled in parent too, but this is backup)
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Generate search suggestions based on popular movie terms
  useEffect(() => {
    if (value.length > 1) {
      // In a real app, this would come from an API or search service
      const popularTerms = [
        'action', 'adventure', 'animation', 'comedy', 'crime', 'drama',
        'family', 'fantasy', 'horror', 'mystery', 'romance', 'sci-fi',
        'thriller', 'war', 'western', 'superhero', 'marvel', 'dc'
      ];
      
      const matchingSuggestions = popularTerms
        .filter(term => term.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
        
      setSuggestions(matchingSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [value]);

  // Separate effect for showing/hiding suggestions
  useEffect(() => {
    if (suggestions.length > 0 && isFocused) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [suggestions, isFocused]);
  
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };
  
  const handleInputFocus = () => {
    setIsFocused(true);
  };
  
  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setIsFocused(false);
      setShowSuggestions(false);
    }, 200);
  };
  
  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };
  
  const handleClearSearch = () => {
    onChange('');
    inputRef.current?.focus();
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      inputRef.current?.blur();
      setShowSuggestions(false);
    }
  };
  
  return (
    <div className="search-bar-container">
      <div className={`search-bar ${isFocused ? 'search-bar--focused' : ''} ${value ? 'search-bar--has-value' : ''}`}>
        {/* Search Icon */}
        <div className="search-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
        </div>
        
        {/* Search Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="search-input"
          data-search-input
          aria-label="Search movies"
          aria-describedby="search-suggestions"
          autoComplete="off"
          spellCheck="false"
        />
        
        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="clear-button"
            aria-label="Clear search"
            tabIndex="-1"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
        
        {/* Keyboard Shortcut Hint */}
        {!isFocused && !value && (
          <div className="keyboard-hint">
            <kbd>/</kbd>
          </div>
        )}
      </div>
      
      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="search-suggestions" id="search-suggestions">
          <div className="suggestions-header">
            <span>Popular searches</span>
          </div>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
              tabIndex="0"
            >
              <div className="suggestion-icon">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="M21 21l-4.35-4.35"></path>
                </svg>
              </div>
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};