import React, { useEffect, useState } from 'react';
import './Post.css';
import Comment from '../../Img/comment.png';
import Share from '../../Img/share.png';
import Like from '../../Img/like.png';
import Notlike from '../../Img/notlike.png';
import WhatsAppLogo from '../../Img/whatsapp.png';
import InstagramLogo from '../../Img/Instagram.png';
import TelegramLogo from '../../Img/telegram.png';
import XLogo from '../../Img/xlogo.png';
import CopyLogo from '../../Img/copy.svg';
import { useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequest';
import { getPostComments } from "../../api/CommentRequest";
import toast from 'react-hot-toast';
import Comments from '../Comments/Comments';

const Post = ({ data, id, onUpdate }) => {

  const { user } = useSelector((state) => state.authReducer.authData)
  const [likes, setLikes] = useState(data.likes.length)
  const [showComment, setShowComment] = useState(false);
  const [commentsLength, setCommentsLength] = useState(0)
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const handleLike = () => {
    onUpdate();
    likePost(data._id, user._id);
    !data.likes.includes(user._id)
      ? setLikes((prev) => prev - 1)
      : setLikes((prev) => prev + 1);
  }
  
  const handleComment = () => {
    setShowShareOptions(false);
    setShowComment(prev => !prev);
  }

  const handleShare = () => {
    setShowComment(false);
    let mediaLink = "";
    if(data.image) {
      mediaLink = data.image;
    } else if(data.video) {
      mediaLink = data.video;
    }
    if(!mediaLink){
      return toast.error("No media available to share!");
    }
    // Check for mobile view (using a width threshold)
    if(window.innerWidth < 768) {
      // Toggle modal if it's already open
      if(showShareOptions) {
        return setShowShareOptions(false);
      }
      setShareLink(mediaLink);
      setShowShareOptions(true);
    } else {
      navigator.clipboard.writeText(mediaLink)
        .then(() => toast.success("Media link copied to clipboard!"))
        .catch((err) => toast.error("Failed to copy link: " + err));
    }
  }

  useEffect(() => {
    setLikes(data.likes.length)
  }, [data])

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
      <span style={{ color: "var(--gray)", textAlign:'justify' }}>
        {likes} likes {commentsLength} comments
      </span>
      <div className="postReact">
        <img src={data.likes.includes(user._id) ? Like : Notlike} alt="" style={{ cursor: "pointer" }} onClick={handleLike} />
        <img src={Comment} alt="" onClick={handleComment}/>
        <img src={Share} alt="" onClick={handleShare}/>
      </div>

      <div>
        <Comments showComment={showComment} setCommentsLength={setCommentsLength} postId={data._id} />
      </div>

      {showShareOptions && (
        <div className="shareOptionsModal">
          <div className="shareOptionsContent">
            <button style={{ marginRight: '20px' }} onClick={() => {
              window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareLink)}`, '_blank');
              setShowShareOptions(false);
            }}>
              <img src={WhatsAppLogo} alt="WhatsApp" style={{ width: '30px', height: '30px' }} />
            </button>
            {/* <button style={{ marginRight: '20px' }} onClick={() => {
              window.open(`https://www.instagram.com/`, '_blank');
              setShowShareOptions(false);
            }}>
              <img src={InstagramLogo} alt="Instagram" style={{ width: '30px', height: '30px' }} />
            </button> */}
            <button style={{ marginRight: '20px' }} onClick={() => {
              window.open(`https://twitter.com/intent/tweet?text=${shareLink}`, '_blank');
              setShowShareOptions(false);
            }}>
              <img src={XLogo} alt="X" style={{ width: '30px', height: '30px' }} />
            </button>
            <button style={{ marginRight: '20px' }} onClick={() => {
              window.open(`https://t.me/share/url?url=${shareLink}`, '_blank');
              setShowShareOptions(false);
            }}>
              <img src={TelegramLogo} alt="Telegram" style={{ width: '30px', height: '30px' }} />
            </button>
            <button style={{ marginRight: '20px' }} onClick={() => {
              navigator.clipboard.writeText(shareLink)
                .then(() => {
                  toast.success("Link copied to clipboard!");
                })
                .catch((err) => toast.error("Failed to copy link: " + err));
            }}>
              <img src={CopyLogo} alt="Copy" style={{ width: '30px', height: '30px' }} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Post