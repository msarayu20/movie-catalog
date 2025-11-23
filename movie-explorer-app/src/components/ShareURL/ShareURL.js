import React, { useState } from 'react';
import { generateShareableURL, copyURLToClipboard, getExampleURLs } from '../../utils/urlUtils';

/*
 * ShareURL Component
 * 
 * Demonstrates enhanced URL parameter handling with examples like:
 * - ?q=inception&genre=sci-fi
 * - ?genre=action&sort=rating-desc&view=list
 * - ?q=dark%20knight&pagination=pages&page=2
 * 
 * Features:
 * - Copy current browse state URL
 * - Example URL patterns
 * - Share to social media
 * - URL parameter documentation
 */
export const ShareURL = ({
    searchQuery,
    selectedGenre,
    sortBy,
    viewMode,
    paginationMode,
    currentPage,
    isOpen,
    onClose
}) => {
    const [copied, setCopied] = useState(false);
    const [copiedExample, setCopiedExample] = useState(null);

    if (!isOpen) return null;

    // Generate current state URL
    const currentURL = generateShareableURL({
        search: searchQuery,
        genre: selectedGenre,
        sort: sortBy,
        view: viewMode,
        pagination: paginationMode,
        page: currentPage
    });

    // Get example URLs
    const examples = getExampleURLs();

    const handleCopyURL = async (url, isExample = false, exampleId = null) => {
        const success = await copyURLToClipboard(url);
        if (success) {
            if (isExample) {
                setCopiedExample(exampleId);
                setTimeout(() => setCopiedExample(null), 2000);
            } else {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-dark-800 rounded-2xl border border-white/20 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Share Movie Browse</h2>
                        <p className="text-gray-400 mt-1">Copy URLs to share your current movie selection</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                    {/* Current State URL */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            Current Browse State
                        </h3>

                        <div className="flex items-center space-x-3 bg-white/5 rounded-lg border border-white/10 p-3">
                            <div className="flex-1 min-w-0">
                                <code className="text-sm text-blue-300 break-all">{currentURL}</code>
                            </div>
                            <button
                                onClick={() => handleCopyURL(currentURL)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${copied
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                        : 'bg-primary-500/20 text-primary-400 border border-primary-500/30 hover:bg-primary-500/30'
                                    }`}
                            >
                                {copied ? (
                                    <div className="flex items-center space-x-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Copied!</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        <span>Copy</span>
                                    </div>
                                )}
                            </button>
                        </div>

                        {/* Current state description */}
                        {(searchQuery || selectedGenre !== 'all' || sortBy !== 'rating-desc') && (
                            <div className="mt-3 text-sm text-gray-400">
                                <span className="font-medium">This URL includes: </span>
                                {searchQuery && <span className="inline-block bg-blue-500/20 text-blue-300 px-2 py-1 rounded mr-2 mb-1">Search: "{searchQuery}"</span>}
                                {selectedGenre !== 'all' && <span className="inline-block bg-purple-500/20 text-purple-300 px-2 py-1 rounded mr-2 mb-1">Genre: {selectedGenre}</span>}
                                {sortBy !== 'rating-desc' && <span className="inline-block bg-green-500/20 text-green-300 px-2 py-1 rounded mr-2 mb-1">Sort: {sortBy}</span>}
                                {viewMode !== 'grid' && <span className="inline-block bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded mr-2 mb-1">View: {viewMode}</span>}
                                {paginationMode !== 'infinite' && <span className="inline-block bg-orange-500/20 text-orange-300 px-2 py-1 rounded mr-2 mb-1">Pagination: {paginationMode}</span>}
                                {currentPage > 1 && <span className="inline-block bg-red-500/20 text-red-300 px-2 py-1 rounded mr-2 mb-1">Page: {currentPage}</span>}
                            </div>
                        )}
                    </div>

                    {/* Example URLs */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Example URL Patterns
                        </h3>

                        <div className="grid gap-4">
                            {examples.map((example, index) => (
                                <div
                                    key={index}
                                    className="bg-white/5 rounded-lg border border-white/10 p-4 hover:bg-white/10 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-white mb-1">{example.title}</h4>
                                            <p className="text-sm text-gray-400 mb-2">{example.description}</p>
                                            <code className="text-xs text-blue-300 bg-blue-500/10 px-2 py-1 rounded break-all">
                                                {example.url}
                                            </code>
                                        </div>
                                        <button
                                            onClick={() => handleCopyURL(example.url, true, index)}
                                            className={`ml-4 px-3 py-1 rounded text-xs font-medium transition-all duration-200 ${copiedExample === index
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 hover:text-white'
                                                }`}
                                        >
                                            {copiedExample === index ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* URL Parameter Documentation */}
                    <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                        <h4 className="text-white font-medium mb-3 flex items-center">
                            <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Supported URL Parameters
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div>
                                <code className="text-blue-300">?q=movie_title</code>
                                <p className="text-gray-400 ml-4">Search for specific movies</p>
                            </div>
                            <div>
                                <code className="text-blue-300">?genre=sci-fi</code>
                                <p className="text-gray-400 ml-4">Filter by genre</p>
                            </div>
                            <div>
                                <code className="text-blue-300">?sort=rating-desc</code>
                                <p className="text-gray-400 ml-4">Sort order (rating, year, title)</p>
                            </div>
                            <div>
                                <code className="text-blue-300">?view=list</code>
                                <p className="text-gray-400 ml-4">Display mode (grid/list)</p>
                            </div>
                            <div>
                                <code className="text-blue-300">?pagination=pages</code>
                                <p className="text-gray-400 ml-4">Navigation mode</p>
                            </div>
                            <div>
                                <code className="text-blue-300">?page=2</code>
                                <p className="text-gray-400 ml-4">Current page number</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};