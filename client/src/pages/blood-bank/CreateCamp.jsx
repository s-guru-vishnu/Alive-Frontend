import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import { createCamp } from '../../services/campService';
import { useAuth } from '../../context/AuthContext';

const CreateCamp = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        description: '',
        location: {
            address: '',
            city: '',
            state: ''
        }
    });

    const handleChange = (e, section = null) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createCamp(formData);
            alert('Camp created successfully!');
            navigate('/blood-bank/dashboard');
        } catch (error) {
            console.error('Error creating camp:', error);
            const msg = error.response?.data?.message || 'Failed to create camp';
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProtectedRoute requiredRole="blood-bank">
            <Layout>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Donation Camp</h1>
                    <div className="bg-white rounded-lg shadow p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Camp Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g., Annual Blood Drive"
                                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        required
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Time</label>
                                    <input
                                        type="text"
                                        name="time"
                                        required
                                        value={formData.time}
                                        onChange={handleChange}
                                        placeholder="e.g., 9:00 AM - 2:00 PM"
                                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 border-t border-gray-100 pt-4">
                                <h3 className="text-lg font-medium text-gray-900">Location Details</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        value={formData.location.address}
                                        onChange={(e) => handleChange(e, 'location')}
                                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            value={formData.location.city}
                                            onChange={(e) => handleChange(e, 'location')}
                                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            required
                                            value={formData.location.state}
                                            onChange={(e) => handleChange(e, 'location')}
                                            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="button"
                                    onClick={() => navigate('/blood-bank/dashboard')}
                                    className="mr-3 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                                >
                                    {loading ? 'Creating...' : 'Create Camp'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </ProtectedRoute>
    );
};

export default CreateCamp;
