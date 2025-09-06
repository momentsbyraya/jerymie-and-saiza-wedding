import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import LazyImage from './LazyImage'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const sectionRef = useRef(null)
  const galleryRef = useRef(null)

  useEffect(() => {
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`py-20 w-full ${themeConfig.backgrounds.secondary}`}
    >
      <div className={`${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding}`}>
        {/* Gallery Grid */}
        <div ref={galleryRef} className="max-w-7xl mx-auto">
          {/* First Row - 3 Photos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="h-80 overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <LazyImage 
                src="/images/couple-1.jpg" 
                alt="Wedding couple photo 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="h-80 overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <LazyImage 
                src="/images/couple-2.jpg" 
                alt="Wedding couple photo 2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="h-80 overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <LazyImage 
                src="/images/couple-3.jpg" 
                alt="Wedding couple photo 3"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Second Row - 2 Photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="h-80 overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <LazyImage 
                src="/images/couple-4.jpg" 
                alt="Wedding couple photo 4"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="h-80 overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <LazyImage 
                src="/images/couple-5.jpg" 
                alt="Wedding couple photo 5"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Third Row - 3 Photos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-80 overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <LazyImage 
                src="/images/couple-6.jpg" 
                alt="Wedding couple photo 6"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="h-80 overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <LazyImage 
                src="/images/couple-7.jpg" 
                alt="Wedding couple photo 7"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="h-80 overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <LazyImage 
                src="/images/couple-8.jpg" 
                alt="Wedding couple photo 8"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery 