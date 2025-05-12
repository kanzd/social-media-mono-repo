import axios from 'axios';

const API = axios.create({ baseURL: 'https://stage.hik8.com/api-backend' });

export const getTimelinePosts = (id,page) => API.get(`/post/${id}/timeline?page=${page}`);
export const likePost = (id, userId) => API.put(`post/${id}/like_dislike`, { userId: userId })