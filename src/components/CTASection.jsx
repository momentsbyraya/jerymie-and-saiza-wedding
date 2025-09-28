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
        className={`relative py-20 w-full overflow-hidden ${themeConfig.calendar.background}`}
      >
        {/* Content */}
        <div ref={contentRef} className="relative z-20 flex items-center justify-center py-12">
          <div className="max-w-4xl w-full mx-auto px-4">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-script text-gray-800 mb-6">
                We Await Your Presence
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Your presence would make our special day even more meaningful. 
                Please let us know if you'll be joining us for our celebration.
              </p>
            </div>

            {/* RSVP Button */}
            <div className="text-center">
              <button
                ref={buttonRef}
                onClick={openRSVPModal}
                className="w-full inline-flex items-center justify-center space-x-3 px-8 py-2 bg-white hover:bg-gray-100 text-gray-800 rounded-sm transition-colors duration-200 text-lg font-medium"
              >
                <span>RSVP</span>
              </button>
              
              {/* Entourage Text */}
              <button
                onClick={openEntourageModal}
                className="text-sm text-gray-600 mt-4 hover:text-gray-800 transition-colors duration-200 underline"
              >
                View our entourage
              </button>
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