import api from './api';

export const createHospital = async (data) => {
  const response = await api.post('/hospitals', data);
  return response.data;
};

export const getHospitals = async (filters = {}) => {
  const response = await api.get('/hospitals', { params: filters });
  return response.data;
};

export const getHospital = async (id) => {
  const response = await api.get(`/hospitals/${id}`);
  return response.data;
};

export const getMyHospital = async () => {
  const response = await api.get('/hospitals/profile/my');
  return response.data;
};

export const updateHospital = async (data) => {
  const response = await api.put('/hospitals/profile', data);
  return response.data;
};

