import React from 'react'
import './LogoSearch.css'
import Logo from '../../Img/logo.svg';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const LogoSearch = () => {
  const navigator = useNavigate();
  return (
    <div className='LogoSearch'>

      <img  style={{height:'50px',cursor:'pointer'}} onClick={()=>{
navigator('/home')
      }} src={Logo} alt="" />

      <div className="Search">
        <input type="text" placeholder='#Search' />

        <div className="s-icon">
          <SearchIcon color='transparent' />
        </div>
      </div>

    </div>
  )
}

export default LogoSearch
