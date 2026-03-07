import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'

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
            <div className="text-center mb-6">
              <h2 className="text-4xl md:text-5xl font-script mb-6" style={{ color: '#C46A3A' }}>
                Gift Guide
              </h2>
              <p className="text-base md:text-lg font-poppins max-w-3xl mx-auto mb-8" style={{ color: '#5a524a' }}>
                Your presence is our greatest gift. If you’d like to give something more, a small envelope for our future would be a blessing.
              </p>
            </div>

            {/* QR code - same layout as Oh Snap */}
            <div className="mx-auto upload-stack flex flex-col items-center justify-center gap-6">
              <div className="upload-qr-container w-full">
                <div className="bg-white p-4 rounded-lg shadow-md w-full h-full flex items-center justify-center">
                  <img
                    src="/assets/images/graphics/qrcode.png"
                    alt="Gift / InstaPay QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <p className="text-sm sm:text-base font-poppins text-center max-w-sm" style={{ color: '#5a524a' }}>
                Scan to send a gift
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default GiftGuideAndSnapShare
