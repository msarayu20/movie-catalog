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
  paginationMode,
  onPaginationModeChange,
  onClearFilters,
  onShowShareURL
}) => {
  const sortOptions = [
    { value: 'rating-desc', label: 'Top Rated', icon: '⭐' },
    { value: 'rating', label: 'Low Rated', icon: '📉' },
    { value: 'year', label: 'Latest', icon: '📅' },
    { value: 'title', label: 'A-Z', icon: '🔤' }
  ];

  const hasActiveFilters = selectedGenre !== 'all' || sortBy !== 'rating-desc';

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      {/* Left Side - Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Genre Filter - Pill Style */}
        <div className="relative">
          <select
            id="genre-select"
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="bg-[#1a1d29] border border-gray-600 rounded-full pl-4 pr-10 py-2 text-white text-sm font-medium
                       focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                       hover:border-primary-500 hover:bg-[#22252f] transition-all duration-200 cursor-pointer
                       appearance-none"
          >
            <option value="all" className="bg-[#1a1d29] text-white">🎭 All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre} className="bg-[#1a1d29] text-white">
                {genre}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Sort Controls - Pill Style */}
        <div className="relative">
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-[#1a1d29] border border-gray-600 rounded-full pl-4 pr-10 py-2 text-white text-sm font-medium
                       focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
                       hover:border-primary-500 hover:bg-[#22252f] transition-all duration-200 cursor-pointer
                       appearance-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-[#1a1d29] text-white">
                {option.icon} {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Clear Filters - Compact */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="flex items-center gap-1.5 px-3 py-2 bg-red-500/10 border border-red-500/30 
                       rounded-full text-red-400 hover:bg-red-500/20 hover:border-red-500/50
                       transition-all duration-200 text-sm font-medium"
            title="Clear all filters"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Right Side - View Controls */}
      <div className="flex items-center gap-3">
        {/* View Mode Toggle - Compact */}
        <div className="flex bg-[#1a1d29] rounded-full p-1 border border-gray-600">
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded-full transition-all duration-200 ${
              viewMode === 'grid'
                ? 'bg-primary-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            aria-label="Grid view"
            title="Grid view"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded-full transition-all duration-200 ${
              viewMode === 'list'
                ? 'bg-primary-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            aria-label="List view"
            title="List view"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Pagination Mode Toggle - Compact */}
        <div className="flex bg-[#1a1d29] rounded-full p-1 border border-gray-600">
          <button
            type="button"
            onClick={() => onPaginationModeChange('infinite')}
            className={`px-3 py-2 rounded-full transition-all duration-200 text-xs font-medium ${
              paginationMode === 'infinite'
                ? 'bg-primary-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            title="Infinite scroll"
          >
            ∞
          </button>
          <button
            type="button"
            onClick={() => onPaginationModeChange('pages')}
            className={`px-3 py-2 rounded-full transition-all duration-200 text-xs font-medium ${
              paginationMode === 'pages'
                ? 'bg-primary-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            title="Pagination"
          >
            1-12
          </button>
        </div>

        {/* Share Button - Icon Only */}
        <button
          type="button"
          onClick={onShowShareURL}
          className="p-2 bg-[#1a1d29] border border-gray-600 rounded-full text-gray-400 
                     hover:text-primary-400 hover:border-primary-500 hover:bg-[#22252f]
                     transition-all duration-200"
          title="Share"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
