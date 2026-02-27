import { BadgeEuro, BellRing, IndianRupee, Link, Quote, Target } from 'lucide-react'
import React from 'react'

const App = () => {
  return (
   <>
    <div className='min-h-full bg-linear-to-b overflow-hidden from-blue-100 to-white text-black text-5xl '>
      <div className='h-28 flex border-b-4 border-black bg-blue-200 items-center lg:py-5 justify-between px-4'>
        <div className='flex items-center justify-center gap-1'>
           <img src="../src/assets/Icon.png" alt="" className='bg-contain lg:w-16 lg:h-16 w-10 h-10 rounded-full' />
           <h1 className='text-xl lg:text-3xl font-bold'>CostTrack</h1>
        </div>
        <div className='text-sm lg:text-xl flex items-center font-semibold justify-center gap-5'>
           <button className='active:scale-95 border-none lg:px-10 lg:py-5 text-blue-700 hover:scale-105 hover:text-blue-900 transition-all duration-300 py-2 rounded-4xl'>
            Log In
           </button>
           <button className='active:scale-95 bg-blue-500 lg:px-10 lg:py-4 hover:scale-105 hover:bg-blue-700 transition-all duration-300 text-white py-2 px-4 rounded-4xl'>
            Sign Up
           </button>
          </div>
        </div>
        <div className='flex-col xl:flex-row  xl:pb-20 xl:justify-center xl:items-center xl:pt-0 flex gap-10 pt-20 h-[calc(100vh-5rem)]'>
          <div className='xl:px-20 xl:mx-20 flex flex-col gap-7 xl:gap-20 xl:w-2/5'>
            <div className='flex-col items-center justify-center text-nowrap px-10'>
            <h1 className='text-4xl lg:text-7xl font-bold '>Stop Overpaying.</h1>
            <h1 className='text-4xl lg:text-7xl lg:mx-40 font-bold px-20'>Start Tracking.</h1>
          </div>
          <div className='flex-wrap text-xl md:max-w-full md:flex md:flex-col md:items-center xl:text-3xl font-semibold px-15 text-gray-500 items-center justify-center '>
             <p>Monitor product prices and get notified instantly when price drops
              needed. Make informed purchasing decisions and never miss out on a great deal again!
             </p>
          </div>
          <div>
            <div className='flex items-center  font-semibold lg:justify-start lg:px-15 justify-center gap-7 '>
              <button className='active:scale-95 bg-blue-500 lg:px-10 lg:py-5 hover:scale-105 hover:bg-blue-700 transition-all duration-300 text-xl text-white py-3 px-5 rounded-4xl'>
                Start Tracking free
              </button>
              <button className='active:scale-95 text-xl text-blue-500 hover:scale-105 hover:text-blue-700 transition-all duration-300 py-2 px-4 rounded-4xl'>
                Learn More
              </button>
            </div>
          </div>
          </div>
          <div className='my-10 overflow-hidden shadow-2xl shadow-gray-500'>
            <img src="../src/assets/graph.jpeg" alt="" className='w-full h-full object-contain' />
          </div>
        </div>
         <div className='min-h-1/3 pb-5 bg-blue-200'>
          <div className='py-10'>
            <h1 className='text-center whitespace-nowrap font-semibold lg:text-5xl text-3xl '>How CostTrack Works</h1>
          </div>
          <div className='flex-col flex md:flex-row pb-10 justify-center items-center gap-10'>
             <div className='flex-col border-4 border-blue-300 mx-5 xl:min-h-72 xl:w-1/6 bg-white rounded-2xl p-10 gap-3 items-center justify-start'>
              <Link className='min-h-10 xl:min-h-20 xl:max-w-20 w-10'/>
              <h2 className='text-xl font-bold'>Snap Link</h2>
              <p className='text-xl'>Paste any Product URL</p>
             </div>
             <div className='flex-col border-4 border-blue-300 xl:min-h-72 xl:w-1/6 mx-5 bg-white rounded-2xl p-10 gap-3 items-center justify-start'>
              <Target className='min-h-10 xl:min-h-20 xl:max-w-20 w-10'/>
              <h2 className='text-xl xl:text-2xl font-bold'>Set Target</h2>
              <p className='text-xl xl:text-2xl'>Set the price you want</p>
             </div>
             <div className='flex-col border-4 border-blue-300 xl:min-h-72 xl:w-1/6 mx-5 bg-white rounded-2xl p-10 gap-3 items-center justify-start'>
              <BellRing className='min-h-10 xl:min-h-20 xl:max-w-20 w-10'/>
              <h2 className='text-xl font-bold'>Get Notified</h2>
              <p className='text-xl text-wrap'>Price drops, get notified </p>
             </div>
          </div>
         </div>
         <div className='min-h-screen md:py-5 md:min-h-2/3 bg-gray-100'>
             <div className='py-10'>
              <h1 className='text-center text-nowrap text-3xl font-semibold'>A Central Hub for All Your <br /> Tracked Products</h1>
             </div>
             <div className='flex flex-col gap-6 md:flex-row flex-wrap justify-center items-center'>
                <div className='h-100 md:max-w-1/3 2xl:h-120 flex-col 2xl:max-w-1/4 flex gap-3 max-w-full mx-5 shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-2xl p-5'>
                  <div className='max-w-full min-h-32 flex gap-7 items-center justify-start'>
                    <img src="https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                     alt="" className='min-h-16 max-w-16 bg-contain rounded-2xl'/>
                     <p className='text-2xl font-semibold'>Sony Headphones</p>
                  </div>
                  <div className='flex text-xl flex-col '>
                    <p className='flex'>Current Price:<IndianRupee className='pt-2'/>2,999</p>
                    <p className='flex'>Target Price:<IndianRupee className='pt-2'/>2,499</p>
                    <img src="../src/assets/lines.png" alt="" />
                  </div>
                  <div className='flex items-center text-2xl justify-start'>
                    <div className='bg-green-600 mx-3 h-4 w-4 rounded-full'></div>
                    <p>Tracking..</p>
                  </div>
               </div>
               <div className='h-100 md:max-w-1/3 2xl:h-120 flex-col flex 2xl:max-w-1/4 gap-3 max-w-full mx-5 shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-2xl p-5'>
                  <div className='max-w-full min-h-32 flex gap-7 items-center justify-start'>
                    <img src="https://images.unsplash.com/photo-1644426059269-36535c7c00fc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='min-h-16 max-w-16 bg-contain rounded-2xl'/>
                     <p className='text-2xl font-semibold'>Nike Jorden</p>
                  </div>
                  <div className='flex text-xl flex-col gap-1'>
                    <p className='flex'>Current Price:<IndianRupee className='pt-2'/>15,999</p>
                    <p className='flex'>Target Price:<IndianRupee className='pt-2'/>14,999</p>
                    <img src="../src/assets/lines.png" alt="" />
                  </div>
                  <div className='flex items-center text-2xl justify-start'>
                    <div className='bg-green-600 mx-3 h-4 w-4 rounded-full'></div>
                    <p>Tracking..</p>
                  </div>
               </div>
               <div className='h-100 md:max-w-1/3 2xl:h-120 flex-col 2xl:max-w-1/4 flex gap-3 max-w-full mx-5 shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-2xl p-5'>
                  <div className='max-w-full min-h-32 flex gap-7 items-center justify-start'>
                    <img src="https://images.unsplash.com/photo-1652721367098-0ecad4cc0370?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"    alt="" className='min-h-16 max-w-16 bg-contain rounded-2xl'/>
                     <p className='text-2xl font-semibold'>Iphone 13 Pro</p>
                  </div>
                  <div className='flex text-xl flex-col gap-1'>
                    <p className='flex'>Current Price:<IndianRupee className='pt-2'/>39,999</p>
                    <p className='flex'>Target Price:<IndianRupee className='pt-2'/>34,999</p>
                    <img src="../src/assets/lines.png" alt="" />
                  </div>
                  <div className='flex items-center text-2xl justify-start'>
                    <div className='bg-green-600 mx-3 h-4 w-4 rounded-full'></div>
                    <p>Tracking..</p>
                  </div>
               </div>
               <div className='h-100 md:max-w-1/3 2xl:h-120 flex-col 2xl:max-w-1/4 flex gap-3 max-w-full mx-5 shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-2xl p-5'>
                  <div className='max-w-full min-h-32 flex gap-7 items-center justify-start'>
                    <img src="https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='min-h-16 max-w-16 bg-contain rounded-2xl'/>
                     <p className='text-2xl font-semibold'>MacBook 2 Pro</p>
                  </div>
                  <div className='flex text-xl flex-col gap-1'>
                    <p className='flex'>Current Price:<IndianRupee className='pt-2'/>1,19,999</p>
                    <p className='flex'>Target Price:<IndianRupee className='pt-2'/>1,09,999</p>
                    <img src="../src/assets/lines.png" alt="" />
                  </div>
                  <div className='flex items-center text-2xl justify-start'>
                    <div className='bg-green-600 mx-3 h-4 w-4 rounded-full'></div>
                    <p>Tracking..</p>
                  </div>
               </div>
               <div className='h-100 md:max-w-1/3 2xl:h-120 flex-col 2xl:max-w-1/4 flex gap-3 max-w-full mx-5 shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-2xl p-5'>
                  <div className='max-w-full min-h-32 flex gap-7 items-center justify-start'>
                    <img src="https://images.unsplash.com/photo-1624096104992-9b4fa3a279dd?q=80&w=702&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='min-h-16 max-w-16 bg-contain rounded-2xl'/>
                     <p className='text-2xl font-semibold'>Smart Watch</p>
                  </div>
                  <div className='flex text-xl flex-col gap-1'>
                    <p className='flex'>Current Price:<IndianRupee className='pt-2'/>1,999</p>
                    <p className='flex'>Target Price:<IndianRupee className='pt-2'/>2,199</p>
                    <img src="../src/assets/lines.png" alt="" />
                  </div>
                  <div className='flex items-center text-2xl justify-start'>
                    <div className='bg-green-600 mx-3 h-4 w-4 rounded-full'></div>
                    <p>Notified!</p>
                  </div>
               </div>
               <div className='h-100 md:max-w-1/3 2xl:h-120 flex-col 2xl:max-w-1/4 flex gap-3 max-w-full mx-5 shadow-[0_0_20px_rgba(0,0,0,0.2)] rounded-2xl p-5'>
                  <div className='max-w-full min-h-32 flex gap-7 items-center justify-start'>
                    <img src="https://images.unsplash.com/photo-1666451907573-41a93d07864b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"alt="" className='min-h-16 max-w-16 bg-contain rounded-2xl'/>
                     <p className='text-2xl font-semibold'>Apple iPad</p>
                  </div>
                  <div className='flex text-xl flex-col gap-1'>
                    <p className='flex'>Current Price:<IndianRupee className='pt-2'/>39,999</p>
                    <p className='flex'>Target Price:<IndianRupee className='pt-2'/>34,999</p>
                    <img src="../src/assets/lines.png" alt="" />
                  </div>
                  <div className='flex items-center text-2xl justify-start'>
                    <div className='bg-green-600 mx-3 h-4 w-4 rounded-full'></div>
                    <p>Tracking..</p>
                  </div>
               </div>
             </div>
         </div>
         <div className='min-h-screen md:min-h-2/3 lg:min-h-2/3 flex md:justify-start md:my-10 md:h-1/2 flex-col gap-10 items-center justify-center'>
           <h1 className='text-4xl md:text-6xl 2xl:text-7xl text-center font-bold'>Trusted by many Shoppers</h1>
           <div className='flex flex-col md:w-1/3 border-b-2 border-gray-300 m-3 items-center justify-center'>
             <h1 className='min-h-20 max-w-20'><Quote className='min-h-20 max-w-20' /></h1>
              <p className='text-lg p-5 md:text-2xl text-center italic'>CostTrack has transformed the way I shop online. It saved me so much money by alerting me to price drops on items I was interested in. Highly recommend!</p>
              <div className='flex h-20 gap-3 max-w-16 items-center justify-center'>
                <img className='rounded-full bg-contain' src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=''></img>
                <p className='text-xl text-nowrap font-semibold'>John Doe</p>
              </div>
           </div>
           <div className='flex flex-col md:w-1/3 border-b-2 border-gray-300 m-3 items-center justify-center'>
             <h1 className='min-h-20 max-w-20'><Quote className='min-h-20 max-w-20' /></h1>
              <p className='text-lg p-5 md:text-2xl text-center italic'>Simple to use and easy to navigate. It has been a game-changer for my online shopping experience.</p>
              <div className='flex h-20 gap-3 max-w-16 items-center justify-center'>
                <img className='rounded-full bg-contain h-16 w-16' src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=''></img>
                <p className='text-xl text-nowrap font-semibold'>Jane Smith</p>
              </div>
           </div>
         </div>
         <div className='min-h-9/10 2xl:min-h-[40vh] md:min-h-[70vh] w-full flex flex-col items-center justify-start gap-10'>
          <div className='md:flex 2xl:w-2/3 md:justify-between md:p-8 2xl:text-3xl md:rounded-full md:text-2xl md:items-center  h-full gap-7 mx-5 w-full bg-blue-500 rounded-2xl p-5 text-center text-lg font-semibold'>
              <p className='text-md text-white'>Ready to make smarter purchases</p>
              <button className='active:scale-95 hover:bg-gray-100 transition-all duration-300 hover:scale-105 font-bold md:text-xl text-blue-500 bg-white lg:px-10 lg:py-4 py-2 px-4 rounded-4xl mt-3'>
                Create free account
              </button>
          </div>
          <div className='min-h-40 w-full flex flex-col items-center justify-center gap-5'>
            <div className='flex items-center justify-center gap-1'>
              <img src="../src/assets/Icon.png" alt="" className='bg-contain lg:w-20 lg:h-20 w-10 h-10 rounded-full' />
              <h1 className='text-xl lg:text-4xl font-bold'>CostTrack</h1>
            </div>
            <div>
              <p className='text-gray-500 text-lg'>© 2026 CostTrack. All rights reserved.</p>
            </div>
            <div>
              <p className='text-lg'>Terms of Service | Privacy Policy | Contact</p>
            </div>
          </div>
         </div>
       </div>
      </>
    
  )
}

export default App