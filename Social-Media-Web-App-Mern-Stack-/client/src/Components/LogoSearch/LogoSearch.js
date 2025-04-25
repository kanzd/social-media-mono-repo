import React from 'react'
import './LogoSearch.css'
import Logo from '../../Img/logo.svg';
import SearchIcon from '@mui/icons-material/Search';

const LogoSearch = () => {
  return (
    <div className='LogoSearch'>

      <img style={{height:'50px'}} src={Logo} alt="" />

      <div className="Search">
        <input type="text" placeholder='#Search' />

        <div className="s-icon">
          <SearchIcon />
        </div>
      </div>

    </div>
  )
}

export default LogoSearch
