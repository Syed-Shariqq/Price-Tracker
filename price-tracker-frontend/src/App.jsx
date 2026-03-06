import { Routes, Route, useNavigate } from 'react-router-dom'
import LandingPage from '@/Pages/LandingPage'
import AuthPage from '@/Pages/AuthPage'
import HomePage from '@/Pages/HomePage'
import LayoutWrapper from '@/Components/Layout/LayoutWrapper'
import ProductsPage from '@/Pages/ProductsPage'
import AlertsPage from '@/Pages/AlertsPage'
import AnalyticsPage from '@/Pages/AnalyticsPage'
import SettingsPage from '@/Pages/SettingsPage'
import ProductAnalytics from '@/Pages/ProductAnalytics'
import ProtectedRoute from './Utils/ProtectedRoute'
import { useEffect } from 'react'


const App = () => {

  const navigate = useNavigate()

  useEffect(() => {

    const token = localStorage.getItem('token')
    
    if(token){
      navigate('/home')
    }

  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<AuthPage />} />

        <Route path='/home' element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />

        <Route element={<LayoutWrapper />}>
          <Route path='/products' element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          } />

          <Route path='/alerts' element={
            <ProtectedRoute>
              <AlertsPage />
            </ProtectedRoute>
          } />

          <Route path='/analytics' element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          } />

          <Route path='/analytics/:id' element={
            <ProtectedRoute>
              <ProductAnalytics />
            </ProtectedRoute>
          } />

          <Route path='/settings' element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />

        </Route>
      </Routes>

    </>

  )
}

export default App