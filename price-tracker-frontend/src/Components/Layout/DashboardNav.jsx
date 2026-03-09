import React from 'react'
import { Bell, Menu, Search } from 'lucide-react';

const DashboardNav = ({ setIsSidebarOpen }) => {
  const handleMenuClick = () => {
    console.log('Menu clicked', setIsSidebarOpen)
    setIsSidebarOpen(prev => !prev)
  }

  return (
    <div className='flex items-center justify-between w-full'>

      {/* Search Bar */}
      <div className='relative flex items-center justify-center gap-2 md:w-[50vw] max-w-xl md:min-h-16 min-h-12 rounded-2xl py-2 px-4 '>
        <input type="text" placeholder='Search Products..' className='text-sm md:text-lg 2xl:text-xl md:pr-10 bg-white md:min-h-16 md:w-[50vw] w-full outline-none border-2 border-gray-400/50 min-h-12 pr-8 pl-4 rounded-full' />
        <Search className='absolute md:top-7 md:right-8 top-5 right-6' />
      </div>

      {/* Icons */}
      <div className='flex md:gap-10 items-center p-3 justify-center gap-5'>

        <div className='hidden xl:text-xl px-4 transition-all duration-300 py-2 rounded-full hover:bg-blue-400/40 xl:flex'>
          <h1>Fetch Price</h1>
        </div>

        <div className='px-4 transition-all duration-300 py-2 rounded-full hover:bg-blue-400/40'>
          <Bell className='w-6 md:w-8 md:h-8 text-gray-500 h-6' />
        </div>

        <div className='text-sm md:text-xl text-gray-500'>
          <h1>User</h1>
        </div>

        <div className='xl:hidden text-gray-500 cursor-pointer'>
          <Menu
            onClick={handleMenuClick}
            className='h-6 md:w-10 md:h-10 w-6' />
        </div>

      </div>

      
    </div>
  )
}

export default DashboardNav