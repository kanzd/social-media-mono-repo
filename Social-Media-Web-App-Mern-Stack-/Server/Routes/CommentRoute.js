import express from 'express';
import {
    createComment,
    deleteComment,
    getComment,
    like_dislike_Comment,
    post_comments,
    updateComment
} from "../Controllers/CommentController.js";

const router = express.Router();

router.post('/', createComment);
router.get('/:id', getComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);
router.put('/:id/like_dislike', like_dislike_Comment);
router.get('/:id/post_comments', post_comments);

export default router;
