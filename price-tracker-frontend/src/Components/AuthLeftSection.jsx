import React from 'react'

const AuthLeftSection = () => {
  return (
    <div className='hidden gap-10 lg:flex flex-col justify-start w-80 md:w-120 2xl:w-[30vw] backdrop-blur-md bg-white/30 rounded-l-3xl p-8 shadow-xl border border-white/40'>  
          <div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
            Unlock Your Savings Potential
          </h2>
          <p className='text-gray-700 font-medium mb-8'>
            Get started in seconds with your free account.
          </p>
          </div>
          <div className='relative mb-8 h-64 gap-10 flex items-center justify-center'>
            <svg className='w-full h-full absolute  inset-0' viewBox='0 0 400 250' preserveAspectRatio='xMidYMid meet'>
              <defs>
                <linearGradient id='grad1' x1='0%' y1='0%' x2='0%' y2='100%'>
                  <stop offset='0%' style={{stopColor: '#ff6b6b', stopOpacity: 0.5}} />
                  <stop offset='100%' style={{stopColor: '#ff6b6b', stopOpacity: 0.05}} />
                </linearGradient>
                <linearGradient id='grad2' x1='0%' y1='0%' x2='0%' y2='100%'>
                  <stop offset='0%' style={{stopColor: '#51cf66', stopOpacity: 0.5}} />
                  <stop offset='100%' style={{stopColor: '#51cf66', stopOpacity: 0.05}} />
                </linearGradient>
                <linearGradient id='grad3' x1='0%' y1='0%' x2='0%' y2='100%'>
                  <stop offset='0%' style={{stopColor: '#748cff', stopOpacity: 0.3}} />
                  <stop offset='100%' style={{stopColor: '#748cff', stopOpacity: 0.02}} />
                </linearGradient>
              </defs>
              <path
                d='M 0,120 Q 50,100 100,120 T 200,120 T 300,120 T 400,120'
                stroke='#ff6b6b'
                strokeWidth='2.5'
                fill='url(#grad1)'
                opacity='0.8'
              />
              <path
                d='M 0,160 Q 50,140 100,160 T 200,160 T 300,160 T 400,160'
                stroke='#51cf66'
                strokeWidth='2.5'
                fill='url(#grad2)'
                opacity='0.8'
              />
              <path
                d='M 0,90 Q 50,70 100,90 T 200,90 T 300,90 T 400,90'
                stroke='#748cff'
                strokeWidth='2'
                fill='url(#grad3)'
                opacity='0.6'
              />
              <g>
                <path d='M 340,140 L 370,100' stroke='#10b981' strokeWidth='2.5' fill='none' />
                <polygon points='370,100 365,110 375,105' fill='#10b981' />
              </g>
            </svg>
            <div className='relative z-10 w-full'>
              <div className='flex justify-between items-center mb-6'>
                <div className='backdrop-blur-sm  bg-white/60 rounded-2xl p-4 flex flex-col items-center justify-center border border-white/40 hover:bg-white/80 transition'>
                  <span className='text-5xl mb-1'>🎧</span>
                  <span className='text-xl font-bold text-gray-700'>Headphones</span>
                </div>
                <div className='flex gap-3'>
                  <button className='backdrop-blur-sm bg-white/60 rounded-full p-3 shadow-lg hover:bg-white/80 transition border border-white/40'>
                    <span className='text-2xl'>🔗</span>
                  </button>
                  <button className='backdrop-blur-sm bg-white/60 rounded-full p-3 shadow-lg hover:bg-white/80 transition border border-white/40'>
                    <span className='text-2xl'>🎯</span>
                  </button>
                  <button className='backdrop-blur-sm bg-white/60 rounded-full p-3 shadow-lg hover:bg-white/80 transition border border-white/40'>
                    <span className='text-2xl'>🔔</span>
                  </button>
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='backdrop-blur-sm bg-white/60 rounded-2xl p-4 flex flex-col items-center justify-center flex-1 border border-white/40 hover:bg-white/80 transition'>
                  <span className='text-5xl mb-1'>📷</span>
                  <span className='text-xl font-bold text-gray-700'>Camera</span>
                </div>
                <div className='backdrop-blur-sm bg-white/60 rounded-2xl p-4 flex flex-col items-center justify-center flex-1 border border-white/40 hover:bg-white/80 transition'>
                  <span className='text-5xl mb-1'>📱</span>
                  <span className='text-xl font-bold text-gray-700'>Gadget</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex gap-6'>
            <div className='flex flex-col items-center text-center flex-1'>
              <div className='text-4xl mb-2'>🔗</div>
              <h4 className='font-bold text-gray-900 text-xl'>Paste URL</h4>
              <p className='text-lg text-gray-600 mt-0.5'>Paste your URL</p>
            </div>
            <div className='flex flex-col items-center text-center flex-1'>
              <div className='text-4xl mb-2'>🎯</div>
              <h4 className='font-bold text-gray-900 text-xl'>Set Target</h4>
              <p className='text-lg text-gray-600 mt-0.5'>Set the price price.</p>
            </div>
            <div className='flex flex-col items-center text-center flex-1'>
              <div className='text-4xl mb-2'>🔔</div>
              <h4 className='font-bold text-gray-900 text-xl'>Get Alerted</h4>
              <p className='text-lg text-gray-600 mt-0.5'>get more, inspired.</p>
            </div>
          </div>
          <p className='text-center text-gray-700 font-semibold text-md mt-6'>
            Trusted by thousands of smart shoppers. Join the movement.
          </p>
        </div>
  )
}

export default AuthLeftSection