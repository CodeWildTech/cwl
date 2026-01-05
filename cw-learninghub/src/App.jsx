import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './component/navbar'  // Your navbar component
import ScrollProgress from './component/scrollProgrss' 
import HeroSection from './pages/hero'
import HackathonPoster from './component/hackathonBanner'
import CodeWildLanding from './pages/codeWild'
import CoursesSection from './pages/ourCourses'
import EventsSection from './pages/eventSection'
import TestimonialsSection from './pages/testimonialSection'
import ContactPage from './component/footer'

function App() {
  return (
    <Router>
      <div className="relative">
        <ScrollProgress />
        <Navbar />
        
        <Routes>
          {/* Home shows ALL sections with IDs for smooth scroll */}
          <Route path="/" element={
            <div id="home">
              <section id="hero"><HeroSection/></section>
              <section id="hackathon"><HackathonPoster/></section>
              <section id="codewild"><CodeWildLanding/></section>
              <section id="courses"><CoursesSection/></section>
              <section id="events"><EventsSection/></section>
              <section id="testimonials"><TestimonialsSection/></section>
              <section id="contact"><ContactPage/></section>
            </div>
          } />
          
          {/* Other routes scroll to specific sections */}
          <Route path="/courses" element={<div id="courses"><CoursesSection/></div>} />
          <Route path="/events" element={<div id="events"><EventsSection/></div>} />
          <Route path="/testimonials" element={<div id="testimonials"><TestimonialsSection/></div>} />
          <Route path="/contact" element={<div id="contact"><ContactPage/></div>} />
          
          <Route path="*" element={<div id="home"><HeroSection/></div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
