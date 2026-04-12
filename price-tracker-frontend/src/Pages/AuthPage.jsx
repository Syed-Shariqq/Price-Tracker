import { useEffect, useState } from 'react'
import AuthLeftSection from '@/Features/Auth/AuthLeftSection';
import SignUp from '@/Features/Auth/SignUp';
import Login from '@/Features/Auth/Login';
import { verifyOtp, sendOtp } from '@/Api/auth';
import Loader from '../Components/Common/Loader';
import { useSearchParams } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import icon from '../assets/Icon.png';

const AuthPage = () => {

  const [activeTab, setActiveTab] = useState('signup');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [searchParams] = useSearchParams();

  const [signUpData, setSignUpData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [data, setData] = useState({
    email: signUpData.email,
    otp: ''
  });

  const [logInData, setLogInData] = useState({
    emailOrUsername: '',
    password: ''
  })

  useEffect(() => {

    if (searchParams.get('tab') === 'login') {
      setActiveTab('login');
    }

  }, [searchParams]);

  // Sync email from signUpData to data when OTP screen is shown
  useEffect(() => {
    if (isOtpSent) {
      setData(prev => ({
        ...prev,
        email: signUpData.email
      }));
    }
  }, [isOtpSent, signUpData.email]);


  const handleOtpVerfication = async () => {

    {/* OTP verification logic */ }
    try {
      setOtpError('');
      setLoading(true);
      const res = await verifyOtp({
        email: signUpData.email,
        otp: data.otp
      });

      if (res.data.status === 200) {

        toast.success('OTP verified successfully! Please login');
        setActiveTab('login');
        setIsOtpSent(false);
        setData({ email: '', otp: '' });

      } else {
        setOtpError(res.data.data || 'Failed to verify OTP');
      }

    } catch (err) {


      console.log(err.response?.data);
      const errorMsg = err.response?.data?.message || 'Failed to verify OTP';
      setOtpError(errorMsg);

    } finally {

      setLoading(false);

    }
  }


  const handleResendOtp = async () => {

    if (!signUpData.email) {
      setOtpError('Please enter your email');
      return;
    }

    try {
      setOtpError('');
      setLoading(true);
      const res = await sendOtp({ email: signUpData.email });


      if (res.data.status === 200) {
        toast.success('OTP sent successfully!');
        setIsOtpSent(true);
      } else {
        console.log(res.data);
        setOtpError(res.data.data || 'Failed to send OTP');

      }

    } catch (err) {

      const message =
        err?.response?.data?.message || 'Failed to resend OTP';

      setOtpError(message);

      console.log('Error:', err?.response?.data || err);
    } finally {

      setLoading(false);
    }



  }

  return (
    <div className='min-h-screen overflow-hidden bg-linear-to-br from-blue-200 via-blue-100 to-white px-6 py-5 flex flex-col items-center'>

      {loading && <Loader />}
      {/* Logo */}
      <div className='flex items-center justify-center mb-8'>
        <img src={icon} alt="" className='w-12 h-12 rounded-full' />
        <h1 className='text-2xl font-bold ml-3'>CostTrack</h1>
      </div>

      {/* Auth Section */}
      {isOtpSent ? (
        <div className='min-h-[50vh] flex items-center justify-center'>
          <form className='bg-gray-50 flex flex-col items-center justify-center gap-5 p-5 rounded-lg'
            onSubmit={(e) => {
              e.preventDefault();
              handleOtpVerfication();
            }}>

            {/* Just an OTP input goes here */}
            <p className='text-xl font-bold p-4'>We sent a code to your email.<br /> Please enter it below.</p>
            {otpError && (
              <div className='w-64 md:w-80 2xl:text-lg text-red-700 px-4 rounded-lg text-sm text-center'>
                {otpError}
              </div>
            )}
            <div className='flex bg-white py-2 shadow-2xl rounded-2xl px-4 items-center justify-center gap-5'>
              <input
                value={data.otp}
                onChange={(e) => {
                  setData({ ...data, otp: e.target.value });
                  setOtpError('');
                }}
                className='text-xl px-4 outline-none'
                type="text"
                placeholder="Enter OTP" />
              <button
                className='px-4 py-2 cursor-pointer active:scale-95 hover:bg-blue-700 transition-all duration-300 bg-blue-500 rounded-lg text-white' type="submit">Verify</button>
            </div>
            <h1 className='flex gap-2 font-semibold text-md'>Didn't receive the code?
              <span
                onClick={handleResendOtp}
                className='text-blue-500 hover:text-blue-800 transition-all duration-300 cursor-pointer'>
                Resend Otp
              </span>
            </h1>
            <div
              onClick={() => {
                setIsOtpSent(false);
                setOtpError('');
              }}
              className='flex hover:bg-blue-700 transition-all duration-300 cursor-pointer justify-center text-sm px-3 gap-2 bg-blue-500 py-2 rounded-2xl text-white items-center '>
              <ArrowBigLeft />
              <h1> Back to Sign Up </h1>
            </div>
          </form>
        </div>
      ) : (
        <div className='relative flex items-stretch justify-center gap-0 w-160 md:w-240 2xl:w-[60vw]'>
          <AuthLeftSection />
          <div className='backdrop-blur-sm bg-white/40 rounded-r-3xl border border-white/40 shadow-xl'>
            {activeTab === 'signup' ? (
              <SignUp handleResendOtp={handleResendOtp} loading={loading} setLoading={setLoading} setSignUpData={setSignUpData} signUpData={signUpData} setIsOtpSent={setIsOtpSent} setActiveTab={setActiveTab} activeTab={activeTab} otpError={otpError} setOtpError={setOtpError} />
            ) : (
              <Login loading={loading} setLoading={setLoading} setLogInData={setLogInData} logInData={logInData} setIsOtpSent={setIsOtpSent} setActiveTab={setActiveTab} activeTab={activeTab} />
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default AuthPage