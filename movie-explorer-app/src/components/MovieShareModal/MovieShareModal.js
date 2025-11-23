import { useState } from 'react';

/**
 * MovieShareModal - Share individual movie to social media
 */
export const MovieShareModal = ({ movie, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !movie) return null;

  // Generate shareable URL for this specific movie
  const movieUrl = `${window.location.origin}/all-movies?q=${encodeURIComponent(movie.title)}`;
  
  // Share text
  const shareText = `Check out "${movie.title}" (${movie.year}) - Rated ${movie.rating}/10!`;
  const shareTextEncoded = encodeURIComponent(shareText);
  const urlEncoded = encodeURIComponent(movieUrl);

  // Social media share URLs
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${shareTextEncoded}&url=${urlEncoded}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${urlEncoded}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${urlEncoded}`,
    whatsapp: `https://wa.me/?text=${shareTextEncoded}%20${urlEncoded}`,
    telegram: `https://t.me/share/url?url=${urlEncoded}&text=${shareTextEncoded}`,
    reddit: `https://reddit.com/submit?url=${urlEncoded}&title=${shareTextEncoded}`,
    email: `mailto:?subject=${encodeURIComponent(`Movie: ${movie.title}`)}&body=${shareTextEncoded}%0A%0A${urlEncoded}`
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(movieUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative bg-[#1a1d29] rounded-2xl border border-gray-700/50 shadow-2xl max-w-md w-full animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-start space-x-4">
            <img src={movie.poster} alt={movie.title} className="w-16 h-24 object-cover rounded-lg" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1">{movie.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>{movie.year}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-yellow-400 font-semibold">{movie.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">Share via</h4>
          
          <div className="grid grid-cols-4 gap-3 mb-6">
            <button onClick={() => handleShare('twitter')} className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/30 transition-all duration-200 hover:scale-105" title="Twitter">
              <svg className="w-6 h-6 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              <span className="text-xs text-[#1DA1F2] font-medium">Twitter</span>
            </button>

            <button onClick={() => handleShare('facebook')} className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 transition-all duration-200 hover:scale-105" title="Facebook">
              <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-xs text-[#1877F2] font-medium">Facebook</span>
            </button>

            <button onClick={() => handleShare('whatsapp')} className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 transition-all duration-200 hover:scale-105" title="WhatsApp">
              <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="text-xs text-[#25D366] font-medium">WhatsApp</span>
            </button>

            <button onClick={() => handleShare('telegram')} className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-[#0088cc]/10 hover:bg-[#0088cc]/20 border border-[#0088cc]/30 transition-all duration-200 hover:scale-105" title="Telegram">
              <svg className="w-6 h-6 text-[#0088cc]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
              <span className="text-xs text-[#0088cc] font-medium">Telegram</span>
            </button>

            <button onClick={() => handleShare('linkedin')} className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/30 transition-all duration-200 hover:scale-105" title="LinkedIn">
              <svg className="w-6 h-6 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="text-xs text-[#0A66C2] font-medium">LinkedIn</span>
            </button>

            <button onClick={() => handleShare('reddit')} className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-[#FF4500]/10 hover:bg-[#FF4500]/20 border border-[#FF4500]/30 transition-all duration-200 hover:scale-105" title="Reddit">
              <svg className="w-6 h-6 text-[#FF4500]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
              </svg>
              <span className="text-xs text-[#FF4500] font-medium">Reddit</span>
            </button>

            <button onClick={() => handleShare('email')} className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-gray-600/10 hover:bg-gray-600/20 border border-gray-600/30 transition-all duration-200 hover:scale-105" title="Email">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs text-gray-400 font-medium">Email</span>
            </button>

            <button onClick={handleCopyLink} className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-primary-500/10 hover:bg-primary-500/20 border border-primary-500/30 transition-all duration-200 hover:scale-105" title="Copy Link">
              {copied ? (
                <>
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs text-green-400 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-primary-400 font-medium">Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-[#0f1014] rounded-lg p-3 border border-gray-700/50">
            <p className="text-xs text-gray-500 mb-1">Share Link:</p>
            <p className="text-sm text-gray-300 break-all">{movieUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
