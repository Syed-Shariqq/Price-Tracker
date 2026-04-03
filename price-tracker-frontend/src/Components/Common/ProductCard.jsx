import { IndianRupee } from 'lucide-react'
import React from 'react'

const ProductCard = ({ product }) => {
  return (
    <div className='hover:-translate-y-2 transition-all duration-300 flex-col flex gap-3 w-full sm:max-w-72 md:max-w-sm 2xl:max-w-xl border border-gray-200 shadow-xl rounded-2xl p-4 md:p-5 h-auto'>

      {/* Product Details */}
      <div className='w-full min-h-24 flex gap-4 md:gap-6 items-start justify-start'>
        <img src={product.imageUrl}
          alt={product.name} className='h-16 w-16 md:h-20 md:w-20 object-cover rounded-lg shrink-0' />
        <p className='text-base font-semibold text-gray-900 line-clamp-2'>{product.name}</p>
      </div>

      {/* Prices */}
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <span className='text-xs font-medium text-gray-400 uppercase tracking-wide'>Current Price:</span>
          <span className='flex items-center text-xl font-extrabold tabular-nums text-gray-900'>
            <IndianRupee className='w-4 h-4' />{product.currentPrice}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-xs font-medium text-gray-400 uppercase tracking-wide'>Target Price:</span>
          <span className='flex items-center text-xl font-extrabold tabular-nums text-gray-900'>
            <IndianRupee className='w-4 h-4' />{product.targetPrice}
          </span>
        </div>
        <img src="../src/assets/lines.png" alt="" className='w-full mt-2' />
      </div>

      {/* Status */}
      <div className='flex items-center text-sm font-medium text-gray-900 justify-start gap-2 mt-2'>
        <div className='bg-green-600 h-3 w-3 rounded-full shrink-0'></div>
        <p>{product.status}</p>
      </div>
      
    </div>
  )
}

export default ProductCard