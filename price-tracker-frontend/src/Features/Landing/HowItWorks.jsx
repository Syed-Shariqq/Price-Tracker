import { BellRing, Link, Target } from 'lucide-react'
import React from 'react'

const HowItWorks = () => {
  return (
    <div className='min-h-screen md:min-h-auto py-8 md:py-12 bg-blue-200'>

      {/* Heading */}
      <div className='py-8 md:py-10 px-4'>
        <h1 className='text-center text-xl font-bold text-gray-800'>How CostTrack Works</h1>
      </div>

      {/* Cards */}
      <div className='flex flex-col md:flex-row pb-8 md:pb-10 justify-center items-center gap-6 md:gap-8 lg:gap-10 px-4'>

        <div className='flex flex-col border-4 border-blue-300 bg-white rounded-2xl p-6 md:p-8 lg:p-10 gap-4 items-center justify-start w-full sm:max-w-64 md:max-w-xs lg:max-w-sm'>
          <Link className='w-10 h-10 text-gray-400' />
          <h2 className='text-base font-semibold text-gray-900 text-center'>Snap Link</h2>
          <p className='text-sm text-gray-500 leading-relaxed text-center'>Paste any Product URL</p>
        </div>

        <div className='flex flex-col border-4 border-blue-300 bg-white rounded-2xl p-6 md:p-8 lg:p-10 gap-4 items-center justify-start w-full sm:max-w-64 md:max-w-xs lg:max-w-sm'>
          <Target className='w-10 h-10 text-gray-400' />
          <h2 className='text-base font-semibold text-gray-900 text-center'>Set Target</h2>
          <p className='text-sm text-gray-500 leading-relaxed text-center'>Set the price you want</p>
        </div>

        <div className='flex flex-col border-4 border-blue-300 bg-white rounded-2xl p-6 md:p-8 lg:p-10 gap-4 items-center justify-start w-full sm:max-w-64 md:max-w-xs lg:max-w-sm'>
          <BellRing className='w-10 h-10 text-gray-400' />
          <h2 className='text-base font-semibold text-gray-900 text-center'>Get Notified</h2>
          <p className='text-sm text-gray-500 leading-relaxed text-wrap text-center'>Price drops, get notified</p>
        </div>

      </div>

    </div>
  )
}

export default HowItWorks