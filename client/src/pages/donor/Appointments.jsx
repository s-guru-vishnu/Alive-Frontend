import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import Loading from '../../components/Loading';
import StatusBadge from '../../components/StatusBadge';
import { getAppointments } from '../../services/appointmentService';
import { updateAppointmentStatus } from '../../services/appointmentService';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter]);

  const fetchAppointments = async () => {
    try {
      const filters = statusFilter ? { status: statusFilter } : {};
      const response = await getAppointments(filters);
      setAppointments(response.data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appointmentId, status) => {
    try {
      await updateAppointmentStatus(appointmentId, status);
      alert(`Appointment ${status.toLowerCase()} successfully!`);
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment status:', error);
      alert('Failed to update appointment status');
    }
  };

  if (loading) return <Loading />;

  return (
    <ProtectedRoute requiredRole="donor">
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              {appointments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No appointments found</p>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment._id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {appointment.hospitalId?.hospitalName || 'Hospital'}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Date:</span>{' '}
                              {new Date(appointment.date).toLocaleDateString()}
                            </div>
                            <div>
                              <span className="font-medium">Time:</span> {appointment.time}
                            </div>
                            <div>
                              <span className="font-medium">Blood Group:</span>{' '}
                              {appointment.requestId?.bloodGroup || 'N/A'}
                            </div>
                            <div>
                              <span className="font-medium">Quantity:</span>{' '}
                              {appointment.requestId?.quantity || 'N/A'} units
                            </div>
                            <div className="md:col-span-2">
                              <span className="font-medium">Location:</span> {appointment.location}
                            </div>
                            {appointment.notes && (
                              <div className="md:col-span-2">
                                <span className="font-medium">Notes:</span> {appointment.notes}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          <StatusBadge status={appointment.status} />
                        </div>
                      </div>
                      {appointment.status === 'Pending' && (
                        <div className="flex space-x-2 mt-4">
                          <button
                            onClick={() => handleStatusUpdate(appointment._id, 'Accepted')}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(appointment._id, 'Rejected')}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Appointments;

