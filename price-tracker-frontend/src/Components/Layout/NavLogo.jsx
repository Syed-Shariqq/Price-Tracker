import React from 'react'

const NavLogo = () => {
  return (
    <div className='flex items-center justify-center gap-2 shrink-0'>
      
      {/* Logo */}
      <img src="../src/assets/Icon.png" alt="CostTrack" className='w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover' />
      <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold'>CostTrack</h1>

    </div>
  )
}

export default NavLogo