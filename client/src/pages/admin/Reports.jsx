import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import Loading from '../../components/Loading';
import { getReports } from '../../services/adminService';

const Reports = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await getReports();
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <ProtectedRoute requiredRole="admin">
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Reports & Analytics</h1>

          {/* Overview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-primary-600">{reports?.overview?.totalUsers || 0}</div>
              <div className="text-sm text-gray-600 mt-2">Total Users</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-blue-600">{reports?.overview?.totalDonors || 0}</div>
              <div className="text-sm text-gray-600 mt-2">Donors</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-green-600">{reports?.overview?.totalHospitals || 0}</div>
              <div className="text-sm text-gray-600 mt-2">Hospitals</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-purple-600">{reports?.overview?.totalRequests || 0}</div>
              <div className="text-sm text-gray-600 mt-2">Requests</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-orange-600">{reports?.overview?.totalAppointments || 0}</div>
              <div className="text-sm text-gray-600 mt-2">Appointments</div>
            </div>
          </div>

          {/* Request Statistics */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Request Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{reports?.requests?.total || 0}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{reports?.requests?.pending || 0}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{reports?.requests?.matched || 0}</div>
                <div className="text-sm text-gray-600">Matched</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{reports?.requests?.completed || 0}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>

          {/* Blood Group Distribution */}
          {reports?.bloodGroupDistribution && (
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Blood Group Distribution</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {reports.bloodGroupDistribution.map((item) => (
                  <div key={item._id} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">{item._id || 'N/A'}</div>
                    <div className="text-sm text-gray-600">{item.count} donors</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Appointment Statistics */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Appointment Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{reports?.appointments?.total || 0}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{reports?.appointments?.pending || 0}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{reports?.appointments?.accepted || 0}</div>
                <div className="text-sm text-gray-600">Accepted</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{reports?.appointments?.completed || 0}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity (Last 30 Days)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">
                  {reports?.recentActivity?.requestsLast30Days || 0}
                </div>
                <div className="text-sm text-gray-600">New Requests</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">
                  {reports?.recentActivity?.appointmentsLast30Days || 0}
                </div>
                <div className="text-sm text-gray-600">New Appointments</div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Reports;

