import React, { useEffect } from 'react'
import './Posts.css';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/PostAction';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import uniqBy from 'lodash/uniqBy';
import orderBy from 'lodash/orderBy';
const Posts = () => {

  const params = useParams();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  let { posts, loading,currentPost } = useSelector((state) => state.postReducer)
  const [page,setPage] = React.useState(1)
  const [refresh,setRefresh] = React.useState(false)
  useEffect(()=>{
    if(refresh){
    dispatch({type:'RESET_POST'})
    // setRefresh(true)
   
    }
    return ()=>{
      dispatch({type:'RESET_POST'})
    }
  },[])
  useEffect(() => {
    dispatch(getTimelinePosts(user._id,0,refresh))
    setRefresh(false)
    return ()=>{
      dispatch({type:'RESET_POST'})
    }
  }, [refresh])
  // useEffect(() => {
  //   if(refresh){
  //   dispatch(getTimelinePosts(user._id,page,refresh))
  //   setRefresh(false)
  //   }
  // }, [refresh])
  const fetchData = (page)=>{
    dispatch(getTimelinePosts(user._id,page))
  }
  if (params.id) {
    posts = orderBy(uniqBy(posts.filter((post) => post.userId === params.id), item => item._id.toString()), item => new Date(item.createdAt), 'desc');
  }else{
    posts=orderBy(uniqBy(posts,item => item._id.toString()), item => new Date(item.createdAt), 'desc');
  }
  console.log(posts)
  return (
    <div id='postScroll' className='Posts'>
      <InfiniteScroll
      scrollableTarget="postScroll"
  dataLength={posts.length} //This is important field to render the next data
  next={()=>{
    fetchData(page)
    console.log(page)
    setPage(page+1)
  }}
  
  hasMore={currentPost.length>0}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Loading More</b>
    </p>
  }
  // below props only if you need pull down functionality
  // refreshFunction={this.refresh}
  refreshFunction={()=>{
    setRefresh(true)
  }}
>
      {
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
            dispatch({ type: "UPDATE_REDUCER", data: temp });
          }} data={post} id={id} />
        })}
</InfiniteScroll>
    </div>
  )
}

export default Posts
