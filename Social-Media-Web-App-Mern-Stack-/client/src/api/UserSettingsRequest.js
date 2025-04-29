import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });

// Create user settings
export const createSetting = (data) => API.post('/settings', data);

// Get user settings by userId
export const getSetting = (id) => API.get(`/settings/${id}`);

// Update user settings by userId
export const updateSetting = (id, data) => API.put(`/settings/${id}`, data);

// Delete user settings by userId
export const deleteSetting = (id) => API.delete(`/settings/${id}`);