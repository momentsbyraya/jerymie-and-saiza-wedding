import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { getTimeUntilWedding } from '../config/weddingConfig'
import Hero from './Hero'
import WeddingDetails from './WeddingDetails'
import InvitationSection from './InvitationSection'
import LoveStory from './LoveStory'
import DressCode from './DressCode'
import Gallery from './Gallery'
import FAQ from './FAQ'
import MapDirections from './MapDirections'
import GiftRegistry from './GiftRegistry'
import CTASection from './CTASection'

const WeddingInvitation = () => {
  const [countdown, setCountdown] = useState(getTimeUntilWedding())

  useEffect(() => {
    // Initial page load animation
    gsap.fromTo(".main-container", 
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    )
    
    const timer = setInterval(() => {
      setCountdown(getTimeUntilWedding())
    }, 1000) // Update every second

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen">
      <div className="main-container">
        {/* Hero Section */}
        <Hero />
        
        {/* Wedding Details */}
        <WeddingDetails countdown={countdown} />
        
        {/* Invitation Section - Full Width */}
        <InvitationSection />
        
        {/* Love Story Section */}
        <LoveStory />
        
        {/* Dress Code Section */}
        <DressCode />
        
        {/* Gallery Section */}
        <Gallery />
        
        {/* Map & Directions Section */}
        <MapDirections />
        
        {/* Gift Registry Section */}
        <GiftRegistry />
        
        {/* FAQ Section */}
        <FAQ />
        
        {/* CTA Section - Full Width */}
        <CTASection />
      </div>
    </div>
  )
}

export default WeddingInvitation 