import { BellRing, Link, Target } from 'lucide-react'
import React from 'react'

const HowItWorks = () => {
  return (
     <div className='min-h-1/3 pb-5 bg-blue-200'>
          <div className='py-10'>
            <h1 className='text-center whitespace-nowrap font-semibold lg:text-5xl text-3xl '>How CostTrack Works</h1>
          </div>
          <div className='flex-col flex md:flex-row pb-10 justify-center items-center gap-10'>
             <div className='flex-col border-4 border-blue-300 mx-5 xl:min-h-72 xl:w-1/6 bg-white rounded-2xl p-10 gap-3 items-center justify-start'>
              <Link className='min-h-10 xl:min-h-20 xl:max-w-20 w-10'/>
              <h2 className='text-xl font-bold'>Snap Link</h2>
              <p className='text-xl'>Paste any Product URL</p>
             </div>
             <div className='flex-col border-4 border-blue-300 xl:min-h-72 xl:w-1/6 mx-5 bg-white rounded-2xl p-10 gap-3 items-center justify-start'>
              <Target className='min-h-10 xl:min-h-20 xl:max-w-20 w-10'/>
              <h2 className='text-xl xl:text-2xl font-bold'>Set Target</h2>
              <p className='text-xl xl:text-2xl'>Set the price you want</p>
             </div>
             <div className='flex-col border-4 border-blue-300 xl:min-h-72 xl:w-1/6 mx-5 bg-white rounded-2xl p-10 gap-3 items-center justify-start'>
              <BellRing className='min-h-10 xl:min-h-20 xl:max-w-20 w-10'/>
              <h2 className='text-xl font-bold'>Get Notified</h2>
              <p className='text-xl text-wrap'>Price drops, get notified </p>
             </div>
          </div>
         </div>
  )
}

export default HowItWorks