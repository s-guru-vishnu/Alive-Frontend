import React from 'react';

// Blood Drop Icon
export const BloodDropIcon = ({ className = "w-4 h-4", fill, ...props }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <text y="50%" x="50%" dy="0.35em" textAnchor="middle" fontSize="85" style={{ fontFamily: '"Noto Color Emoji", sans-serif' }}>🩸</text>
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
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17.93C13 18.52 12.55 19 12 19C11.45 19 11 18.52 11 17.93V17.93C8.07 17.43 6 14.97 6 12C6 11.38 6.08 10.79 6.21 10.21L8 12V13C8 14.1 8.9 15 10 15H11V16C11 16.55 11.45 17 12 17V17.93ZM17.9 16.4C17.64 15.84 16.89 15.5 16 15.5C15.11 15.5 14.36 15.84 14.1 16.4C13.84 16.96 13.95 17.55 14.34 17.94C14.73 18.33 15.32 18.44 15.88 18.18C16.44 17.92 16.78 17.17 16.78 16.28C16.78 15.39 16.44 14.64 15.88 14.38C15.32 14.12 14.73 14.23 14.34 14.62C13.95 15.01 13.84 15.6 14.1 16.16C14.36 16.72 15.11 17.06 16 17.06C16.89 17.06 17.64 16.72 17.9 16.16C18.16 15.6 18.05 15.01 17.66 14.62C17.27 14.23 16.68 14.12 16.12 14.38C15.56 14.64 15.22 15.39 15.22 16.28C15.22 17.17 15.56 17.92 16.12 18.18C16.68 18.44 17.27 18.33 17.66 17.92C18.05 17.55 18.16 16.96 17.9 16.4Z" fill={fill} />
  </svg>
);

// Thunder/Lightning Icon
export const ThunderIcon = ({ className = "w-4 h-4", fill, ...props }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <text y="50%" x="50%" dy="0.35em" textAnchor="middle" fontSize="85" style={{ fontFamily: '"Noto Color Emoji", sans-serif' }}>⚡</text>
  </svg>
);

// Government Icon
export const GovtIcon = ({ className = "w-4 h-4", fill, ...props }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <text y="50%" x="50%" dy="0.35em" textAnchor="middle" fontSize="85" style={{ fontFamily: '"Noto Color Emoji", sans-serif' }}>🏛️</text>
  </svg>
);

// NGO Icon
export const NgoIcon = ({ className = "w-4 h-4", fill, ...props }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <text y="50%" x="50%" dy="0.35em" textAnchor="middle" fontSize="85" style={{ fontFamily: '"Noto Color Emoji", sans-serif' }}>🌿</text>
  </svg>
);

// Medical Icon
export const MedicalIcon = ({ className = "w-4 h-4", fill, ...props }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <text y="50%" x="50%" dy="0.35em" textAnchor="middle" fontSize="85" style={{ fontFamily: '"Noto Color Emoji", sans-serif' }}>⚕️</text>
  </svg>
);

// Fire/Efficiency Icon
export const FireIcon = ({ className = "w-4 h-4", fill, ...props }) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <text y="50%" x="50%" dy="0.35em" textAnchor="middle" fontSize="85" style={{ fontFamily: '"Noto Color Emoji", sans-serif', filter: 'hue-rotate(200deg) brightness(1.2)' }}>🔥</text>
  </svg>
);

// Facebook Icon
export const FacebookIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M24 12.073C24 5.447 18.627 0.073 12 0.073C5.373 0.073 0 5.447 0 12.073C0 18.063 4.388 23.027 10.125 23.927V15.542H7.078V12.073H10.125V9.429C10.125 6.422 11.917 4.759 14.658 4.759C15.97 4.759 17.344 4.994 17.344 4.994V7.947H15.83C14.34 7.947 13.875 8.872 13.875 9.821V12.073H17.203L16.671 15.542H13.875V23.927C19.612 23.027 24 18.063 24 12.073Z" fill="#1877F2" />
  </svg>
);

// Twitter Icon
export const TwitterIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M23.953 4.57009C23.0545 4.96569 22.1026 5.22683 21.128 5.34509C22.1541 4.72834 22.9183 3.75958 23.291 2.61009C22.33 3.17709 21.2771 3.57509 20.165 3.79709C19.4181 2.99268 18.4172 2.47926 17.329 2.3432C16.2407 2.20713 15.1314 2.45667 14.1856 3.0499C13.2398 3.64313 12.5152 4.54378 12.1337 5.59965C11.7522 6.65552 11.737 7.80219 12.09 8.84709C10.1983 8.75231 8.35111 8.26207 6.66699 7.40781C4.98287 6.55355 3.50042 5.35417 2.314 3.88609C1.90226 4.59981 1.68536 5.4103 1.685 6.23609C1.68551 7.027 1.88458 7.80415 2.2647 8.50033C2.64482 9.19652 3.1943 9.78996 3.865 10.2291C3.09068 10.2045 2.33405 9.99522 1.65 9.61709V9.67909C1.65045 10.832 2.05191 11.9478 2.78906 12.8453C3.5262 13.7428 4.55577 14.3688 5.709 14.6211C4.95758 14.8239 4.17062 14.8533 3.407 14.7071C3.73356 15.6985 4.36399 16.5574 5.20235 17.153C6.04071 17.7486 7.0409 18.0483 8.051 18.0061C6.35332 19.3396 4.25301 20.0637 2.096 20.0611C1.71457 20.0609 1.33333 20.0384 0.954001 19.9931C3.13653 21.396 5.6791 22.1407 8.27 22.1391C17.062 22.1391 21.868 14.8571 21.868 8.57209C21.868 8.36309 21.863 8.15809 21.854 7.95309C22.79 7.27503 23.5855 6.43577 24.186 5.48509L23.953 4.57009Z" fill="#1DA1F2" />
  </svg>
);

