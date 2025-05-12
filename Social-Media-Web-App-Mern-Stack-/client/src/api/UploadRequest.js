import axios from 'axios';

const API = axios.create({ baseURL: 'https://stage.hik8.com/api-backend' });

export const uploadImage = (data) => API.post('/upload/', data);
export const uploadPost = (data) => API.post('/post', data);