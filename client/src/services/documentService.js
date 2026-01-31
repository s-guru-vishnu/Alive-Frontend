import api from './api';

export const uploadHospitalDocument = async (file, documentType) => {
  const formData = new FormData();
  formData.append('document', file);
  formData.append('documentType', documentType);
  
  const response = await api.post('/documents/hospital', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const uploadDonorIDProof = async (file) => {
  const formData = new FormData();
  formData.append('document', file);
  
  const response = await api.post('/documents/donor/id-proof', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const getHospitalDocuments = async () => {
  const response = await api.get('/documents/hospital/my');
  return response.data;
};

