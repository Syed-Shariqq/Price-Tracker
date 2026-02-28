import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-28 flex border-b-4 border-black bg-blue-300 items-center lg:py-5 justify-between px-4'>
        <div className='flex items-center justify-center gap-1'>
           <img src="../src/assets/Icon.png" alt="" className='bg-contain lg:w-16 lg:h-16 w-10 h-10 rounded-full' />
           <h1 className='text-xl lg:text-3xl font-bold'>CostTrack</h1>
        </div>
        <div className='text-sm lg:text-xl flex items-center font-semibold justify-center gap-5'>
            <Link to="/auth">
              <button className='active:scale-95 border-none lg:px-10 lg:py-5 text-blue-700 hover:scale-105 hover:text-blue-900 transition-all duration-300 py-2 rounded-4xl'>
                 Log In
              </button>
           </Link>
           <Link to="/auth">
              <button className='active:scale-95 bg-blue-500 lg:px-10 lg:py-4 hover:scale-105 hover:bg-blue-700 transition-all duration-300 text-white py-2 px-4 rounded-4xl'>
               Sign Up
              </button>
           </Link>
          </div>
        </div>
  )
}

export default Navbar