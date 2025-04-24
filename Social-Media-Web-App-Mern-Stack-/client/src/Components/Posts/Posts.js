import React, { useEffect } from 'react'
import './Posts.css';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/PostAction';
import { useParams } from 'react-router-dom';

const Posts = () => {

  const params = useParams();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  let { posts, loading } = useSelector((state) => state.postReducer)

  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  }, [])
  console.log(posts)

  if (params.id) {
    posts = posts.filter((post) => post.userId === params.id)
  }
  return (
    <div className='Posts'>

      {loading ? "Fetching Posts..." :
        posts.map((post, id) => {
          return <Post onUpdate={()=>{
            const temp = JSON.parse(JSON.stringify(posts))
            if(!temp[id].likes.includes(user._id)){
            temp[id].likes.push(user._id)
            }
            else{
              const index = temp[id].likes.indexOf(user._id);
              if (index !== -1) {
                temp[id].likes.splice(index, 1); // removes 1 item at 'index'
              }
              
            }
            dispatch({ type: "RETRIEVING_SUCCESS", data: temp });
          }} data={post} id={id} />
        })}

    </div>
  )
}

export default Posts
