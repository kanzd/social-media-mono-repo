import express from "express";
import { UnFollowUser, deleteUser, followUser, getAllUsers, getUser, updateUser } from "../Controllers/UserController.js";
import authMiddleWare from "../Middleware/authMiddleWare.js";
import multer from 'multer';
const router = express.Router();
const upload = multer();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id',upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'coverPicture', maxCount: 1 }
  ]), authMiddleWare, updateUser);
router.delete('/:id', authMiddleWare, deleteUser);
router.put('/:id/follow', authMiddleWare, followUser);
router.put('/:id/unfollow', authMiddleWare, UnFollowUser);

export default router;