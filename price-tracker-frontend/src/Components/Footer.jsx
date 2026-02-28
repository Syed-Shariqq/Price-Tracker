import React from 'react'
import CTA from './CTA'

const Footer = () => {
  return (
    <div className='min-h-9/10 2xl:min-h-[40vh] md:min-h-[70vh] w-full flex flex-col items-center justify-start gap-10'>
          <CTA />
          <div className='min-h-40 w-full flex flex-col items-center justify-center gap-5'>
            <div className='flex items-center justify-center gap-1'>
              <img src="../src/assets/Icon.png" alt="" className='bg-contain lg:w-20 lg:h-20 w-10 h-10 rounded-full' />
              <h1 className='text-xl lg:text-4xl font-bold'>CostTrack</h1>
            </div>
            <div>
              <p className='text-gray-500 text-lg'>© 2026 CostTrack. All rights reserved.</p>
            </div>
            <div>
              <p className='text-lg'>Terms of Service | Privacy Policy | Contact</p>
            </div>
          </div>
         </div>
  )
}

export default Footer