import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://ybutcjrfzigxxjnxybta.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidXRjanJmemlneHhqbnh5YnRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0NjU2NzgsImV4cCI6MjA2MTA0MTY3OH0.kleN4UkCxxqmpkhgMhNCUaOMseB5ZFIm88t5IcVNaUM')

// get All users
export const getAllUsers = async (req, res) => {

    try {
        let users = await UserModel.find();

        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc;
            return otherDetails;
        })

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json(error);
    }
}



// get a user
export const getUser = async (req, res) => {
    const id = req.params.id;

    try {

        const user = await UserModel.findById(id);

        if (user) {
            const { password, ...otherDetails } = user._doc
            res.status(200).json(otherDetails)
        } else {
            res.status(404).json("Please, Try again it is invaild user!")
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
}


//Update a user

export const updateUser = async (req, res) => {
    const id = req.params.id;
    // console.log(req.files)
    const { _id, password } = req.body;

    if (id === _id) {

        if (password) {
            const salt = await bcrypt.genSalt(10);
            let pass = password.toString();
            req.body.password = await bcrypt.hash(pass, salt)
        }

        try {
            if (req.files.profilePicture && req.files.profilePicture[0]){
                const { data,error } = await supabase.storage.from('hik8').upload(new Date().getTime().toString(), req.files.profilePicture[0].buffer,{
                    contentType: req.files.profilePicture[0].mimetype, // <- This is the MIME type
                  })
                  console.log(error)
                const { data:newData } = supabase.storage.from('hik8').getPublicUrl(data.path);
                // console.log(newData,'newdata')
                req.body.profilePicture = newData.publicUrl
                // publicUrl = newData.publicUrl
        
                
            }
            if (req.files.coverPicture && req.files.coverPicture[0]){
                const { data,error } = await supabase.storage.from('hik8').upload(new Date().getTime().toString(), req.files.coverPicture[0].buffer,{
                    contentType: req.files.coverPicture[0].mimetype, // <- This is the MIME type
                  })
                console.log(error)
                const { data:newData } = supabase.storage.from('hik8').getPublicUrl(data.path);
                // console.log(newData)
                req.body.coverPicture = newData.publicUrl
                // publicUrl = newData.publicUrl
        
                
            }
            console.log(id,req.body)
            const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

            const token = jwt.sign(
                { user:{id: user._id} },
                'my-default-dev-secret'
            );

            res.status(200).json({ user, token })
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("Access Denied! You can only update your own profile")
    }
}



// Delete a User

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    const { _id, currentUserAdminStatus } = req.body;

    if (_id === id || currentUserAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id);
            res.status(200).json("User deleted successfully")
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("Access Denied! You can only update your own profile")
    }
}



// Follow a User

export const followUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;

    if (_id === id) {
        res.status(403).json("Action forbidden")
    } else {
        try {

            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(_id);

            if (!followUser.followers.includes(_id)) {
                await followUser.updateOne({ $push: { followers: _id } })
                await followingUser.updateOne({ $push: { following: id } })

                res.status(200).json("User Followed!")
            } else {
                res.status(403).json("User is Already followed by you")
            }

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}



// UnFollow a User

export const UnFollowUser = async (req, res) => {
    const id = req.params.id;

    const { _id } = req.body;

    if (_id === id) {
        res.status(403).json("Action forbidden")
    } else {
        try {

            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(_id);

            if (followUser.followers.includes(_id)) {
                await followUser.updateOne({ $pull: { followers: _id } })
                await followingUser.updateOne({ $pull: { following: id } })

                res.status(200).json("User Unfollowed!")
            } else {
                res.status(403).json("User is not followed by you")
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }
}
