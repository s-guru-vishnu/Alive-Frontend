import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import EmergencyBadge from './EmergencyBadge';
import { AlertIcon } from '../icons/Icons';

/**
 * Emergency Banner Component
 * Slide-down banner for emergency notifications
 */
const EmergencyBanner = ({ 
  isVisible = false, 
  count = 0,
  onDismiss,
  className = '' 
}) => {
  const prefersReducedMotion = useReducedMotion();

  const slideDownVariants = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0, 0, 0.2, 1],
      },
    },
    exit: {
      y: -100,
      opacity: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: [0.4, 0, 1, 1],
      },
    },
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={slideDownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 shadow-lg z-50 ${className}`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AlertIcon className="w-6 h-6" fill="currentColor" />
              <div>
                <p className="font-semibold text-lg">
                  {count > 0 ? `${count} Emergency Request${count > 1 ? 's' : ''} Need Attention` : 'Emergency Request Needs Attention'}
                </p>
                <p className="text-sm text-red-100">
                  Urgent blood donation requests require immediate response
                </p>
              </div>
            </div>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-white hover:text-red-100 transition-colors p-2"
                aria-label="Dismiss banner"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmergencyBanner;
