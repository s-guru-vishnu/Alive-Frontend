import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import EmergencyBadge from './EmergencyBadge';

/**
 * Emergency Card Wrapper Component
 * Wraps content with emergency animations
 */
const EmergencyCard = ({ 
  children, 
  className = '',
  onHover,
  ...props 
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const heartbeatVariants = {
    idle: {
      scale: 1,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    pulse: {
      scale: [1, 1.03, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  const glowVariants = {
    idle: {
      boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.1), 0 2px 4px -1px rgba(220, 38, 38, 0.06)',
    },
    pulse: {
      boxShadow: [
        '0 4px 6px -1px rgba(220, 38, 38, 0.1), 0 2px 4px -1px rgba(220, 38, 38, 0.06)',
        '0 10px 15px -3px rgba(220, 38, 38, 0.3), 0 4px 6px -2px rgba(220, 38, 38, 0.2)',
        '0 4px 6px -1px rgba(220, 38, 38, 0.1), 0 2px 4px -1px rgba(220, 38, 38, 0.06)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    hover: {
      boxShadow: '0 10px 15px -3px rgba(220, 38, 38, 0.2), 0 4px 6px -2px rgba(220, 38, 38, 0.1)',
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  if (prefersReducedMotion) {
    return (
      <div
        className={`bg-white rounded-xl border-2 border-red-500 p-6 ${className}`}
        onMouseEnter={() => {
          setIsHovered(true);
          onHover?.(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          onHover?.(false);
        }}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`bg-white rounded-xl border-2 border-red-500 p-6 relative overflow-hidden ${className}`}
      variants={heartbeatVariants}
      animate={isHovered ? 'hover' : 'pulse'}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover?.(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHover?.(false);
      }}
      {...props}
    >
      {/* Soft red glow background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-50 pointer-events-none"
        variants={glowVariants}
        animate={isHovered ? 'hover' : 'pulse'}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default EmergencyCard;
