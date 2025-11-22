import { useState, useEffect, useMemo, useCallback } from 'react';

/**
 * Custom Hook: useDebounce
 * 
 * Debounces a value by delaying its update until after a specified delay.
 * This is crucial for performance optimization in search functionality,
 * preventing excessive API calls or filtering operations.
 * 
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} - The debounced value
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if value changes before delay completes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Custom Hook: useLocalStorage
 * 
 * Provides a way to synchronize state with localStorage.
 * Automatically handles JSON serialization/deserialization and
 * provides a safe fallback for when localStorage is unavailable.
 * 
 * @param {string} key - localStorage key
 * @param {any} initialValue - Default value if nothing in storage
 * @returns {[any, function]} - [value, setValue] tuple
 */
export const useLocalStorage = (key, initialValue) => {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error, return initial value
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

/**
 * Custom Hook: useURLParams
 * 
 * Manages URL query parameters for state persistence.
 * This creates a better user experience by allowing users to
 * bookmark and share filtered/searched states.
 * 
 * @returns {object} - { params, updateParam, clearParams }
 */
export const useURLParams = () => {
  const [searchParams, setSearchParams] = useState(() => {
    return new URLSearchParams(window.location.search);
  });

  // Get current params as an object
  const params = useMemo(() => {
    const paramObj = {};
    for (const [key, value] of searchParams.entries()) {
      paramObj[key] = value;
    }
    return paramObj;
  }, [searchParams]);

  // Update a specific parameter
  const updateParam = useCallback((key, value) => {
    setSearchParams(currentParams => {
      const newParams = new URLSearchParams(currentParams);
      
      if (value === null || value === undefined || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
      
      // Update browser URL without page reload
      const newUrl = `${window.location.pathname}${newParams.toString() ? '?' + newParams.toString() : ''}`;
      window.history.replaceState(null, '', newUrl);
      
      return newParams;
    });
  }, []);

  // Clear all parameters
  const clearParams = useCallback(() => {
    setSearchParams(new URLSearchParams());
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  return { params, updateParam, clearParams };
};

/**
 * Custom Hook: useIntersectionObserver
 * 
 * Implements intersection observer for infinite scroll functionality.
 * This provides smooth, performance-optimized infinite scrolling
 * that only loads content when needed.
 * 
 * @param {object} options - Intersection observer options
 * @returns {[function, boolean]} - [ref, isIntersecting] tuple
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, options]);

  return [setElement, isIntersecting];
};

/**
 * Custom Hook: useKeyboardShortcuts
 * 
 * Implements keyboard shortcuts for enhanced user experience.
 * Professional applications often include keyboard navigation
 * for power users.
 * 
 * @param {object} shortcuts - Object mapping keys to functions
 */
export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, ctrlKey, metaKey, shiftKey } = event;
      
      // Create a key combination string
      let combination = '';
      if (ctrlKey || metaKey) combination += 'Ctrl+';
      if (shiftKey) combination += 'Shift+';
      combination += key.toLowerCase();
      
      // Check if this combination has a handler
      const handler = shortcuts[combination] || shortcuts[key.toLowerCase()];
      
      if (handler) {
        event.preventDefault();
        handler(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
};