import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { getAllBloodBanks } from '../services/bloodBankService';
import { getCamps } from '../services/campService';
import { getDonors } from '../services/donorService';
import { getRequests } from '../services/requestService';
import DetailsModal from '../components/ui/DetailsModal';

const Community = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('donors');
    const [searchTerm, setSearchTerm] = useState('');
    const [bloodBanks, setBloodBanks] = useState([]);
    const [donors, setDonors] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    // Modal State
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleContact = (email, subject = '') => {
        if (!email) {
            alert('Email address not available for this user.');
            return;
        }
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    };

    const handleWhatsApp = (phone, message = '') => {
        if (!phone) {
            alert('Phone number not available for this hospital.');
            return;
        }
        // Remove non-numeric characters for the API
        const cleanPhone = phone.replace(/\D/g, '');
        // Default to India country code if missing (numbers starting without 91 and having 10 digits)
        const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

        window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleViewDetails = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (activeTab === 'blood-banks') {

                    // Fetch camps instead of just listing blood banks
                    const data = await getCamps();
                    // Ensure we set an array, handling potential wrapping like { data: [...] } or just [...]
                    const campsArray = Array.isArray(data) ? data : (data.data || []);
                    setBloodBanks(campsArray);
                } else if (activeTab === 'donors') {
                    const res = await getDonors();
                    setDonors(res.data || []);
                } else if (activeTab === 'hospitals') {
                    const res = await getRequests({ status: 'Pending' }); // Only fetch pending/active requests
                    setRequests(res.data || []);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                console.error("Failed to fetch data for tab:", activeTab);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activeTab]);

    // Filters
    const [donorFilters, setDonorFilters] = useState({ location: '', availabilityTime: '' });
    const [hospitalFilters, setHospitalFilters] = useState({ requiredBloodGroup: '', minHemoglobin: '' });
    const [bloodBankFilters, setBloodBankFilters] = useState({ location: '' });

    // --- Filtering Logic ---
    const filteredDonors = useMemo(() => {
        return donors.filter(donor => {
            const matchesSearch = (donor.userId?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (donor.location?.city || '').toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation = donorFilters.location ? (donor.location?.city || '').toLowerCase().includes(donorFilters.location.toLowerCase()) : true;
            const matchesTime = donorFilters.availabilityTime ? donor.availability === donorFilters.availabilityTime : true;

            return matchesSearch && matchesLocation && matchesTime;
        });
    }, [searchTerm, donorFilters, donors]);

    const filteredRequests = useMemo(() => {
        return requests.filter(request => {
            const hospitalName = request.hospitalId?.hospitalName || '';
            const city = request.location?.city || request.hospitalId?.location?.city || '';

            const matchesSearch = hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                city.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesGroup = hospitalFilters.requiredBloodGroup ? request.bloodGroup === hospitalFilters.requiredBloodGroup : true;

            return matchesSearch && matchesGroup;
        });
    }, [searchTerm, hospitalFilters, requests]);

    const filteredBloodBanks = useMemo(() => {
        console.log('Filtering blood banks. Total:', bloodBanks.length);
        console.log('Filters:', { searchTerm, bloodBankFilters });

        return bloodBanks.filter(bank => {
            if (!bank) return false;

            const bankName = bank.name || '';
            const bankCity = bank.location?.city || '';

            const matchesSearch = bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                bankCity.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesLocation = bloodBankFilters.location ? bankCity.toLowerCase().includes(bloodBankFilters.location.toLowerCase()) : true;

            if (!matchesSearch || !matchesLocation) {
                console.log(`Camp excluded: ${bankName}, City: ${bankCity}. MatchesSearch: ${matchesSearch}, MatchesLocation: ${matchesLocation}`);
            }

            return matchesSearch && matchesLocation;
        });
    }, [searchTerm, bloodBankFilters, bloodBanks]);

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Community Directory</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">Connect with donors and hospitals in our vibrant life-saving network.</p>
                    </div>

                    {/* Search & Tabs */}
                    <div className="bg-white rounded-xl shadow-elegant p-6 mb-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                            {/* Tab Switcher */}
                            <div className="flex p-1 space-x-1 bg-gray-100 rounded-lg">
                                <button
                                    onClick={() => setActiveTab('donors')}
                                    className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${activeTab === 'donors'
                                        ? 'bg-white text-primary-700 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Find Donors
                                </button>
                                <button
                                    onClick={() => setActiveTab('hospitals')}
                                    className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${activeTab === 'hospitals'
                                        ? 'bg-white text-primary-700 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Hospital Requests
                                </button>
                                <button
                                    onClick={() => setActiveTab('blood-banks')}
                                    className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${activeTab === 'blood-banks'
                                        ? 'bg-white text-primary-700 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Blood Banks
                                </button>
                            </div>

                            {/* Global Search */}
                            <div className="relative w-full md:w-96">
                                <input
                                    type="text"
                                    placeholder={`Search...`}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                        </div>

                        {/* Specific Filters */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                            {activeTab === 'donors' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Place (City)</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Chennai"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                            value={donorFilters.location}
                                            onChange={(e) => setDonorFilters({ ...donorFilters, location: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Time (Availability)</label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                            value={donorFilters.availabilityTime}
                                            onChange={(e) => setDonorFilters({ ...donorFilters, availabilityTime: e.target.value })}
                                        >
                                            <option value="">All Times</option>
                                            <option value="Anytime">Anytime</option>
                                            <option value="Weekends">Weekends</option>
                                            <option value="Weekdays">Weekdays</option>
                                        </select>
                                    </div>
                                </>
                            )}
                            {activeTab === 'hospitals' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Required Blood Group</label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                            value={hospitalFilters.requiredBloodGroup}
                                            onChange={(e) => setHospitalFilters({ ...hospitalFilters, requiredBloodGroup: e.target.value })}
                                        >
                                            <option value="">All Groups</option>
                                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                                                <option key={bg} value={bg}>{bg}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Min Hemoglobin (g/dL)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            placeholder="e.g. 12.5"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                            value={hospitalFilters.minHemoglobin}
                                            onChange={(e) => setHospitalFilters({ ...hospitalFilters, minHemoglobin: e.target.value })}
                                        />
                                    </div>
                                </>
                            )}
                            {activeTab === 'blood-banks' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Place (City)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Chennai"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                        value={bloodBankFilters.location}
                                        onChange={(e) => setBloodBankFilters({ ...bloodBankFilters, location: e.target.value })}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Results Grid */}
                    <motion.div
                        key={activeTab} // Trigger animation on tab switch
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {activeTab === 'donors' && (
                            loading ? <div className="col-span-full text-center py-20">Loading donors...</div> :
                                filteredDonors.length > 0 ? (
                                    filteredDonors.map((donor) => (
                                        <div key={donor._id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-lg">
                                                    {donor.userId?.name?.charAt(0) || 'D'}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{donor.userId?.name || 'Unknown'}</h3>
                                                    <p className="text-sm text-gray-500">
                                                        Last Donated: {donor.previousDonationInfo?.lastDonationDate
                                                            ? new Date(donor.previousDonationInfo.lastDonationDate).toLocaleDateString()
                                                            : 'Never'}
                                                    </p>
                                                </div>
                                                <div className="ml-auto bg-red-50 text-red-700 text-xs font-bold px-2 py-1 rounded">
                                                    {donor.bloodGroup}
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <p className="flex justify-between">
                                                    <span>Availability:</span>
                                                    <span className="font-medium text-gray-800">{donor.availability}</span>
                                                </p>
                                                <p className="flex justify-between">
                                                    <span>Phone:</span>
                                                    <span className="font-medium text-gray-800">{donor.userId?.phone || 'N/A'}</span>
                                                </p>
                                            </div>
                                            {user && String(donor.userId?._id) === String(user._id) ? (
                                                <button
                                                    onClick={() => navigate('/donor/profile')}
                                                    className="w-full mt-4 py-2 border border-primary-600 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors text-sm font-semibold"
                                                >
                                                    Edit Profile
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleViewDetails(donor)}
                                                    className="w-full mt-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors text-sm font-semibold"
                                                >
                                                    View Details
                                                </button>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-20 text-gray-500">No donors found matching your filters.</div>
                                )
                        )}

                        {activeTab === 'hospitals' && (
                            loading ? <div className="col-span-full text-center py-20">Loading requests...</div> :
                                filteredRequests.length > 0 ? (
                                    filteredRequests.map((request) => (
                                        <div key={request._id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                                                    H
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{request.hospitalId?.hospitalName || 'Unknown Hospital'}</h3>
                                                    <p className="text-sm text-gray-500">{request.location?.city || request.hospitalId?.location?.city}</p>
                                                </div>
                                                <div className="ml-auto bg-red-50 text-red-700 text-xs font-bold px-2 py-1 rounded">
                                                    {request.bloodGroup}
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <p className="flex justify-between">
                                                    <span>Urgency:</span>
                                                    <span className={`font-medium ${request.urgency === 'Critical' ? 'text-red-600' : 'text-gray-800'}`}>
                                                        {request.urgency}
                                                    </span>
                                                </p>
                                                <p className="flex justify-between">
                                                    <span>Quantity:</span>
                                                    <span className="font-medium text-gray-800">{request.quantity} Units</span>
                                                </p>
                                                <p className="text-xs text-gray-400 mt-2">
                                                    Posted: {new Date(request.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            {user && String(request.hospitalId?.userId) === String(user._id) ? (
                                                <button
                                                    onClick={() => navigate('/hospital/profile')}
                                                    className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                                                >
                                                    Edit Profile
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleWhatsApp(request.hospitalId?.contact?.phone, `Hello, I can help with your request for ${request.bloodGroup} Blood from ${request.hospitalId?.hospitalName || 'your hospital'}`)}
                                                    className="w-full mt-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#128C7E] transition-colors text-sm font-semibold flex items-center justify-center gap-2"
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                                    Send Message
                                                </button>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-20 text-gray-500">No active requests found matching your filters.</div>
                                )
                        )}

                        {activeTab === 'blood-banks' && (
                            loading ? (
                                <div className="col-span-full text-center py-20">Loading blood banks...</div>
                            ) : filteredBloodBanks.length > 0 ? (
                                filteredBloodBanks.map((bank) => (
                                    <div key={bank._id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 font-bold text-xl">
                                                ⛺
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{bank.name}</h3>
                                                <p className="text-xs text-primary-600 font-medium">{bank.bloodBankId?.name || 'Blood Bank'}</p>
                                                <p className="text-sm text-gray-500">{bank.location?.city}, {bank.location?.state}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p className="flex justify-between">
                                                <span>Date:</span>
                                                <span className="font-medium text-gray-800">{new Date(bank.date).toLocaleDateString()}</span>
                                            </p>
                                            <p className="flex justify-between">
                                                <span>Time:</span>
                                                <span className="font-medium text-gray-800">{bank.time}</span>
                                            </p>
                                            <p className="flex justify-between">
                                                <span>Contact:</span>
                                                <span className="font-medium text-gray-800">{bank.bloodBankId?.contact?.phone || 'N/A'}</span>
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleViewDetails(bank)}
                                            className="w-full mt-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20 text-gray-500">No blood banks found.</div>
                            )
                        )}
                    </motion.div>
                </div>
            </div>

            <DetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedItem?.userId?.name || selectedItem?.name || selectedItem?.hospitalName || 'Details'}
            >
                <div className="space-y-4">
                    {selectedItem && (
                        <>
                            {/* Description for Camps/Banks */}
                            {selectedItem.description && (
                                <div>
                                    <h4 className="font-semibold text-gray-900">Description</h4>
                                    <p className="text-gray-600">{selectedItem.description}</p>
                                </div>
                            )}

                            {/* Donor Specific Details */}
                            {selectedItem.userId && selectedItem.bloodGroup && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Blood Group</h4>
                                        <p className="text-gray-600">{selectedItem.bloodGroup}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Age & Gender</h4>
                                        <p className="text-gray-600">{selectedItem.age} Years, {selectedItem.gender}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Availability</h4>
                                        <p className="text-gray-600">{selectedItem.availability}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Last Donated</h4>
                                        <p className="text-gray-600">
                                            {selectedItem.previousDonationInfo?.lastDonationDate
                                                ? new Date(selectedItem.previousDonationInfo.lastDonationDate).toLocaleDateString()
                                                : 'Never'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Date & Time for Camps */}
                            {(selectedItem.date || selectedItem.time) && (
                                <div>
                                    <h4 className="font-semibold text-gray-900">Date & Time</h4>
                                    <p className="text-gray-600">
                                        {selectedItem.date && new Date(selectedItem.date).toLocaleDateString()} {selectedItem.time && `at ${selectedItem.time}`}
                                    </p>
                                </div>
                            )}

                            {/* Location - Hide for Donors */}
                            {selectedItem.location && !selectedItem.userId && (
                                <div>
                                    <h4 className="font-semibold text-gray-900">Location</h4>
                                    <p className="text-gray-600">
                                        {selectedItem.location.address ? `${selectedItem.location.address}, ` : ''}
                                        {selectedItem.location.city}, {selectedItem.location.state}
                                    </p>
                                </div>
                            )}

                            {/* Contact Info */}
                            {(selectedItem.contact || selectedItem.bloodBankId?.contact || selectedItem.userId) && (
                                <div>
                                    <h4 className="font-semibold text-gray-900">Contact</h4>
                                    <p className="text-gray-600">
                                        {(() => {
                                            // Handle Donor/User Contact
                                            if (selectedItem.userId) {
                                                const { phone } = selectedItem.userId;
                                                return (
                                                    <>
                                                        {phone && <div>Phone: {phone}</div>}
                                                    </>
                                                );
                                            }

                                            // Handle Blood Bank/Camp Contact
                                            const contact = selectedItem.contact || selectedItem.bloodBankId?.contact;
                                            if (!contact) return 'N/A';
                                            if (typeof contact === 'string') return contact;
                                            return (
                                                <>
                                                    {contact.phone && <div>Phone: {contact.phone}</div>}
                                                    {contact.website && <div>Website: {contact.website}</div>}
                                                </>
                                            );
                                        })()}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </DetailsModal>
        </Layout>
    );
};

export default Community;
