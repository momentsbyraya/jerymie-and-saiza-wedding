import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { weddingConfig } from '../config/weddingConfig'
import { themeConfig } from '../config/themeConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const InvitationSection = () => {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
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

    // Image animation
    tl.fromTo(imageRef.current, 
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    )

    // Content animation
    tl.fromTo(contentRef.current.children, 
      { opacity: 0, x: 50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1, 
        ease: "power2.out",
        stagger: 0.3
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
      className="relative py-20 w-full overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${weddingConfig.photos.gallery[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div ref={contentRef} className={`relative z-10 flex items-center justify-center py-12 ${themeConfig.text.primary}`}>
                          <div className={`${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding}`}>
          <div className="max-w-5xl w-full mx-auto">
          {/* Section Title */}
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-script ${themeConfig.text.primary} mb-12 text-center`}>
            Wedding Day Schedule
          </h2>
          
          {/* Timeline */}
          <div className="relative">
            {/* Central Horizontal Line */}
            <div className={`absolute top-8 left-0 right-0 h-px ${themeConfig.text.primary}/40`}></div>
            
            {/* Timeline Events */}
            <div className="grid grid-cols-3 gap-6 sm:flex sm:justify-between sm:items-center relative">
              {/* Event 1 */}
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${themeConfig.backgrounds.theme} rounded-full flex items-center justify-center mb-4`}>
                  <span className={`${themeConfig.text.primary} font-bold text-lg`}>1</span>
                </div>
                <div className={`text-xl md:text-2xl font-script ${themeConfig.text.primary} mb-2`}>
                  Photo Session
                </div>
                <div className={`text-sm font-serif ${themeConfig.text.primary}/90 mb-1`}>
                  Getting ready
                </div>
                <div className={`text-lg font-serif ${themeConfig.text.primary} font-semibold`}>
                  1:00 PM
                </div>
              </div>

              {/* Event 2 */}
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${themeConfig.backgrounds.theme} rounded-full flex items-center justify-center mb-4`}>
                  <span className={`${themeConfig.text.primary} font-bold text-lg`}>2</span>
                </div>
                <div className={`text-xl md:text-2xl font-script ${themeConfig.text.primary} mb-2`}>
                  Wedding Ceremony
                </div>
                <div className={`text-sm font-serif ${themeConfig.text.primary}/90 mb-1`}>
                  {weddingConfig.venue.ceremony.name}
                </div>
                <div className={`text-lg font-serif ${themeConfig.text.primary} font-semibold`}>
                  {weddingConfig.venue.ceremony.time}
                </div>
              </div>

              {/* Event 3 */}
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${themeConfig.backgrounds.theme} rounded-full flex items-center justify-center mb-4`}>
                  <span className={`${themeConfig.text.primary} font-bold text-lg`}>3</span>
                </div>
                <div className={`text-xl md:text-2xl font-script ${themeConfig.text.primary} mb-2`}>
                  Cocktail Hour
                </div>
                <div className={`text-sm font-serif ${themeConfig.text.primary}/90 mb-1`}>
                  {weddingConfig.venue.reception.name}
                </div>
                <div className={`text-lg font-serif ${themeConfig.text.primary} font-semibold`}>
                  4:30 PM
                </div>
              </div>

              {/* Event 4 */}
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${themeConfig.backgrounds.theme} rounded-full flex items-center justify-center mb-4`}>
                  <span className={`${themeConfig.text.primary} font-bold text-lg`}>4</span>
                </div>
                <div className={`text-xl md:text-2xl font-script ${themeConfig.text.primary} mb-2`}>
                  Dinner Reception
                </div>
                <div className={`text-sm font-serif ${themeConfig.text.primary}/90 mb-1`}>
                  {weddingConfig.venue.reception.name}
                </div>
                <div className={`text-lg font-serif ${themeConfig.text.primary} font-semibold`}>
                  {weddingConfig.venue.reception.time}
                </div>
              </div>

              {/* Event 5 */}
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${themeConfig.backgrounds.theme} rounded-full flex items-center justify-center mb-4`}>
                  <span className={`${themeConfig.text.primary} font-bold text-lg`}>5</span>
                </div>
                <div className={`text-xl md:text-2xl font-script ${themeConfig.text.primary} mb-2`}>
                  Party Starts
                </div>
                <div className={`text-sm font-serif ${themeConfig.text.primary}/90 mb-1`}>
                  Dancing & celebration
                </div>
                <div className={`text-lg font-serif ${themeConfig.text.primary} font-semibold`}>
                  9:00 PM
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

export default InvitationSection 