import { Bell, ChartNoAxesCombined, LayoutDashboard, Settings, ShoppingBasket, SquareArrowRightExit, X } from 'lucide-react'
import NavLogo from '@/Components/Layout/NavLogo';
import { useNavigate } from 'react-router-dom';

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
    <div className='flex xl:fixed flex-col h-full bg-blue-100'>
      <div className='py-4 shadow-lg px-4 w-full border-b border-blue-200 flex items-center justify-between'>

        {/* Logo */}
        <NavLogo />
        {onClose && (
          <button
            onClick={onClose}
            className='xl:hidden p-2 hover:bg-blue-100 rounded-lg transition-colors duration-200'
          >
            <X className='w-5 h-5 text-gray-700' />
          </button>
        )}
      </div>

      {/* Menu Items */}
      <div className='flex-1 flex flex-col py-6 px-4 text-gray-600 gap-2'>
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(item.path);
              if (onClose) onClose();
            }}
            className='flex text-sm cursor-pointer hover:bg-blue-200 hover:text-blue-700 transition-all duration-200 rounded-md py-2.5 px-3 items-center gap-3 font-medium'
          >
            <item.icon className='w-4 h-4 shrink-0' />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
     <div className='p-4 border-t border-blue-100 mt-auto'>
       <button 
       onClick={handleLogout}
       className='text-sm gap-2 hover:bg-red-50 font-semibold px-4 py-2 border border-red-200 transition-colors duration-300 active:scale-95 rounded-md w-full flex items-center justify-center text-red-600 hover:text-red-700 bg-white cursor-pointer'>
        <SquareArrowRightExit className='w-4 h-4' />
        <span>Logout</span> 
       </button>
     </div>
    </div>
  )
}

export default SideBar