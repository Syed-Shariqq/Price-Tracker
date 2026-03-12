import React, { useState } from 'react'
import DashboardNav from '@/Components/Layout/DashboardNav';
import { scrapeProduct } from '@/Api/productApi';
import Loader from '@/Components/Common/Loader';

const LeftSidePage = ({ error, setError, data, productDetails, setProductDetails, setData, setIsSidebarOpen, isSidebarOpen }) => {

  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false);
  const handleProductDetails = async () => {

    try {
      setLoading(true)

      if(!data.url){
        setError('Please enter URL')
        return
      }
      const res = await scrapeProduct({ url: data.url })
      if (res.data.status === 200) {
        setProductDetails(res.data.data)
        setError('')
      } else {
        console.log(res.data.message)
        setError(res.data.message)
      }

    } catch (err) {
      console.log(err.response.data)
      setError(err.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full bg-blue-50 flex flex-col items-center justify-start gap-10'>

      {loading && (<Loader />)}
      {/* Navigation Bar */}
      <DashboardNav setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />

      <div className='flex w-96/100 flex-col items-center justify-center gap-20'>

        {/* Heading */}
        <h1 className='text-3xl font-bold'>Track Prices Effortlessly</h1>

        {/* Search Bar */}
        <div className=' flex shadow-2xl items-center px-4 bg-white py-1 w-full border-2 border-gray-400/50 rounded-3xl justify-between'>
          <input
            onChange={(e) => {
              setData({ ...data, url: e.target.value })
              console.log(data.url);
            }}
            value={data.url}
            className='md:text-xl md:min-h-16 pr-3 min-h-14 outline-none w-full'
            type="text"
            placeholder='Paste Product Url..'
          />
          <button
            onClick={handleProductDetails}
            className='bg-blue-500 text-nowrap text-white px-6 py-2 md:py-3 md:text-lg rounded-xl hover:bg-blue-600 transition-colors active:scale-95 duration-300'>
            Fetch Price
          </button>
        </div>

        {error && (
          <div className='w-64 md:w-80 2xl:text-lg text-red-700 px-4 rounded-lg text-sm text-center'>
            {error}
          </div>
        )}

        {/* Product Card */}
        {productDetails && (<div className='bg-white w-9/10 2xl:min-h-[40vh] lg:flex-row 2xl:flex-row shadow-2xl flex flex-col items-center justify-center rounded-2xl'>
          <img className='mx-4 my-2 shadow-2xl bg-contain 2xl:w-120 max-w-9/10' src={productDetails.imgUrl} alt="" />

          {/* Product Details */}
          <div className='flex m-15 flex-col justify-center gap-2'>

            <h1 className='md:text-3xl font-semibold'>{productDetails.title}</h1>

            <div className='flex items-center justify-start gap-2'>
              <img className='h-6 w-6 rounded-full' src={`https://www.google.com/s2/favicons?sz=64&domain=${productDetails.website}`} alt="" />
              <p className='md:text-lg'>{productDetails.website}</p>
            </div>

            <h1 className='mt-4 md:text-2xl 2xl:text-4xl font-extrabold'> ₹{(productDetails.price * 92.18).toFixed(2)} </h1>
            <h1 className='md:text-xl 2xl:text-2xl text-gray-500 font-normal line-through '> ₹{(((productDetails.price) - (productDetails.price * 0.19)) * 92.18).toFixed(2)} </h1>
            <span className="bg-green-100 mb-3 w-24 text-green-600 text-sm px-4 py-2 rounded-full font-medium">19% OFF</span>
            <div className='flex items-end'>
              <p className={`md:text-xl ${expanded ? "" : "line-clamp-3"} leading-7 2xl:w-2/3 text-sm text-gray-400`}>{productDetails.description}</p>
              <button
                className="text-blue-500 text-sm md:text-md 2xl:text-lg cursor-pointer"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Show less" : "...more"}
              </button>
            </div>
            <div className='flex my-5 md:text-xl items-center justify-center gap-5'>
              <button className='bg-blue-500 md:py-4 md:px-8 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors active:scale-95 duration-300'>Track Product</button>
              <button
                onClick={() => setProductDetails(null)}
                className='bg-gray-200 md:py-4 md:px-8 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition-colors active:scale-95 duration-300 ml-2'>
                Cancel
              </button>
            </div>

          </div>

        </div>)}

        {/* Stats */}
        <div className='flex mb-10 items-center justify-center gap-10 text-sm'>

          <div className='md:p-10 md:m-5 2xl:p-30 2xl:text-3xl md:text-2xl bg-white shadow-2xl rounded-2xl flex flex-col items-center justify-center p-5'>
            <h1>Total Tracked Products</h1>
            <h1>0</h1>
          </div>

          <div className='md:p-10 md:m-5 2xl:p-30 2xl:text-3xl md:text-2xl bg-white shadow-2xl rounded-2xl flex flex-col items-center justify-center p-5'>
            <h1>Products with Price Drops</h1>
            <h1>0</h1>
          </div>

        </div>

      </div>

    </div>
  )
}

export default LeftSidePage