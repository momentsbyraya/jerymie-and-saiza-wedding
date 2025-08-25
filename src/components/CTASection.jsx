import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RSVPModal from './RSVPModal'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const CTASection = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const buttonRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden"
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
        <div ref={contentRef} className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-script text-white mb-8 leading-tight">
              We Await Your Presenve
            </h2>
           
          </div>
        </div>

        {/* RSVP Button - Bottom Right */}
        <div ref={buttonRef} className="absolute bottom-8 right-8 z-20">
          <button
            onClick={openRSVPModal}
            className="group relative px-16 py-4 bg-[#ad8369] hover:bg-[#ad8369]/80 text-white font-serif text-lg md:text-xl rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10">RSVP</span>
            <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </button>
        </div>
      </section>

      {/* RSVP Modal */}
      <RSVPModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}

export default CTASection 