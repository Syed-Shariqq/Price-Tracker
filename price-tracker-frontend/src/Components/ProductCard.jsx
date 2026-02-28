import { IndianRupee } from 'lucide-react'
import React from 'react'

const ProductCard = ({product}) => {
  return (
            <div className='h-100 hover:-translate-y-2 transition-all duration-300 md:max-w-1/3 2xl:h-120 flex-col 2xl:max-w-1/4 flex gap-3 max-w-full mx-5 border border-gray-200 shadow-xl rounded-2xl p-5'>
                  <div className='max-w-full min-h-32 flex gap-7 items-center justify-start'>
                    <img src={product.imageUrl}
                     alt={product.name} className='min-h-16 max-w-16 bg-contain rounded-2xl'/>
                     <p className='text-2xl font-semibold'>{product.name}</p>
                  </div>
                  <div className='flex text-xl flex-col '>
                    <p className='flex'>Current Price:<IndianRupee className='pt-2'/>{product.currentPrice}</p>
                    <p className='flex'>Target Price:<IndianRupee className='pt-2'/>{product.targetPrice}</p>
                    <img src="../src/assets/lines.png" alt="" />
                  </div>
                  <div className='flex items-center text-2xl justify-start'>
                    <div className='bg-green-600 mx-3 h-4 w-4 rounded-full'></div>
                    <p>{product.status}</p>
                  </div>
               </div>
  )
}

export default ProductCard