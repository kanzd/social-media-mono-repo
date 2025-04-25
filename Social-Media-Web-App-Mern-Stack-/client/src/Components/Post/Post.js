import React, { useEffect, useState } from 'react';
import './Post.css';
import Comment from '../../Img/comment.png';
import Share from '../../Img/share.png';
import Like from '../../Img/like.png';
import Notlike from '../../Img/notlike.png';
import { useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequest';
import { getPostComments } from "../../api/CommentRequest";
import Comments from '../Comments/Comments'; // Adjust the path based on your project structure


const Post = ({ data,id,onUpdate }) => {

  const { user } = useSelector((state) => state.authReducer.authData)
  const [likes, setLikes] = useState(data.likes.length)
  const [showComment, setShowComment] = useState(false);

  const [commentsLength,setCommentsLength] = useState(0)
  const handleLike = () => {
    onUpdate()
    likePost(data._id, user._id)
    !data.likes.includes(user._id) ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }
  const handleComment = () => {
    setShowComment(prev => !prev);
}
  useEffect(()=>{
    setLikes(data.likes.length)
  },[data])
  return (
    <div className='Post' key={id}>
<div className="detail">
        <span> <b>{data.name}</b> </span>
        <span>{data.desc}</span>
      </div>
      
      <img src={data.image ? data.image : " "} alt="" />
      {data.video && (
                <video controls>
                    <source src={data.video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
            <span style={{ color: "var(--gray)", textAlign:'justify' }}>{likes} likes {commentsLength} comments</span>
      <div className="postReact">
        <img src={data.likes.includes(user._id) ? Like : Notlike} alt="" style={{ cursor: "pointer" }} onClick={handleLike} />
        <img src={Comment} alt="" onClick={handleComment}/>
        <img src={Share} alt="" />
      </div>

     

      <div>
                <Comments showComment={showComment} setCommentsLength={setCommentsLength} postId={data._id} />
            </div>

    </div>
  )
}

export default Post
