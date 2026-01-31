import api from './api';

export const getConversations = async () => {
  const response = await api.get('/chat/conversations');
  return response.data;
};

export const getConversation = async (receiverId) => {
  const response = await api.get(`/chat/conversation/${receiverId}`);
  return response.data;
};

export const sendMessage = async (receiverId, message, requestId = null) => {
  const response = await api.post('/chat/send', {
    receiverId,
    message,
    requestId
  });
  return response.data;
};

export const markAsRead = async (senderId) => {
  const response = await api.put(`/chat/read/${senderId}`);
  return response.data;
};

