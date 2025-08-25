import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
      className="relative h-screen w-full overflow-hidden"
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
        <div ref={contentRef} className="bg-[#212639] rounded-3xl p-12 border-2 border-[#ad8369]/30">
          {/* Main Dress Code */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-script text-[#ad8369] mb-6">
              Dress Code
            </h3>
            <p className="text-lg md:text-xl font-serif text-white leading-relaxed mb-8">
              We kindly request our guests to dress in elegant, formal attire to celebrate our special day.
            </p>
            
            {/* Decorative line */}
            <div className="flex justify-center items-center mb-8">
              <div className="w-24 h-px bg-[#ad8369] origin-left"></div>
              <div className="w-3 h-3 bg-[#ad8369] rounded-full mx-4"></div>
              <div className="w-24 h-px bg-[#ad8369] origin-right"></div>
            </div>
          </div>

          {/* Color Theme Circles */}
          <div className="flex justify-center items-center mb-12 space-x-8">
            <div className="w-16 h-16 rounded-full bg-[#212639] border-4 border-white"></div>
            <div className="w-16 h-16 rounded-full bg-[#ad8369] border-4 border-white"></div>
            <div className="w-16 h-16 rounded-full bg-wedding-200 border-4 border-white"></div>
            <div className="w-16 h-16 rounded-full bg-wedding-600 border-4 border-white"></div>
          </div>

          
        </div>
      </div>
      </div>
    </section>
  )
}

export default DressCode 