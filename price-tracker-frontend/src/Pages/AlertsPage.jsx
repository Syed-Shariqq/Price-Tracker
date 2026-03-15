import { ArrowUpWideNarrow, MoveRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import EmptyProductsState from '@/Components/Layout/EmptyProductsState'
import { getAlertsOfUser } from '@/Api/alerts'

const AlertsPage = () => {

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      fetchProducts();
    }, []);
  
    const fetchProducts = async () => {
  
      try {
        setLoading(true);
        const res = await getAlertsOfUser();
  
        console.log(res.data.data);
        if (res.data.status === 200) {
          setAlerts(res.data.data);
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

  return (
    <div className='w-full flex flex-col gap-10'>

      {/* Header Section */}
      <div className='flex items-center justify-center flex-col'>
        <h1 className='text-3xl font-bold'>Alerts</h1>
        <h2 className='text-lg text-gray-600'>View and manage Price Drops and increase</h2>
      </div>

      {/* Cards Section */}
      {!alerts.length === 0 ? (
        <EmptyProductsState />
      ) : (
        <div className='flex scrollbar md:max-h-screen overflow-y-auto flex-wrap md:flex-row flex-col items-center justify-start gap-5'>
          {alerts.map((alert, idx) => (
            <div key={idx} className='w-full lg:w-2/5 2xl:w-full hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 md:max-w-xl shadow-xl bg-white rounded-2xl p-4 mx-auto px-6 flex flex-col gap-4'>
              <div>
                <h1 className='lg:text-3xl text-2xl font-bold'>{alert.productName}</h1>
                <h2 className='text-md line-clamp-3 lg:text-lg text-gray-600 '>{alert.description}</h2>
              </div>
              <div className='flex items-center justify-start gap-7'>
                <div className='flex gap-2 bg-green-100 text-green-700 font-bold px-2 py-1 rounded-lg'>
                  <ArrowUpWideNarrow />
                  <h1 className='lg:text-xl text-sm'>{alert.alertType}</h1>
                </div>
                <MoveRight className='w-4 h-4' />
                <h1 className='lg:text-2xl font-extrabold text-md'>{(alert.newPrice*92.16).toFixed(2)}</h1>
              </div>
              <div>
                <p>{alert.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default AlertsPage
