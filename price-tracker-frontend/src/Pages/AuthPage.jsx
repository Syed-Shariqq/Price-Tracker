import React, { useState } from 'react'
import SignUp from '../Components/SignUp'
import Login from '../Components/Login'
import AuthLeftSection from '../Components/AuthLeftSection';

const AuthPage = () => {

    const [activeTab, setActiveTab] = useState('signup');

  return (
    <div className='min-h-screen bg-linear-to-br from-blue-200 via-blue-100 to-white px-6 py-10 flex flex-col items-center'>
      <div className='flex items-center justify-center mb-8'>
        <img src="../src/assets/Icon.png" alt="" className='w-12 h-12 rounded-full'/>
        <h1 className='text-2xl font-bold ml-3'>CostTrack</h1>
      </div>
      <div className='relative flex items-stretch justify-center gap-0 w-160 md:w-240 2xl:w-[60vw]'>
        <AuthLeftSection />
        <div className='backdrop-blur-sm bg-white/40 rounded-r-3xl border border-white/40 shadow-xl'>
          {activeTab === 'signup' ? (
            <SignUp setActiveTab={setActiveTab} activeTab={activeTab}/>
          ):(
            <Login setActiveTab={setActiveTab} activeTab={activeTab}/>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthPage