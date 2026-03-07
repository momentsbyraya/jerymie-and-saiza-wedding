import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Navigation, Car, Train, Bus, Clock, Phone, Mail } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
import { venues as venuesData, images } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const MapDirections = () => {
  const sectionRef = useRef(null)
  const receptionDetailsRef = useRef(null)
  const receptionPhotoRef = useRef(null)
  const receptionButtonRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const details = receptionDetailsRef.current
    const photo = receptionPhotoRef.current
    const button = receptionButtonRef.current
    if (!section || !details || !photo || !button) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    tl.fromTo(details, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2")
      .fromTo(photo, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
      .fromTo(button, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.4")

    ScrollTrigger.refresh()
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // URLs are now provided in the venues data
  const venueData = venuesData.venue || venuesData.ceremony || venuesData.reception

  const venues = {
    ceremony: {
      ...venueData,
      ...venueData.ceremony,
      type: 'Ceremony',
      icon: '⛪'
    },
    reception: {
      ...venueData,
      ...venueData.reception,
      type: 'Reception',
      icon: '🎉'
    }
  }

  // Generate Google Maps directions URL
  const getDirectionsUrl = () => {
    const address = `${venues.reception.address}, ${venues.reception.city}, ${venues.reception.state} ${venues.reception.zip}`
    const encodedAddress = encodeURIComponent(address)
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`
  }

  return (
    <section
      id="map"
      ref={sectionRef}
      className="relative py-12 sm:py-20 w-full overflow-visible"
    >
      {/* Theme Background */}
      <div className={`absolute inset-0 ${themeConfig.backgrounds.theme}`}></div>
      
      {/* Crumpled Paper Background on top */}
      <div 
        className="absolute inset-0 opacity-30 z-10"
        style={{
          backgroundImage: 'url(/assets/images/crumpled-paper.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      <div className={`${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding} relative z-20`}>
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-script ${themeConfig.text.custom} mb-6`}>
            Venue
          </h2>
        </div>

        {/* Main Content Container */}
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl mx-auto -mt-4">
          {/* Single Venue Display */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div ref={receptionDetailsRef} className="text-center mb-6">
                <h3 className={`text-xl sm:text-3xl font-serif ${themeConfig.text.custom}`}>
                  {venues.reception.name}
                </h3>
                <p className={`text-sm sm:text-lg ${themeConfig.text.custom}`}>
                  {venues.reception.address}, {venues.reception.city}, {venues.reception.state} {venues.reception.zip}
                </p>
              </div>
              
              <div ref={receptionPhotoRef} className="relative mb-4 flex justify-center">
                <div className="w-full bg-white shadow-2xl hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <div 
                    className="w-full border-l-8 border-r-8 border-t-8 border-white bg-cover bg-center bg-no-repeat min-h-[180px] sm:min-h-64"
                    style={{
                      backgroundImage: `url(${venues.reception.image || venues.ceremony.image || images.venues.reception})`,
                      aspectRatio: '16 / 9'
                    }}
                  />
                  <div className="p-3 text-center">
                    <div className="text-right text-sm sm:text-base font-handwritten" style={{ color: '#5a524a' }}>{venues.reception.name}</div>
                  </div>
                </div>
              </div>
              
              {/* Map Button */}
              <div ref={receptionButtonRef} className="flex justify-center mt-8">
                <a
                  href={venues.reception.directionsUrl || venues.ceremony.directionsUrl || venues.directionsUrl || venues.googleMapsUrl || getDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center px-8 py-3 sm:py-5 lg:py-2 bg-white ${themeConfig.text.custom} rounded-sm text-sm sm:text-2xl lg:text-base font-medium transition-colors duration-200 hover:opacity-90`}
                >
                  Check for directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapDirections 