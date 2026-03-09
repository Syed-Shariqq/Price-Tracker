import { Mail } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { forgotPassword } from '@/Api/changePass';
import Loader from '@/Components/Common/Loader';
import { toast } from 'react-toastify';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        try {
            e.preventDefault();
            setLoading(true);
            const res = await forgotPassword({ email : email });

            if (res.data.status === 200) {
                toast.success('Reset link sent successfully!');
            }else{
                alert(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }finally{
            setLoading(false);
        }

    }


    return (
        <div className='min-h-screen w-fulltext-black bg-linear-120 from-gray-300 to-blue-100 flex 2xl:justify-center flex-col items-center py-20 justify-start'>
            {loading && <Loader />}
            <div className='bg-white p-5 shadow-2xl flex flex-col items-center justify-center rounded-2xl'>
                <form onSubmit={handleSubmit} className='flex gap-10 flex-col items-center justify-center' action="">
                    <div className='flex gap-1 flex-col items-center justify-center'>
                        <h1 className='font-bold 2xl:text-4xl text-2xl'>Forgot Password</h1>
                        <p className='text-gray-600 2xl:text-lg'>Enter your email to reset your password</p>
                    </div>
                    <div className='flex items-center gap-2 pb-10 border-b-2 border-gray-200 flex-col'>
                        <p className='2xl:text-xl font-bold'>Email Address</p>
                        <div className='flex px-2 2xl:py-3 2xl:text-lg 2xl:px-6 py-1 border-2 border-gray-200 rounded-lg items-center justify-center gap-2'>
                            <Mail />
                            <input
                                onChange={(e) => { setEmail(e.target.value) }}
                                className='text-md px-3 py-2 outline-none'
                                value={email}
                                placeholder='Enter Email Address'
                                type="email"
                                name="email"
                                 />
                        </div>
                        <button className='px-4 cursor-pointer hover:bg-blue-600 transition-all duration-300 py-2 mt-2 w-full 2xl:text-lg bg-blue-500 text-white rounded-lg'>Send Reset Link</button>
                        <p className='text-sm 2xl:text-lg text-gray-600 font-semibold'>Remember your Password? <Link className="2xl:text-md text-blue-600" to="/auth">Back to Login</Link></p>
                    </div>
                    <div className='text-gray-600 2xl:text-lg text-sm'>
                        <p>We will send you a link to reset your password</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword