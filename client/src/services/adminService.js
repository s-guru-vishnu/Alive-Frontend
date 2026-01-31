import api from './api';

export const getUsers = async (filters = {}) => {
  const response = await api.get('/admin/users', { params: filters });
  return response.data;
};

export const verifyHospital = async (id, action) => {
  const response = await api.put(`/admin/verify-hospital/${id}`, { action });
  return response.data;
};

export const getPendingHospitals = async () => {
  const response = await api.get('/admin/hospitals/pending');
  return response.data;
};

export const getReports = async () => {
  const response = await api.get('/admin/reports');
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await api.put(`/admin/users/${id}`, data);
  return response.data;
};

export const getAnalytics = async (period = 30) => {
  const response = await api.get('/admin/analytics', { params: { period } });
  return response.data;
};

