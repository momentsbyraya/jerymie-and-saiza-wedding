import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { images } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const LoveStory = () => {
  const sectionRef = useRef(null)
  const photoRef = useRef(null)

  useEffect(() => {
    // Set initial state of photo
    gsap.set(photoRef.current, { y: 50, opacity: 0 })

    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Slide from bottom to top animation for photo only
    tl.to(photoRef.current, 
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 w-full ${themeConfig.backgrounds.theme}`}
    >
      {/* Crumpled Paper Background on top */}
      <div 
        className="absolute inset-0 opacity-30 z-10"
        style={{
          backgroundImage: 'url(/images/crumpled-paper.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-md mx-auto px-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-script text-gray-800 mb-6">
          Our Love Story
        </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-lg mx-auto ">
              From the moment our eyes first met, we knew something magical was beginning. 
              What started as a simple conversation has blossomed into a beautiful journey of 
              laughter, adventures, and countless precious memories together.
                    </p>
                  </div>
                  
          {/* Polaroid Photo */}
          <div className="flex justify-center">
            <div ref={photoRef} className="w-56 h-62 bg-white shadow-2xl hover:scale-105 transition-transform duration-300 p-2">
              <div className="w-full h-56 bg-cover bg-center" style={{backgroundImage: `url(${images.couple.couple3})`}}></div>
              <div className="p-3 text-center">
                <div className="text-xs text-gray-600 font-handwritten">love you to the moon and back</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoveStory 