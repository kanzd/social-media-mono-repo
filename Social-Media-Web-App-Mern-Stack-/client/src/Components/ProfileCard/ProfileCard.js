import React, { useEffect, useState } from 'react'
import './ProfileCard.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { uniqBy } from 'lodash' 
import * as UserApi from '../../api/UserRequest'; // Adjust the path based on your project structure
import { useLocation } from 'react-router-dom';
import UserFollow from '../UserFollow/UserFollow'; // Adjust the path based on your project structure

const ProfileCard = ({ location }) => {

    const { user } = useSelector((state) => state.authReducer.authData);
    const posts = useSelector((state) => state.postReducer.posts)
    const [userData,setUserData] = useState(user)
    const serverPublic = 'https://ybutcjrfzigxxjnxybta.supabase.co/storage/v1/object/public/hik8/';
    const pathLocation = useLocation()

    useEffect(()=>{
        (async ()=>{
        if(pathLocation.pathname.includes('profile')){
            if(pathLocation.pathname.split('/')[2] !== user._id){
                const currentUserId = pathLocation.pathname.split('/')[2]
                const profileUser = await UserApi.getUser(currentUserId)
                // console.log(profileUser)
                setUserData(profileUser.data)
        }
    }
    })()
    },[pathLocation])
    useEffect(()=>{
        if(pathLocation.pathname.includes('profile') && pathLocation.pathname.split('/')[2] === user._id){
        setUserData(user)
        }
    },[user])
    
    return (
        <div className='ProfileCard'>
            <div className="ProfileImages">
                <img src={userData.coverPicture ?  userData.coverPicture : serverPublic + "defaultCover.jpg"} alt="" />
                <img src={userData.profilePicture ?   userData.profilePicture : serverPublic + "defaultProfile.png"} alt="" />
            </div>

            <div className="ProfileName">
                <span>{userData.name}</span>
                <span>{userData.worksAt ? userData.worksAt : "write about yourself..."}</span>
                {pathLocation.pathname.split('/')[2] !== user._id && <UserFollow person={userData} justButton key={userData._id} />}
            </div>
            
            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>{userData.followers.length}</span>
                        <span className='follow-post'>Followers</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{userData.following.length}</span>
                        <span className='follow-post'>Following</span>
                    </div>

                    {location === "profilePage" && (
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>{uniqBy(posts.filter((post) => post.userId === userData._id),item=>item._id.toString()).length}</span>
                                <span >Posts</span>
                            </div>
                        </>
                    )}

                </div>
                <hr />
            </div>

            {location === "profilePage" ? '' :
                <span className='linkClass'>
                    <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${user._id}`}>My Profile</Link>
                </span>
            }

        </div>
    )
}

export default ProfileCard
