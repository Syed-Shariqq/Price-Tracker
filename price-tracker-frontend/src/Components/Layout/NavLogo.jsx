import React from 'react'
import logo from "../../assets/Icon.png";

const NavLogo = () => {
  return (
    <div className='flex items-center h-8 justify-center gap-2 shrink-0'>
      
      {/* Logo */}
      <img src={logo} alt="CostTrack" className='w-8 h-8 md:w-10 md:h-10 rounded-full object-cover shadow-sm' />
      <h1 className='text-base md:text-lg font-bold text-gray-900'>CostTrack</h1>

    </div>
  )
}

export default NavLogo