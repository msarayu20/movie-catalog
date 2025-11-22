import React, { useRef, useEffect, useState } from 'react';

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
        <div className="relative max-w-md mx-auto mb-4">
            <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
                {/* Search Icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
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
                    className="w-full pl-10 pr-10 py-2 bg-white/5 backdrop-blur-sm border border-white/20 
                               rounded-lg text-white placeholder-gray-400 text-sm
                               focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500
                               hover:border-white/30 transition-all duration-300"
                    aria-label="Search movies"
                    autoComplete="off"
                    spellCheck="false"
                />

                {/* Clear Button */}
                {value && (
                    <button
                        type="button"
                        onClick={handleClearSearch}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                        aria-label="Clear search"
                    >
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
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                )}

                {/* Keyboard Shortcut Hint */}
                {!isFocused && !value && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <kbd className="px-1.5 py-0.5 text-xs font-mono bg-white/10 border border-white/20 rounded text-gray-400">
                            /
                        </kbd>
                    </div>
                )}
            </div>

            {/* Search Suggestions */}
            {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-dark-900/95 backdrop-blur-md 
                                border border-white/10 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
                    <div className="p-2 border-b border-white/10">
                        <span className="text-xs text-gray-400 font-medium">Popular searches</span>
                    </div>
                    <div className="p-1">
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                className="w-full text-left px-3 py-2 rounded hover:bg-white/5 text-gray-300 
                                           hover:text-white transition-all duration-200 text-sm flex items-center space-x-2"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-gray-500"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="M21 21l-4.35-4.35"></path>
                                </svg>
                                <span>{suggestion}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};