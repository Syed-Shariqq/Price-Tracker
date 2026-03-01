import React from 'react'
import NavLogo from '../Components/NavLogo'
import { Bell, ChartNoAxesCombined,File, LayoutDashboard, Menu, Search, Settings, ShoppingBasket } from 'lucide-react'

const HomePage = () => {

            const menuItems = [
                { label: 'DashBoard', icon: LayoutDashboard },
                { label: 'Products', icon: ShoppingBasket },
                { label: 'Alerts', icon: Bell },
                { label: 'Analytics', icon: ChartNoAxesCombined },
                { label: 'Reports', icon: File },
                { label: 'Settings', icon: Settings },
              ];

  return (
    <div className=' min-h-screen flex '>
        <div className='hidden xl:flex max-w-7xl bg-blue-100 flex-col items-center justify-start'>
            <div className='py-2 w-full bg-blue-200'>
                <NavLogo />
            </div>
            <div className='my-10 grid text-gray-500 grid-rows-6 items-center justify-start gap-10'>
                {menuItems.map((item, index) => (
                    <div key={index} className='flex lg:text-xl cursor-pointer hover:bg-blue-200/70 hover:text-blue-600 transition-all duration-300 rounded-2xl py-2 px-5 items-center gap-4 2xl:text-2xl lg:mx-15 2xl:mr-25 font-semibold'>
                        <item.icon className='w-10 h-10 2xl:w-12 2xl:h-12'/>
                        <h1>{item.label}</h1>
                    </div>
                ))}
            </div>
        </div>
        <div className='w-full bg-blue-50 flex flex-col items-center justify-start gap-10'>
           <div className='flex bg-blue-200 items-center justify-between w-full'>
              <div className='relative flex items-center justify-center gap-2 md:w-[50vw] max-w-xl md:min-h-16 min-h-12 rounded-2xl py-2 px-4 '>
                <input type="text" placeholder='Search Products..' className='text-xl md:pr-10 bg-white md:min-h-16 md:w-[50vw] w-full outline-none border-2 border-gray-400/50 min-h-12 pr-8 pl-4 rounded-full'/>
                <Search className='absolute md:top-7 md:right-8 top-5 right-6'/>
              </div>
              <div className='flex md:gap-10 items-center p-3 justify-center gap-5'>
                 <div className='hidden'>
                    <h1>Fetch Price</h1>
                 </div>
                 <div>
                    <Bell className='w-6 md:w-10 md:h-10 text-gray-500 h-6'/>
                 </div>
                 <div className='text-sm md:text-xl text-gray-500'>
                    <h1>User</h1>
                 </div>
                 <div className='xl:hidden  text-gray-500'>
                    <Menu className='h-6 md:w-10 md:h-10 w-6'/>
                 </div>
              </div>
           </div>
           <div className='flex w-96/100 flex-col items-center justify-center gap-20'>
              <h1 className='text-3xl font-bold'>Track Prices Effortlessly</h1>
              <div className='flex shadow-2xl items-center px-4 bg-white py-1 w-full border-2 border-gray-400/50 rounded-3xl justify-between'>
                <input className='md:text-xl md:min-h-16 min-h-14 outline-none w-[50vw]' type="text" placeholder='Paste Product Url..'/>
                <button className='bg-blue-500 text-nowrap text-white px-6 py-2 md:py-3 md:text-lg rounded-xl hover:bg-blue-600 transition-colors duration-300'>Fetch Price</button>
              </div>
              <div className='bg-white 2xl:min-h-[40vh] lg:flex-row 2xl:flex-row shadow-2xl flex flex-col items-center justify-center gap-5 w-full rounded-2xl'>
                 <img className='m-2 2xl:w-1/3 max-w-9/10' src="../src/assets/MacBook.png" alt="" />
                 <div className='flex  m-2 flex-col justify-center gap-3'>
                    <h1 className='md:text-3xl font-semibold'>Apple 2024 MacBook Air 13″ Laptop with M3</h1>
                    <div className='flex items-center justify-start gap-2'>
                        <img className='h-6 w-6 rounded-full' src="https://icon2.cleanpng.com/20180803/ubx/5ba055fe0b3b79a8f55892cc8186c6b6.webp" alt="" />
                        <p className='md:text-lg'>amazon.in</p>
                    </div>
                    <h1 className='md:text-2xl 2xl:text-4xl font-bold'>Current Price : ₹1,24,990 </h1>
                    <h1 className='md:text-xl 2xl:text-2xl line-through text-red-400 font-bold'> ₹1,54,900 </h1>
                    <p className='md:text-xl leading-10 2xl:w-2/3 text-sm text-gray-400'> 34.46 cm (13.6″) Liquid Retina Display, 16GB Unified Memory, 512GB SSD Storage, Backlit Keyboard, 1080p FaceTime HD Camera, Touch ID- Midnight</p>
                    <div className='flex my-5 md:text-xl items-center justify-center gap-5'>
                        <button className='bg-blue-500 md:py-4 md:px-8 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors duration-300'>Track Product</button>
                        <button className='bg-gray-200 md:py-4 md:px-8 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition-colors duration-300 ml-2'>Cancel</button>
                    </div>
                 </div>
              </div>
            <div className='flex mb-10 text-nowrap items-center justify-center gap-10 text-sm'>
              <div className='md:p-10 md:m-5 2xl:p-30 2xl:text-3xl md:text-2xl bg-white shadow-2xl rounded-2xl flex flex-col items-center justify-center p-5'>
                <h1>Total Tracked Products</h1>
                <h1>0</h1>
              </div>
              <div className='md:p-10 md:m-5 2xl:p-30 2xl:text-3xl md:text-2xl bg-white shadow-2xl rounded-2xl flex flex-col items-center justify-center p-5'>
                <h1>Products with Price Drops</h1>
                <h1>0</h1>
              </div>
            </div>
           </div>
        </div>
    </div>
  )
}

export default HomePage