import axios from 'axios';

const API = axios.create({ baseURL: 'http://stage.hik8.com:4000' });

export const uploadImage = (data) => API.post('/upload/', data);
export const uploadPost = (data) => API.post('/post', data);