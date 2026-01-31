import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import Loading from '../../components/Loading';
import { getMyBloodBank, updateInventory } from '../../services/bloodBankService';
import { getMyCamps, updateCamp } from '../../services/campService';

const BloodBankDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [inventory, setInventory] = useState([]);
    const [myCamps, setMyCamps] = useState([]);

    // Edit States
    const [isEditingInventory, setIsEditingInventory] = useState(false);
    const [editingCamp, setEditingCamp] = useState(null); // Camp object being edited

    // Inventory Input State (temporary holder for edits)
    const [inventoryForm, setInventoryForm] = useState({});

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch user's camps
                try {
                    const camps = await getMyCamps();
                    setMyCamps(camps);
                } catch (e) {
                    console.error("Error fetching camps", e);
                }

                // Initial Mock Inventory or Real if available
                // Ideally this comes from getMyBloodBank response if it has inventory
                // For now, let's assume we initialize it if empty or use what we get
                setInventory([
                    { bloodGroup: 'A+', units: 25 },
                    { bloodGroup: 'A-', units: 12 },
                    { bloodGroup: 'B+', units: 15 },
                    { bloodGroup: 'B-', units: 8 },
                    { bloodGroup: 'AB+', units: 10 },
                    { bloodGroup: 'AB-', units: 4 },
                    { bloodGroup: 'O+', units: 40 },
                    { bloodGroup: 'O-', units: 20 }
                ]);
            } catch (err) {
                console.error("Failed to load dashboard data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user]);

    if (loading) return <Loading />;

    return (
        <ProtectedRoute requiredRole="blood-bank">
            <Layout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Blood Bank Dashboard</h1>
                        <p className="text-gray-600 mt-2">Manage your inventory and view statistics</p>
                    </div>

                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="text-3xl font-bold text-red-600">
                                    {inventory.reduce((acc, curr) => acc + curr.units, 0)}
                                </div>
                                <div className="text-sm text-gray-600">Total Units</div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="text-3xl font-bold text-blue-600">
                                    150
                                </div>
                                <div className="text-sm text-gray-600">Given to Patients</div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="text-3xl font-bold text-green-600">
                                    75
                                </div>
                                <div className="text-sm text-gray-600">Given to Hospitals</div>
                            </div>
                            <div
                                onClick={() => navigate('/blood-bank/create-camp')}
                                className="bg-red-50 rounded-lg shadow p-6 cursor-pointer hover:bg-red-100 transition-colors border-2 border-red-500 border-dashed flex flex-col items-center justify-center text-center"
                            >
                                <div className="text-3xl font-bold text-red-600">
                                    +
                                </div>
                                <div className="text-sm font-bold text-red-700">Create Donation Camp</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Current Inventory</h2>
                                <button
                                    onClick={() => {
                                        if (isEditingInventory) {
                                            // Handle Save
                                            // Ideally loop through changes and call updateInventory for each ? Or bulk update endpoint?
                                            // Service updateInventory updates one by one currently: { bloodGroup, units }
                                            // This might be slow for multiple. For valid prototype, we can promise.all
                                            const updates = Object.entries(inventoryForm).map(([bg, units]) =>
                                                updateInventory({ bloodGroup: bg, units: parseInt(units) })
                                            );
                                            Promise.all(updates).then(() => {
                                                alert('Inventory Updated');
                                                setIsEditingInventory(false);
                                                // Refresh?
                                                setInventory(prev => prev.map(item => ({
                                                    ...item,
                                                    units: inventoryForm[item.bloodGroup] !== undefined ? parseInt(inventoryForm[item.bloodGroup]) : item.units
                                                })));
                                            }).catch(e => alert('Failed to update some items'));
                                        } else {
                                            // Init Form
                                            const initialForm = {};
                                            inventory.forEach(item => initialForm[item.bloodGroup] = item.units);
                                            setInventoryForm(initialForm);
                                            setIsEditingInventory(true);
                                        }
                                    }}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isEditingInventory
                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                            : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                                        }`}
                                >
                                    {isEditingInventory ? 'Save Changes' : 'Edit Inventory'}
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {inventory.map((item) => (
                                    <div key={item.bloodGroup} className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
                                        <div className="text-2xl font-bold text-gray-800">{item.bloodGroup}</div>
                                        {isEditingInventory ? (
                                            <input
                                                type="number"
                                                className="w-full mt-2 p-1 text-center border border-gray-300 rounded"
                                                value={inventoryForm[item.bloodGroup] || 0}
                                                onChange={(e) => setInventoryForm({ ...inventoryForm, [item.bloodGroup]: e.target.value })}
                                            />
                                        ) : (
                                            <div className="text-lg text-primary-600">{item.units} units</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* My Camps Section */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold">My Donation Camps</h2>
                            </div>

                            {myCamps.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {myCamps.map((camp) => (
                                        <div key={camp._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-gray-900">{camp.name}</h3>
                                                <span className={`text-xs px-2 py-1 rounded-full ${camp.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-50 text-blue-700'}`}>{camp.status}</span>
                                            </div>
                                            <div className="space-y-1 text-sm text-gray-600">
                                                <p><span className="font-medium">Date:</span> {new Date(camp.date).toLocaleDateString()}</p>
                                                <p><span className="font-medium">Time:</span> {camp.time}</p>
                                                <p><span className="font-medium">Location:</span> {camp.location?.city}</p>
                                            </div>
                                            <button
                                                onClick={() => setEditingCamp(camp)}
                                                className="w-full mt-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <p>No donation camps created yet.</p>
                                    <button
                                        onClick={() => navigate('/blood-bank/create-camp')}
                                        className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
                                    >
                                        Create your first camp
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Edit Camp Modal */}
                {editingCamp && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
                            <h3 className="text-xl font-bold mb-4">Edit Camp</h3>
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                try {
                                    const { _id, ...data } = editingCamp;
                                    await updateCamp(_id, data);
                                    alert('Camp updated');
                                    setEditingCamp(null);
                                    // Refresh camps
                                    const res = await getMyCamps();
                                    setMyCamps(res);
                                } catch (err) {
                                    alert('Failed to update camp');
                                }
                            }}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Camp Name</label>
                                        <input type="text" value={editingCamp.name} onChange={e => setEditingCamp({ ...editingCamp, name: e.target.value })} className="mt-1 w-full p-2 border rounded" required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Date</label>
                                            <input type="date" value={editingCamp.date ? editingCamp.date.split('T')[0] : ''} onChange={e => setEditingCamp({ ...editingCamp, date: e.target.value })} className="mt-1 w-full p-2 border rounded" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Time</label>
                                            <input type="text" value={editingCamp.time} onChange={e => setEditingCamp({ ...editingCamp, time: e.target.value })} className="mt-1 w-full p-2 border rounded" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea value={editingCamp.description} onChange={e => setEditingCamp({ ...editingCamp, description: e.target.value })} className="mt-1 w-full p-2 border rounded" rows="3"></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Status</label>
                                        <select value={editingCamp.status} onChange={e => setEditingCamp({ ...editingCamp, status: e.target.value })} className="mt-1 w-full p-2 border rounded">
                                            <option value="Upcoming">Upcoming</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button type="button" onClick={() => setEditingCamp(null)} className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50">Cancel</button>
                                    <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </Layout>
        </ProtectedRoute>
    );
};

export default BloodBankDashboard;
