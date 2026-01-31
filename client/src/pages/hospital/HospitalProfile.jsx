import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import Loading from '../../components/Loading';
import StatusBadge from '../../components/StatusBadge';
import { getMyHospital, updateHospital } from '../../services/hospitalService';
import { uploadProfilePicture } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

const HospitalProfile = () => {
  const { user: authUser, updateUser } = useAuth();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    hospitalName: '',
    hospitalPhone: '',
    city: '',
    state: '',
    address: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getMyHospital();
      const hospitalData = response.data;
      setHospital(hospitalData);
      setFormData({
        name: hospitalData.userId?.name || '',
        phone: hospitalData.userId?.phone || '',
        hospitalName: hospitalData.hospitalName || '',
        hospitalPhone: hospitalData.contact?.phone || '',
        city: hospitalData.location?.city || '',
        state: hospitalData.location?.state || '',
        address: hospitalData.location?.address || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        hospitalName: formData.hospitalName,
        contact: {
          phone: formData.hospitalPhone
        },
        location: {
          city: formData.city,
          state: formData.state,
          address: formData.address
        }
      };
      await updateHospital(updateData);
      alert('Profile updated successfully!');
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  // Get hospital initials for profile icon
  const getInitials = (name) => {
    if (!name) return 'H';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get profile picture URL
  const getProfilePictureUrl = () => {
    if (preview) return preview;
    if (hospital?.userId?.profilePicture) {
      const baseUrl = import.meta.env.VITE_API_URL;
      return `${baseUrl}${hospital.userId.profilePicture}`;
    }
    if (authUser?.profilePicture) {
      const baseUrl = import.meta.env.VITE_API_URL;
      return `${baseUrl}${authUser.profilePicture}`;
    }
    return null;
  };

  // Handle profile picture selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile picture upload
  const handleUploadPicture = async () => {
    if (!fileInputRef.current?.files[0]) {
      alert('Please select an image first');
      return;
    }

    const file = fileInputRef.current.files[0];
    setUploading(true);

    try {
      const response = await uploadProfilePicture(file);
      if (response.success) {
        // Update local state
        setHospital({
          ...hospital,
          userId: {
            ...hospital?.userId,
            profilePicture: response.data.profilePicture
          }
        });

        // Update auth context
        if (response.data.user) {
          updateUser(response.data.user);
        }

        setPreview(null);
        alert('Profile picture uploaded successfully!');

        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert(error.response?.data?.message || 'Failed to upload profile picture');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <ProtectedRoute requiredRole="hospital">
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Circular Profile Icon with Upload */}
              <div className="flex flex-col items-center space-y-3">
                <div className="relative group">
                  {getProfilePictureUrl() ? (
                    <img
                      src={getProfilePictureUrl()}
                      alt="Profile"
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg border-4 border-white"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-lg">
                      {getInitials(hospital?.hospitalName || authUser?.name)}
                    </div>
                  )}
                  {hospital?.isVerified && (
                    <div className="absolute bottom-0 right-0 sm:bottom-2 sm:right-2 bg-green-500 border-4 border-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center z-10">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  {/* Upload Button Overlay on Hover */}
                  <label className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full flex items-center justify-center transition-all cursor-pointer">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <span className="text-white opacity-0 group-hover:opacity-100 text-xs sm:text-sm font-medium text-center px-2">
                      📷 Click to Upload
                    </span>
                  </label>
                </div>

                {/* Profile Picture Upload Controls */}
                {preview && (
                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleUploadPicture}
                      disabled={uploading}
                      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 text-xs sm:text-sm transition-colors whitespace-nowrap"
                    >
                      {uploading ? 'Uploading...' : 'Save Picture'}
                    </button>
                    <button
                      onClick={() => {
                        setPreview(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-xs sm:text-sm transition-colors whitespace-nowrap"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3 sm:gap-0">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{hospital?.hospitalName || 'Hospital Profile'}</h1>
                    <p className="text-sm text-gray-600 mb-2">{hospital?.licenseNumber || 'N/A'}</p>
                  </div>
                  <div className="flex items-center justify-center sm:justify-end space-x-2">
                    <span className="text-sm text-gray-600 hidden sm:inline">Verification:</span>
                    <StatusBadge status={hospital?.isVerified ? 'Approved' : hospital?.verificationStatus || 'Pending'} />
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-sm sm:text-base">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🏥</span>
                    <span className="text-gray-700">{hospital?.location?.city || 'N/A'}, {hospital?.location?.state || 'N/A'}</span>
                  </div>
                  {hospital?.contact?.phone && (
                    <div className="flex items-center">
                      <span className="text-gray-500">Phone:</span>
                      <span className="ml-1 font-medium text-gray-900">{hospital.contact.phone}</span>
                    </div>
                  )}
                </div>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Total Requests</p>
                    <p className="text-lg sm:text-xl font-bold text-primary-600">{hospital?.totalRequests || 0}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Completed</p>
                    <p className="text-lg sm:text-xl font-bold text-green-600">{hospital?.completedRequests || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Hospital Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Hospital Name</p>
                <p className="font-semibold">{hospital?.hospitalName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">License Number</p>
                <p className="font-semibold">{hospital?.licenseNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Requests</p>
                <p className="font-semibold">{hospital?.totalRequests || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed Requests</p>
                <p className="font-semibold">{hospital?.completedRequests || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Update Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital Name *
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    required
                    value={formData.hospitalName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital Phone *
                  </label>
                  <input
                    type="tel"
                    name="hospitalPhone"
                    required
                    value={formData.hospitalPhone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors"
              >
                {saving ? 'Saving...' : 'Update Profile'}
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default HospitalProfile;

