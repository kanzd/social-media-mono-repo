import React, { useEffect } from 'react'
import './Posts.css';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/PostAction';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
const Posts = () => {

  const params = useParams();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  let { posts, loading,currentPost } = useSelector((state) => state.postReducer)
  const [page,setPage] = React.useState(0)
  const [refresh,setRefresh] = React.useState(false)
  useEffect(()=>{
    dispatch({type:'RESET_POST'})
  },[])
  useEffect(() => {
    dispatch(getTimelinePosts(user._id,page,refresh))
    // setPage(page+1)
    setRefresh(false)
  }, [refresh])
  const fetchData = ()=>{
    dispatch(getTimelinePosts(user._id,page+1))
    console.log(page)
    setPage(page+1)
  }
  if (params.id) {
    posts = posts.filter((post) => post.userId === params.id)
  }
  return (
    <div className='Posts'>
      <InfiniteScroll
  dataLength={posts.length} //This is important field to render the next data
  next={fetchData}
  
  hasMore={currentPost.length>0}
  // endMessage={
  //   <p style={{ textAlign: 'center' }}>
  //     <b>Loading More</b>
  //   </p>
  // }
  // below props only if you need pull down functionality
  // refreshFunction={this.refresh}
  refreshFunction={()=>{
    setRefresh(true)
  }}
  pullDownToRefresh
  pullDownToRefreshThreshold={50}
  pullDownToRefreshContent={
    <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
  }
  releaseToRefreshContent={
    <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
  }
>
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
            dispatch({ type: "UPDATE_REDUCER", data: temp });
          }} data={post} id={id} />
        })}
</InfiniteScroll>
    </div>
  )
}

export default Posts
