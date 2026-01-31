import api from './api';

export const getNearbyHospitals = async (lat, lng, radius = 25) => {
  const response = await api.get('/location/hospitals/nearby', {
    params: { lat, lng, radius }
  });
  return response.data;
};

export const getNearbyDonors = async (lat, lng, radius = 25, bloodGroup = null) => {
  const params = { lat, lng, radius };
  if (bloodGroup) params.bloodGroup = bloodGroup;
  const response = await api.get('/location/donors/nearby', { params });
  return response.data;
};

export const updateDonorLocation = async (lat, lng) => {
  const response = await api.put('/location/donor/update', { lat, lng });
  return response.data;
};

export const updateHospitalLocation = async (lat, lng) => {
  const response = await api.put('/location/hospital/update', { lat, lng });
  return response.data;
};

