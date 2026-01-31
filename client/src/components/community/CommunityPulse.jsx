import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getRequests } from '../../services/requestService';
import { getHospitals } from '../../services/hospitalService';

// Fallback data in case API is empty/unreachable for demo
const MOCK_REQUESTS = [
    { _id: '1', bloodType: 'A+', hospitalName: 'City General Hospital', location: 'Downtown', urgency: 'Critical', time: '10 mins ago' },
    { _id: '2', bloodType: 'O-', hospitalName: 'St. Mary\'s Medical', location: 'Westside', urgency: 'High', time: '25 mins ago' },
    { _id: '3', bloodType: 'B+', hospitalName: 'Community Health Center', location: 'North Hills', urgency: 'Medium', time: '1 hour ago' },
];

const MOCK_HOSPITALS = [
    { _id: '1', name: 'City General Hospital', status: 'Active', openRequests: 5, location: 'Downtown' },
    { _id: '2', name: 'Memorial Care', status: 'Active', openRequests: 2, location: 'Eastside' },
    { _id: '3', name: 'Children\'s Hospital', status: 'Active', openRequests: 8, location: 'Uptown' },
];

const CommunityPulse = () => {
    const [requests, setRequests] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Attempt to fetch real data
                const [reqData, hospData] = await Promise.allSettled([
                    getRequests({ limit: 5 }),
                    getHospitals({ limit: 5 })
                ]);

                // Use real data if successful and not empty, otherwise fallback
                const finalRequests = (reqData.status === 'fulfilled' && reqData.value?.length > 0)
                    ? reqData.value
                    : MOCK_REQUESTS;

                const finalHospitals = (hospData.status === 'fulfilled' && hospData.value?.length > 0)
                    ? hospData.value
                    : MOCK_HOSPITALS;

                setRequests(finalRequests);
                setHospitals(finalHospitals);
            } catch (error) {
                console.error("Failed to fetch community data", error);
                setRequests(MOCK_REQUESTS);
                setHospitals(MOCK_HOSPITALS);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="mb-20">
            <h2 className="text-4xl font-display font-bold text-center mb-4 text-gray-900">Community Pulse</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Live updates on blood requirements and hospital availability in your area.</p>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Urgent Requests Feed */}
                <div className="bg-white rounded-2xl p-8 shadow-elegant border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                    </div>
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            Live Requests
                        </h3>
                        <Link to="/donor/emergency-requests" className="text-primary-600 font-semibold hover:text-primary-700 text-sm">View All →</Link>
                    </div>

                    <div className="space-y-4">
                        {requests.map((req, idx) => (
                            <motion.div
                                key={req._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-red-50 hover:border-red-100 transition-colors group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-lg shadow-sm group-hover:bg-red-200 transition-colors">
                                        {req.bloodType}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{req.hospitalName || req.name}</h4>
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            {req.location}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-1 ${req.urgency === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                                        {req.urgency || 'Urgent'}
                                    </span>
                                    <p className="text-xs text-gray-400">{req.time || 'Just now'}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Active Hospitals List */}
                <div className="bg-white rounded-2xl p-8 shadow-elegant border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" /></svg>
                    </div>
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">Active Hospitals</h3>
                        <Link to="/donor/nearby-hospitals" className="text-primary-600 font-semibold hover:text-primary-700 text-sm">Find Nearby →</Link>
                    </div>

                    <div className="space-y-4">
                        {hospitals.map((hosp, idx) => (
                            <motion.div
                                key={hosp._id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-blue-50 hover:border-blue-100 transition-colors"
                            >
                                <div>
                                    <h4 className="font-semibold text-gray-900">{hosp.name || hosp.hospitalName}</h4>
                                    <p className="text-sm text-gray-500">{hosp.location}</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        Available
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">{hosp.openRequests || 0} Open Request(s)</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommunityPulse;
