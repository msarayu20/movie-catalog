import React from 'react';

/**
 * FilterControls Component with Tailwind CSS
 * 
 * Advanced filtering interface featuring:
 * - Genre filtering with elegant dropdown
 * - Sorting controls with multiple options
 * - View mode toggle (grid/list)
 * - Clear filters functionality
 * - Responsive design with mobile-first approach
 * 
 * This component showcases proper form handling and state management
 * while maintaining excellent UX with smooth animations.
 */
export const FilterControls = ({
  genres,
  selectedGenre,
  onGenreChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onClearFilters
}) => {
  const sortOptions = [
    { value: 'rating-desc', label: 'Highest Rated', icon: '⭐' },
    { value: 'rating', label: 'Lowest Rated', icon: '📉' },
    { value: 'year', label: 'Newest First', icon: '📅' },
    { value: 'title', label: 'A-Z', icon: '🔤' }
  ];

  const hasActiveFilters = selectedGenre !== 'all' || sortBy !== 'rating-desc';

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 mb-6 animate-fade-in">
      <div className="flex flex-wrap items-center gap-4">
        {/* Genre Filter */}
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-1 text-xs font-medium text-gray-400" htmlFor="genre-select">
            <span>🎭</span>
            <span>Genre</span>
          </label>
          <div className="relative">
            <select
              id="genre-select"
              value={selectedGenre}
              onChange={(e) => onGenreChange(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-1.5 pr-8 text-white text-sm
                         focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500
                         hover:border-white/30 transition-all duration-300 cursor-pointer
                         appearance-none min-w-[120px]"
            >
              <option value="all" className="bg-dark-900 text-white">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre} className="bg-dark-900 text-white">
                  {genre}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-1 text-xs font-medium text-gray-400" htmlFor="sort-select">
            <span>🔄</span>
            <span>Sort</span>
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-lg px-3 py-1.5 pr-8 text-white text-sm
                         focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500
                         hover:border-white/30 transition-all duration-300 cursor-pointer
                         appearance-none min-w-[140px]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-dark-900 text-white">
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-1 text-xs font-medium text-gray-400">
            <span>👁️</span>
            <span>View</span>
          </label>
          <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/20">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`flex items-center justify-center w-7 h-7 rounded transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Grid view"
              title="Grid view"
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
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className={`flex items-center justify-center w-7 h-7 rounded transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              aria-label="List view"
              title="List view"
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

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="flex items-center space-x-1 px-3 py-1.5 bg-red-500/20 border border-red-500/30 
                       rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/30 
                       transition-all duration-300 text-sm"
            title="Clear all filters (Ctrl+K)"
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
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Filter Summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {selectedGenre !== 'all' && (
              <span className="inline-flex items-center space-x-2 px-3 py-1 bg-primary-500/20 border 
                               border-primary-500/30 rounded-full text-primary-300 text-sm">
                <span>🎭</span>
                <span>{selectedGenre}</span>
                <button
                  type="button"
                  onClick={() => onGenreChange('all')}
                  className="ml-1 text-primary-400 hover:text-primary-200 transition-colors"
                  aria-label={`Remove ${selectedGenre} filter`}
                >
                  ×
                </button>
              </span>
            )}
            {sortBy !== 'rating-desc' && (
              <span className="inline-flex items-center space-x-2 px-3 py-1 bg-primary-500/20 border 
                               border-primary-500/30 rounded-full text-primary-300 text-sm">
                <span>🔄</span>
                <span>{sortOptions.find(opt => opt.value === sortBy)?.label}</span>
                <button
                  type="button"
                  onClick={() => onSortChange('rating-desc')}
                  className="ml-1 text-primary-400 hover:text-primary-200 transition-colors"
                  aria-label="Reset to default sort"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};