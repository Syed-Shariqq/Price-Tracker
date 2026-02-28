import { Quote } from 'lucide-react'
import React from 'react'

const Testimonials = () => {
  return (
     <div className='min-h-screen bg-gray-50 md:min-h-2/3 lg:min-h-2/3 flex md:justify-start md:my-10 md:h-1/2 flex-col gap-10 items-center justify-center'>
           <h1 className='text-4xl md:text-6xl 2xl:text-7xl text-center font-bold'>Trusted by many Shoppers</h1>
           <div className='flex flex-col md:w-1/3 border-b-2 border-gray-300 m-3 items-center justify-center'>
             <h1 className='min-h-20 max-w-20'><Quote className='min-h-20 max-w-20' /></h1>
              <p className='text-lg p-5 md:text-2xl text-center italic'>CostTrack has transformed the way I shop online. It saved me so much money by alerting me to price drops on items I was interested in. Highly recommend!</p>
              <div className='flex h-20 gap-3 max-w-16 items-center justify-center'>
                <img className='rounded-full bg-contain' src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=''></img>
                <p className='text-xl text-nowrap font-semibold'>John Doe</p>
              </div>
           </div>
           <div className='flex flex-col md:w-1/3 border-b-2 border-gray-300 m-3 items-center justify-center'>
             <h1 className='min-h-20 max-w-20'><Quote className='min-h-20 max-w-20' /></h1>
              <p className='text-lg p-5 md:text-2xl text-center italic'>Simple to use and easy to navigate. It has been a game-changer for my online shopping experience.</p>
              <div className='flex h-20 gap-3 max-w-16 items-center justify-center'>
                <img className='rounded-full bg-contain h-16 w-16' src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=''></img>
                <p className='text-xl text-nowrap font-semibold'>Jane Smith</p>
              </div>
           </div>
         </div>
  )
}

export default Testimonials