// LinkedIn Icon
export const LinkedInIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M20.447 20.452H16.893V14.881C16.893 13.553 16.866 11.844 15.043 11.844C13.191 11.844 12.909 13.291 12.909 14.783V20.452H9.354V9H12.766V10.561H12.812C13.289 9.66 14.449 8.711 16.182 8.711C19.784 8.711 20.45 11.082 20.45 14.167V20.452H20.447ZM5.337 7.433C4.193 7.433 3.274 6.505 3.274 5.367C3.274 4.228 4.193 3.305 5.337 3.305C6.479 3.305 7.4 4.228 7.4 5.367C7.4 6.505 6.479 7.433 5.337 7.433ZM7.119 20.452H3.555V9H7.119V20.452ZM22.225 0H1.771C0.792 0 0 0.774 0 1.729V22.271C0 23.227 0.792 24 1.771 24H22.222C23.2 24 24 23.227 24 22.271V1.729C24 0.774 23.2 0 22.225 0Z" fill="#0A66C2" />
  </svg>
);

// Instagram Icon
export const InstagramIcon = ({ className = "w-4 h-4", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="insta_gradient" x1="2" y1="21" x2="22" y2="3" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#FFDC80" />
        <stop offset="0.25" stopColor="#FCAF45" />
        <stop offset="0.5" stopColor="#F77737" />
        <stop offset="0.75" stopColor="#F56040" />
        <stop offset="1" stopColor="#FD1D1D" />
        <stop offset="1" stopColor="#E1306C" />
        <stop offset="1" stopColor="#C13584" />
        <stop offset="1" stopColor="#833AB4" />
        <stop offset="1" stopColor="#5851DB" />
        <stop offset="1" stopColor="#405DE6" />
      </linearGradient>
    </defs>
    <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C18.102 2.291 18.966 2.502 19.467 2.697C19.985 2.898 20.428 3.167 20.871 3.61C21.314 4.053 21.583 4.496 21.784 5.014C21.979 5.515 22.19 6.379 22.248 7.63C22.306 8.896 22.317 9.276 22.317 12.48C22.317 15.684 22.306 16.064 22.248 17.33C22.19 18.581 21.979 19.445 21.784 19.946C21.583 20.464 21.314 20.907 20.871 21.35C20.428 21.793 19.985 22.062 19.467 22.263C18.966 22.458 18.102 22.669 16.85 22.727C15.584 22.785 15.204 22.797 12 22.797C8.796 22.797 8.416 22.785 7.15 22.727C5.898 22.669 5.034 22.458 4.533 22.263C4.015 22.062 3.572 21.793 3.129 21.35C2.686 20.907 2.417 20.464 2.216 19.946C2.021 19.444 1.81 18.58 1.752 17.33C1.694 16.064 1.683 15.683 1.683 12.48C1.683 9.276 1.694 8.896 1.752 7.63C1.81 6.379 2.021 5.515 2.216 5.014C2.417 4.496 2.686 4.053 3.129 3.61C3.572 3.167 4.015 2.898 4.533 2.697C5.034 2.502 5.898 2.291 7.15 2.233C8.416 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C5.775 0.132 4.905 0.333 4.14 0.63C3.351 0.938 2.681 1.345 2.014 2.013C1.345 2.681 0.938 3.352 0.63 4.14C0.333 4.905 0.132 5.775 0.072 7.053C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.667 0.072 16.947C0.132 18.225 0.333 19.095 0.63 19.86C0.938 20.648 1.345 21.319 2.013 21.986C2.681 22.655 3.351 23.062 4.14 23.37C4.905 23.667 5.775 23.868 7.053 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.667 23.986 16.947 23.928C18.225 23.868 19.095 23.667 19.86 23.37C20.648 23.062 21.319 22.655 21.986 21.986C22.655 21.318 23.062 20.648 23.37 19.86C23.667 19.095 23.868 18.225 23.928 16.947C23.986 15.667 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.868 5.775 23.667 4.905 23.37 4.14C23.062 3.351 22.655 2.681 21.986 2.014C21.318 1.345 20.648 0.938 19.86 0.63C19.095 0.333 18.225 0.132 16.947 0.072C15.667 0.014 15.259 0 12 0Z" fill="url(#insta_gradient)" />
    <path d="M12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.162 12 18.162C15.403 18.162 18.162 15.403 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16Z" fill="url(#insta_gradient)" />
    <path d="M18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.596C16.965 6.391 17.61 7.036 18.406 7.036C19.202 7.036 19.847 6.391 19.847 5.596C19.847 4.8 19.202 4.155 18.406 4.155Z" fill="url(#insta_gradient)" />
  </svg>
);
