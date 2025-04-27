import axios from 'axios';

const API = axios.create({ baseURL: 'https://social-media-mono-repo.onrender.com' });

export const getPostComments = (id) => API.get(`/comment/${id}/post_comments`);
export const likeComment = (id, likedBy ) => API.put(`/comment/${id}/like_dislike`, { likedBy: likedBy });
export const addComment = (postId, commentedBy, comment ) => API.post(`/comment`, { postId: postId, commentedBy: commentedBy, comment : comment });
