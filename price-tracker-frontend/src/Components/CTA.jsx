import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
          <div className='flex flex-col md:flex-row md:justify-between md:items-center w-full gap-6 md:gap-8 mx-auto bg-blue-500 rounded-2xl md:rounded-full p-6 md:p-8 lg:p-10 text-center md:text-left font-semibold max-w-4xl'>
              <p className='text-sm md:text-base lg:text-lg xl:text-2xl text-white'>Ready to make smarter purchases</p>
              <Link to="/auth">
                <button className='active:scale-95 hover:bg-gray-100 transition-all duration-300 hover:scale-105 font-bold text-blue-500 bg-white px-6 md:px-8 lg:px-10 py-2 md:py-3 lg:py-4 text-sm md:text-base lg:text-lg rounded-4xl whitespace-nowrap'>
                  Create free account
                </button>
              </Link>
          </div>
  )
}

export default CTA