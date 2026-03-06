import { Bell, ChartNoAxesCombined, File, LayoutDashboard, Settings, ShoppingBasket, SquareArrowRightExit, X } from 'lucide-react'
import NavLogo from '@/Components/Layout/NavLogo';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SideBar = ({ onClose }) => {

  const menuItems = [
    { label: 'DashBoard', icon: LayoutDashboard, path: "/home" },
    { label: 'Products', icon: ShoppingBasket, path: "/products" },
    { label: 'Alerts', icon: Bell, path: "/alerts" },
    { label: 'Analytics', icon: ChartNoAxesCombined, path: "/analytics" },
    { label: 'Settings', icon: Settings, path: "/settings" },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem('token');
    navigate('/auth');
    
  }

  return (
    <>
      <div className='py-4 px-4 w-full bg-linear-to-r from-blue-300 to-blue-200 flex items-center justify-between'>

        {/* Logo */}
        <NavLogo />
        {onClose && (
          <button
            onClick={onClose}
            className='xl:hidden p-2 hover:bg-blue-300/50 rounded-lg transition-colors duration-200'
          >
            <X className='w-6 h-6 text-gray-700' />
          </button>
        )}
      </div>

      {/* Menu Items */}
      <div className='my-8 px-2 grid text-gray-600 grid-rows-6 items-center justify-start gap-4'>
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(item.path);
              if (onClose) onClose();
            }}
            className='flex xl:text-2xl lg:text-base cursor-pointer hover:bg-blue-300/60 hover:text-blue-700 transition-all duration-200 rounded-lg py-3 px-4 items-center gap-4 font-semibold'
          >
            <item.icon className='w-5 h-5 shrink-0' />
            <h1>{item.label}</h1>
          </div>
        ))}
      </div>
     <button 
     onClick={handleLogout}
     className='text-md gap-2 hover:bg-red-600 2xl:px-6 2xl:py-3 font-semibold lg:text-xl px-4 py-2 border-2 border-red-500 ml-5 transition-colors duration-300 active:scale-95 rounded-2xl w-[80%] flex items-center justify-center text-white bg-red-400 cursor-pointer'>
      <SquareArrowRightExit />
      <h1>Logout</h1> 
     </button>
    </>
  )
}

export default SideBar