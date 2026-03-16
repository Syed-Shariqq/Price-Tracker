import React, { useEffect, useState } from 'react'
import Card from '@/Components/Common/Card'
import { getTrackedProductsOfUser } from '../Api/productApi';
import EmptyProductsState from '@/Components/Layout/EmptyProductsState'
import { toast } from 'react-toastify';
import Loader from '@/Components/Common/Loader';

const AnalyticsPage = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {

    try {
      setLoading(true);
      const res = await getTrackedProductsOfUser();

      if (res.data.status === 200) {

        setProducts(res.data.data);
        toast.success(res.data.data);

      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log(err.response.data);
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className='w-full gap-9 flex flex-col items-center justify-center'>

      {loading && ( <Loader />)}
      {/* Header Section */}
      <div className='flex flex-col gap-4 items-center justify-center'>
        <h1 className='2xl:text-5xl md:text-3xl text-xl font-bold'>Analytics </h1>
      </div>

      {/* Cards Section */}
      {products.length === 0 ? (
        <EmptyProductsState />
      ) : (
        <div className='flex scrollbar md:max-h-screen overflow-y-auto flex-wrap md:flex-row flex-col items-center justify-start gap-5'>
          {products.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>
      )}

    </div>
  )
}

export default AnalyticsPage
