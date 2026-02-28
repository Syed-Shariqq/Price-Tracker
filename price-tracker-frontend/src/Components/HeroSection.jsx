import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
       <div className='flex-col bg-linear-to-b from-blue-200 to-white xl:flex-row  xl:pb-20 xl:justify-center xl:items-center xl:pt-0 flex gap-10 pt-20 h-[calc(100vh-5rem)]'>
          <div className='xl:px-20 xl:mx-20 flex flex-col gap-7 xl:gap-20 xl:w-2/5'>
            <div className='flex-col items-center justify-center text-nowrap px-10'>
              <h1 className='text-4xl lg:text-7xl font-bold '>Stop Overpaying.</h1>
              <h1 className='text-4xl lg:text-7xl lg:mx-40 font-bold px-20'>Start Tracking.</h1>
             </div>
          <div className='flex-wrap text-xl md:max-w-full md:flex md:flex-col md:items-center xl:text-3xl font-semibold px-15 text-gray-500 items-center justify-center '>
             <p>Monitor product prices and get notified instantly when price drops
              needed. Make informed purchasing decisions and never miss out on a great deal again!
             </p>
          </div>
           <div>
            <div className='flex items-center  font-semibold lg:justify-start lg:px-15 justify-center gap-7 '>
             <Link to="/auth">   
              <button className='active:scale-95 bg-blue-500 lg:px-10 lg:py-5 hover:scale-105 hover:bg-blue-700 transition-all duration-300 text-xl text-white py-3 px-5 rounded-4xl'>
                Start Tracking free
              </button>
              </Link>
              <button className='active:scale-95 text-xl text-blue-500 hover:scale-105 hover:text-blue-700 transition-all duration-300 py-2 px-4 rounded-4xl'>
                Learn More
              </button>
            </div>
          </div>
          </div>
          <div className='my-10 overflow-hidden shadow-2xl shadow-gray-500'>
            <img src="../src/assets/graph.jpeg" alt="" className='w-full h-full object-contain' />
          </div>
        </div>
  )
}

export default HeroSection