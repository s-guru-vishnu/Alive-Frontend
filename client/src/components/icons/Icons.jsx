import React from 'react';

// Blood Drop Icon
export const BloodDropIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={`${className} transform rotate-180`} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 8C28 8 24 10 22 14C20 18 18 22 18 28C18 36 22 42 28 48C30 50 32 52 32 52C32 52 34 50 36 48C42 42 46 36 46 28C46 22 44 18 42 14C40 10 36 8 32 8Z" fill={fill} />
    <path d="M32 12C29 12 26 13.5 24.5 16.5C23 19.5 21.5 22.5 21.5 28C21.5 34.5 24.5 39.5 29.5 44C30.5 45 31.5 46 32 46.5C32.5 46 33.5 45 34.5 44C39.5 39.5 42.5 34.5 42.5 28C42.5 22.5 41 19.5 39.5 16.5C38 13.5 35 12 32 12Z" fill="#DC2626" />
    <circle cx="32" cy="26" r="3" fill="#FFFFFF" />
  </svg>
);

// Hospital Icon
export const HospitalIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 8H18V6C18 4.9 17.1 4 16 4H8C6.9 4 6 4.9 6 6V8H5C3.9 8 3 8.9 3 10V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V10C21 8.9 20.1 8 19 8ZM8 6H16V8H8V6ZM19 20H5V10H19V20Z" fill={fill} />
    <path d="M12 11V13H14V15H12V17H10V15H8V13H10V11H12Z" fill={fill} />
  </svg>
);

// Settings/Admin Icon
export const SettingsIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.67 19.18 11.36 19.14 11.06L21.16 9.37C21.34 9.22 21.4 8.97 21.3 8.74L19.3 5.26C19.2 5.03 18.97 4.88 18.72 4.88H15.5C15.17 4.5 14.8 4.15 14.4 3.85L14.1 0.62C14.05 0.36 13.84 0.18 13.58 0.18H10.42C10.16 0.18 9.95 0.36 9.9 0.62L9.6 3.85C9.2 4.15 8.83 4.5 8.5 4.88H5.28C5.03 4.88 4.8 5.03 4.7 5.26L2.7 8.74C2.6 8.97 2.66 9.22 2.84 9.37L4.86 11.06C4.82 11.36 4.8 11.67 4.8 12C4.8 12.33 4.82 12.64 4.86 12.94L2.84 14.63C2.66 14.78 2.6 15.03 2.7 15.26L4.7 18.74C4.8 18.97 5.03 19.12 5.28 19.12H8.5C8.83 19.5 9.2 19.85 9.6 20.15L9.9 23.38C9.95 23.64 10.16 23.82 10.42 23.82H13.58C13.84 23.82 14.05 23.64 14.1 23.38L14.4 20.15C14.8 19.85 15.17 19.5 15.5 19.12H18.72C18.97 19.12 19.2 18.97 19.3 18.74L21.3 15.26C21.4 15.03 21.34 14.78 21.16 14.63L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill={fill} />
  </svg>
);

// User/Profile Icon
export const UserIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill={fill} />
  </svg>
);

// Dashboard/Chart Icon
export const DashboardIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3H11V11H3V3ZM3 13H11V21H3V13ZM13 3H21V11H13V3ZM13 13H21V21H13V13Z" fill={fill} />
  </svg>
);

// Logout Icon
export const LogoutIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.59L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill={fill} />
  </svg>
);

// Target/Accurate Icon
export const TargetIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill={fill} />
    <circle cx="12" cy="12" r="8" stroke={fill} strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="4" stroke={fill} strokeWidth="2" fill="none" />
  </svg>
);

// Check/Verified Icon
export const CheckIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill={fill} />
  </svg>
);

// Bell/Alert Icon
export const BellIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.89 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill={fill} />
  </svg>
);

