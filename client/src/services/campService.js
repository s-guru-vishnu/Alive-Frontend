import api from './api';

export const createCamp = async (campData) => {
    try {
        const response = await api.post('/camps', campData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCamps = async (filters = {}) => {
    try {
        const { city } = filters;
        let query = '';
        if (city) query += `?city=${city}`;

        const response = await api.get(`/camps${query}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMyCamps = async () => {
    try {
        const response = await api.get('/camps/me');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCamp = async (id, campData) => {
    try {
        const response = await api.put(`/camps/${id}`, campData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
