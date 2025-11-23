import React from 'react';

/**
 * Pagination Component
 * 
 * A professional pagination component featuring:
 * - Previous/Next navigation
 * - Page number buttons with smart display
 * - Jump to first/last page
 * - Responsive design with mobile-friendly controls
 * - Accessibility features and keyboard navigation
 * 
 * @param {object} props - Component properties
 * @param {number} props.currentPage - Current active page (1-based)
 * @param {number} props.totalPages - Total number of pages
 * @param {function} props.onPageChange - Handler for page change
 * @param {number} props.maxVisiblePages - Maximum visible page buttons (default: 7)
 * @param {boolean} props.showFirstLast - Show first/last page buttons (default: true)
 */
export const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  maxVisiblePages = 7,
  showFirstLast = true 
}) => {
  // Don't render if there's only one page or no pages
  if (totalPages <= 1) return null;

  // Calculate which page numbers to show
  const getVisiblePages = () => {
    const delta = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);
    
    // Adjust if we're near the beginning or end
    if (end - start + 1 < maxVisiblePages) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxVisiblePages - 1);
      } else {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
    }
    
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();
  const showLeftEllipsis = visiblePages[0] > 2;
  const showRightEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1;

  // Handle keyboard navigation
  const handleKeyDown = (e, page) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPageChange(page);
    }
  };

  // Button component for consistent styling
  const PageButton = ({ page, isCurrent = false, isDisabled = false, onClick, children }) => (
    <button
      onClick={() => !isDisabled && onClick && onClick()}
      onKeyDown={(e) => handleKeyDown(e, page)}
      disabled={isDisabled}
      className={`
        min-w-[40px] h-10 px-3 rounded-lg font-medium text-sm transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary-500/50
        ${isCurrent 
          ? 'bg-primary-500 text-white shadow-lg transform scale-105' 
          : isDisabled
            ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
            : 'bg-[#1a1d29] text-gray-300 border border-gray-600 hover:bg-gray-700 hover:text-white hover:border-gray-500 hover:transform hover:scale-105'
        }
      `}
      aria-label={isCurrent ? `Current page ${page}` : `Go to page ${page}`}
      aria-current={isCurrent ? 'page' : undefined}
    >
      {children || page}
    </button>
  );

  return (
    <nav className="flex items-center justify-center mt-8 mb-6" aria-label="Pagination Navigation">
      <div className="flex items-center space-x-1">
        {/* First Page Button */}
        {showFirstLast && currentPage > 2 && (
          <PageButton
            page={1}
            onClick={() => onPageChange(1)}
            isDisabled={currentPage === 1}
          >
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">First</span>
            </div>
          </PageButton>
        )}

        {/* Previous Button */}
        <PageButton
          page={currentPage - 1}
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Previous</span>
          </div>
        </PageButton>

        {/* First page if not visible */}
        {showLeftEllipsis && (
          <>
            <PageButton page={1} onClick={() => onPageChange(1)} />
            <span className="px-2 text-gray-500 font-medium">⋯</span>
          </>
        )}

        {/* Page Numbers */}
        {visiblePages.map(page => (
          <PageButton
            key={page}
            page={page}
            isCurrent={page === currentPage}
            onClick={() => onPageChange(page)}
          />
        ))}

        {/* Last page if not visible */}
        {showRightEllipsis && (
          <>
            <span className="px-2 text-gray-500 font-medium">⋯</span>
            <PageButton page={totalPages} onClick={() => onPageChange(totalPages)} />
          </>
        )}

        {/* Next Button */}
        <PageButton
          page={currentPage + 1}
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          <div className="flex items-center space-x-1">
            <span className="hidden sm:inline">Next</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </PageButton>

        {/* Last Page Button */}
        {showFirstLast && currentPage < totalPages - 1 && (
          <PageButton
            page={totalPages}
            onClick={() => onPageChange(totalPages)}
            isDisabled={currentPage === totalPages}
          >
            <div className="flex items-center space-x-1">
              <span className="hidden sm:inline">Last</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </div>
          </PageButton>
        )}
      </div>

      {/* Page Info - Mobile friendly */}
      <div className="ml-6 text-sm text-gray-400 hidden sm:block">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
};
