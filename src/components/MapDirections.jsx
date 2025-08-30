import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Navigation, Car, Train, Bus, Clock, Phone, Mail } from 'lucide-react'
import { weddingConfig } from '../config/weddingConfig'
import { themeConfig } from '../config/themeConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const MapDirections = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Main content animation
    tl.fromTo(contentRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Subtle fade in for venue sections
    tl.fromTo(".venue-photo", 
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.2 },
      "-=0.3"
    )

    tl.fromTo(".venue-content", 
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.2 },
      "-=0.4"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const getGoogleMapsUrl = (venue) => {
    const address = `${venue.address}, ${venue.city}, ${venue.state} ${venue.zip}`
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  }

  const getDirectionsUrl = (venue, mode = 'driving') => {
    const address = `${venue.address}, ${venue.city}, ${venue.state} ${venue.zip}`
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}&travelmode=${mode}`
  }

  const venues = {
    ceremony: {
      ...weddingConfig.venue.ceremony,
      type: 'Ceremony',
      icon: '⛪'
    },
    reception: {
      ...weddingConfig.venue.reception,
      type: 'Reception',
      icon: '🎉'
    }
  }

  return (
    <section
      id="map"
      ref={sectionRef}
      className={`relative py-20 ${themeConfig.backgrounds.primary}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={contentRef} className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-script ${themeConfig.text.theme} mb-6`}>
            Map & Directions
          </h2>
          <p className={`text-xl ${themeConfig.text.secondary} max-w-3xl mx-auto`}>
            Find your way to our special day. Both venues are conveniently located and easily accessible.
          </p>
        </div>

        {/* Main Content Container */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
            {/* Ceremony Venue */}
            <div className={`grid-item border-b ${themeConfig.borders.primary} pb-8 lg:border-b-0 lg:border-r ${themeConfig.borders.primary} lg:pr-8`}>
              <div className="flex flex-col sm:flex-row items-stretch space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Photo */}
                <div className="w-full sm:w-1/2 flex-shrink-0 venue-photo">
                  <img
                    src="/images/church.jpg"
                    alt="Ceremony Venue"
                    className="w-full h-48 sm:h-full object-cover rounded-lg"
                  />
                </div>
                
                {/* Content */}
                <div className="w-full sm:w-1/2 venue-content">
                  <div className="mb-6">
                    <h3 className={`text-2xl font-script ${themeConfig.text.theme} mb-4`}>
                      {venues.ceremony.name}
                    </h3>
                    <p className={`${themeConfig.text.secondary} text-sm mb-2`}>
                      {venues.ceremony.address}
                    </p>
                    <p className={`${themeConfig.text.secondary} text-sm`}>
                      {venues.ceremony.city}, {venues.ceremony.state} {venues.ceremony.zip}
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className={`flex items-center space-x-3 ${themeConfig.text.secondary}`}>
                      <Clock className={`w-4 h-4 ${themeConfig.text.muted}`} />
                      <span className="text-sm">{venues.ceremony.time}</span>
                    </div>
                    {venues.ceremony.details && (
                      <div className={`flex items-start space-x-3 ${themeConfig.text.secondary}`}>
                        <MapPin className={`w-4 h-4 ${themeConfig.text.muted} mt-0.5`} />
                        <span className="text-sm">{venues.ceremony.details}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3">
                    <a
                      href={getGoogleMapsUrl(venues.ceremony)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`venue-button inline-flex items-center justify-center space-x-2 px-4 py-2 w-full lg:w-auto ${themeConfig.buttons.secondary} ${themeConfig.buttons.text} rounded text-sm transition-colors duration-200`}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>MAP</span>
                    </a>
                    <a
                      href={getDirectionsUrl(venues.ceremony)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`venue-button inline-flex items-center justify-center space-x-2 px-4 py-2 w-full lg:w-auto ${themeConfig.buttons.secondary} ${themeConfig.buttons.text} rounded text-sm transition-colors duration-200`}
                    >
                      <Navigation className="w-4 h-4" />
                      <span>DIRECTIONS</span>
                    </a>
                  </div>
                  </div>
                </div>
              </div>

            {/* Reception Venue */}
            <div className="grid-item lg:pl-8">
              <div className="flex flex-col sm:flex-row items-stretch space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Photo */}
                <div className="w-full sm:w-1/2 flex-shrink-0 venue-photo">
                  <img
                    src="/images/reception.jpg"
                    alt="Reception Venue"
                    className="w-full h-48 sm:h-full object-cover rounded-lg"
                  />
                </div>
                
                {/* Content */}
                <div className="w-full sm:w-1/2 venue-content">
                  <div className="mb-6">
                    <h3 className={`text-2xl font-script ${themeConfig.text.theme} mb-4`}>
                      {venues.reception.name}
                    </h3>
                    <p className={`${themeConfig.text.secondary} text-sm mb-2`}>
                      {venues.reception.address}
                    </p>
                    <p className={`${themeConfig.text.secondary} text-sm`}>
                      {venues.reception.city}, {venues.reception.state} {venues.reception.zip}
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className={`flex items-center space-x-3 ${themeConfig.text.secondary}`}>
                      <Clock className={`w-4 h-4 ${themeConfig.text.muted}`} />
                      <span className="text-sm">{venues.reception.time}</span>
                    </div>
                    {venues.reception.details && (
                      <div className={`flex items-start space-x-3 ${themeConfig.text.secondary}`}>
                        <MapPin className={`w-4 h-4 ${themeConfig.text.muted} mt-0.5`} />
                        <span className="text-sm">{venues.reception.details}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3">
                    <a
                      href={getGoogleMapsUrl(venues.reception)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`venue-button inline-flex items-center justify-center space-x-2 px-4 py-2 w-full lg:w-auto ${themeConfig.buttons.secondary} ${themeConfig.buttons.text} rounded text-sm transition-colors duration-200`}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>MAP</span>
                    </a>
                    <a
                      href={getDirectionsUrl(venues.reception)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`venue-button inline-flex items-center justify-center space-x-2 px-4 py-2 w-full lg:w-auto ${themeConfig.buttons.secondary} ${themeConfig.buttons.text} rounded text-sm transition-colors duration-200`}
                    >
                      <Navigation className="w-4 h-4" />
                      <span>DIRECTIONS</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapDirections 