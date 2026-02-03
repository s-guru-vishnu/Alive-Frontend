import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import Loading from '../../components/Loading';
import StatusBadge from '../../components/StatusBadge';
import { getReports, getPendingHospitals } from '../../services/adminService';

const AdminDashboard = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const reportsRes = await getReports();
      setReports(reportsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <ProtectedRoute requiredRole="admin">
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-primary-600">{reports?.overview?.totalUsers - 1 || 0}</div>
                <div className="ml-4">
                  <div className="text-sm text-gray-600">Total Users</div>
                  <div className="text-xs text-gray-500">All users</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-blue-600">{reports?.overview?.totalDonors - 3 || 0}</div>
                <div className="ml-4">
                  <div className="text-sm text-gray-600">Donors</div>
                  <div className="text-xs text-gray-500">Active donors</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-green-600">{reports?.overview?.totalHospitals || 0}</div>
                <div className="ml-4">
                  <div className="text-sm text-gray-600">Hospitals</div>
                  <div className="text-xs text-gray-500">Registered</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-red-600">{reports?.overview?.totalBloodBanks || 0}</div>
                <div className="ml-4">
                  <div className="text-sm text-gray-600">Blood Banks</div>
                  <div className="text-xs text-gray-500">Registered</div>
                </div>
              </div>
            </div>
          </div>



          {/* Request Statistics */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Request Statistics</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{reports?.requests?.total || 0}</div>
                  <div className="text-sm text-gray-600">Total Requests</div>
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

          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/admin/users"
              className="block bg-white rounded-lg shadow p-6 hover:bg-gray-50 text-center"
            >
              <div className="text-4xl mb-4">👥</div>
              <div className="font-medium text-gray-900">Manage Users</div>
            </Link>

            <Link
              to="/admin/reports"
              className="block bg-white rounded-lg shadow p-6 hover:bg-gray-50 text-center"
            >
              <div className="text-4xl mb-4">📊</div>
              <div className="font-medium text-gray-900">View Reports</div>
            </Link>
          </div>
        </div>
      </Layout >
    </ProtectedRoute >
  );
};

export default AdminDashboard;

