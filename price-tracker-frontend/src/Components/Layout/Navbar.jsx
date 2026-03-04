import React from 'react'
import { Link } from 'react-router-dom'
import NavLogo from '@/Components/Layout/NavLogo'

const Navbar = () => {
  return (
    <div className='flex border-b-4 border-black bg-blue-300 items-center justify-between px-4 py-4 md:py-5 lg:py-6'>

      {/* Logo */}
      <NavLogo />
      <div className='text-xs sm:text-sm md:text-base lg:text-xl flex items-center font-semibold justify-center gap-3 md:gap-5'>

        {/* Login Button */}
        <Link to="/auth">
          <button className='active:scale-95 border-none px-3 md:px-6 lg:px-10 py-2 md:py-3 lg:py-5 text-blue-700 hover:scale-105 hover:text-blue-900 transition-all duration-300 rounded-4xl'>
            Log In
          </button>
        </Link>

        {/* Sign Up Button */}
        <Link to="/auth">
          <button className='active:scale-95 bg-blue-500 px-3 md:px-6 lg:px-10 py-2 md:py-3 lg:py-4 hover:scale-105 hover:bg-blue-700 transition-all duration-300 text-white rounded-4xl'>
            Sign Up
          </button>
        </Link>

      </div>

    </div>
  )
}

export default Navbar