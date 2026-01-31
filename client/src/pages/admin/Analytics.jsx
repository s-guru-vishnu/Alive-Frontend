import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import Loading from '../../components/Loading';
import { getAnalytics } from '../../services/adminService';

const Analytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState(30);

    useEffect(() => {
        fetchAnalytics();
    }, [period]);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const response = await getAnalytics(period);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;
    if (!data) return <div className="text-center py-10">No data available</div>;

    // Helper for Bar Chart (Blood Group Demand)
    const maxDemand = Math.max(...(data.bloodGroupDemand?.map(d => d.totalRequests) || [0]), 1);

    // Helper for Line Chart (Monthly Stats)
    const getPolylinePoints = () => {
        if (!data.monthlyStats?.length) return "";
        const points = data.monthlyStats.map((stat, index) => {
            const x = (index / (data.monthlyStats.length - 1 || 1)) * 100; // 0 to 100
            const maxVal = Math.max(...data.monthlyStats.map(s => s.count), 1);
            const y = 100 - (stat.count / maxVal) * 80; // Scale to 80% height, inverted
            return `${x},${y}`; // SVG coordinate space (0,0 is top-left)
        });
        return points.join(" ");
    };

    return (
        <ProtectedRoute requiredRole="admin">
            <Layout>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
                        <select
                            value={period}
                            onChange={(e) => setPeriod(Number(e.target.value))}
                            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value={7}>Last 7 Days</option>
                            <option value={30}>Last 30 Days</option>
                            <option value={90}>Last 3 Months</option>
                        </select>
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Blood Group Demand Chart */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Blood Request Demand</h2>
                            <div className="space-y-4">
                                {data.bloodGroupDemand.map((item) => (
                                    <div key={item._id} className="relative">
                                        <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                                            <span>{item._id}</span>
                                            <span>{item.totalRequests} reqs</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                                            <div
                                                className="bg-red-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                                                style={{ width: `${(item.totalRequests / maxDemand) * 100}%` }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-gray-400 mt-1 flex gap-2">
                                            <span>{item.emergency} Emergency</span>
                                            <span>•</span>
                                            <span>{item.completed} Fulfilled</span>
                                        </div>
                                    </div>
                                ))}
                                {data.bloodGroupDemand.length === 0 && <p className="text-gray-400 text-center py-4">No requests in this period</p>}
                            </div>
                        </div>

                        {/* Monthly Donation Trend (SVG Line Chart) */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Donation Trends</h2>
                            <div className="h-64 relative flex items-end pb-6 px-2">
                                {/* Simple Line Chart */}
                                {data.monthlyStats.length > 0 ? (
                                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                        {/* Grid Lines */}
                                        <line x1="0" y1="0" x2="100" y2="0" stroke="#f3f4f6" strokeWidth="0.5" />
                                        <line x1="0" y1="50" x2="100" y2="50" stroke="#f3f4f6" strokeWidth="0.5" />
                                        <line x1="0" y1="100" x2="100" y2="100" stroke="#f3f4f6" strokeWidth="0.5" />

                                        {/* Activity Line */}
                                        <polyline
                                            fill="none"
                                            stroke="#ef4444" // red-500
                                            strokeWidth="2"
                                            points={getPolylinePoints()}
                                            vectorEffect="non-scaling-stroke"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        {/* Points */}
                                        {data.monthlyStats.map((stat, i) => {
                                            const x = (i / (data.monthlyStats.length - 1 || 1)) * 100;
                                            const maxVal = Math.max(...data.monthlyStats.map(s => s.count), 1);
                                            const y = 100 - (stat.count / maxVal) * 80;
                                            return (
                                                <g key={i}>
                                                    <circle cx={x} cy={y} r="3" fill="#fff" stroke="#ef4444" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                                                    {/* Tooltip on hover (simplified as text for now) */}
                                                    {/* <text x={x} y={y - 5} fontSize="4" textAnchor="middle" fill="#6b7280">{stat.count}</text> */}
                                                </g>
                                            );
                                        })}
                                    </svg>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">No trend data available</div>
                                )}
                                {/* X-Axis Labels (Simplified) */}
                                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 translate-y-full pt-2">
                                    {data.monthlyStats.map((stat, i) => (
                                        <span key={i}>{stat._id.month}/{stat._id.year}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Hospitals Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800">Top Performing Hospitals</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Requests</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {data.topHospitals.map((hospital, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hospital.hospitalName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hospital.totalRequests}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{hospital.completedRequests}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {Math.round((hospital.completedRequests / hospital.totalRequests) * 100)}%
                                            </td>
                                        </tr>
                                    ))}
                                    {data.topHospitals.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-gray-400">No data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Layout>
        </ProtectedRoute>
    );
};

export default Analytics;
