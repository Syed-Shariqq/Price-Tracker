import { Quote } from 'lucide-react'
import React from 'react'

const Testimonials = () => {
  return (
     <div className='min-h-screen bg-gray-50 py-12 md:py-16 lg:py-20 flex flex-col gap-8 md:gap-10 lg:gap-12 items-center justify-center px-4'>
           <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl text-center font-bold'>Trusted by many Shoppers</h1>
           <div className='flex flex-col w-full sm:max-w-sm md:max-w-md border-b-2 border-gray-300 py-6 md:py-8 items-center justify-center'>
             <Quote className='w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mb-4' />
              <p className='text-base md:text-lg lg:text-xl xl:text-2xl text-center italic py-4 md:py-6'>CostTrack has transformed the way I shop online. It saved me so much money by alerting me to price drops on items I was interested in. Highly recommend!</p>
              <div className='flex gap-3 items-center justify-center mt-4'>
                <img className='rounded-full h-12 w-12 md:h-14 md:w-14 object-cover' src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='John Doe'></img>
                <p className='text-base md:text-lg font-semibold'>John Doe</p>
              </div>
           </div>
           <div className='flex flex-col w-full sm:max-w-sm md:max-w-md border-b-2 border-gray-300 py-6 md:py-8 items-center justify-center'>
             <Quote className='w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mb-4' />
              <p className='text-base md:text-lg lg:text-xl xl:text-2xl text-center italic py-4 md:py-6'>Simple to use and easy to navigate. It has been a game-changer for my online shopping experience.</p>
              <div className='flex gap-3 items-center justify-center mt-4'>
                <img className='rounded-full h-12 w-12 md:h-14 md:w-14 object-cover' src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='Jane Smith'></img>
                <p className='text-base md:text-lg font-semibold'>Jane Smith</p>
              </div>
           </div>
         </div>
  )
}

export default Testimonials