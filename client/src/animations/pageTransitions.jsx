import { motion } from 'framer-motion';
import { pageTransitions } from './variants';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Page transition wrapper component
 * Wraps page content with smooth transitions
 */
export const PageTransition = ({ children, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitions}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Stagger children animation
 */
export const StaggerContainer = ({ children, className = '', staggerDelay = 0.1 }) => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
      },
    },
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
