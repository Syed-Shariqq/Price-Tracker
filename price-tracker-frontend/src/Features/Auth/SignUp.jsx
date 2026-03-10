import React, { useState } from 'react'
import { Eye, EyeClosed } from 'lucide-react';
import { signup } from '@/Api/auth';
import { toast } from 'react-toastify';

const SignUp = ({ setActiveTab, setLoading, handleResendOtp, loading, activeTab, setIsOtpSent, signUpData, setSignUpData }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleSignUp = async () => {
    // Handle sign-up logic here
    try {
      setErrorMessage('');
      setLoading(true);
      if (signUpData.password !== signUpData.confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

      await signup(signUpData);
      toast.success("OTP sent successfully!")
      setIsOtpSent(true);
      

    } catch (err) {

      console.log(err.response.data);
      
      // Check if error is due to duplicate email (user already exists but not verified)
      const errorMsg = err.response?.data?.message || 'Sign up failed';
      if (errorMsg.toLowerCase().includes('email') || 
          errorMsg.toLowerCase().includes('already exists') ||
          errorMsg.toLowerCase().includes('duplicate')) {
        setErrorMessage('Email already registered. Please verify your OTP.');
        setIsOtpSent(true);
        // Automatically resend OTP
        setTimeout(() => {
          handleResendOtp();
        }, 500);
      } else {
        setErrorMessage(errorMsg);
      }
    }  finally {

      setLoading(false);

    }

  }

  return (

    <div className=' shadow-2xl bg-white/80  flex items-center justify-center flex-col  m-10 2xl:w-[30vw] rounded-3xl md:w-120 w-80'>

      {/* Sign Up Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
        className='flex flex-col gap-5 items-center justify-center' action="">
        <div className='w-full font-bold text-xl flex items-center justify-evenly gap-3 p-5'>
          <h1
            onClick={() => setActiveTab('signup')}
            className={`tab-item cursor-pointer px-4 py-2 ${activeTab === 'signup' ? 'active' : 'inactive'}`}>Sign Up</h1>
          <h1
            onClick={() => setActiveTab('login')}
            className={`tab-item cursor-pointer px-4 py-2 ${activeTab === 'login' ? 'active' : 'inactive'}`}>Log In</h1>
        </div>
        <div className='flex flex-col  items-center justify-center'>
          <h1 className='text-xl font-bold'>Sign Up Form</h1>
          <p className='font-semibold text-gray-500 text-nowrap text-sm'>Track Prices, Never Overpay Again</p>
        </div>
        {errorMessage && (
          <div className='w-64 md:w-80 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm text-center'>
            {errorMessage}
          </div>
        )}
        <div className='flex flex-col items-center justify-center gap-3'>
          <div className='flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-pen-icon lucide-user-pen"><path d="M11.5 15H7a4 4 0 0 0-4 4v2" /><path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /><circle cx="10" cy="7" r="4" /></svg>
            <input
              onChange={(e) => { 
                setSignUpData({ ...signUpData, username: e.target.value });
                setErrorMessage('');
              }}
              className='w-64 transition-all focus:border-b-2 focus:border-blue-500 2xl:w-100 2xl:text-2xl 2xl:h-16 md:h-12 md:text-xl md:w-80 outline-none border-b-2 border-gray-600 h-10 p-2'
              name='username'
              value={signUpData.username}
              type="text"
              placeholder='Username' />
          </div>
          <div className='flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
            <input
              onChange={(e) => { 
                setSignUpData({ ...signUpData, email: e.target.value });
                setErrorMessage('');
              }}
              className='w-64 transition-all focus:border-b-2 focus:border-blue-500 2xl:w-100 2xl:text-2xl 2xl:h-16 md:h-12 md:text-xl md:w-80 outline-none border-b-2 border-gray-600 h-10 p-2'
              name='email'
              value={signUpData.email}
              type="email"
              placeholder='Email Address' />
          </div>
          <div className='relative flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-lock-icon lucide-user-lock"><path d="M19 16v-2a2 2 0 0 0-4 0v2" /><path d="M9.5 15H7a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><rect x="13" y="16" width="8" height="5" rx=".899" /></svg>
            <input
              onChange={(e) => { 
                setSignUpData({ ...signUpData, password: e.target.value });
                setErrorMessage('');
              }}
              className='w-64 transition-all focus:border-b-2 focus:border-blue-500 2xl:w-100 2xl:text-2xl 2xl:h-16 md:h-12 md:text-xl md:w-80 outline-none border-b-2 border-gray-600 h-10 p-2'
              name='password'
              value={signUpData.password}
              type={showPassword ? 'text' : 'password'}
              placeholder='Password' />
            {showPassword ? (
              <Eye
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute ${showPassword ? 'block' : 'hidden'} cursor-pointer top-2 2xl:top-5 right-2`} />
            ) : (
              <EyeClosed
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute ${showPassword ? 'hidden' : 'block'} cursor-pointer top-2 2xl:top-5 right-2`} />)}
          </div>
          <div className='relative flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-keyhole-icon lucide-lock-keyhole"><circle cx="12" cy="16" r="1" /><rect x="3" y="10" width="18" height="12" rx="2" /><path d="M7 10V7a5 5 0 0 1 10 0v3" /></svg>
            <input
              onChange={(e) => { 
                setSignUpData({ ...signUpData, confirmPassword: e.target.value });
                setErrorMessage('');
              }}
              className='w-64 transition-all focus:border-b-2 focus:border-blue-500 2xl:w-100 2xl:text-2xl 2xl:h-16 md:h-12 md:text-xl md:w-80 outline-none border-b-2 border-gray-600 h-10 p-2'
              name='confirmPassword'
              value={signUpData.confirmPassword}
              type={confirmPassword ? 'text' : 'password'}
              placeholder='Confirm Password' />
            {confirmPassword ? (
              <Eye
                onClick={() => setConfirmPassword(!confirmPassword)}
                className={`absolute ${confirmPassword ? 'block' : 'hidden'} cursor-pointer top-2 2xl:top-5 right-2`} />) : (
              <EyeClosed
                onClick={() => setConfirmPassword(!confirmPassword)}
                className={`absolute ${confirmPassword ? 'hidden' : 'block'} cursor-pointer top-2 2xl:top-5 right-2`} />
            )}
          </div>
          <button
          disabled={loading}
            className={`w-64 hover:bg-blue-700 ${loading ? "cursor-not-allowed opacity-50" : ""} hover:scale-105 transition-all duration-300 active:scale-95 2xl:w-100 2xl:text-2xl 2xl:h-16 md:h-12 md:text-xl cursor-pointer 
            md:w-80 outline-none mt-5 h-10 rounded-full bg-blue-500 text-white font-semibold`}>{loading ? "Creating Account...":"Create My Account"}
          </button>
        </div>
      </form>

      {/* Have an account? Section */}
      <div className='flex my-5 items-center justify-center'>
        <p className='text-sm md:text-md 2xl:text-lg text-gray-500'>Already have an account?
          <span
            onClick={() => setActiveTab('login')}
            className='mx-2 hover:text-blue-900 duration-300 transition-all text-blue-500 font-semibold cursor-pointer'>Log In
          </span>
        </p>
      </div>

      <div className='flex mb-3 flex-col items-center justify-center gap-2'>
        <h1 className='text-sm md:text-md font-semibold text-gray-700'>Already created an account but page reloaded?</h1>
        <button 
        onClick={() => {
          if (!signUpData.email) {
            setErrorMessage('Please enter your email above');
            return;
          }
          setErrorMessage('');
          setIsOtpSent(true);
          handleResendOtp();
        }}
        className='text-white bg-blue-500 hover:bg-blue-700 transition-all duration-300 px-4 py-2 rounded-lg font-semibold cursor-pointer'>
          Verify Email via OTP
        </button>
      </div>

    </div>

  )
}

export default SignUp