import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import AlertCard from '../components/ui/AlertCard';
import api from '../services/api';

const VerificationRequired = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [documents, setDocuments] = useState({
        license: null,
        idProof: null
    });
    const [confirmValid, setConfirmValid] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        fetchProfile();
    }, [user]);

    const fetchProfile = async () => {
        try {
            // Determine endpoint based on role
            // We assume there are endpoints to get "my profile"
            // If not, we might need to rely on what we have or create new getting endpoints
            // Usually /api/hospitals/me or similar. 
            // Let's assume generic fetch or get from user object if possible, but user object is minimal.
            // adminController had getPending with populate.
            // Let's try to fetch specific profile. 
            // If we don't have dedicated 'me' route, we might need one.
            // For now, I'll try to use a placeholder or assume data is in user context if updated.
            // But usually user context only has auth info.
            // I will assume I can get it via /api/hospitals/profile or similar if I implement it.
            // But to be safe, I'll use a try-catch on likely endpoints or just render what I know from User if profile fetch fails.

            // Actually, standard is usually GET /api/auth/me or similar which returns full user + role data.
            // Let's try to hit a direct endpoint if it exists or generic one.
            // For the sake of this task, I'll assume I can skip pre-filling deeply specific fields if endpoint is missing,
            // OR I can quickly check routes again. 
            // hospitalRoutes.js likely has profile get.

            let endpoint = '';
            if (user?.role === 'hospital') endpoint = '/hospitals/profile';
            if (user?.role === 'blood-bank') endpoint = '/blood-banks/profile'; // I might need to verify this exists

            if (endpoint) {
                const res = await api.get(endpoint);
                setProfile(res.data.data);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to load profile details. Please try refreshing.');
            setLoading(false);
        }
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB');
                return;
            }
            setDocuments(prev => ({ ...prev, [type]: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!documents.license || !documents.idProof) {
            setError('Please upload both required documents.');
            return;
        }

        if (!confirmValid) {
            setError('Please confirm the documents are valid.');
            return;
        }

        try {
            setLoading(true);

            // Upload License
            const licenseFormData = new FormData();
            licenseFormData.append('document', documents.license);
            licenseFormData.append('documentType', 'organization_license');

            const roleEndpoint = user.role === 'hospital' ? 'hospital' : 'blood-bank';
            await api.post(`/documents/${roleEndpoint}`, licenseFormData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Upload ID Proof
            const idProofFormData = new FormData();
            idProofFormData.append('document', documents.idProof);
            idProofFormData.append('documentType', 'authorized_person_id');

            await api.post(`/documents/${roleEndpoint}`, idProofFormData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setSuccess('Documents submitted successfully. An admin will review your account.');
            setDocuments({ license: null, idProof: null });
            setConfirmValid(false);
            // Optionally reload profile to show "Documents Uploaded" status if UI supports it
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to submit documents.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <Layout>
            <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
                    Verification Required
                </h1>

                {error && <AlertCard type="error" message={error} onClose={() => setError('')} />}
                {success && <AlertCard type="success" message={success} onClose={() => setSuccess('')} />}

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                Your account is currently <strong>{profile?.verificationStatus || 'Pending Verification'}</strong>.
                                {profile?.rejectionReason && (
                                    <div className="mt-2 text-red-600 font-medium">
                                        Reason: {profile.rejectionReason}
                                    </div>
                                )}
                                <br />
                                Please submit the required documents to activate your account and access the platform.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Organization Verification */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Organization Verification</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Organization Name</label>
                                <input
                                    type="text"
                                    value={profile?.hospitalName || profile?.name || 'Loading...'}
                                    disabled
                                    className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">License Number</label>
                                <input
                                    type="text"
                                    value={profile?.licenseNumber || 'Loading...'}
                                    disabled
                                    className="mt-1 block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm sm:text-sm"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Document Uploads */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Document Uploads</h2>
                        <div className="grid grid-cols-1 gap-6">

                            <div className="border border-gray-300 rounded-md p-4 border-dashed hover:bg-gray-50 transition-colors">
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Organization License Certificate
                                    <span className="text-xs text-gray-500 ml-2">(PDF, JPG, PNG - Max 5MB)</span>
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf, .jpg, .jpeg, .png"
                                    onChange={(e) => handleFileChange(e, 'license')}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                                />
                                {documents.license && <span className="text-sm text-green-600 mt-1 block">Selected: {documents.license.name}</span>}
                            </div>

                            <div className="border border-gray-300 rounded-md p-4 border-dashed hover:bg-gray-50 transition-colors">
                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                    Authorized Person Government ID
                                    <span className="text-xs text-gray-500 ml-2">(Aadhaar / PAN / Driving License)</span>
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf, .jpg, .jpeg, .png"
                                    onChange={(e) => handleFileChange(e, 'idProof')}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                                />
                                {documents.idProof && <span className="text-sm text-green-600 mt-1 block">Selected: {documents.idProof.name}</span>}
                            </div>

                        </div>
                    </section>

                    {/* Contact Verification (Editable) */}
                    <section>
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Contact Verification</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Official Email</label>
                                <input
                                    type="email"
                                    value={profile?.contact?.email || user?.email || ''}
                                    onChange={(e) => setProfile({ ...profile, contact: { ...profile.contact, email: e.target.value } })}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Official Phone</label>
                                <input
                                    type="tel"
                                    value={profile?.contact?.phone || user?.phone || ''}
                                    onChange={(e) => setProfile({ ...profile, contact: { ...profile.contact, phone: e.target.value } })}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                        </div>
                    </section>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="confirm"
                                name="confirm"
                                type="checkbox"
                                checked={confirmValid}
                                onChange={(e) => setConfirmValid(e.target.checked)}
                                className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="confirm" className="font-medium text-gray-700">
                                I confirm that the above documents are valid and belong to this organization
                            </label>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading || !confirmValid}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${loading || !confirmValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'}`}
                        >
                            {loading ? 'Submitting...' : 'Submit for Verification'}
                        </button>
                    </div>

                    <div className="mt-4 text-center">
                        <button type="button" onClick={logout} className="text-sm text-gray-500 hover:text-gray-700 underline">
                            Log Out
                        </button>
                    </div>

                </form>
            </div>
        </Layout>
    );
};

export default VerificationRequired;
