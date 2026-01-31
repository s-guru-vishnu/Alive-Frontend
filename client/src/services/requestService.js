import api from './api';

export const createRequest = async (data) => {
  const response = await api.post('/requests', data);
  return response.data;
};

export const getRequests = async (filters = {}) => {
  const response = await api.get('/requests', { params: filters });
  return response.data;
};

export const getRequest = async (id) => {
  const response = await api.get(`/requests/${id}`);
  return response.data;
};

export const updateRequestStatus = async (id, status) => {
  const response = await api.put(`/requests/${id}/status`, { status });
  return response.data;
};

export const getHospitalRequests = async () => {
  const response = await api.get('/requests/hospital/my');
  return response.data;
};

export const updateRequest = async (id, data) => {
  const response = await api.put(`/requests/${id}`, data);
  return response.data;
};

