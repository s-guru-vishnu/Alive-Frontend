import api from './api';

export const getAllBloodBanks = async (params) => {
    const response = await api.get('/blood-banks', { params });
    return response.data;
};

export const getBloodBankById = async (id) => {
    const response = await api.get(`/blood-banks/${id}`);
    return response.data;
};

export const createBloodBank = async (bloodBankData) => {
    const response = await api.post('/blood-banks', bloodBankData);
    return response.data;
};

export const updateInventory = async (inventoryData) => {
    const response = await api.put('/blood-banks/inventory', inventoryData);
    return response.data;
};
// Get current user's blood bank profile
export const getMyBloodBank = async () => {
    const response = await api.get('/blood-banks/me');
    return response.data;
};

// Update blood bank profile
export const updateBloodBankProfile = async (profileData) => {
    const response = await api.put('/blood-banks/profile', profileData);
    return response.data;
};
