import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Loading from '../../components/Loading';
import AlertCard from '../../components/ui/AlertCard';
import StatusBadge from '../../components/StatusBadge';
import { FaCheck, FaTimes, FaEye, FaFilePdf, FaFileImage } from 'react-icons/fa';

const VerificationDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [selectedRequest, setSelectedRequest] = useState(null); // For viewing details/docs
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [processingId, setProcessingId] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const [hospitalsRes, bloodBanksRes] = await Promise.all([
                api.get('/admin/hospitals/pending'),
                api.get('/admin/blood-banks/pending')
            ]);

            const hospitalRequests = hospitalsRes.data.data.map(h => ({ ...h, type: 'hospital' }));
            const bloodBankRequests = bloodBanksRes.data.data.map(b => ({ ...b, type: 'blood-bank' }));

            // Merge and sort by date
            const allRequests = [...hospitalRequests, ...bloodBankRequests].sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            );

            setRequests(allRequests);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch pending requests.');
            setLoading(false);
        }
    };

    const handleApprove = async (request) => {
        if (!window.confirm(`Are you sure you want to approve ${request.hospitalName || request.name}?`)) return;

        try {
            setProcessingId(request._id);
            const endpoint = request.type === 'hospital'
                ? `/admin/verify-hospital/${request._id}`
                : `/admin/verify-blood-bank/${request._id}`;

            await api.put(endpoint, { action: 'approve' });

            setSuccess(`${request.type === 'hospital' ? 'Hospital' : 'Blood Bank'} approved successfully.`);
            setRequests(prev => prev.filter(r => r._id !== request._id));
            setProcessingId(null);
            if (selectedRequest?._id === request._id) setSelectedRequest(null);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to approve action.');
            setProcessingId(null);
        }
    };

    const openRejectModal = (request) => {
        setSelectedRequest(request);
        setRejectModalOpen(true);
        setRejectionReason('');
    };

    const handleReject = async () => {
        if (!rejectionReason.trim()) {
            alert('Please provide a rejection reason');
            return;
        }

        try {
            setProcessingId(selectedRequest._id);
            const endpoint = selectedRequest.type === 'hospital'
                ? `/admin/verify-hospital/${selectedRequest._id}`
                : `/admin/verify-blood-bank/${selectedRequest._id}`;

            await api.put(endpoint, {
                action: 'reject',
                rejectionReason
            });

            setSuccess(`${selectedRequest.type === 'hospital' ? 'Hospital' : 'Blood Bank'} rejected.`);
            setRequests(prev => prev.filter(r => r._id !== selectedRequest._id));

            setRejectModalOpen(false);
            setSelectedRequest(null);
            setProcessingId(null);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to reject action.');
            setProcessingId(null);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Organization Verification</h1>

            {error && <AlertCard type="error" message={error} onClose={() => setError('')} />}
            {success && <AlertCard type="success" message={success} onClose={() => setSuccess('')} />}

            {requests.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow">
                    <p className="text-gray-500 text-lg">No pending verification requests.</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {requests.map((req) => (
                                <tr key={req._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{req.hospitalName || req.name}</div>
                                            <div className="text-sm text-gray-500">Lic: {req.licenseNumber}</div>
                                            <div className="text-xs text-gray-400">{req.location?.city}, {req.location?.state}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={req.type} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => setSelectedRequest(req)}
                                            className="text-primary-600 hover:text-primary-900 text-sm flex items-center"
                                        >
                                            <FaEye className="mr-1" /> View {req.verificationDocuments?.length || 0} Docs
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(req.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => handleApprove(req)}
                                                disabled={processingId === req._id}
                                                className="text-green-600 hover:text-green-900 p-2 border border-green-200 rounded hover:bg-green-50"
                                                title="Approve"
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                onClick={() => openRejectModal(req)}
                                                disabled={processingId === req._id}
                                                className="text-red-600 hover:text-red-900 p-2 border border-red-200 rounded hover:bg-red-50"
                                                title="Reject"
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Document View Modal */}
            {selectedRequest && !rejectModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-bold">Documents: {selectedRequest.hospitalName || selectedRequest.name}</h2>
                            <button onClick={() => setSelectedRequest(null)} className="text-gray-400 hover:text-gray-500">
                                <FaTimes size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {selectedRequest.verificationDocuments && selectedRequest.verificationDocuments.length > 0 ? (
                                selectedRequest.verificationDocuments.map((doc, idx) => (
                                    <div key={idx} className="border p-3 rounded flex justify-between items-center">
                                        <div>
                                            <p className="font-medium capitalize">{doc.documentType.replace(/_/g, ' ')}</p>
                                            <p className="text-xs text-gray-500">Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                                        </div>
                                        <a
                                            href={`${import.meta.env.VITE_API_URL}${doc.documentPath}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700 font-medium"
                                        >
                                            Open File
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">No documents uploaded yet.</p>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button onClick={() => setSelectedRequest(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Modal */}
            {rejectModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h2 className="text-xl font-bold mb-4">Reject Verification</h2>
                        <p className="mb-4 text-gray-600">Please provide a reason for rejecting this application. This will be shown to the user.</p>

                        <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="w-full border p-2 rounded mb-4 h-32"
                            placeholder="Enter rejection reason..."
                        />

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => { setRejectModalOpen(false); setSelectedRequest(null); }}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Reject Application
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default VerificationDashboard;
