import React from 'react';
import { Link } from 'react-router-dom';
import {
  BloodDropIcon,
  HospitalIcon,
  HeartIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon
} from './icons/Icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-4 group">
              <img
                src="/Logo.png"
                alt="ALIVE Logo"
                className="w-10 h-10 transition-transform group-hover:scale-110 object-contain"
              />
              <span className="ml-3 text-2xl font-display font-bold text-white">ALIVE</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Connecting donors with hospitals to save lives efficiently and effectively.
              Together, we make a difference.
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <BloodDropIcon className="w-5 h-5" fill="#FFFFFF" />
              </div>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <HospitalIcon className="w-5 h-5" fill="#FFFFFF" />
              </div>
              <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                <HeartIcon className="w-5 h-5" fill="#FFFFFF" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/register?role=donor"
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link
                  to="/register?role=hospital"
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Hospital Registration
                </Link>
              </li>
              <li>
                <span className="text-sm text-gray-400">Blood Donation</span>
              </li>
              <li>
                <span className="text-sm text-gray-400">Organ Donation</span>
              </li>
              <li>
                <span className="text-sm text-gray-400">Emergency Requests</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-display font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-400">alive-connect@support.com</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm text-gray-400">6369174670</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-gray-400">Bharathi Nagar, Town Hall, Coimbatore, Tamil Nadu</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-400">24/7 Emergency Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-400 text-center md:text-left">
              <p>&copy; {currentYear} ALIVE. All rights reserved.</p>
              <p className="mt-1">Saving lives, one donation at a time.</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-10 h-10" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-10 h-10" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-10 h-10" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-10 h-10" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
