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
      <main className="main-container">
        {/* Hero Section */}
        <section><Hero /></section>
        
        {/* Wedding Details */}
        <section><Counter countdown={countdown} /></section>
        
        {/* Invitation Section - Full Width */}
        <section><InvitationSection /></section>
        
        {/* Love Story Section */}
        <section><LoveStory /></section>
        
        {/* Dress Code Section */}
        <section><DressCode /></section>
        
        {/* Gallery Section */}
        <section><Gallery /></section>
        
        {/* Map & Directions Section */}
        <section><MapDirections /></section>
        
        {/* Gift Registry Section */}
        <section><GiftRegistry /></section>
        
        {/* FAQ Section */}
        <section><FAQ /></section>
        
        {/* CTA Section - Full Width */}
        <section><CTASection /></section>   
      </main>
    </div>
  )
}

export default WeddingInvitation 