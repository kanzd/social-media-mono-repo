import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        postId: { type: String, required: true },
        commentedBy: { type: String, required: true },
        comment: String,
        likes: [],
    },
    {
        timestamps: true,
    }
)

const commentModel = mongoose.model("Comments", commentSchema);

export default commentModel