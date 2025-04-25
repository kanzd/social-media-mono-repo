import postModel from '../Models/postModel.js';
import mongoose from 'mongoose';
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
export const timeline = async (req, res) => {
    const userId = req.params.id;

    try {
        const currenUserPosts = await postModel.find({ userId: userId });
        const followingUserPosts = await UserModel.aggregate(
            [
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: "posts",
                        localField: "following",
                        foreignField: "userId",
                        as: "followingUserPosts"
                    }
                },
                {
                    $project: {
                        followingUserPosts: 1,
                        _id: 0
                    }
                }
            ]
        )

        res.status(200).json(currenUserPosts.concat(...followingUserPosts[0].followingUserPosts).sort((a, b) => {
            return b.createdAt - a.createdAt;
        })
        );


    } catch (error) {
        res.status(500).json(error)
    }
}