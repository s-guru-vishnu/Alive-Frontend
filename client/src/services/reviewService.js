import api from './api';

export const createReview = async (reviewData) => {
  const response = await api.post('/reviews', reviewData);
  return response.data;
};

export const getReviews = async (reviewedId, reviewedModel) => {
  const response = await api.get('/reviews', {
    params: { reviewedId, reviewedModel }
  });
  return response.data;
};

