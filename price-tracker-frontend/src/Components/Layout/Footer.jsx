import React from 'react'
import CTA from "@/Features/Landing/CTA"

const Footer = () => {
  return (
    <div className='w-full flex flex-col items-center justify-start gap-12 md:gap-16 py-12 md:py-16 lg:py-20 px-4'>

      <CTA />

      {/* Footer */}
      <div className='w-full flex flex-col items-center justify-center gap-6 md:gap-8'>

        <div className='flex items-center justify-center gap-2 md:gap-3'>
          <img src="../src/assets/Icon.png" alt="CostTrack" className='w-10 h-10 md:w-14 md:h-14 rounded-full object-cover' />
          <h1 className='text-xl md:text-2xl font-bold'>CostTrack</h1>
        </div>

        <div className='text-center'>
          <p className='text-gray-500 text-sm md:text-base'>© 2026 CostTrack. All rights reserved.</p>
        </div>

        <div className='text-center text-sm md:text-base'>
          <p>Terms of Service | Privacy Policy | Contact</p>
        </div>

      </div>

    </div>
  )
}

export default Footer