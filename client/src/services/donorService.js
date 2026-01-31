import api from './api';

export const getDonors = async (filters = {}) => {
  const response = await api.get('/donors', { params: filters });
  return response.data;
};

export const getDonor = async (id) => {
  const response = await api.get(`/donors/${id}`);
  return response.data;
};

export const getMyProfile = async () => {
  const response = await api.get('/donors/profile');
  return response.data;
};

export const updateDonor = async (data) => {
  const response = await api.put('/donors/profile', data);
  return response.data;
};

export const getDonationHistory = async () => {
  const response = await api.get('/donors/history');
  return response.data;
};

export const getAvailableRequests = async () => {
  const response = await api.get('/donors/available-requests');
  return response.data;
};

