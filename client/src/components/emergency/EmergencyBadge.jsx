import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { AlertIcon } from '../icons/Icons';

/**
 * Emergency Badge Component
 * Animated badge for emergency requests
 */
const EmergencyBadge = ({ className = '' }) => {
  const prefersReducedMotion = useReducedMotion();

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        '0 0 0px rgba(220, 38, 38, 0.4)',
        '0 0 20px rgba(220, 38, 38, 0.6)',
        '0 0 0px rgba(220, 38, 38, 0.4)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  if (prefersReducedMotion) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-full text-sm font-semibold ${className}`}>
        <AlertIcon className="w-4 h-4" fill="currentColor" />
        <span>EMERGENCY</span>
      </div>
    );
  }

  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-full text-sm font-semibold ${className}`}
      variants={pulseVariants}
      animate="animate"
      style={{
        boxShadow: '0 0 10px rgba(220, 38, 38, 0.5)',
      }}
    >
      <AlertIcon className="w-4 h-4" fill="currentColor" />
      <span>EMERGENCY</span>
    </motion.div>
  );
};

export default EmergencyBadge;
