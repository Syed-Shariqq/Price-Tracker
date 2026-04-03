import React, { useEffect, useState } from 'react'
import Card from '@/Components/Common/Card'
import EmptyProductsState from '@/Components/Layout/EmptyProductsState';
import { getTrackedProductsOfUser } from '../Api/productApi';
import Loader from '@/Components/Common/Loader';
import { deleteUserTrackingProduct } from '@/Api/productApi';
import { toast } from 'react-toastify';

const ProductsPage = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {
      setLoading(true);
      const res = await getTrackedProductsOfUser();

      if (res.data.status === 200) {
        setProducts(res.data.data);
        console.log(res.data.data);
      } else {
        console.log(res.data.message);
      }

    } catch (err) {
      console.log(err.response.data);
    } finally {
      setLoading(false);
    }
  }

  const handleStopTracking = async (productId) => {
    try {
      setLoading(true);

      const res = await deleteUserTrackingProduct(productId);

      console.log("API response:", res);

      if (res.status === 200) {
        toast.success(res.data.data);
        setProducts(prev => prev.filter(p => p.id !== productId));
      } else {
        toast.error(res.data.data);
      }


    } catch (err) {
      console.log("ERROR:", err);
      console.log(err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full gap-5 flex flex-col items-center justify-center'>

      {loading && <Loader />}
      {/* Header Section */}
      <div className='flex flex-col gap-4 items-center justify-center'>
        <h1 className='text-2xl font-extrabold tracking-tight text-gray-900'>Tracked Products</h1>
        <h2 className='text-sm text-gray-500 leading-relaxed'>Manage and monitor your tracked products</h2>
      </div>

      {/* Cards Section */}
      {products.length === 0 ? <EmptyProductsState /> : (<div className='flex scrollbar md:max-h-screen overflow-y-auto flex-wrap md:flex-row flex-col items-center justify-start gap-5'>
        {products.map((product, index) => (

          <Card handleStopTracking={handleStopTracking} isProduct={true} showButton={false} key={index} product={product} />

        ))}
      </div>)}

    </div>
  )
}

export default ProductsPage