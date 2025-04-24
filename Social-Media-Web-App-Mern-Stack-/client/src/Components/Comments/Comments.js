import React, { useEffect, useState } from 'react';
import { getPostComments } from "../../api/CommentRequest";
import Comment from "../Comment/Comment";
import AddComment from '../AddComment/AddComment';
import './Comments.css';

const Comments = ({ postId,setCommentsLength,showComment }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchComments, setFetchComments] = useState(false);

    const handleFetchComments = () => {
        setFetchComments(prev => !prev);
    };


    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                const { data } = await getPostComments(postId);
                setCommentsLength(data.length)
                await setComments(data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postId, fetchComments]);
    if(showComment){
    return (
        <>
            <div className='PostComments'>
                {loading ? "Fetching Comments..." :
                    comments.map((comment) => (
                        <div className='PostComment'>
                        <Comment key={comment._id} comment={comment} />
                        </div>
                    ))
                }
            </div>
            <AddComment postId={postId} handleFetchComments={handleFetchComments} />
        </>
    );
}
};


export default Comments;