import postModel from '../Models/postModel.js';
import mongoose from 'mongoose';
import UserModel from "../Models/userModel.js";


// Create new post
export const createPost = async (req, res) => {
    const newPost = new postModel(req.body);

    try {
        await newPost.save();
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
}


// get a post
export const getPost = async (req, res) => {
    const id = req.params.id

    try {
        const post = await postModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}


//Update a Post
export const updatePost = async (req, res) => {
    const postId = req.params.id

    const { userId } = req.body

    try {
        const post = await postModel.findById(postId)
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("Post Updated Successfully!")
        } else {
            res.status(403).json("Action forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}



// delete a post
export const deletePost = async (req, res) => {
    const id = req.params.id;

    const { userId } = req.body;

    try {
        const post = await postModel.findById(id);
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted Successfully!")
        } else {
            res.status(403).json("Action forbidden")
        }

    } catch (error) {
        res.status(500).json(error)
    }
}


// Like/Dislike a Post

export const like_dislike_Post = async (req, res) => {
    const id = req.params.id;

    const { userId } = req.body;

    try {
        const post = await postModel.findById(id);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
            res.status(200).json("Post liked.")
        } else {
            await post.updateOne({ $pull: { likes: userId } })
            res.status(200).json("Post unliked.")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


// Get timeline a Posts
// Get personalized timeline (with random fallback)
export const timeline = async (req, res) => {
    const userId = req.params.id;
  
    try {
      // 1. Your own posts
      const ownPosts = await postModel.find({ userId });
  
      // 2. Your followees’ posts
      const followingAgg = await UserModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(userId) } },
        {
          $lookup: {
            from: 'posts',
            localField: 'following',
            foreignField: 'userId',
            as: 'followingPosts'
          }
        },
        { $project: { followingPosts: 1, _id: 0 } }
      ]);
  
      const defaultTimeline = ownPosts
        .concat(...(followingAgg[0]?.followingPosts || []))
        .sort((a, b) => b.createdAt - a.createdAt);
  
      // 3. Signal posts: those you’ve liked or commented on
      const liked     = await postModel.find({ likes: userId });
      const commented = await postModel.find({ 'comments.userId': userId });
      const interestPosts = [...liked, ...commented];
  
      // 4. If no signals → random fallback
      if (followingAgg.length === 0) {
        const randomPosts = await postModel.aggregate([
          { $sample: { size: 20 } }
        ]);
        return res.status(200).json(randomPosts);
      }
  
      // 5. Otherwise → default (chronological) feed
      return res.status(200).json(defaultTimeline);
  
    } catch (error) {
      res.status(500).json(error);
    }
  };
  