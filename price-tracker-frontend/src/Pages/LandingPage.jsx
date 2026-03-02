import React from 'react'
import HeroSection from '../Components/HeroSection'
import HowItWorks from '../Components/HowItWorks'
import Testimonials from '../Components/Testimonials'
import CardsSection from '../Components/CardsSection'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'

const LandingPage = () => {
  return (
     <div className='min-h-screen w-full overflow-x-hidden text-black'>
      <Navbar />
      <HeroSection />
      <HowItWorks />  
      <CardsSection />   
      <Testimonials />  
      <Footer />   
     </div>
  )
}

export default LandingPage