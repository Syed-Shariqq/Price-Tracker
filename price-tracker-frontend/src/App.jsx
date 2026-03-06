import { Routes , Route} from 'react-router-dom'
import LandingPage from '@/Pages/LandingPage'
import AuthPage from '@/Pages/AuthPage'
import HomePage from '@/Pages/HomePage'
import LayoutWrapper from '@/Components/Layout/LayoutWrapper'
import ProductsPage from '@/Pages/ProductsPage'
import AlertsPage from '@/Pages/AlertsPage'
import AnalyticsPage from '@/Pages/AnalyticsPage'
import SettingsPage from '@/Pages/SettingsPage'
import ProductAnalytics from '@/Pages/ProductAnalytics'
import OtpPage from '@/Pages/OtpPage'


const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route element={<LayoutWrapper />}>
           <Route path='/products' element={<ProductsPage />} />
           <Route path='/alerts' element={<AlertsPage />} />
           <Route path='/analytics' element={<AnalyticsPage />} />
           <Route path='/analytics/:id' element={<ProductAnalytics />} />
           <Route path='/settings' element={<SettingsPage />} />
        </Route>
        <Route path='/Otp' element={<OtpPage />} />
      </Routes>
     
    </>
    
  )
}

export default App