import api from './api';

export const createAppointment = async (data) => {
  const response = await api.post('/appointments', data);
  return response.data;
};

export const getAppointments = async (filters = {}) => {
  const response = await api.get('/appointments', { params: filters });
  return response.data;
};

export const getAppointment = async (id) => {
  const response = await api.get(`/appointments/${id}`);
  return response.data;
};

export const updateAppointmentStatus = async (id, status) => {
  const response = await api.put(`/appointments/${id}/status`, { status });
  return response.data;
};

export const updateMatchStatus = async (requestId, status) => {
  const response = await api.put('/appointments/match/status', { requestId, status });
  return response.data;
};

