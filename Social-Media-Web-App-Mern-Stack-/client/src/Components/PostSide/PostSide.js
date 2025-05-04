import React from 'react'
import './PostSide.css'
import PostShare from '../PostShare/PostShare'
import Posts from '../Posts/Posts'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import { Link } from 'react-router-dom'
import Home from '../../Img/home.svg' // Adjust the path to the correct location of the Home image
import Lottie from 'react-lottie'
import animationData from '../../Img/2T7ivG1lab.json' // Adjust the path to the correct location of the animation JSON file

const PostSide = (props) => {
  return (
    <div className="PostSide">
      {props.type==='home' &&  <div className='ResponsiveView'>
      <div className="navIcons">

<Link to='../home'>
    <img src={Home} alt="" />
</Link>

{/* <SettingsOutlinedIcon /> */}
<Link to='../chat/home'>
<Lottie  options={{

loop: true,
autoplay: true, 
animationData: animationData,
rendererSettings: {
preserveAspectRatio: 'xMidYMid slice'
}
}}
height={40}
width={70}
isStopped={false}
isPaused={false} />
</Link>
{/* <img src={Chat} alt="" /> */}
</div>
 <LogoSearch />
       <ProfileCard location="homepage" />
       </div>}
        <PostShare />
        <Posts />
    </div>
  )
}

export default PostSide
