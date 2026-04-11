import React from 'react'
import { Link } from 'react-router-dom'
import graph from "../../assets/graph.jpeg";

const HeroSection = () => {
  return (
    <div className='flex flex-col bg-linear-to-b from-blue-50 to-white lg:flex-row lg:pb-20 lg:justify-center lg:items-center lg:pt-0 gap-6 md:gap-10 pt-10 md:pt-20 lg:min-h-[calc(100vh-6rem)] px-4 sm:px-6'>

      {/* Middle Section */}
      <div className='lg:px-8 xl:px-20 flex flex-col lg:h-auto gap-5 md:gap-7 lg:gap-10 xl:gap-20 lg:w-1/2 flex-1'>

        {/* Heading */}
        <div className='flex flex-col items-center lg:items-start justify-center'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 text-center lg:text-left'>Stop Overpaying.</h1>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mt-2 text-center lg:text-left'>Start Tracking.</h1>
        </div>

        {/* Paragraph */}
        <div className='text-sm text-gray-500 leading-relaxed text-center lg:text-left'>
          <p>Monitor product prices and get notified instantly when price drops. Make informed purchasing decisions and never miss out on a great deal again!</p>
        </div>

        {/* Buttons */}
        <div>
          <div className='flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4 md:gap-6 font-semibold'>
            <Link to="/auth">
              <button className='active:scale-95 cursor-pointer bg-blue-500 px-6 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 text-base md:text-md hover:scale-105 hover:bg-blue-700 transition-all duration-300 text-white rounded-4xl whitespace-nowrap'>
                Start Tracking free
              </button>
            </Link>
            <button className='active:scale-95 cursor-pointer text-base md:text-md text-blue-500 px-6 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 hover:scale-105 hover:text-blue-700 transition-all duration-300 rounded-4xl whitespace-nowrap'>
              Learn More
            </button>
          </div>
        </div>

      </div>

      {/* Graph */}
      <div className='my-8 md:my-10 lg:my-0 overflow-hidden shadow-lg shadow-gray-300 w-full lg:w-1/2 max-h-96 md:max-h-full'>
          <img src={graph} alt="Graph showing price trends" className='w-full h-full object-cover' />
        </div>

    </div>
  )
}

export default HeroSection