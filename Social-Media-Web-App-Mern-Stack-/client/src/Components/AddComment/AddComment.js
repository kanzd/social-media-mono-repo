import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { addComment } from "../../api/CommentRequest";
import "./AddComment.css"

const AddComment = ({ postId, handleFetchComments }) => {
    const [commentText, setCommentText] = useState('');
    const { user } = useSelector((state) => state.authReducer.authData);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (commentText.trim()) {
            addComment(postId, user._id, commentText);
            setCommentText('');
            handleFetchComments();
        }
    };

    return (
        <div className="AddComment">
            <form onSubmit={handleSubmit}>
                <div className="CommentSection">
                <input
                    className="Input"
                    type="text"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                />
                    <button className="button Submit" type="submit">Add Comment</button>

                </div>
            </form>
        </div>
    );
};

export default AddComment;