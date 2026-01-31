import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/authService';
import { BloodDropIcon, HospitalIcon, SettingsIcon, UserIcon, DashboardIcon, LogoutIcon } from './icons/Icons';
import Footer from './Footer';

const Layout = ({ children }) => {
  const { user, isAuthenticated, logout: authLogout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    authLogout();
    navigate('/login');
  };

  // Get user initials for profile icon
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get profile picture URL
  const getProfilePictureUrl = () => {
    // For admin users without profile picture, use default admin avatar
    if (user?.role === 'admin' && !user?.profilePicture) {
      return '/Admin_Profile_Image.png';
    }
    if (!user?.profilePicture) return null;
    const baseUrl = import.meta.env.VITE_API_URL;
    return `${baseUrl}${user.profilePicture}`;
  };

  // Get role icon component
  const getRoleIcon = (role) => {
    const iconClass = "w-3.5 h-3.5";
    switch (role) {
      case 'donor':
        return <BloodDropIcon className={iconClass} fill="#DC2626" />;
      case 'hospital':
        return <HospitalIcon className={iconClass} fill="#2563EB" />;
      case 'admin':
        return <SettingsIcon className={iconClass} fill="#6B7280" />;
      default:
        return <UserIcon className={iconClass} fill="#6B7280" />;
    }
  };

  // Get profile link based on role
  const getProfileLink = () => {
    if (user?.role === 'donor') return '/donor/profile';
    if (user?.role === 'hospital') return '/hospital/profile';
    if (user?.role === 'blood-bank') return '/blood-bank/profile';
    if (user?.role === 'admin') return '/admin/dashboard';
    return '/';
  };

  // Get dashboard link based on role
  const getDashboardLink = () => {
    if (user?.role === 'donor') return '/donor/dashboard';
    if (user?.role === 'hospital') return '/hospital/dashboard';
    if (user?.role === 'blood-bank') return '/blood-bank/dashboard';
    if (user?.role === 'admin') return '/admin/dashboard';
    return '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white py-2.5 px-4 shadow-elegant">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-xs sm:text-sm font-medium text-center">
          <svg className="w-4 h-4 mr-2 transform rotate-180" viewBox="0 0 64 64" fill="currentColor">
            <path d="M32 8C28 8 24 10 22 14C20 18 18 22 18 28C18 36 22 42 28 48C30 50 32 52 32 52C32 52 34 50 36 48C42 42 46 36 46 28C46 22 44 18 42 14C40 10 36 8 32 8Z" />
          </svg>
          <span className="hidden sm:inline tracking-wide">Save Lives Today - Register as a Donor or Hospital to Make a Difference!</span>
          <span className="sm:hidden tracking-wide">Save Lives Today!</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-elegant sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-18">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center px-2 py-2 group">
                <img
                  src="/Logo.png"
                  alt="Heart2Heal Logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-110 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"
                />
                <span className="ml-3 text-xl sm:text-2xl font-display font-bold text-gray-900 tracking-tight">Heart2Heal</span>
              </Link>
              {/* Desktop Navigation */}
              <div className="hidden md:ml-8 md:flex md:space-x-1">
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 border-b-2 border-transparent text-sm font-medium text-classic-600 hover:text-classic-900 hover:border-primary-500 transition-all duration-200"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center px-4 py-2 border-b-2 border-transparent text-sm font-medium text-classic-600 hover:text-classic-900 hover:border-primary-500 transition-all duration-200"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-4 py-2 border-b-2 border-transparent text-sm font-medium text-classic-600 hover:text-classic-900 hover:border-primary-500 transition-all duration-200"
                >
                  Contact
                </Link>
                <Link
                  to="/community"
                  className="inline-flex items-center px-4 py-2 border-b-2 border-transparent text-sm font-medium text-classic-600 hover:text-classic-900 hover:border-primary-500 transition-all duration-200"
                >
                  Community
                </Link>
                <Link
                  to="/faq"
                  className="inline-flex items-center px-4 py-2 border-b-2 border-transparent text-sm font-medium text-classic-600 hover:text-classic-900 hover:border-primary-500 transition-all duration-200"
                >
                  FAQ
                </Link>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {isAuthenticated ? (
                <>
                  {/* Dashboard Link - Hidden on mobile */}
                  <Link
                    to={getDashboardLink()}
                    className="hidden sm:inline-flex text-sm font-semibold text-primary-600 hover:text-primary-700 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-primary-50"
                  >
                    Dashboard
                  </Link>

                  {/* Profile Icon with Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                      className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-full"
                      aria-label="User menu"
                    >
                      {getProfilePictureUrl() ? (
                        <img
                          src={getProfilePictureUrl()}
                          alt={user?.name || 'Profile'}
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover shadow-md hover:opacity-90 transition-opacity"
                        />
                      ) : (
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold text-xs sm:text-sm shadow-md hover:bg-primary-700 transition-colors">
                          {getInitials(user?.name)}
                        </div>
                      )}
                    </button>

                    {/* Profile Dropdown Menu */}
                    {profileMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setProfileMenuOpen(false)}
                        ></div>
                        <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-classic-lg py-2 z-50 border border-gray-100">
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                            <p className="text-xs text-gray-500 truncate flex items-center mt-1 font-medium">
                              <span className="mr-1.5">{getRoleIcon(user?.role)}</span>
                              {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                            </p>
                          </div>
                          <Link
                            to={getProfileLink()}
                            onClick={() => setProfileMenuOpen(false)}
                            className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                          >
                            <UserIcon className="w-4 h-4 mr-2" fill="#374151" />
                            Profile
                          </Link>
                          <Link
                            to={getDashboardLink()}
                            onClick={() => setProfileMenuOpen(false)}
                            className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors sm:hidden font-medium"
                          >
                            <DashboardIcon className="w-4 h-4 mr-2" fill="#374151" />
                            Dashboard
                          </Link>
                          <button
                            onClick={() => {
                              setProfileMenuOpen(false);
                              handleLogout();
                            }}
                            className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                          >
                            <LogoutIcon className="w-4 h-4 mr-2" fill="#DC2626" />
                            Logout
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 px-2 sm:px-3 py-2 rounded-md transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center px-4 sm:px-5 py-2.5 border border-transparent text-sm font-semibold rounded-lg text-white bg-primary-600 hover:bg-primary-700 shadow-elegant hover:shadow-classic-lg transition-all duration-200"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                aria-label="Main menu"
              >
                {mobileMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/community"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                Community
              </Link>
              <Link
                to="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>
        )}
      </nav>
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

