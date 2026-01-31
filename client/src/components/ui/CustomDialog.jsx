import React, { useEffect, useRef, useState } from 'react';

/**
 * CustomDialog Component
 * A reusable, accessible dialog/modal component with animations and keyboard support
 * 
 * @param {boolean} isOpen - Controls dialog visibility
 * @param {function} onClose - Callback when dialog closes
 * @param {function} onConfirm - Optional callback for confirm action
 * @param {string} title - Dialog title (required)
 * @param {string} description - Optional description text
 * @param {string} confirmText - Text for confirm button (default: "Confirm")
 * @param {string} cancelText - Text for cancel button (default: "Cancel")
 * @param {string} variant - Dialog variant: "default" | "danger" | "success"
 * @param {boolean} closeOnOverlayClick - Allow closing by clicking overlay (default: true)
 * @param {boolean} showCancel - Show cancel button (default: true)
 * @param {boolean} showConfirm - Show confirm button (default: true)
 * @param {ReactNode} children - Custom content to render in dialog body
 */
const CustomDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  closeOnOverlayClick = true,
  showCancel = true,
  showConfirm = true,
  children
}) => {
  const dialogRef = useRef(null);
  const overlayRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);
  const previousActiveElement = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Variant styles
  const variantStyles = {
    default: {
      button: 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500',
      icon: 'text-primary-600',
      border: 'border-primary-200'
    },
    danger: {
      button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
      icon: 'text-red-600',
      border: 'border-red-200'
    },
    success: {
      button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
      icon: 'text-green-600',
      border: 'border-green-200'
    }
  };

  const currentVariant = variantStyles[variant] || variantStyles.default;

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      // Store previous active element for focus return
      previousActiveElement.current = document.activeElement;

      // Start animation
      setIsAnimating(true);

      return () => {
        // Restore scroll position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);

        // Return focus to previous element
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    // Small delay to allow exit animation
    setTimeout(() => {
      onClose();
    }, 150);
  };

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      // Small delay to ensure animation starts
      const timer = setTimeout(() => {
        // Focus on first focusable element
        const focusableElements = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
          firstFocusableRef.current = focusableElements[0];
          lastFocusableRef.current = focusableElements[focusableElements.length - 1];
          firstFocusableRef.current.focus();
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Trap focus inside dialog
  const handleTabKey = (e) => {
    if (!isOpen) return;

    if (e.key === 'Tab') {
      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    handleClose();
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      handleClose();
    }
  };

  if (!isOpen && !isAnimating) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby={description ? 'dialog-description' : undefined}
    >
      {/* Backdrop with blur */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        } backdrop-blur-sm`}
        aria-hidden="true"
      />

      {/* Dialog Content */}
      <div
        ref={dialogRef}
        className={`relative bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-out ${
          isOpen
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-4 pointer-events-none'
        }`}
        onKeyDown={handleTabKey}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`px-6 py-4 border-b ${currentVariant.border}`}>
          <h2
            id="dialog-title"
            className="text-xl font-semibold text-gray-900"
          >
            {title}
          </h2>
          {description && (
            <p
              id="dialog-description"
              className="mt-2 text-sm text-gray-600"
            >
              {description}
            </p>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-180px)]">
          {children || (
            <p className="text-gray-700">{description}</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col-reverse sm:flex-row justify-end gap-3">
          {showCancel && (
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              {cancelText}
            </button>
          )}
          {showConfirm && (
            <button
              type="button"
              onClick={handleConfirm}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${currentVariant.button}`}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default CustomDialog;
