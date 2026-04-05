import React, { useState } from 'react'
import SideBar from "@/Components/Layout/SideBar"
import { Outlet } from "react-router-dom"
import DashboardNav from "@/Components/Layout/DashboardNav"

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className='min-h-dvh flex bg-gray-50 overflow-x-hidden w-full'>

      {/* Sidebar for larger screens */}
      <div className="hidden xl:block w-42 sticky top-0 h-screen border-r border-gray-200">
        <SideBar />
      </div>


      {/* Sidebar for smaller screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`
                     fixed top-0 left-0 h-screen w-64 bg-white z-50 transform transition-transform 
                     duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} xl:hidden shadow-2xl`}>
        <SideBar onClose={() => setIsSidebarOpen(false)} />
      </div>


      <div className='flex-1 flex flex-col min-h-screen w-full xl:w-[calc(100%-13rem)] bg-linear-to-br from-slate-50 to-blue-50'>

        {/* Dashboard NavBar */}
        <DashboardNav setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />

        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex-1">
          <Outlet />
        </main>

      </div>
    </div>
  )
}