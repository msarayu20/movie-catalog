import React from 'react';
import './FilterControls.css';

/**
 * FilterControls Component
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
    <div className="filter-controls">
      <div className="filter-row">
        {/* Genre Filter */}
        <div className="filter-group">
          <label className="filter-label" htmlFor="genre-select">
            <span className="label-icon">🎭</span>
            Genre
          </label>
          <div className="select-wrapper">
            <select
              id="genre-select"
              value={selectedGenre}
              onChange={(e) => onGenreChange(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <div className="select-arrow">
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
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="filter-group">
          <label className="filter-label" htmlFor="sort-select">
            <span className="label-icon">🔄</span>
            Sort By
          </label>
          <div className="select-wrapper">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="filter-select"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
            <div className="select-arrow">
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
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="filter-group">
          <label className="filter-label">
            <span className="label-icon">👁️</span>
            View
          </label>
          <div className="view-toggle">
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={`view-button ${viewMode === 'grid' ? 'view-button--active' : ''}`}
              aria-label="Grid view"
              title="Grid view"
            >
              <svg
                width="18"
                height="18"
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
              className={`view-button ${viewMode === 'list' ? 'view-button--active' : ''}`}
              aria-label="List view"
              title="List view"
            >
              <svg
                width="18"
                height="18"
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
          <div className="filter-group">
            <button
              type="button"
              onClick={onClearFilters}
              className="clear-filters-button"
              title="Clear all filters (Ctrl+K)"
            >
              <span className="clear-icon">
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
              </span>
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Filter Summary */}
      {hasActiveFilters && (
        <div className="filter-summary">
          <div className="filter-tags">
            {selectedGenre !== 'all' && (
              <span className="filter-tag">
                <span className="tag-icon">🎭</span>
                {selectedGenre}
                <button
                  type="button"
                  onClick={() => onGenreChange('all')}
                  className="tag-remove"
                  aria-label={`Remove ${selectedGenre} filter`}
                >
                  ×
                </button>
              </span>
            )}
            {sortBy !== 'rating-desc' && (
              <span className="filter-tag">
                <span className="tag-icon">🔄</span>
                {sortOptions.find(opt => opt.value === sortBy)?.label}
                <button
                  type="button"
                  onClick={() => onSortChange('rating-desc')}
                  className="tag-remove"
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