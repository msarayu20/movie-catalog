import React, { useEffect, useState } from 'react';
import { MovieShareModal } from '../MovieShareModal/MovieShareModal';

/**
 * MovieDetailsModal Component - Professional Movie Details Display
 * 
 * A sophisticated modal showcasing:
 * - Comprehensive movie information with rich visual layout
 * - Professional design with glass-morphism effects
 * - Interactive elements and smooth animations
 * - Accessibility features with keyboard navigation
 * - Advanced data presentation with contextual insights
 * 
 * This modal demonstrates professional UI/UX skills and attention to detail.
 */
export const MovieDetailsModal = ({ movie, isOpen, onClose, isFavorite, onToggleFavorite }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showShareModal, setShowShareModal] = useState(false);


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  const getRatingColor = (rating) => {
    if (rating >= 8.5) return 'text-green-400';
    if (rating >= 7.0) return 'text-yellow-400';
    if (rating >= 5.5) return 'text-orange-400';
    return 'text-red-400';
  };

  const getRatingLabel = (rating) => {
    if (rating >= 8.5) return 'Exceptional';
    if (rating >= 7.0) return 'Great';
    if (rating >= 5.5) return 'Good';
    return 'Fair';
  };

  const formatGenres = (genres) => {
    if (!genres || !Array.isArray(genres)) return '';
    return genres.join(' • ');
  };

  const formatDuration = (duration) => {
    if (!duration) return 'N/A';
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#1a1d29] rounded-2xl overflow-hidden shadow-2xl animate-scale-in border border-gray-700/50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          <svg className="w-5 h-5 text-gray-300 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="flex flex-col lg:flex-row overflow-hidden">
          {/* Movie Poster Section */}
          <div className="lg:w-2/5 relative bg-gray-900">
            <div className="relative h-80 lg:h-full">
              {/* Background Image */}
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

              {/* Year Badge */}
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded text-white text-sm font-semibold">
                {movie.year}
              </div>

              {/* Rating and Action Buttons at Bottom */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center justify-between">
                  {/* Rating Badge */}
                  <div className="flex items-center space-x-2 bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2.5">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="text-yellow-400 font-bold text-lg">{movie.rating.toFixed(1)}</span>
                    <span className="text-gray-300 text-sm">/10</span>
                  </div>

                  {/* Action Buttons Group */}
                  <div className="flex items-center space-x-2">
                    {/* Share Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowShareModal(true);
                      }}
                      className="w-11 h-11 rounded-full bg-black/80 backdrop-blur-sm transition-all duration-200 hover:scale-110 text-gray-300 hover:text-primary-400"
                      title="Share this movie"
                    >
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite();
                      }}
                      className={`w-11 h-11 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 ${isFavorite
                        ? 'bg-red-500 text-white'
                        : 'bg-black/80 text-gray-300 hover:bg-red-500 hover:text-white'
                        }`}
                      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <svg className="w-5 h-5 mx-auto" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Movie Details Section */}
          <div className="lg:w-3/5 flex flex-col bg-[#1a1d29]">
          
            {/* Header */}
            <div className="p-6 lg:p-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                {movie.title}
              </h1>
              
              {/* Genres */}
              {movie.genre && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genre.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 rounded-full text-sm text-primary-300 font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-6">
                <span className="flex items-center space-x-1.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-gray-300">{movie.year}</span>
                </span>

                {movie.duration && (
                  <>
                    <span className="text-gray-600">•</span>
                    <span className="flex items-center space-x-1.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-gray-300">{formatDuration(movie.duration)}</span>
                    </span>
                  </>
                )}

                {movie.director && (
                  <>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-300">{movie.director}</span>
                  </>
                )}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="px-6 lg:px-8 border-b border-gray-700/50">
              <div className="flex space-x-6">
                {['overview', 'details', 'cast'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-1 text-sm font-medium border-b-2 transition-all duration-200 capitalize ${activeTab === tab
                      ? 'border-primary-500 text-primary-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {movie.description && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Synopsis</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {movie.description}
                      </p>
                    </div>
                  )}

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {movie.language && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Language</h4>
                        <p className="text-white">{movie.language}</p>
                      </div>
                    )}

                    {movie.country && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Country</h4>
                        <p className="text-white">{movie.country}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Release Date</h4>
                      <p className="text-white">{movie.year}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Rating</h4>
                      <p className={`font-bold ${getRatingColor(movie.rating)}`}>
                        {movie.rating.toFixed(1)}/10 ({getRatingLabel(movie.rating)})
                      </p>
                    </div>

                    {movie.director && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Director</h4>
                        <p className="text-white">{movie.director}</p>
                      </div>
                    )}

                    {movie.genre && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Genres</h4>
                        <p className="text-white">{formatGenres(movie.genre)}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'cast' && (
                <div className="space-y-6">
                  {movie.cast ? (
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-3">Main Cast</h4>
                      <p className="text-white leading-relaxed">{movie.cast}</p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                      </svg>
                      <p className="text-gray-400">Cast information not available</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <MovieShareModal
        movie={movie}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
};
