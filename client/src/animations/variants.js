/**
 * Centralized animation variants
 * All animations use consistent easing and durations
 */

// Animation durations (in seconds)
export const durations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
};

// Easing functions
export const easings = {
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  spring: [0.68, -0.55, 0.265, 1.55],
};

// Reduced motion variants (minimal animation)
export const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Page transition variants
 */
export const pageTransitions = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.easeOut,
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: durations.fast,
      ease: easings.easeIn,
    }
  },
};

/**
 * Card entrance animations
 */
export const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95,
  },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: durations.normal,
      delay: i * 0.1,
      ease: easings.easeOut,
    },
  }),
  hover: {
    scale: 1.02,
    y: -4,
    transition: {
      duration: durations.fast,
      ease: easings.easeOut,
    },
  },
};

/**
 * Button hover animations
 */
export const buttonVariants = {
  rest: {
    scale: 1,
    transition: {
      duration: durations.fast,
      ease: easings.easeOut,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: durations.fast,
      ease: easings.easeOut,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: durations.fast,
      ease: easings.easeOut,
    },
  },
};

/**
 * Modal animations
 */
export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.easeOut,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: durations.fast,
      ease: easings.easeIn,
    },
  },
};

/**
 * Backdrop animations
 */
export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: easings.easeOut,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: durations.fast,
      ease: easings.easeIn,
    },
  },
};

/**
 * Fade in animation
 */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: easings.easeOut,
    },
  },
};

/**
 * Slide up animation
 */
export const slideUp = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.easeOut,
    },
  },
};

/**
 * Scale animation
 */
export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.normal,
      ease: easings.easeOut,
    },
  },
};
