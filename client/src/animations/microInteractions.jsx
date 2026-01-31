import { motion } from 'framer-motion';
import { buttonVariants, cardVariants } from './variants';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Animated button component
 * Provides hover and tap animations
 */
export const AnimatedButton = ({ 
  children, 
  className = '', 
  onClick,
  disabled = false,
  ...props 
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <button
        className={className}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      className={className}
      onClick={onClick}
      disabled={disabled}
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {children}
    </motion.button>
  );
};

/**
 * Animated card component
 * Provides entrance and hover animations
 */
export const AnimatedCard = ({ 
  children, 
  className = '', 
  index = 0,
  ...props 
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover="hover"
      custom={index}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Fade in component
 */
export const FadeIn = ({ children, className = '', delay = 0 }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Slide up component
 */
export const SlideUp = ({ children, className = '', delay = 0 }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: [0, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};
