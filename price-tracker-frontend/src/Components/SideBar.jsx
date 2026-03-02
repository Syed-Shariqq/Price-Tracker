import React from 'react'
import { Bell, ChartNoAxesCombined, File, LayoutDashboard, Settings, ShoppingBasket, X } from 'lucide-react'
import NavLogo from './NavLogo';

const SideBar = ({ onClose }) => {

    const menuItems = [
                { label: 'DashBoard', icon: LayoutDashboard },
                { label: 'Products', icon: ShoppingBasket },
                { label: 'Alerts', icon: Bell },
                { label: 'Analytics', icon: ChartNoAxesCombined },
                { label: 'Reports', icon: File },
                { label: 'Settings', icon: Settings },
              ];


  return (
    <>
      <div className='py-4 px-4 w-full bg-linear-to-r from-blue-300 to-blue-200 flex items-center justify-between'>
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
      <div className='my-8 px-2 grid text-gray-600 grid-rows-6 items-center justify-start gap-4'>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className='flex xl:text-2xl lg:text-base cursor-pointer hover:bg-blue-300/60 hover:text-blue-700 transition-all duration-200 rounded-lg py-3 px-4 items-center gap-4 font-semibold'
          >
            <item.icon className='w-5 h-5 shrink-0'/>
            <h1>{item.label}</h1>
          </div>
        ))}
      </div>
    </>
  )
}

export default SideBar