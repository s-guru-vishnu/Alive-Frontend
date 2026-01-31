import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { AlertIcon } from '../icons/Icons';

/**
 * Emergency Count Indicator
 * Animated badge showing emergency request count
 */
const EmergencyCount = ({ count = 0, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  const countVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  if (count === 0) return null;

  if (prefersReducedMotion) {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <AlertIcon className="w-5 h-5 text-red-600" fill="currentColor" />
        <span className="bg-red-600 text-white rounded-full px-2.5 py-1 text-xs font-bold">
          {count}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      className={`inline-flex items-center gap-2 ${className}`}
      initial="initial"
      animate="animate"
      variants={countVariants}
      key={count} // Re-animate when count changes
    >
      <AlertIcon className="w-5 h-5 text-red-600" fill="currentColor" />
      <motion.span
        className="bg-red-600 text-white rounded-full px-2.5 py-1 text-xs font-bold"
        variants={countVariants}
        initial="initial"
        animate="animate"
      >
        {count}
      </motion.span>
    </motion.div>
  );
};

export default EmergencyCount;
