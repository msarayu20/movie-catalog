/**
 * URL Utils - Enhanced URL Parameter Handling
 * 
 * Utilities for generating and parsing sophisticated URL parameters
 * that support complex queries like ?q=inception&genre=sci-fi&sort=rating-desc
 */

/**
 * Generate a shareable URL for the current movie browse state
 * @param {object} params - Current browse parameters
 * @param {string} params.search - Search query
 * @param {string} params.genre - Selected genre
 * @param {string} params.sort - Sort order
 * @param {string} params.view - View mode
 * @param {string} params.pagination - Pagination mode
 * @param {number} params.page - Current page (for pagination mode)
 * @returns {string} Complete shareable URL
 */
export const generateShareableURL = (params) => {
  const baseURL = window.location.origin + window.location.pathname;
  const urlParams = new URLSearchParams();
  
  // Add parameters only if they differ from defaults
  if (params.search && params.search.trim()) {
    urlParams.set('q', encodeURIComponent(params.search.trim()));
  }
  
  if (params.genre && params.genre !== 'all') {
    urlParams.set('genre', params.genre.toLowerCase());
  }
  
  if (params.sort && params.sort !== 'rating-desc') {
    urlParams.set('sort', params.sort);
  }
  
  if (params.view && params.view !== 'grid') {
    urlParams.set('view', params.view);
  }
  
  if (params.pagination && params.pagination !== 'infinite') {
    urlParams.set('pagination', params.pagination);
  }
  
  if (params.page && params.page > 1 && params.pagination === 'pages') {
    urlParams.set('page', params.page.toString());
  }
  
  const queryString = urlParams.toString();
  return queryString ? `${baseURL}?${queryString}` : baseURL;
};

/**
 * Parse URL parameters with validation and fallbacks
 * @param {URLSearchParams} searchParams - URL search parameters
 * @param {Array} availableGenres - Valid genres for validation
 * @returns {object} Parsed and validated parameters
 */
export const parseURLParameters = (searchParams, availableGenres = []) => {
  const params = {};
  
  // Parse search query with decoding
  const q = searchParams.get('q');
  if (q) {
    try {
      params.search = decodeURIComponent(q);
    } catch (e) {
      params.search = q; // fallback to raw value
    }
  }
  
  // Parse and validate genre
  const genre = searchParams.get('genre');
  if (genre) {
    const normalizedGenre = genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase();
    params.genre = availableGenres.includes(normalizedGenre) ? normalizedGenre : 'all';
  }
  
  // Parse and validate sort
  const sort = searchParams.get('sort');
  const validSorts = ['rating-desc', 'rating', 'year', 'title'];
  if (sort && validSorts.includes(sort)) {
    params.sort = sort;
  }
  
  // Parse and validate view mode
  const view = searchParams.get('view');
  if (view === 'list' || view === 'grid') {
    params.view = view;
  }
  
  // Parse and validate pagination mode
  const pagination = searchParams.get('pagination');
  if (pagination === 'pages' || pagination === 'infinite') {
    params.pagination = pagination;
  }
  
  // Parse and validate page number
  const page = searchParams.get('page');
  if (page) {
    const pageNum = parseInt(page, 10);
    if (pageNum > 0) {
      params.page = pageNum;
    }
  }
  
  return params;
};

/**
 * Generate example URLs for documentation or help
 * @param {string} baseURL - Base URL of the application
 * @returns {Array} Array of example URL objects
 */
export const getExampleURLs = (baseURL = window.location.origin + window.location.pathname) => {
  return [
    {
      title: 'Search for Inception',
      url: `${baseURL}?q=inception`,
      description: 'Direct search for "Inception" movie'
    },
    {
      title: 'Sci-Fi Movies',
      url: `${baseURL}?genre=sci-fi`,
      description: 'Browse all Science Fiction movies'
    },
    {
      title: 'Search Inception in Sci-Fi',
      url: `${baseURL}?q=inception&genre=sci-fi`,
      description: 'Search "Inception" within Sci-Fi genre'
    },
    {
      title: 'High-rated Action Movies',
      url: `${baseURL}?genre=action&sort=rating-desc`,
      description: 'Action movies sorted by highest rating'
    },
    {
      title: 'Recent Dramas in List View',
      url: `${baseURL}?genre=drama&sort=year&view=list`,
      description: 'Drama movies sorted by year in list view'
    },
    {
      title: 'Paginated Comedy Movies',
      url: `${baseURL}?genre=comedy&pagination=pages&page=2`,
      description: 'Comedy movies with pagination, page 2'
    },
    {
      title: 'Search "Dark Knight" Action Movies',
      url: `${baseURL}?q=dark%20knight&genre=action&sort=rating-desc&view=grid`,
      description: 'Complex query combining search, filter, sort, and view'
    }
  ];
};

/**
 * Copy URL to clipboard with user feedback
 * @param {string} url - URL to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyURLToClipboard = async (url) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (err) {
    console.error('Failed to copy URL:', err);
    return false;
  }
};

/**
 * Generate social media sharing URLs
 * @param {string} movieURL - URL of the current movie browse state
 * @param {object} context - Context for sharing
 * @returns {object} Object with different sharing platform URLs
 */
export const generateSharingURLs = (movieURL, context = {}) => {
  const encodedURL = encodeURIComponent(movieURL);
  const title = encodeURIComponent(context.title || 'Check out these amazing movies!');
  const description = encodeURIComponent(context.description || 'Discover your next favorite film');
  
  return {
    twitter: `https://twitter.com/intent/tweet?url=${encodedURL}&text=${title}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`,
    email: `mailto:?subject=${title}&body=${description}%0A%0A${encodedURL}`,
    copy: movieURL
  };
};