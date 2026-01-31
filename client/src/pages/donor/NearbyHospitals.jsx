import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { getNearbyHospitals } from '../../services/locationService';
import { useAuth } from '../../context/AuthContext';

const NearbyHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [radius, setRadius] = useState(25);
  const { user } = useAuth();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (err) => {
          setError('Unable to get your location. Please enable location access.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (lat && lng) {
      fetchHospitals();
    }
  }, [lat, lng, radius]);

  const fetchHospitals = async () => {
    try {
      setLoading(true);
      const response = await getNearbyHospitals(lat, lng, radius);
      setHospitals(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch hospitals');
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
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Nearby Hospitals</h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Radius (km): {radius}
          </label>
          <input
            type="range"
            min="5"
            max="50"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital) => (
            <div key={hospital._id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {hospital.hospitalName}
              </h3>
              <p className="text-gray-600 mb-2">
                {hospital.location?.address}
              </p>
              <p className="text-gray-600 mb-2">
                {hospital.location?.city}, {hospital.location?.state}
              </p>
              {hospital.distance && (
                <p className="text-red-600 font-semibold">
                  {hospital.distance.toFixed(2)} km away
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Phone: {hospital.contact?.phone}
              </p>
            </div>
          ))}
        </div>

        {hospitals.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-600">
            No hospitals found nearby. Try increasing the search radius.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NearbyHospitals;

