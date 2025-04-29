import React, { useEffect, useState } from 'react';
import './InfoCard.css';
import EditIcon from '@mui/icons-material/Edit';
import ProfileModal from '../ProfileModal/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import * as UserApi from '../../api/UserRequest.js';
import { logOut } from '../../actions/AuthAction';

const InfoCard = () => {

  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState({});

  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId)
        setProfileUser(profileUser);
      }
    }
    fetchProfileUser();
  }, [user]);

  const handleLogOut = () => {
    dispatch(logOut());
  }

  return (
    <div className='InfoCard'>

      <div className="infoHead">
        <h4>Profile Info</h4>

        {user._id === profileUserId ? (
          <div>
            <EditIcon width='2rem' height='1.2rem'
              onClick={() => setModalOpened(true)} />

            <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (" ")}
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button className='button logout-button' onClick={() => navigate("../settings")}>Settings</button>
        <button className='button logout-button' onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  )
}

export default InfoCard