// Trophy/Reward Icon
export const TrophyIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 5H17V3H7V5H5C3.9 5 3 5.9 3 7V8C3 10.55 4.92 12.63 7.39 12.94C8.02 14.44 9.37 15.57 11 15.9V19H7V21H17V19H13V15.9C14.63 15.57 15.98 14.44 16.61 12.94C19.08 12.63 21 10.55 21 8V7C21 5.9 20.1 5 19 5ZM5 8V7H7V10.82C5.84 10.4 5 9.3 5 8ZM19 8C19 9.3 18.16 10.4 17 10.82V7H19V8Z" fill={fill} />
  </svg>
);

// Alert/Emergency Icon
export const AlertIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z" fill={fill} />
  </svg>
);

// Heart Icon
export const HeartIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill={fill} />
  </svg>
);

// Star Icon
export const StarIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill={fill} />
  </svg>
);

// Handshake/Partnership Icon
export const HandshakeIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 2C8.12 2 7 3.12 7 4.5C7 5.88 8.12 7 9.5 7C10.88 7 12 5.88 12 4.5C12 3.12 10.88 2 9.5 2ZM14.5 2C13.12 2 12 3.12 12 4.5C12 5.88 13.12 7 14.5 7C15.88 7 17 5.88 17 4.5C17 3.12 15.88 2 14.5 2ZM9.5 8C8.12 8 7 9.12 7 10.5C7 11.88 8.12 13 9.5 13C10.88 13 12 11.88 12 10.5C12 9.12 10.88 8 9.5 8ZM14.5 8C13.12 8 12 9.12 12 10.5C12 11.88 13.12 13 14.5 13C15.88 13 17 11.88 17 10.5C17 9.12 15.88 8 14.5 8ZM9.5 14C8.12 14 7 15.12 7 16.5C7 17.88 8.12 19 9.5 19C10.88 19 12 17.88 12 16.5C12 15.12 10.88 14 9.5 14ZM14.5 14C13.12 14 12 15.12 12 16.5C12 17.88 13.12 19 14.5 19C15.88 19 17 17.88 17 16.5C17 15.12 15.88 14 14.5 14Z" fill={fill} />
  </svg>
);

// Lock/Security Icon
export const LockIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 3C13.66 3 15 4.34 15 6V8H9V6C9 4.34 10.34 3 12 3ZM18 20H6V10H18V20Z" fill={fill} />
  </svg>
);

// Mobile/Phone Icon
export const MobileIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 1.01L7 1C5.9 1 5 1.9 5 3V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V3C19 1.9 18.1 1.01 17 1.01ZM17 19H7V5H17V19Z" fill={fill} />
  </svg>
);

// Location Icon
export const LocationIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill={fill} />
  </svg>
);

// Globe/World Icon
export const GlobeIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17.93C13 18.52 12.55 19 12 19C11.45 19 11 18.52 11 17.93V17.93C8.07 17.43 6 14.97 6 12C6 11.38 6.08 10.79 6.21 10.21L8 12V13C8 14.1 8.9 15 10 15H11V16C11 16.55 11.45 17 12 17V17.93ZM17.9 16.4C17.64 15.84 16.89 15.5 16 15.5C15.11 15.5 14.36 15.84 14.1 16.4C13.84 16.96 13.95 17.55 14.34 17.94C14.73 18.33 15.32 18.44 15.88 18.18C16.44 17.92 16.78 17.17 16.78 16.28C16.78 15.39 16.44 14.64 15.88 14.38C15.32 14.12 14.73 14.23 14.34 14.62C13.95 15.01 13.84 15.6 14.1 16.16C14.36 16.72 15.11 17.06 16 17.06C16.89 17.06 17.64 16.72 17.9 16.16C18.16 15.6 18.05 15.01 17.66 14.62C17.27 14.23 16.68 14.12 16.12 14.38C15.56 14.64 15.22 15.39 15.22 16.28C15.22 17.17 15.56 17.92 16.12 18.18C16.68 18.44 17.27 18.33 17.66 17.94C18.05 17.55 18.16 16.96 17.9 16.4Z" fill={fill} />
  </svg>
);
