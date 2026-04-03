import { IndianRupee } from 'lucide-react'
import React from 'react'

const ProductCard = ({ product }) => {
  return (
    <div className='bg-white rounded-2xl border border-gray-100 shadow-md p-4 hover:-translate-y-1 hover:shadow-xl hover:border-blue-100 transition-all duration-300 ease-out flex flex-col gap-3 w-full sm:max-w-72 md:max-w-sm 2xl:max-w-xl h-auto'>

      {/* Product Details */}
      <div className='w-full flex gap-3 items-start justify-start'>
        <img src={product.imageUrl}
          alt={product.name} className='h-12 w-12 object-cover rounded-md shrink-0' />
        <p className='text-sm mt-0.5 font-semibold text-gray-900 line-clamp-2 leading-tight'>{product.name}</p>
      </div>

      {/* Prices */}
      <div className='flex flex-col gap-1 pt-1'>
        <div className='flex items-center justify-between'>
          <span className='text-xs font-medium text-gray-400 uppercase tracking-wide'>Current Price:</span>
          <span className='flex items-center text-base font-extrabold tabular-nums text-gray-900'>
            <IndianRupee className='w-3 h-3' />{product.currentPrice}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-xs font-medium text-gray-400 uppercase tracking-wide'>Target Price:</span>
          <span className='flex items-center text-base font-extrabold tabular-nums text-gray-900'>
            <IndianRupee className='w-3 h-3' />{product.targetPrice}
          </span>
        </div>
      </div>

      <img src="../src/assets/lines.png" alt="" className='w-full opacity-60 mt-1 mb-1 hidden' />

      {/* Status */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
            <div className='bg-green-500 h-2 w-2 rounded-full shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.6)]'></div>
            <p className='text-xs font-semibold uppercase tracking-wide text-gray-600'>{product.status}</p>
        </div>
      </div>
      
      
    </div>
  )
}

export default ProductCard