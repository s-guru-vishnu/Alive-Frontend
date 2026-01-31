import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Common Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Community from './pages/Community';

// Donor Pages
import DonorDashboard from './pages/donor/DonorDashboard';
import DonorProfile from './pages/donor/DonorProfile';
import DonationHistory from './pages/donor/DonationHistory';
import Appointments from './pages/donor/Appointments';
import NearbyHospitals from './pages/donor/NearbyHospitals';
import EmergencyRequests from './pages/donor/EmergencyRequests';

// Hospital Pages
import HospitalDashboard from './pages/hospital/HospitalDashboard';
import HospitalProfile from './pages/hospital/HospitalProfile';
import CreateRequest from './pages/hospital/CreateRequest';

// Blood Bank Pages
import BloodBankDashboard from './pages/blood-bank/BloodBankDashboard';
import BloodBankProfile from './pages/blood-bank/BloodBankProfile';
import CreateCamp from './pages/blood-bank/CreateCamp';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import HospitalVerification from './pages/admin/HospitalVerification';
import Reports from './pages/admin/Reports';
import Analytics from './pages/admin/Analytics';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';

// Main App Router
const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/community" element={<Community />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Donor Routes */}
      <Route
        path="/donor/dashboard"
        element={
          <ProtectedRoute requiredRole="donor">
            <DonorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/donor/profile"
        element={
          <ProtectedRoute requiredRole="donor">
            <DonorProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/donor/history"
        element={
          <ProtectedRoute requiredRole="donor">
            <DonationHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/donor/appointments"
        element={
          <ProtectedRoute requiredRole="donor">
            <Appointments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/donor/nearby-hospitals"
        element={
          <ProtectedRoute requiredRole="donor">
            <NearbyHospitals />
          </ProtectedRoute>
        }
      />
      <Route
        path="/donor/emergency-requests"
        element={
          <ProtectedRoute requiredRole="donor">
            <EmergencyRequests />
          </ProtectedRoute>
        }
      />

      {/* Hospital Routes */}
      <Route
        path="/hospital/dashboard"
        element={
          <ProtectedRoute requiredRole="hospital">
            <HospitalDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hospital/profile"
        element={
          <ProtectedRoute requiredRole="hospital">
            <HospitalProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hospital/create-request"
        element={
          <ProtectedRoute requiredRole="hospital">
            <CreateRequest />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hospital/requests"
        element={
          <ProtectedRoute requiredRole="hospital">
            <HospitalDashboard />
          </ProtectedRoute>
        }
      />


      {/* Blood Bank Routes */}
      <Route
        path="/blood-bank/dashboard"
        element={
          <ProtectedRoute requiredRole="blood-bank">
            <BloodBankDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blood-bank/profile"
        element={
          <ProtectedRoute requiredRole="blood-bank">
            <BloodBankProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blood-bank/create-camp"
        element={
          <ProtectedRoute requiredRole="blood-bank">
            <CreateCamp />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute requiredRole="admin">
            <UserManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/hospitals"
        element={
          <ProtectedRoute requiredRole="admin">
            <HospitalVerification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute requiredRole="admin">
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <Analytics />
        }
      />

      {/* Default Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;

