import express from 'express';
import { createPost, deletePost, getPost, like_dislike_Post, timeline, updatePost } from '../Controllers/PostController.js';
import multer from 'multer';
const router = express.Router();
// const storage = multer();
  
  const upload = multer();
router.post('/', upload.single('file'),createPost);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.put('/:id/like_dislike', like_dislike_Post);
router.get('/:id/timeline', timeline);

export default router;