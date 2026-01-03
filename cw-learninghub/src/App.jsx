import React from 'react'
import ContactPage from './component/footer'
import TestimonialsSection from './pages/testimonialSection'
import EventsSection from './pages/eventSection'
import CoursesSection from './pages/ourCourses'
import CodeWildLanding from './pages/codeWild'
import Navbar from './component/navbar'
import HackathonPoster from './component/hackathonBanner'
// Puthiya component-ai import seiyavum
import ScrollProgress from './component/scrollProgrss' 
import HeroSection from './pages/hero'

function App() {
  return (
    <div className="relative">
      {/* 1. ScrollProgress-ai inge add seiyavum */}
      <ScrollProgress />
      
      <Navbar/>
      <HeroSection/>
      <HackathonPoster/>
      <CodeWildLanding/>
      <CoursesSection/>
      <EventsSection/>
      <TestimonialsSection/>
      <ContactPage/>
    </div>
  )
}

export default App