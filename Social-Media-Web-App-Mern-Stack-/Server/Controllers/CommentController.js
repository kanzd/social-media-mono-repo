import commentModel from "../Models/commentModel.js";
import {Types} from "mongoose";


export const createComment = async (req, res) => {
    const newComment = new commentModel(req.body);

    try {
        await newComment.save();
        res.status(200).json(newComment)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getComment = async (req, res) => {
    const id = req.params.id

    try {
        const post = await commentModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const updateComment = async (req, res) => {
    const commentId = req.params.id

    const { postId } = req.body

    try {
        const comment = await commentModel.findById(commentId)
        if (comment.postId === postId) {
            await comment.updateOne({ $set: req.body })
            res.status(200).json("Comment Updated Successfully!")
        } else {
            res.status(403).json("Action forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


export const deleteComment = async (req, res) => {
    const id = req.params.id;

    const { postId, commentedBy } = req.body;

    try {
        const comment = await commentModel.findById(id);
        if (comment.postId === postId && comment.commentedBy === commentedBy) {
            await comment.deleteOne();
            res.status(200).json("Comment deleted Successfully!")
        } else {
            res.status(403).json("Action forbidden")
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

export const like_dislike_Comment = async (req, res) => {
    const id = req.params.id;

    const { likedBy } = req.body;

    try {
        const comment = await commentModel.findById(id);
        if (!comment.likes.includes(likedBy)) {
            await comment.updateOne({ $push: { likes: likedBy } })
            res.status(200).json("Comment liked.")
        } else {
            await comment.updateOne({ $pull: { likes: likedBy } })
            res.status(200).json("Comment unliked.")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const post_comments = async (req, res) => {
    const id = req.params.id;

    try {
        let comments = await commentModel.find({ postId: id });
        if(!comments) return res.status(200).json([]);
        comments.sort((a, b) => {
            return b.createdAt - a.createdAt;
        })
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error);
    }
};