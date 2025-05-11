import axios from 'axios';

const API = axios.create({ baseURL: 'https://stage.hik8.com:2053' });

export const logIn = (formData) => API.post('/auth/login', formData); 

export const signUp = (formData) => API.post('/auth/register', formData);