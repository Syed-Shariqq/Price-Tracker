import React from 'react'
import Navbar from '../Components/Navbar'
import HeroSection from '../Components/HeroSection'
import HowItWorks from '../Components/HowItWorks'
import Testimonials from '../Components/Testimonials'
import CardsSection from '../Components/CardsSection'
import Footer from '../Components/Footer'

const LandingPage = () => {
  return (
     <div className='min-h-full overflow-hidden text-black text-5xl '>
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