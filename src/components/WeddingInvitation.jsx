import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { getTimeUntilWedding } from '../utils/countdown'
import Hero from './Hero'
import Counter from './Counter'
import InvitationSection from './InvitationSection'
import LoveStory from './LoveStory'
import DressCode from './DressCode'
import Gallery from './Gallery'
import FAQ from './FAQ'
import MapDirections from './MapDirections'
import GiftRegistry from './GiftRegistry'
import CTASection from './CTASection'
import EnhancedLazySection from './EnhancedLazySection'

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
    <div className="min-h-screen w-full overflow-hidden">
      <main className="main-container section-container">
        {/* Hero Section - Always visible */}
        <section><Hero /></section>
        
        {/* Wedding Details */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="counter">
          <Counter countdown={countdown} />
        </EnhancedLazySection>
        
        {/* Invitation Section - Full Width */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="invitation">
          <InvitationSection />
        </EnhancedLazySection>
        
        {/* Love Story Section */}
        <EnhancedLazySection animationClass="fade-slide-left" sectionName="love-story">
          <LoveStory />
        </EnhancedLazySection>
        
        {/* Dress Code Section */}
        <EnhancedLazySection animationClass="fade-slide-right" sectionName="dress-code">
          <DressCode />
        </EnhancedLazySection>
        
        {/* Gallery Section */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="gallery">
          <Gallery />
        </EnhancedLazySection>
        
        {/* Map & Directions Section */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="map-directions">
          <MapDirections />
        </EnhancedLazySection>
        
        {/* Gift Registry Section */}
        <EnhancedLazySection animationClass="fade-slide-left" sectionName="gift-registry">
          <GiftRegistry />
        </EnhancedLazySection>
        
        {/* FAQ Section */}
        <EnhancedLazySection animationClass="fade-slide-right" sectionName="faq">
          <FAQ />
        </EnhancedLazySection>
        
        {/* CTA Section - Full Width */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="cta">
          <CTASection />
        </EnhancedLazySection>   
      </main>
    </div>
  )
}

export default WeddingInvitation 