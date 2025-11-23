import React, { useState } from 'react';

/**
 * MovieCard Component 
 * Beautiful, consistent movie cards matching the reference design
 */
export const MovieCard = ({
  movie,
  viewMode = 'grid',
  isFavorite = false,
  onSelect,
  onToggleFavorite,
  animationDelay = 0
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <article
      className="group relative bg-[#1a1d29] rounded-lg overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl"
      onClick={onSelect}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Year Badge */}
      <div className="absolute top-3 right-3 z-10 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-semibold">
        {movie.year}
      </div>

      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-800">
        {!imageError ? (
          <>
            <img
              src={movie.poster}
              alt={`${movie.title} poster`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 animate-pulse" />
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col items-center justify-center text-gray-400">
            <span className="text-5xl mb-2">🎬</span>
            <span className="text-sm font-medium text-center px-4">{movie.title}</span>
          </div>
        )}

        {/* Hover Overlay with Play Button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <svg className="w-8 h-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Favorite Button */}
        <button
          className={`absolute top-3 left-3 z-10 w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
            isFavorite 
              ? 'bg-red-500 text-white scale-110' 
              : 'bg-black/60 text-gray-300 hover:bg-red-500 hover:text-white hover:scale-110'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      {/* Movie Info Section */}
      <div className="p-4 bg-[#1a1d29]">
        {/* Title */}
        <h3 className="text-white font-semibold text-base mb-2 line-clamp-2 min-h-[3rem] group-hover:text-primary-400 transition-colors">
          {movie.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {movie.description}
        </p>

        {/* Footer with Rating and Details Button */}
        <div className="flex items-center justify-between">
          {/* Rating */}
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-yellow-400 font-semibold text-sm">{movie.rating.toFixed(1)}</span>
          </div>

          {/* Details Button */}
          <button
            className="px-4 py-1.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            Details
          </button>
        </div>
      </div>
    </article>
  );
};
