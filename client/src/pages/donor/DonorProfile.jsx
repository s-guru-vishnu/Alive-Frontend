import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import Loading from '../../components/Loading';
import { getMyProfile, updateDonor } from '../../services/donorService';
import { uploadProfilePicture } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/StatusBadge';
import api from '../../services/api';

const DonorProfile = () => {
  const { user: authUser, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    bloodGroup: '',
    hemoglobin: '',
    city: '',
    state: '',
    address: '',
    availability: 'Available'
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getMyProfile();
      const donor = response.data;
      setProfile(donor);
      setFormData({
        name: donor.userId?.name || '',
        phone: donor.userId?.phone || '',
        age: donor.age || '',
        bloodGroup: donor.bloodGroup || '',
        hemoglobin: donor.hemoglobin || '',
        city: donor.location?.city || '',
        state: donor.location?.state || '',
        address: donor.location?.address || '',
        availability: donor.availability || 'Available'
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
        age: parseInt(formData.age),
        bloodGroup: formData.bloodGroup,
        hemoglobin: formData.hemoglobin ? parseFloat(formData.hemoglobin) : undefined,
        location: {
          city: formData.city,
          state: formData.state,
          address: formData.address
        },
        availability: formData.availability
      };
      await updateDonor(updateData);
      alert('Profile updated successfully!');
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

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
    if (preview) return preview;
    if (profile?.userId?.profilePicture) {
      const baseUrl = import.meta.env.VITE_API_URL;
      return `${baseUrl}${profile.userId.profilePicture}`;
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
        setProfile({
          ...profile,
          userId: {
            ...profile?.userId,
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

  return (
    <ProtectedRoute requiredRole="donor">
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
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-lg">
                      {getInitials(profile?.userId?.name || authUser?.name)}
                    </div>
                  )}
                  <div className="absolute bottom-0 right-0 sm:bottom-2 sm:right-2 bg-green-500 border-4 border-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center z-10">
                    <span className="text-white text-xs">✓</span>
                  </div>
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
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{profile?.userId?.name || 'Donor Profile'}</h1>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-sm sm:text-base">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">🩸</span>
                    <span className="font-semibold text-primary-600">{profile?.bloodGroup || 'N/A'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500">Age:</span>
                    <span className="ml-1 font-medium text-gray-900">{profile?.age || 'N/A'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500">Location:</span>
                    <span className="ml-1 font-medium text-gray-900">{profile?.location?.city || 'N/A'}, {profile?.location?.state || 'N/A'}</span>
                  </div>
                </div>
                <div className="mt-3 flex justify-center sm:justify-start">
                  <StatusBadge status={profile?.availability || 'Unavailable'} />
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>

          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
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
                    Phone *
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
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    required
                    min={18}
                    max={100}
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Group *
                  </label>
                  <select
                    name="bloodGroup"
                    required
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hemoglobin Level (g/dL)
                  </label>
                  <input
                    type="number"
                    name="hemoglobin"
                    step="0.1"
                    min="12.5"
                    value={formData.hemoglobin}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Optional"
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
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability *
                </label>
                <select
                  name="availability"
                  required
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors"
                >
                  {saving ? 'Saving...' : 'Update Profile'}
                </button>
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <span className="text-sm text-gray-600">Current Status:</span>
                  <StatusBadge status={profile?.availability || 'Unavailable'} />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default DonorProfile;

