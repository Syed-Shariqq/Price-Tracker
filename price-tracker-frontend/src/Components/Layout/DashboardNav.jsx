import React from 'react'
import { Bell, Menu, Search } from 'lucide-react';
import { useSearch } from '@/Context/SearchContext';

const DashboardNav = ({ setIsSidebarOpen }) => {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleMenuClick = () => {
    console.log('Menu clicked', setIsSidebarOpen)
    setIsSidebarOpen(prev => !prev)
  }

  return (
    <div className='flex shadow-lg items-center justify-between w-full h-16 px-4 md:px-8 border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-30'>

      {/* Left section (Search Bar) */}
      <div className='relative flex-1 max-w-md hidden sm:block'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
        <input 
          type="text" 
          placeholder='Search tracking products...' 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full bg-gray-50 text-sm outline-none border border-gray-200 h-9 pl-9 pr-4 rounded-md focus:ring-2 focus:ring-blue-100 transition-shadow' 
        />
      </div>

      {/* Right section (Icons) */}
      <div className='flex items-center gap-4 sm:gap-6 ml-auto'>

        <button className='hidden md:block text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors'>
          Fetch Price
        </button>

        <button className='relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors'>
          <Bell className='w-5 h-5' />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 pr-2 rounded-full transition-colors'>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
            U
          </div>
          <span className="hidden md:block text-sm font-medium text-gray-700">User</span>
        </div>

        <button className='xl:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors'>
          <Menu
            onClick={handleMenuClick}
            className='w-5 h-5' />
        </button>

      </div>
    </div>
  )
}

export default DashboardNav
