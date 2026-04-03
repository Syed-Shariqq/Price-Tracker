import React from 'react'
import { Link } from 'react-router-dom'
import NavLogo from '@/Components/Layout/NavLogo'

const Navbar = () => {
  return (
    <div className='flex border-b border-gray-200 bg-white items-center justify-between px-4 sm:px-6 lg:px-8 h-16'>

      {/* Logo */}
      <NavLogo />
      <div className='flex items-center gap-3 md:gap-4'>

        {/* Login Button */}
        <Link to="/auth?tab=login">
          <button className='text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2'>
            Log In
          </button>
        </Link>

        {/* Sign Up Button */}
        <Link to="/auth?tab=signup">
          <button className='text-sm font-medium bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white px-4 py-2 rounded-md shadow-sm'>
            Sign Up
          </button>
        </Link>

      </div>

    </div>
  )
}

export default Navbar