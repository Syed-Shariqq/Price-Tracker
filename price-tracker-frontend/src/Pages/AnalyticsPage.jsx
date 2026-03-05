import React from 'react'
import Card from '../Components/Common/Card'

const AnalyticsPage = () => {

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
    <div className='w-full gap-9 flex flex-col items-start justify-center'>

      {/* Header Section */}
      <div className='flex flex-col gap-4 items-center justify-center'>
        <h1 className='2xl:text-5xl md:text-3xl text-xl font-bold'>Analytics </h1>
      </div>

      {/* Cards Section */}
      <div className='flex scrollbar md:max-h-screen overflow-y-auto flex-wrap md:flex-row flex-col items-center justify-start gap-5'>
        {products.map((product, index) => (
          <Card key={index} product={product} />
        ))}
      </div>
        
    </div>
  )
}

export default AnalyticsPage
