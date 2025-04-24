import React, { useState } from 'react';
import './RightSide.css';
import Home from '../../Img/home.png';
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import Noti from '../../Img/noti.png';
// import Chat from '../../Img/Chat.svg';
import TrendCard from '../TrendCard/TrendCard';
import ShareModal from '../ShareModal/ShareModal';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import * as animationData from '../../Img/2T7ivG1lab.json'

const RightSide = () => {

    const [modalOpened, setModalOpened] = useState(false);

    return (
        <div className='RightSide'>
            <div className="navIcons">

                <Link to='../home'>
                    <img src={Home} alt="" />
                </Link>

                {/* <SettingsOutlinedIcon /> */}
                <Link to='../chat/home'>
            <Lottie options={{
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
            
            <TrendCard />

            <div className="button rg-button" onClick={() => setModalOpened(true)}>
                Share
            </div>
            <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />

        </div>
    )
}

export default RightSide
