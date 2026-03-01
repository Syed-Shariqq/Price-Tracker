import React from 'react'

const NavLogo = () => {
  return (
       <div className='flex items-center justify-center gap-1'>
           <img src="../src/assets/Icon.png" alt="" className='bg-contain lg:w-16 lg:h-16 w-10 h-10 rounded-full' />
           <h1 className='text-xl lg:text-3xl font-bold'>CostTrack</h1>
        </div>
  )
}

export default NavLogo