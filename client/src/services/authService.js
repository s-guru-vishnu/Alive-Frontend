import api from './api';

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const deactivateAccount = async () => {
  const response = await api.put('/auth/deactivate');
  return response.data;
};

export const uploadProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append('profilePicture', file);

  const response = await api.post('/auth/upload-profile-picture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  if (response.data.success && response.data.data.user) {
    // Update user in localStorage
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
  }

  return response.data;
};
