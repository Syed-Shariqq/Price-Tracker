import React, { useState } from 'react'
import Card from '@/Components/Common/Card'
import EmptyProductsState from '@/Components/Layout/EmptyProductsState';

const ProductsPage = () => {

  const [products, setProducts] = useState([]);

  return (
    <div className='w-full gap-5 flex flex-col items-center justify-center'>

      {/* Header Section */}
      <div className='flex flex-col gap-4 items-center justify-center'>
        <h1 className='2xl:text-6xl md:text-4xl text-2xl font-bold'>Tracked Products</h1>
        <h2 className='text-gray-500 2xl:text-3xl md:text-2xl text-sm'>Manage and monitor your tracked products</h2>
      </div>

      {/* Cards Section */}
      {products.length === 0 ? <EmptyProductsState/> : (<div className='flex scrollbar md:max-h-screen overflow-y-auto flex-wrap md:flex-row flex-col items-center justify-start gap-5'>
        {products.map((product, index) => (

          <Card isProduct={true} showButton={false} key={index} product={product} />

        ))}
      </div>)}

    </div>
  )
}

export default ProductsPage