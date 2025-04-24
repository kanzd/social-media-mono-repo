import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
          },
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 50,
          },
        isAdmin: {
            type: Boolean,
            default: false
        },
        isOnline: {
            type: Boolean,
            default: false,
          },
          lastSeen: {
            type: Date,
            default: Date.now,
          },
          
        profilePicture: String,
        coverPicture: String,
        about: String,
        livesin: String,
        worksAt: String,
        country: String,
        relationship: String,
        followers: [],
        following: []
    },
    { timestamps: true }
)


const UserModel = mongoose.model("Users", UserSchema);

export default UserModel