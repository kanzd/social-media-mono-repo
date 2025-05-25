import mongoose from 'mongoose';
import postModel from '../Models/postModel.js';
import UserModel from "../Models/userModel.js";
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://ybutcjrfzigxxjnxybta.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidXRjanJmemlneHhqbnh5YnRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjU2NzgsImV4cCI6MjA2MTA0MTY3OH0.kleN4UkCxxqmpkhgMhNCUaOMseB5ZFIm88t5IcVNaUM')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// Create new post
export const createPost = async (req, res) => {
    
    let publicUrl = ''
    // console.log(req)
    if (req.file){
        const { data,error } = await supabase.storage.from('hik8').upload(new Date().getTime().toString(), req.file.buffer,{
            contentType: req.file.mimetype, // <- This is the MIME type
          })
        const { data:newData } = supabase.storage.from('hik8').getPublicUrl(data.path);
        publicUrl = newData.publicUrl

        
    }
    // if (req.file){
    //     const { data, error } = await supabase.storage.from('hik8').upload(req.body.vedio.originalname, req.body.vedio.buffer)
    //     req.body.vedio = data.fullPath
    // }
    req.body.type==='image'?req.body.image=publicUrl:req.body.video=publicUrl
    // const { data, error } = await supabase.storage.from('hik8').upload(file.name, file)
    const newPost = new postModel(req.body);
    try {
        await newPost.save();
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
}


// Get a single post
export const getPost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};


// Update a post
export const updatePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json('Post Updated Successfully!');
    } else {
      res.status(403).json('Action forbidden');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


// Delete a post
export const deletePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json('Post deleted Successfully!');
    } else {
      res.status(403).json('Action forbidden');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


// Like/Dislike a post
export const like_dislike_Post = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json('Post liked.');
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json('Post unliked.');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


// Get timeline a Posts
// Get personalized timeline (with random fallback)
export const timeline = async (req, res) => {
    const userId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = (page - 1) * limit;
  
    try {
      // 1. Your own posts
      const ownPosts = await postModel.find({ userId }).populate('userId');
  
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
      ]).populate('userId');;
  
      const followingPosts = followingAgg[0]?.followingPosts || [];
  
      // 3. Posts you've interacted with
      const liked = await postModel.find({ likes: userId });
      const commented = await postModel.find({ 'comments.userId': userId });
      const interestPosts = [...liked, ...commented];
  
      // 4. Combine posts
      let combinedPosts = [...ownPosts, ...followingPosts, ...interestPosts];
  
      // Add random fallback if not enough posts
      if (combinedPosts.length < limit) {
        const randomPosts = await postModel.aggregate([
          { $sample: { size: 20 } }
        ]).populate('userId');;
        combinedPosts = combinedPosts.concat(randomPosts);
      }
  
      // Remove duplicates by post ID
      const uniquePostsMap = new Map();
      combinedPosts.forEach(post => uniquePostsMap.set(post._id.toString(), post));
      const uniquePosts = Array.from(uniquePostsMap.values());
  
      // Shuffle & paginate
      const shuffledPosts = uniquePosts.sort(() => Math.random() - 0.5);
      const paginatedPosts = shuffledPosts.slice(startIndex, startIndex + limit);
  
      res.status(200).json(paginatedPosts);
  
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
