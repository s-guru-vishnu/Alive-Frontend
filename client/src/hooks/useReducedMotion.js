import { useEffect, useState } from 'react';

/**
 * Hook to detect if user prefers reduced motion
 * Returns true if prefers-reduced-motion is enabled
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
};

/**
 * Hook to detect low-end devices
 * Returns true if device is likely low-end
 */
export const useLowEndDevice = () => {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    // Check for hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 4;
    
    // Check for device memory (if available)
    const memory = navigator.deviceMemory || 4;
    
    // Check for connection speed (if available)
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const slowConnection = connection && (
      connection.effectiveType === 'slow-2g' || 
      connection.effectiveType === '2g' ||
      connection.saveData === true
    );

    // Consider low-end if: < 4 cores, < 4GB RAM, or slow connection
    const lowEnd = cores < 4 || memory < 4 || slowConnection;
    
    setIsLowEnd(lowEnd);
  }, []);

  return isLowEnd;
};
