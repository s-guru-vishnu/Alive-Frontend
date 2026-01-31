import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import Loading from '../../components/Loading';
import { getMyBloodBank, updateBloodBankProfile } from '../../services/bloodBankService';

const BloodBankProfile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Form state for profile updates
    const [formData, setFormData] = useState({
        contact: { phone: '', email: '', website: '' },
        location: { address: '', city: '', state: '' },
        hours: '',
        licenseNumber: '',
        name: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                try {
                    const profileData = await getMyBloodBank();
                    setProfile(profileData);
                    setFormData({
                        contact: { ...profileData.contact },
                        location: { ...profileData.location },
                        hours: profileData.hours || '',
                        licenseNumber: profileData.licenseNumber || '',
                        name: profileData.name || user?.name || ''
                    });
                } catch (error) {
                    if (error.response?.status === 404) {
                        // Profile doesn't exist yet, that's fine. Set partial from user if available.
                        const initialData = {
                            name: user?.name || 'My Blood Bank',
                            contact: { phone: user?.phone || '9876543210', email: user?.email || 'contact@bloodbank.com', website: '' },
                            location: { address: '123 Health Street', city: 'Chennai', state: 'Tamil Nadu' }, // Default
                            hours: '24/7',
                            licenseNumber: `BB-${Math.floor(1000 + Math.random() * 9000)}`
                        };
                        setProfile(initialData);
                        setFormData(initialData);
                        setIsEditing(true); // Auto-enable editing for new profiles
                        alert("We've pre-filled some details for you. Please review and click 'Save Changes' to activate your profile in the Community.");
                    } else {
                        throw error;
                    }
                }
            } catch (err) {
                console.error("Failed to load profile data", err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user]);

    const handleInputChange = (e, section = null) => {
        const { name, value } = e.target;
        if (section) {
            setFormData(prev => ({
                ...prev,
                [section]: { ...prev[section], [name]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSaveProfile = async () => {
        try {
            const updatedProfile = await updateBloodBankProfile(formData);
            setProfile(updatedProfile);
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error saving profile:', error);
            const msg = error.response?.data?.message || 'Failed to save profile. Please check all fields.';
            alert(msg);
        }
    };

    if (loading) return <Loading />;

    return (
        <ProtectedRoute requiredRole="blood-bank">
            <Layout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Blood Bank Profile</h1>
                        <p className="text-gray-600 mt-2">Manage your public profile and contact information</p>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Profile Details</h2>
                            <button
                                onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium ${isEditing
                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                    : 'bg-primary-600 text-white hover:bg-primary-700'
                                    }`}
                            >
                                {isEditing ? 'Save Changes' : 'Edit Details'}
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange(e)}
                                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                    />
                                ) : (
                                    <div className="mt-1 p-2 bg-gray-50 rounded-md text-gray-900 font-medium">
                                        {profile?.name}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.contact.phone}
                                            onChange={(e) => handleInputChange(e, 'contact')}
                                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    ) : (
                                        <div className="mt-1 text-gray-900">{profile?.contact.phone}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">License Number</label>
                                    <div className="mt-1">
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="licenseNumber"
                                                value={formData.licenseNumber || ''}
                                                onChange={(e) => handleInputChange(e)}
                                                className="w-full p-2 border border-gray-300 rounded-md"
                                            />
                                        ) : (
                                            <div className="text-gray-500 italic">{profile?.licenseNumber || 'Not set'}</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.location.address}
                                        onChange={(e) => handleInputChange(e, 'location')}
                                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                    />
                                ) : (
                                    <div className="mt-1 text-gray-900">{profile?.location.address}</div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.location.city}
                                            onChange={(e) => handleInputChange(e, 'location')}
                                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    ) : (
                                        <div className="mt-1 text-gray-900">{profile?.location.city}</div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">State</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.location.state}
                                            onChange={(e) => handleInputChange(e, 'location')}
                                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    ) : (
                                        <div className="mt-1 text-gray-900">{profile?.location.state}</div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Operating Hours</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="hours"
                                        value={formData.hours}
                                        onChange={(e) => handleInputChange(e)}
                                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                    />
                                ) : (
                                    <div className="mt-1 text-gray-900">{profile?.hours}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </ProtectedRoute>
    );
};

export default BloodBankProfile;
