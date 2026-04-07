import { useEffect, useRef, useState } from 'react';
import SideBar from '@/Components/Layout/SideBar';
import LeftSidePage from '@/Components/Layout/LeftSidePage';

const HomePage = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState({
    url: '',
  });

  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  })

  return (
    <div className='min-h-screen flex'>

      {/* Sidebar for larger screens */}
      <div className="hidden xl:block w-48  bg-blue-200 sticky top-0 h-screen">
        <SideBar />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar for smaller screens */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-60 bg-blue-200 z-50 transform transition-transform 
          duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} xl:hidden`}>
        <SideBar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <LeftSidePage inputRef={inputRef} error={error} setError={setError} productDetails={productDetails} setProductDetails={setProductDetails} data={data} setData={setData} setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
    </div>
  )
}

export default HomePage