import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import StatusBadge from '../../components/StatusBadge';
import Loading from '../../components/Loading';
import { getMyProfile, getAvailableRequests } from '../../services/donorService';
import { getAppointments } from '../../services/appointmentService';
import { updateMatchStatus } from '../../services/appointmentService';

const DonorDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, requestsRes, appointmentsRes] = await Promise.all([
        getMyProfile(),
        getAvailableRequests(),
        getAppointments({ status: 'Pending' })
      ]);
      setProfile(profileRes.data);
      setRequests(requestsRes.data || []);
      setAppointments(appointmentsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMatchResponse = async (requestId, status) => {
    try {
      await updateMatchStatus(requestId, status);
      fetchData();
    } catch (error) {
      console.error('Error updating match status:', error);
      alert('Failed to update match status');
    }
  };

  if (loading) return <Loading />;

  return (
    <ProtectedRoute requiredRole="donor">
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Donor Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-primary-600">{requests.length}</div>
                <div className="ml-4">
                  <div className="text-sm text-gray-600">Available Requests</div>
                  <div className="text-xs text-gray-500">Matching your blood group</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-blue-600">{appointments.length}</div>
                <div className="ml-4">
                  <div className="text-sm text-gray-600">Pending Appointments</div>
                  <div className="text-xs text-gray-500">Awaiting your response</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <StatusBadge status={profile?.availability || 'Unavailable'} />
                <div className="ml-4">
                  <div className="text-sm text-gray-900">Availability Status</div>
                  <div className="text-xs text-gray-500">Your current status</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Available Requests */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Available Requests</h2>
              </div>
              <div className="p-6">
                {requests.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No available requests matching your blood group</p>
                ) : (
                  <div className="space-y-4">
                    {requests.map((request) => (
                      <div key={request._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">Blood Group: {request.bloodGroup}</h3>
                            <p className="text-sm text-gray-600">Quantity: {request.quantity} units</p>
                            <p className="text-sm text-gray-600">Hospital: {request.hospitalId?.hospitalName || 'N/A'}</p>
                          </div>
                          <StatusBadge status={request.urgency} />
                        </div>
                        {request.description && (
                          <p className="text-sm text-gray-700 mb-3">{request.description}</p>
                        )}
                        {request.matchedDonors?.some(m => m.donorId === profile?._id) ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleMatchResponse(request._id, 'accepted')}
                              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleMatchResponse(request._id, 'rejected')}
                              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500">You are matched with this request</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pending Appointments */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Appointments</h2>
              </div>
              <div className="p-6">
                {appointments.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No pending appointments</p>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {appointment.hospitalId?.hospitalName || 'Hospital'}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Date: {new Date(appointment.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600">Time: {appointment.time}</p>
                          </div>
                          <StatusBadge status={appointment.status} />
                        </div>
                        <p className="text-sm text-gray-700 mb-2">Location: {appointment.location}</p>
                        <Link
                          to={`/donor/appointments/${appointment._id}`}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          View Details →
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/donor/profile"
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
              >
                <div className="text-2xl mb-2">👤</div>
                <div className="font-medium text-gray-900">Update Profile</div>
              </Link>
              <Link
                to="/donor/history"
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
              >
                <div className="text-2xl mb-2">📋</div>
                <div className="font-medium text-gray-900">Donation History</div>
              </Link>
              <Link
                to="/donor/appointments"
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
              >
                <div className="text-2xl mb-2">📅</div>
                <div className="font-medium text-gray-900">All Appointments</div>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default DonorDashboard;

