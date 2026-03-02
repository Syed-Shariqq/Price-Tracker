import React from 'react'
import LandingNavbar from '../Components/Layout/Navbar'
import CardsSection from '../Features/Landing/CardsSection'
import Footer from '../Components/Layout/Footer'
import HeroSection from '../Features/Landing/HeroSection'
import HowItWorks from '../Features/Landing/HowItWorks'
import Testimonials from '../Features/Landing/Testimonials'

const LandingPage = () => {
  return (
     <div className='min-h-screen w-full overflow-x-hidden text-black'>
      <LandingNavbar />
      <HeroSection />
      <HowItWorks />  
      <CardsSection />   
      <Testimonials />  
      <Footer />   
     </div>
  )
}

export default LandingPage