/**
 * Central animation configuration
 * Easy to disable animations globally
 */

// Global animation toggle
export const ANIMATIONS_ENABLED = true;

// Performance settings
export const PERFORMANCE_CONFIG = {
  // Limit animation complexity on low-end devices
  reduceComplexity: true,
  
  // Limit pixel ratio for 3D
  maxPixelRatio: 2,
  
  // Reduce animation duration on low-end devices
  reduceDuration: true,
  
  // Limit concurrent animations
  maxConcurrentAnimations: 10,
};

// Animation presets
export const PRESETS = {
  // Fast animations (for low-end devices)
  fast: {
    duration: 0.2,
    easing: [0, 0, 0.2, 1],
  },
  
  // Normal animations
  normal: {
    duration: 0.3,
    easing: [0, 0, 0.2, 1],
  },
  
  // Slow animations (for emphasis)
  slow: {
    duration: 0.5,
    easing: [0.4, 0, 0.2, 1],
  },
};

/**
 * Get animation config based on device capabilities
 */
export const getAnimationConfig = (prefersReducedMotion, isLowEnd) => {
  if (!ANIMATIONS_ENABLED || prefersReducedMotion) {
    return {
      enabled: false,
      duration: 0,
      easing: [0, 0, 0, 0],
    };
  }

  if (isLowEnd && PERFORMANCE_CONFIG.reduceDuration) {
    return PRESETS.fast;
  }

  return PRESETS.normal;
};
