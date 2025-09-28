import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, Clock } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
import { couples } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Counter = ({ countdown }) => {
  const sectionRef = useRef(null)
  const countdownRef = useRef(null)
  const dateTimeRef = useRef(null)

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


    // Countdown container animation
    tl.fromTo(countdownRef.current, 
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" },
      "-=0.3"
    )

    // Countdown numbers stagger animation
    tl.fromTo(".countdown-number", 
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
      id="details"
      className="relative min-h-screen md:h-fit overflow-hidden flex items-center justify-center text-center py-20"
    >
      {/* Theme Background */}
      <div className={`absolute inset-0 ${themeConfig.backgrounds.theme}`}></div>
      
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
      
      {/* Main Content Container */}
      <div className={`relative z-20 ${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding} w-full`}>
        {/* Countdown Timer */}
        <div
          ref={countdownRef}
          className="mb-12 max-w-4xl mx-auto px-8 sm:px-12 lg:px-16 "
        >
        <h3 className={`text-4xl font-serif ${themeConfig.text.custom} mb-4 scale-75 sm:scale-90 md:scale-75 lg:scale-100 origin-center sm:origin-center md:origin-center lg:origin-center`}>Save the Date</h3>
        
        <div className="flex justify-center items-center space-x-3 mb-6 px-4">
          <div className="text-center">
            <div className={`text-3xl md:text-4xl font-albert font-thin ${themeConfig.text.custom} mb-1 countdown-number`}>
              {countdown.days}
            </div>
            <div className={`text-xs text-gray-500 font-medium`}>Days</div>
          </div>
          
          <div className={`text-2xl md:text-3xl font-albert font-thin ${themeConfig.text.custom}`}>:</div>
          
          <div className="text-center">
            <div className={`text-3xl md:text-4xl font-albert font-thin ${themeConfig.text.custom} mb-1 countdown-number`}>
              {countdown.hours}
            </div>
            <div className={`text-xs text-gray-500 font-medium`}>Hours</div>
          </div>
          
          <div className={`text-2xl md:text-3xl font-albert font-thin ${themeConfig.text.custom}`}>:</div>
          
          <div className="text-center">
            <div className={`text-3xl md:text-4xl font-albert font-thin ${themeConfig.text.custom} mb-1 countdown-number`}>
              {countdown.minutes}
            </div>
            <div className={`text-xs text-gray-500 font-medium`}>Minutes</div>
          </div>
          
          <div className={`text-2xl md:text-3xl font-albert font-thin ${themeConfig.text.custom}`}>:</div>
          
          <div className="text-center">
            <div className={`text-3xl md:text-4xl font-albert font-thin ${themeConfig.text.custom} mb-1 countdown-number`}>
              {countdown.seconds}
            </div>
            <div className={`text-xs text-gray-500 font-medium`}>Seconds</div>
          </div>
        </div>
        
        {/* Polaroid Photo */}
        <div className="flex justify-center px-8 sm:px-12 lg:px-16 mt-12">
          <div className="relative bg-white p-3 pb-10 shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
            {/* Photo */}
            <div className="w-56 h-72 bg-cover bg-center bg-no-repeat rounded-sm"
                 style={{ backgroundImage: `url(/images/couple-1.jpg)` }}>
            </div>
            
            {/* Polaroid Frame Text */}
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <p className="text-right pe-4 text-sm md:text-lg font-handwritten text-gray-800 mb-1 leading-none">
                We're getting married!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  )
}

export default Counter 