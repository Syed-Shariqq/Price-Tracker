import React from 'react'
import ProductCard from './ProductCard'

const CardsSection = () => {

    const products = [
    {
      id: 1,
      name: 'Sony Headphones',
      currentPrice: 2999,
      targetPrice: 2499,
      imageUrl: 'https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 'Tracking..'
     },
     {
      id: 2,
      name: 'Nike Jordan',
      currentPrice: 15999,
      targetPrice: 14999,
      imageUrl: 'https://images.unsplash.com/photo-1644426059269-36535c7c00fc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 'Tracking..'
     },
     {
      id: 3,
      name: 'IPhone 13 Pro',
      currentPrice: 39999,
      targetPrice: 34999,
      imageUrl: 'https://images.unsplash.com/photo-1652721367098-0ecad4cc0370?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 'Tracking..'
     },
     {
      id: 4,
      name: 'M2 MacBook Pro',
      currentPrice: 119999,
      targetPrice: 109999,
      imageUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 'Tracking..'
     },
     {
      id: 5,
      name: 'Smart Watch',
      currentPrice: 1999,
      targetPrice: 2199,
      imageUrl: 'https://images.unsplash.com/photo-1624096104992-9b4fa3a279dd?q=80&w=702&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 'Notified!'
     },
     {
      id: 6,
      name: 'Apple iPad',
      currentPrice: 39999,
      targetPrice: 34999,
      imageUrl: 'https://images.unsplash.com/photo-1666451907573-41a93d07864b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 'Tracking..'
    }
  ]

  return (
    <div className='min-h-screen md:py-5 md:min-h-2/3 bg-white'>
             <div className='py-10'>
              <h1 className='text-center text-nowrap text-3xl font-semibold'>A Central Hub for All Your <br /> Tracked Products</h1>
             </div>
             <div className='flex flex-col gap-6 md:flex-row flex-wrap justify-center items-center'>
               {products.map((product) => (
                <ProductCard key={product.id} product={product} />
               ))}
             </div>
         </div>
  )
}

export default CardsSection