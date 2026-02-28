import React, { useState } from 'react'
import SignUp from '../Components/SignUp'
import Login from '../Components/Login'

const AuthPage = () => {

    const [activeTab, setActiveTab] = useState('signup');

  return (
    <div className='min-h-screen flex flex-col items-center  bg-blue-200'>
       <div className='flex items-center justify-center h-30 max-w-full'>
        <img src="../src/assets/Icon.png" alt="" className='w-16 h-16 rounded-full'/>
        <h1 className='text-2xl font-bold'>CostTrack</h1>
       </div>
       {activeTab === 'signup' ? (
         <SignUp setActiveTab={setActiveTab} activeTab={activeTab}/>
       ):(
         <Login setActiveTab={setActiveTab} activeTab={activeTab}/>
       )}
       
    </div>
  )
}

export default AuthPage