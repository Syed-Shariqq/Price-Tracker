import React, { useState } from 'react'
import SideBar from "@/Components/Layout/SideBar"
import { Outlet } from "react-router-dom"
import DashboardNav from "@/Components/Layout/DashboardNav"

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className='min-h-screen flex'>

      {/* Sidebar for larger screens */}
      <div className="hidden xl:block w-80 bg-blue-200 sticky top-0 h-screen">
        <SideBar />
      </div>


      {/* Sidebar for smaller screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`
                     fixed top-0 left-0 h-screen w-64 bg-blue-200 z-50 transform transition-transform 
                     duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} xl:hidden`}>
        <SideBar onClose={() => setIsSidebarOpen(false)} />
      </div>


      <div className='w-full bg-linear-to-br from-slate-100 to-blue-100 flex flex-col items-start gap-10'>

        {/* Dashboard NavBar */}
        <DashboardNav setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />

        <main className="w-full px-6">
          <Outlet />
        </main>

      </div>
    </div>
  )
}