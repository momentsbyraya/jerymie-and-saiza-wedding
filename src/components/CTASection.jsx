import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Users } from 'lucide-react'
import RSVPModal from './RSVPModal'
import EntourageModal from './EntourageModal'
import { themeConfig } from '../config/themeConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const CTASection = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const buttonRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEntourageModalOpen, setIsEntourageModalOpen] = useState(false)

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

    // RSVP button animation
    tl.fromTo(buttonRef.current, 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const openRSVPModal = () => {
    setIsModalOpen(true)
  }

  const openEntourageModal = () => {
    setIsEntourageModalOpen(true)
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-screen sm:py-20 2xl:h-auto 2xl:py-20 w-full overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(/images/couple-7.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Main Content */}
        <div ref={contentRef} className="relative z-10 flex items-center justify-center h-full sm:py-12 2xl:h-auto 2xl:py-12">
          <div className={`${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding}`}>
          <div className="text-center">
              <h2 className={`text-5xl md:text-7xl lg:text-8xl font-script ${themeConfig.text.primary} mb-24 leading-tight`}>
              We Await Your Presenve
            </h2>
           
              {/* Buttons - Centered Below Content */}
              <div ref={buttonRef} className="text-center mt-20 space-y-4 sm:space-y-0 sm:space-x-6">
                <button
                  onClick={openRSVPModal}
                  className="inline-flex items-center justify-center space-x-3 px-12 py-4 bg-wedding-600 hover:bg-wedding-700 text-white rounded-lg transition-colors duration-200 text-lg font-medium w-full sm:w-auto max-w-md mx-auto"
                >
                  <Mail className="w-6 h-6" />
                  <span>RSVP</span>
                </button>
                
                <button
                  onClick={openEntourageModal}
                  className="inline-flex items-center justify-center space-x-3 px-12 py-4 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-white/50 rounded-lg transition-all duration-200 text-lg font-medium w-full sm:w-auto max-w-md mx-auto"
                >
                  <Users className="w-6 h-6" />
                  <span>Entourage</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      <RSVPModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Entourage Modal */}
      <EntourageModal 
        isOpen={isEntourageModalOpen} 
        onClose={() => setIsEntourageModalOpen(false)} 
      />
    </>
  )
}

export default CTASection 