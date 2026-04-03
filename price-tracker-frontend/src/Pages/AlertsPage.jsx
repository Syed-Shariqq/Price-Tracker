import { ArrowUpWideNarrow, IndianRupee, MoveRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import EmptyProductsState from '@/Components/Layout/EmptyProductsState'
import { getAlertsOfUser } from '@/Api/alerts'
import Loader from '@/Components/Common/Loader'

const AlertsPage = () => {

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr.replace(" ", "T"));

    return date
      .toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      })
      .replace(",", " •");
  };

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

      {loading && (<Loader />)}
      {/* Header Section */}
      <div className='flex items-center justify-center flex-col gap-2'>
        <h1 className='text-2xl font-extrabold tracking-tight text-gray-900'>Alerts</h1>
        <h2 className='text-sm text-gray-500 leading-relaxed'>View and manage Price Drops and increases</h2>
      </div>

      {/* Cards Section */}
      {alerts.length === 0 ? (
        <EmptyProductsState />
      ) : (
        <div className='flex scrollbar md:max-h-screen overflow-y-auto flex-wrap md:flex-row flex-col items-center justify-start gap-5'>
          {alerts.map((alert, idx) => (
            <div key={idx} className='w-full lg:w-2/5 2xl:w-full hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 md:max-w-xl shadow-xl bg-white rounded-2xl p-4 mx-auto px-6 flex flex-col gap-4'>
              <div className='flex-col gap-3 md:flex-row flex md:items-start md:justify-start items-center justify-center'>
                <img className='h-40 bg-cover w-40' src={alert.imgUrl} alt={alert.productName} />
                <div className='flex flex-col gap-2'>
                  <h1 className='text-base font-semibold text-gray-900'>{alert.productName}</h1>
                  <h1 className='text-sm text-gray-500 leading-relaxed'>Price dropped from <span className='text-emerald-600 font-bold'>₹{(alert.oldPrice * 92.16).toFixed(2)}</span> to <span className='text-emerald-600 font-bold'>₹{(alert.newPrice * 92.16).toFixed(2)}</span></h1>
                </div>
              </div>
              <div className='w-full bg-green-100 flex gap-2 p-2 rounded-lg text-green-700 items-center'>
                <ArrowUpWideNarrow className='w-4 h-4' />
                <h1 className='text-xs font-bold uppercase tracking-wide'>{alert.alertType}</h1>
              </div>
              <div className='flex items-center justify-start gap-4'>
                <div className='flex gap-2 font-bold py-1 rounded-lg'>
                  <h1 className='text-base line-through text-gray-400 font-medium'>₹{(alert.oldPrice * 92.16).toFixed(2)}</h1>
                </div>
                <MoveRight className='w-4 h-4 text-gray-400' />
                <h1 className='text-xl font-extrabold tabular-nums text-gray-900'>₹{(alert.newPrice * 92.16).toFixed(2)}</h1>
              </div>
              <div>
                <h1 className='text-sm text-gray-500 font-medium'> Saved : <span className='text-emerald-600 font-bold'>₹{((alert.oldPrice * 92.16) - (alert.newPrice * 92.16)).toFixed(2)}</span></h1>
              </div>
              <div>
                <p className='text-xs font-medium text-gray-400 uppercase tracking-wide'>{formatDate(alert.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default AlertsPage
