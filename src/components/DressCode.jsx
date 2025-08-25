import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const DressCode = () => {
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

    // Section title animation
    tl.fromTo(".dress-code-title", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    )

    // Content animation with stagger
    tl.fromTo(contentRef.current.children, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out",
        stagger: 0.2
      },
      "-=0.5"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen xl:max-h-[800px] w-full overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(/images/couple-2.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="max-w-5xl w-full">
        {/* Content Container with Primary Background */}
        <div ref={contentRef} className={`${themeConfig.backgrounds.secondary} rounded-3xl p-12 border-2 ${themeConfig.borders.theme}`}>
          {/* Main Dress Code */}
          <div className="text-center mb-12">
            <h3 className={`text-3xl md:text-4xl font-script ${themeConfig.text.theme} mb-6`}>
              Dress Code
            </h3>
            <p className={`text-lg md:text-xl font-serif ${themeConfig.text.primary} leading-relaxed mb-8`}>
              We kindly request our guests to dress in elegant, formal attire to celebrate our special day.
            </p>
            
            {/* Decorative line */}
            <div className="flex justify-center items-center mb-8">
              <div className={`w-24 h-px ${themeConfig.backgrounds.theme} origin-left`}></div>
              <div className={`w-3 h-3 ${themeConfig.backgrounds.theme} rounded-full mx-4`}></div>
              <div className={`w-24 h-px ${themeConfig.backgrounds.theme} origin-right`}></div>
            </div>
          </div>

          {/* Color Theme Circles */}
          <div className="flex justify-center items-center mb-12 space-x-4 sm:space-x-8">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 aspect-square rounded-full ${themeConfig.backgrounds.secondary} border-4 border-white`}></div>
            <div className={`w-12 h-12 sm:w-16 sm:h-16 aspect-square rounded-full ${themeConfig.backgrounds.theme} border-4 border-white`}></div>
            <div className={`w-12 h-12 sm:w-16 sm:h-16 aspect-square rounded-full bg-wedding-200 border-4 border-white`}></div>
            <div className={`w-12 h-12 sm:w-16 sm:h-16 aspect-square rounded-full bg-wedding-600 border-4 border-white`}></div>
          </div>

          
        </div>
      </div>
      </div>
    </section>
  )
}

export default DressCode 