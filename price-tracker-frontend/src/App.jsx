import { Routes , Route} from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import AuthPage from './Pages/AuthPage'
import HomePage from './Pages/HomePage'


const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
     
    </>
    
  )
}

export default App