import { BellRing, Link, Target } from 'lucide-react'
import React from 'react'

const HowItWorks = () => {
  return (
    <div className='min-h-screen md:min-h-auto py-8 md:py-12 bg-blue-200'>

      {/* Heading */}
      <div className='py-8 md:py-10 px-4'>
        <h1 className='text-center font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>How CostTrack Works</h1>
      </div>

      {/* Cards */}
      <div className='flex flex-col md:flex-row pb-8 md:pb-10 justify-center items-center gap-6 md:gap-8 lg:gap-10 px-4'>

        <div className='flex flex-col border-4 border-blue-300 bg-white rounded-2xl p-6 md:p-8 lg:p-10 gap-4 items-center justify-start w-full sm:max-w-64 md:max-w-xs lg:max-w-sm'>
          <Link className='w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16' />
          <h2 className='text-lg md:text-xl lg:text-2xl font-bold text-center'>Snap Link</h2>
          <p className='text-base md:text-lg lg:text-xl text-center'>Paste any Product URL</p>
        </div>
        
        <div className='flex flex-col border-4 border-blue-300 bg-white rounded-2xl p-6 md:p-8 lg:p-10 gap-4 items-center justify-start w-full sm:max-w-64 md:max-w-xs lg:max-w-sm'>
          <Target className='w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16' />
          <h2 className='text-lg md:text-xl lg:text-2xl font-bold text-center'>Set Target</h2>
          <p className='text-base md:text-lg lg:text-xl text-center'>Set the price you want</p>
        </div>

        <div className='flex flex-col border-4 border-blue-300 bg-white rounded-2xl p-6 md:p-8 lg:p-10 gap-4 items-center justify-start w-full sm:max-w-64 md:max-w-xs lg:max-w-sm'>
          <BellRing className='w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16' />
          <h2 className='text-lg md:text-xl lg:text-2xl font-bold text-center'>Get Notified</h2>
          <p className='text-base md:text-lg lg:text-xl text-wrap text-center'>Price drops, get notified</p>
        </div>

      </div>
      
    </div>
  )
}

export default HowItWorks