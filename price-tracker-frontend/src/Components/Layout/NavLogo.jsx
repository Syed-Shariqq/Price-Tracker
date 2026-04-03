import React from 'react'

const NavLogo = () => {
  return (
    <div className='flex items-center justify-center gap-2 shrink-0'>
      
      {/* Logo */}
      <img src="../src/assets/Icon.png" alt="CostTrack" className='w-8 h-8 md:w-10 md:h-10 rounded-full object-cover shadow-sm' />
      <h1 className='text-base md:text-lg font-bold text-gray-900'>CostTrack</h1>

    </div>
  )
}

export default NavLogo