import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true,ref: 'Users'  },
        desc: String,
        likes: [],
        image: String,
        video: String
    },
    {
        timestamps: true,
    }
)

const postModel = mongoose.model("Posts", postSchema);

export default postModel