import { ArrowUpWideNarrow, MoveRight } from 'lucide-react'
import React from 'react'

const AlertsPage = () => {

  const products = [
    {
      id: 1,
      name: 'Sony Headphones',
      currentPrice: 2999,
      lowestPrice: 2499,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 'stable'
    },
    {
      id: 2,
      name: 'Nike Jordan',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.',
      currentPrice: 15999,
      lowestPrice: 14999,
      imageUrl: 'https://images.unsplash.com/photo-1644426059269-36535c7c00fc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 'stable'
    },
    {
      id: 3,
      name: 'IPhone 13 Pro',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.',
      currentPrice: 39999,
      lowestPrice: 34999,
      imageUrl: 'https://images.unsplash.com/photo-1652721367098-0ecad4cc0370?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 'Price Dropped!'
    },
    {
      id: 4,
      name: 'M2 MacBook Pro',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.',
      currentPrice: 119999,
      lowestPrice: 109999,
      imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 'Increased'
    },
    {
      id: 5,
      name: 'Smart Watch',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.',
      currentPrice: 1999,
      lowestPrice: 2199,
      imageUrl: 'https://images.unsplash.com/photo-1624096104992-9b4fa3a279dd?q=80&w=702&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 'Increased'
    },
    {
      id: 6,
      name: 'Apple iPad',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.',
      currentPrice: 39999,
      lowestPrice: 34999,
      imageUrl: 'https://images.unsplash.com/photo-1666451907573-41a93d07864b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 'stable'
    }
  ]

  return (
    <div className='w-full flex flex-col gap-10'>
      <div className='flex items-center justify-center flex-col'>
        <h1 className='text-3xl font-bold'>Alerts</h1>
        <h2 className='text-lg text-gray-600'>View and manage Price Drops and increase</h2>
      </div>
      <div className='flex scrollbar md:max-h-screen overflow-y-auto flex-wrap md:flex-row flex-col items-center justify-start gap-5'>
        {products.map((product) => (
          <div key={product.id} className='w-full lg:w-2/5 2xl:w-full hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 md:max-w-xl shadow-xl bg-white rounded-2xl p-4 mx-auto px-6 flex flex-col gap-4'>
          <div>
            <h1 className='lg:text-3xl text-2xl font-bold'>{product.name}</h1>
            <h2 className='text-md lg:text-lg text-gray-600 '>{product.description}</h2>
          </div>
          <div className='flex items-center justify-start gap-7'>
            <div className='flex gap-2 bg-green-100 text-green-700 font-bold px-2 py-1 rounded-lg'>
              <ArrowUpWideNarrow />
              <h1 className='lg:text-xl text-sm'>{product.status}</h1>
            </div>
            <MoveRight className='w-4 h-4'/>
            <h1 className='lg:text-2xl font-extrabold text-md'>{product.lowestPrice}</h1>
          </div>
          <div>
            <p>April 20, 2024 at 10:46AM</p>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default AlertsPage
