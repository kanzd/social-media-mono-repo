import React from 'react';
import './Profile.css';
import ProfilePageLeft from '../../Components/ProfilePageLeft/ProfilePageLeft';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import PostSide from '../../Components/PostSide/PostSide';
import RightSide from '../../Components/RightSide/RightSide';
import Home from '../../Img/home.svg';
import animationData from '../../Img/2T7ivG1lab.json'

const Profile = () => {
  return (
    <div className='Profile'>
      <ProfilePageLeft />

      <div className="ProfilePage-Center">
      <div className="navIconsProfile">
        
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
        <ProfileCard location="profilePage" />
        <PostSide type='profile' />
      </div>


      <RightSide />

    </div>
  )
}

export default Profile
