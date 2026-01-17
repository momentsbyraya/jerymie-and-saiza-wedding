import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { weddingConfig } from '../config/weddingConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const GiftGuideAndSnapShare = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    // Check if refs are available before animating
    if (!sectionRef.current || !contentRef.current) return

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
    if (contentRef.current) {
      tl.fromTo(contentRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 w-full overflow-hidden ${themeConfig.calendar.background}`}
    >
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center">
        <div ref={contentRef} className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8">
          
          {/* Gift Guide Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-script mb-6" style={{ color: '#1e3a5f' }}>
                Gift Guide
              </h2>
              <p className="text-base md:text-lg font-poppins max-w-3xl mx-auto text-gray-700">
                As love is what the night is all about. Your presence is something we can't celebrate without. We are truly grateful for your time and effort to be with us. But should you still believe that a gift is worth giving, a small envelope for our future is a delightful blessing.
              </p>
            </div>
          </div>

          {/* Snap & Share Section */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-script mb-6" style={{ color: '#1e3a5f' }}>
                Snap & Share!
              </h2>
              <p className="text-base md:text-lg font-poppins max-w-3xl mx-auto mb-4 text-gray-700">
                Help us capture our day and use our official hashtag.
              </p>
              <p className="text-lg md:text-xl font-poppins font-bold" style={{ color: '#1e3a5f', fontFamily: "'Poppins', sans-serif" }}>
                {weddingConfig.details.hashtag}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default GiftGuideAndSnapShare
