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
        <div className='flex scrollbar md:max-h-screen overflow-y-auto flex-wrap md:flex-row flex-col items-center justify-start gap-4'>
          {alerts.map((alert, idx) => (
            <div key={idx} className='w-full sm:max-w-md 2xl:max-w-xl bg-white rounded-2xl shadow-md border border-gray-100 border-l-4 border-l-emerald-500 p-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col gap-3'>
              
              <div className='flex gap-4 items-start justify-start'>
                <img className='h-16 w-16 object-cover rounded-lg shrink-0' src={alert.imgUrl} alt={alert.productName} />
                <div className='flex flex-col gap-1'>
                  <h1 className='text-sm mt-0.5 font-semibold text-gray-900 line-clamp-2 leading-tight'>{alert.productName}</h1>
                  <p className='text-xs font-medium text-gray-400 uppercase tracking-wide'>{formatDate(alert.createdAt)}</p>
                </div>
              </div>
              
              <div className='w-full bg-gray-50 flex gap-2 px-3 py-2 rounded-lg text-gray-700 items-center border border-gray-100'>
                <ArrowUpWideNarrow className='w-4 h-4 text-emerald-600' />
                <h1 className='text-xs font-bold uppercase tracking-wide'>{alert.alertType}</h1>
              </div>

              <div className='flex items-center justify-between mt-1'>
                <div className='flex items-center gap-3'>
                  <h1 className='text-sm line-through text-gray-400 font-medium'>₹{(alert.oldPrice * 92.16).toFixed(2)}</h1>
                  <MoveRight className='w-4 h-4 text-gray-400' />
                  <h1 className='text-lg font-extrabold tabular-nums text-emerald-600'>₹{(alert.newPrice * 92.16).toFixed(2)}</h1>
                </div>
                <div>
                   <span className='bg-emerald-100 text-emerald-700 rounded-full px-2 py-0.5 text-xs font-bold'>
                      Saved ₹{((alert.oldPrice * 92.16) - (alert.newPrice * 92.16)).toFixed(2)}
                   </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default AlertsPage
