import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { getRequests } from '../../services/requestService';
import { useAuth } from '../../context/AuthContext';

const EmergencyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchEmergencyRequests();
  }, []);

  const fetchEmergencyRequests = async () => {
    try {
      setLoading(true);
      const response = await getRequests();
      const emergencyRequests = (response.data || []).filter(req => req.isEmergency);
      setRequests(emergencyRequests);
    } catch (err) {
      console.error('Failed to fetch emergency requests:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
          <h1 className="text-3xl font-bold mb-2">🚨 Emergency Requests</h1>
          <p>These are urgent requests that need immediate attention</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-lg shadow-lg border-2 border-red-500 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  EMERGENCY
                </span>
                <span className="text-sm text-gray-600">
                  {new Date(request.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {request.hospitalId?.hospitalName}
              </h3>

              <div className="space-y-2 mb-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Blood Group:</span> {request.bloodGroup}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Quantity:</span> {request.quantity} units
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Urgency:</span>{' '}
                  <span className="text-red-600 font-bold">{request.urgency}</span>
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Location:</span>{' '}
                  {request.location?.city}, {request.location?.state}
                </p>
                {request.description && (
                  <p className="text-gray-600 mt-2">
                    {request.description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  request.status === 'Matched' ? 'bg-blue-100 text-blue-800' :
                  request.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {request.status}
                </span>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {requests.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            No emergency requests at the moment.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EmergencyRequests;

