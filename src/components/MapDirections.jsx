import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Navigation, Car, Train, Bus, Clock, Phone, Mail } from 'lucide-react'
import { weddingConfig } from '../config/weddingConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const MapDirections = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [activeVenue, setActiveVenue] = useState('ceremony')

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
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    )

    // Venue cards animation
    tl.fromTo(".venue-card", 
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", stagger: 0.2 },
      "-=0.5"
    )

    // Map animation
    tl.fromTo(".map-container", 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
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

  const currentVenue = venues[activeVenue]

  return (
    <section
      id="map"
      ref={sectionRef}
      className="relative py-20"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div ref={contentRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-script text-wedding-800 mb-6">
            Map & Directions
          </h2>
          <p className="text-xl text-wedding-600 max-w-3xl mx-auto">
            Find your way to our special day. Both venues are conveniently located and easily accessible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Venue Selection & Information */}
          <div className="space-y-6">
            {/* Venue Tabs */}
            <div className="flex space-x-4 mb-8">
              {Object.entries(venues).map(([key, venue]) => (
                <button
                  key={key}
                  onClick={() => setActiveVenue(key)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 ${
                    activeVenue === key
                      ? 'bg-rose-500 text-white shadow-lg'
                      : 'bg-white/80 backdrop-blur-sm text-wedding-700 hover:bg-white border border-wedding-200'
                  }`}
                >
                  <span className="text-2xl">{venue.icon}</span>
                  <span className="font-serif font-medium">{venue.type}</span>
                </button>
              ))}
            </div>

            {/* Active Venue Information */}
            <div className="venue-card bg-white/80 backdrop-blur-sm rounded-2xl p-8 card-shadow elegant-border">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-3xl">
                  {currentVenue.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-serif text-wedding-800 mb-2">
                    {currentVenue.name}
                  </h3>
                  <p className="text-wedding-600 mb-1">
                    {currentVenue.address}
                  </p>
                  <p className="text-wedding-600 mb-4">
                    {currentVenue.city}, {currentVenue.state} {currentVenue.zip}
                  </p>
                </div>
              </div>

              {/* Venue Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 text-wedding-700">
                  <Clock className="w-5 h-5 text-rose-500" />
                  <span className="font-medium">Time:</span>
                  <span>{currentVenue.time}</span>
                </div>
                {currentVenue.details && (
                  <div className="flex items-start space-x-3 text-wedding-700">
                    <MapPin className="w-5 h-5 text-rose-500 mt-0.5" />
                    <span className="font-medium">Details:</span>
                    <span>{currentVenue.details}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <a
                  href={getGoogleMapsUrl(currentVenue)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-wedding-600 hover:bg-wedding-700 text-white px-4 py-3 rounded-lg transition-colors duration-200"
                >
                  <MapPin className="w-4 h-4" />
                  <span>View on Map</span>
                </a>
                <a
                  href={getDirectionsUrl(currentVenue)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-3 rounded-lg transition-colors duration-200"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Transportation Options */}
              <div className="border-t border-wedding-200 pt-6">
                <h4 className="text-lg font-serif text-wedding-800 mb-4">Transportation Options</h4>
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href={getDirectionsUrl(currentVenue, 'driving')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-wedding-50 transition-colors duration-200"
                  >
                    <Car className="w-6 h-6 text-wedding-600" />
                    <span className="text-sm text-wedding-700">Drive</span>
                  </a>
                  <a
                    href={getDirectionsUrl(currentVenue, 'transit')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-wedding-50 transition-colors duration-200"
                  >
                    <Train className="w-6 h-6 text-wedding-600" />
                    <span className="text-sm text-wedding-700">Transit</span>
                  </a>
                  <a
                    href={getDirectionsUrl(currentVenue, 'walking')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-wedding-50 transition-colors duration-200"
                  >
                    <Navigation className="w-6 h-6 text-wedding-600" />
                    <span className="text-sm text-wedding-700">Walk</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="map-container">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 card-shadow elegant-border">
              <h3 className="text-2xl font-serif text-wedding-800 mb-4">
                Interactive Map
              </h3>
              <div className="relative">
                {/* Fake Google Maps Image - Clickable */}
                <a
                  href={getGoogleMapsUrl(currentVenue)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative group cursor-pointer"
                >
                  {/* Map Image Placeholder */}
                  <div className="bg-gradient-to-br from-wedding-50 to-wedding-100 border border-wedding-200 rounded-lg p-8 text-center min-h-[300px] flex flex-col items-center justify-center group-hover:shadow-lg transition-all duration-300">
                    {/* Map Icon */}
                    <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-10 h-10 text-white" />
                    </div>
                    
                    {/* Venue Info */}
                    <h4 className="text-xl font-serif text-wedding-800 mb-2">
                      {currentVenue.name}
                    </h4>
                    <p className="text-wedding-600 mb-4 text-center">
                      {currentVenue.address}<br />
                      {currentVenue.city}, {currentVenue.state} {currentVenue.zip}
                    </p>
                    
                    {/* Click to Open Text */}
                    <div className="bg-rose-500 text-white px-4 py-2 rounded-lg font-medium group-hover:bg-rose-600 transition-colors duration-300">
                      🗺️ Click to Open in Google Maps
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                      <p className="text-wedding-800 font-medium">📍 Open in Google Maps</p>
                    </div>
                  </div>
                </a>
                
                {/* Quick Action Buttons Below Map */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <a
                    href={getGoogleMapsUrl(currentVenue)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-rose-500 hover:bg-rose-600 text-white px-4 py-3 rounded-lg transition-colors duration-200 text-sm"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>View Location</span>
                  </a>
                  
                  <a
                    href={getDirectionsUrl(currentVenue)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-wedding-600 hover:bg-wedding-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 text-sm"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </a>
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