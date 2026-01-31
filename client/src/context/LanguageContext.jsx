import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Common
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    dashboard: 'Dashboard',
    profile: 'Profile',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    submit: 'Submit',
    search: 'Search',
    filter: 'Filter',
    emergency: 'Emergency',
    // Auth
    email: 'Email',
    password: 'Password',
    name: 'Name',
    phone: 'Phone',
    verifyOTP: 'Verify OTP',
    otpSent: 'OTP sent to your email',
    // Donor
    donor: 'Donor',
    bloodGroup: 'Blood Group',
    availability: 'Availability',
    donationHistory: 'Donation History',
    nearbyHospitals: 'Nearby Hospitals',
    certificates: 'Certificates',
    // Hospital
    hospital: 'Hospital',
    createRequest: 'Create Request',
    requests: 'Requests',
    nearbyDonors: 'Nearby Donors',
    // Admin
    admin: 'Admin',
    users: 'Users',
    reports: 'Reports',
    analytics: 'Analytics',
    // Common actions
    view: 'View',
    accept: 'Accept',
    reject: 'Reject',
    pending: 'Pending',
    completed: 'Completed'
  },
  ta: {
    // Common
    home: 'வீடு',
    about: 'பற்றி',
    contact: 'தொடர்பு',
    login: 'உள்நுழை',
    register: 'பதிவு',
    logout: 'வெளியேறு',
    dashboard: 'டாஷ்போர்டு',
    profile: 'சுயவிவரம்',
    save: 'சேமி',
    cancel: 'ரத்துசெய்',
    delete: 'நீக்கு',
    edit: 'திருத்து',
    submit: 'சமர்ப்பி',
    search: 'தேடு',
    filter: 'வடிகட்டு',
    emergency: 'அவசரம்',
    // Auth
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    name: 'பெயர்',
    phone: 'தொலைபேசி',
    verifyOTP: 'OTP சரிபார்க்க',
    otpSent: 'OTP உங்கள் மின்னஞ்சலுக்கு அனுப்பப்பட்டது',
    // Donor
    donor: 'தானம்',
    bloodGroup: 'இரத்த வகை',
    availability: 'கிடைக்கும்',
    donationHistory: 'தான வரலாறு',
    nearbyHospitals: 'அருகிலுள்ள மருத்துவமனைகள்',
    certificates: 'சான்றிதழ்கள்',
    // Hospital
    hospital: 'மருத்துவமனை',
    createRequest: 'கோரிக்கை உருவாக்க',
    requests: 'கோரிக்கைகள்',
    nearbyDonors: 'அருகிலுள்ள தானம்',
    // Admin
    admin: 'நிர்வாகி',
    users: 'பயனர்கள்',
    reports: 'அறிக்கைகள்',
    analytics: 'பகுப்பாய்வு',
    // Common actions
    view: 'காண்க',
    accept: 'ஏற்க',
    reject: 'நிராகரி',
    pending: 'நிலுவையில்',
    completed: 'முடிந்தது'
  }
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  const t = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en');
  };

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

