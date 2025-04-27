import React, {useEffect, useState} from 'react';
import Home from '../../Img/home.svg';
import './Comment.css';
import Like from '../../Img/like.png';
import Notlike from '../../Img/notlike.png';
import {likeComment} from "../../api/CommentRequest";
import {useSelector} from "react-redux";
import {getUser} from "../../api/UserRequest";


const Comment = ({ comment }) => {
    const serverPublic = 'http://localhost:4000/images/';

    const { user } = useSelector((state) => state.authReducer.authData)
    const [liked, setLiked] = useState(comment.likes.includes(user._id))
    const [likes, setLikes] = useState(comment.likes.length)
    const [commentedBy, setCommentedBy] = useState({})


    useEffect(() => {
        getUser(comment.commentedBy).then(async res => {
            if(res?.data) {
                await setCommentedBy(res.data);
            }
        });
    },[]);

    const handleLike = () => {
        setLiked((prev) => !prev)
        likeComment(comment._id, user._id)
        liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
    }

    return(
        <div className="comment">
            <div style={{display:"flex"}}>
                <img className='commentUserPhoto' src={commentedBy.profilePicture ? serverPublic + commentedBy.profilePicture : serverPublic + "defaultProfile.png"} alt="" />
                <div className="commentDetail">
                    <span> <b>{`${commentedBy?.name}`}</b> </span>
                    <span className='commentText'>{comment.comment}</span>
                </div>
            </div>
            <div className='commentLike'>
                <img src={liked ? Like : Notlike} alt="" style={{ cursor: "pointer", height:"15px", width: "15px" }} onClick={handleLike} />
                {likes > 0 && (<span className='like'>{likes}</span>)}
            </div>

        </div>

    )
}

export default Comment;