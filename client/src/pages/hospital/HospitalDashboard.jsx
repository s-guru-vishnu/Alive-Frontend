import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import StatusBadge from '../../components/StatusBadge';
import Loading from '../../components/Loading';
import { getMyHospital } from '../../services/hospitalService';
import { getHospitalRequests, updateRequest } from '../../services/requestService';

const HospitalDashboard = () => {
  const [hospital, setHospital] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRequest, setEditingRequest] = useState(null); // Request being edited

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [hospitalRes, requestsRes] = await Promise.all([
        getMyHospital(),
        getHospitalRequests()
      ]);
      setHospital(hospitalRes.data);
      setRequests(requestsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  const pendingRequests = requests.filter(r => r.status === 'Pending').length;
  const matchedRequests = requests.filter(r => r.status === 'Matched').length;
  const completedRequests = requests.filter(r => r.status === 'Completed').length;

  return (
    <ProtectedRoute requiredRole="hospital">
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
            {hospital && (
              <p className="text-gray-600 mt-2">
                Welcome, {hospital.hospitalName}
              </p>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-primary-600">{requests.length}</div>
                <div className="ml-4">
                  <div className="text-sm text-gray-600">Total Requests</div>
                  <div className="text-xs text-gray-500">All time</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-yellow-600">{pendingRequests}</div>
                <div className="ml-4">
                  <div className="text-sm text-gray-600">Pending</div>
                  <div className="text-xs text-gray-500">Awaiting matches</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-blue-600">{matchedRequests}</div>
                <div className="ml-4">
                  <div className="text-sm text-gray-600">Matched</div>
                  <div className="text-xs text-gray-500">Donors found</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-green-600">{completedRequests}</div>
                <div className="ml-4">
                  <div className="text-sm text-gray-600">Completed</div>
                  <div className="text-xs text-gray-500">Successfully fulfilled</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Requests */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Recent Requests</h2>
              <Link
                to="/hospital/create-request"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Create Request
              </Link>
            </div>
            <div className="p-6">
              {requests.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No requests created yet</p>
                  <Link
                    to="/hospital/create-request"
                    className="inline-block px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    Create Your First Request
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Blood Group
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Urgency
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Matched Donors
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {requests.slice(0, 10).map((request) => (
                        <tr key={request._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {request.bloodGroup}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {request.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={request.urgency} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={request.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {request.matchedDonors?.length || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => setEditingRequest(request)}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/hospital/profile"
              className="block bg-white rounded-lg shadow p-6 hover:bg-gray-50 text-center"
            >
              <div className="text-4xl mb-4">👤</div>
              <div className="font-medium text-gray-900">Update Profile</div>
            </Link>
            <Link
              to="/hospital/create-request"
              className="block bg-white rounded-lg shadow p-6 hover:bg-gray-50 text-center"
            >
              <div className="text-4xl mb-4">➕</div>
              <div className="font-medium text-gray-900">Create Request</div>
            </Link>
            <Link
              to="/hospital/requests"
              className="block bg-white rounded-lg shadow p-6 hover:bg-gray-50 text-center"
            >
              <div className="text-4xl mb-4">📋</div>
              <div className="font-medium text-gray-900">All Requests</div>
            </Link>
          </div>
        </div>


        {/* Edit Request Modal */}
        {editingRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 overflow-y-auto max-h-[90vh]">
              <h3 className="text-xl font-bold mb-4">Edit Request</h3>
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const { _id, ...data } = editingRequest;
                  // Only send necessary fields
                  const payload = {
                    bloodGroup: data.bloodGroup,
                    quantity: data.quantity,
                    urgency: data.urgency,
                    dateNeeded: data.dateNeeded,
                    isEmergency: data.isEmergency
                  };
                  await updateRequest(_id, payload);
                  alert('Request updated');
                  setEditingRequest(null);
                  fetchData(); // Refresh list
                } catch (err) {
                  console.error(err);
                  alert('Failed to update request');
                }
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                    <select
                      value={editingRequest.bloodGroup}
                      onChange={e => setEditingRequest({ ...editingRequest, bloodGroup: e.target.value })}
                      className="mt-1 w-full p-2 border rounded"
                      required
                    >
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity (Units)</label>
                    <input
                      type="number"
                      value={editingRequest.quantity}
                      onChange={e => setEditingRequest({ ...editingRequest, quantity: e.target.value })}
                      className="mt-1 w-full p-2 border rounded"
                      required
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Urgency</label>
                    <select
                      value={editingRequest.urgency}
                      onChange={e => setEditingRequest({ ...editingRequest, urgency: e.target.value })}
                      className="mt-1 w-full p-2 border rounded"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editingRequest.isEmergency || false}
                        onChange={e => setEditingRequest({ ...editingRequest, isEmergency: e.target.checked })}
                        className="rounded text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-red-600">Emergency Request</span>
                    </label>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button type="button" onClick={() => setEditingRequest(null)} className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Layout>
    </ProtectedRoute >
  );
};

export default HospitalDashboard;

