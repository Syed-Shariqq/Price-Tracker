import { Eye, EyeClosed, Lock } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../Api/changePass';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { token } = useParams();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!passwords.newPassword || !passwords.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (passwords.newPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            // reset password API 
             const res = await resetPassword({ token, newPassword: passwords.newPassword });

            if(res.data.status === 200){
                toast.success(res.data.message);
                navigate('/auth?tab=login');
            }else{
                setError(res.data.message || 'Failed to reset password');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen w-full text-black bg-linear-120 from-gray-300 to-blue-100 flex 2xl:justify-center flex-col items-center py-20 justify-start'>
            <div className='bg-white md:w-120 p-5 shadow-2xl flex flex-col items-center justify-center rounded-2xl'>
                <form className='flex gap-10 flex-col items-center justify-center' onSubmit={handleResetPassword}>
                    {/* Header */}
                    <div className='flex gap-1 flex-col items-center justify-center'>
                        <h1 className='font-bold 2xl:text-4xl text-2xl'>Reset Password</h1>
                        <p className='text-gray-600 2xl:text-lg'>Enter your new password below</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className='w-64 md:w-80 2xl:text-md text-red-700 px-4 rounded-lg text-sm text-center'>
                            {error}
                        </div>
                    )}

                    {/* Password Fields */}
                    <div className='flex items-center gap-2 pb-10 border-b-2 border-gray-200 flex-col'>
                        {/* New Password */}
                        <p className='2xl:text-xl font-bold self-start'>New Password</p>
                        <div className='flex px-2 2xl:py-3 2xl:text-lg 2xl:px-6 py-1 border-2 border-gray-200 rounded-lg items-center justify-center gap-2 relative'>
                            <Lock size={20} className='text-gray-600' />
                            <input
                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                className='text-md px-3 py-2 outline-none 2xl:text-lg'
                                placeholder='Enter New Password'
                                type={showNewPassword ? 'text' : 'password'}
                                value={passwords.newPassword}
                            />
                            {showNewPassword ? (
                                <Eye
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className='cursor-pointer text-gray-600 hover:text-gray-800'
                                    size={20}
                                />
                            ) : (
                                <EyeClosed
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className='cursor-pointer text-gray-600 hover:text-gray-800'
                                    size={20}
                                />
                            )}
                        </div>

                        {/* Confirm Password */}
                        <p className='2xl:text-xl font-bold self-start mt-6'>Confirm Password</p>
                        <div className='flex px-2 2xl:py-3 2xl:text-lg 2xl:px-6 py-1 border-2 border-gray-200 rounded-lg items-center justify-center gap-2 relative'>
                            <Lock size={20} className='text-gray-600' />
                            <input
                                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                className='text-md px-3 py-2 outline-none 2xl:text-lg'
                                placeholder='Confirm New Password'
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={passwords.confirmPassword}
                            />
                            {showConfirmPassword ? (
                                <Eye
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className='cursor-pointer text-gray-600 hover:text-gray-800'
                                    size={20}
                                />
                            ) : (
                                <EyeClosed
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className='cursor-pointer text-gray-600 hover:text-gray-800'
                                    size={20}
                                />
                            )}
                        </div>

                        {/* Reset Button */}
                        <button
                            type='submit'
                            disabled={loading}
                            className={`px-4 cursor-pointer w-full mt-6 hover:bg-blue-600 transition-all duration-300 active:scale-95 py-2 2xl:text-lg 2xl:py-3 font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''} bg-blue-500 text-white rounded-lg`}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>

                        {/* Back to Login Link */}
                        <p className='text-sm 2xl:text-lg text-gray-600 font-semibold text-center mt-4'>
                            Remember your password?{' '}
                            <Link className='2xl:text-md text-blue-600 hover:text-blue-700' to='/auth'>
                                Back to Login
                            </Link>
                        </p>
                    </div>

                    {/* Footer Message */}
                    <div className='text-gray-600 2xl:text-lg text-sm text-center'>
                        <p>Your password will be updated securely</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
