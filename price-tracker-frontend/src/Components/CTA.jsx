import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
          <div className='md:flex 2xl:w-2/3 md:justify-between md:p-8 2xl:text-3xl md:rounded-full md:text-2xl md:items-center  h-full gap-7 mx-5 w-full bg-blue-500 rounded-2xl p-5 text-center text-lg font-semibold'>
              <p className='text-md text-white'>Ready to make smarter purchases</p>
              <Link to="/auth">
                <button className='active:scale-95 hover:bg-gray-100 transition-all duration-300 hover:scale-105 font-bold md:text-xl text-blue-500 bg-white lg:px-10 lg:py-4 py-2 px-4 rounded-4xl mt-3'>
                  Create free account
                </button>
              </Link>
          </div>
  )
}

export default CTA