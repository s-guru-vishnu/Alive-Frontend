import api from './api';

export const createCertificate = async (certificateData) => {
  const response = await api.post('/certificates', certificateData);
  return response.data;
};

export const getDonorCertificates = async () => {
  const response = await api.get('/certificates/donor/my');
  return response.data;
};

export const getCertificate = async (id) => {
  const response = await api.get(`/certificates/${id}`);
  return response.data;
};

