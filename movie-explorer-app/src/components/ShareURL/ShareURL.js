import { useState, useEffect } from 'react';

/**
 * ShareURL Component - Simple button to copy current browser URL
 * 
 * Copies the current page URL (with all query parameters) directly to clipboard
 * Shows a brief visual feedback when copied
 */
export const ShareURL = ({ onClick }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [copied]);

    const handleCopyURL = async () => {
        try {
            // Copy current browser URL to clipboard
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            if (onClick) onClick();
        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
    };

    return (
        <button
            type="button"
            onClick={handleCopyURL}
            className={`p-2 border rounded-full transition-all duration-200 ${
                copied
                    ? 'bg-green-500/20 border-green-500/50 text-green-400'
                    : 'bg-[#1a1d29] border-gray-600 text-gray-400 hover:text-primary-400 hover:border-primary-500 hover:bg-[#22252f]'
            }`}
            title={copied ? 'URL Copied!' : 'Share current page'}
        >
            {copied ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
            )}
        </button>
    );
};