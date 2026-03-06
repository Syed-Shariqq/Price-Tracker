import React, { useState } from 'react'
import AuthLeftSection from '@/Features/Auth/AuthLeftSection';
import SignUp from '@/Features/Auth/SignUp';
import Login from '@/Features/Auth/Login';

const AuthPage = () => {

  const [activeTab, setActiveTab] = useState('signup');
  const [isOtpSent, setIsOtpSent] = useState(false);

  return (
    <div className='min-h-screen bg-linear-to-br from-blue-200 via-blue-100 to-white px-6 py-10 flex flex-col items-center'>

      {/* Logo */}
      <div className='flex items-center justify-center mb-8'>
        <img src="../src/assets/Icon.png" alt="" className='w-12 h-12 rounded-full' />
        <h1 className='text-2xl font-bold ml-3'>CostTrack</h1>
      </div>

      {/* Auth Section */}
      {isOtpSent ? (
        <div className='min-h-[50vh] flex items-center justify-center'>
          <form
            onSubmit={(e) => { e.preventDefault() }}>
            {/* Just an OTP input goes here */}
            <p className='text-xl font-bold p-4'>We sent a code to your email.<br /> Please enter it below.</p>
            <div className='flex bg-white py-2 shadow-2xl rounded-2xl px-4 items-center justify-center gap-5'>
              <input className='text-xl px-4 outline-none' type="text" placeholder="Enter OTP" />
              <button 
              onClick={() => {setIsOtpSent(false); setActiveTab('login')}}
              className='px-4 py-2 active:scale-95 hover:bg-blue-700 transition-all duration-300 bg-blue-500 rounded-lg text-white' type="submit">Verify</button>
            </div>
          </form>
        </div>
      ) : (
        <div className='relative flex items-stretch justify-center gap-0 w-160 md:w-240 2xl:w-[60vw]'>
          <AuthLeftSection />
          <div className='backdrop-blur-sm bg-white/40 rounded-r-3xl border border-white/40 shadow-xl'>
            {activeTab === 'signup' ? (
              <SignUp setIsOtpSent={setIsOtpSent} setActiveTab={setActiveTab} activeTab={activeTab} />
            ) : (
              <Login setIsOtpSent={setIsOtpSent} setActiveTab={setActiveTab} activeTab={activeTab} />
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default AuthPage