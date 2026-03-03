import React from 'react'
import { Bell, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import SideBar from '@/Components/Layout/SideBar';
import LeftSidePage from '@/Components/Layout/LeftSidePage';

const HomePage = () => {

   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='min-h-screen flex'>
      <div className="hidden xl:block w-80  bg-blue-200 sticky top-0 h-screen">
        <SideBar />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => setIsSidebarOpen(false)}/>
      )}

      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-blue-200 z-50 transform transition-transform 
          duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} xl:hidden`}>
        <SideBar onClose={() => setIsSidebarOpen(false)} />
      </div>
        <LeftSidePage setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
    </div>
  )
}

export default HomePage