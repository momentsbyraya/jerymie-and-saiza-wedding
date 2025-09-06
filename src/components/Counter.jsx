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
      className={`text-center py-20 w-full ${themeConfig.backgrounds.primary}`}
    >
              <div className={`${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding}`}>
        {/* Countdown Timer */}
        <div
          ref={countdownRef}
          className="mb-12 max-w-4xl mx-auto"
        >
        <h3 className={`text-2xl font-serif ${themeConfig.text.primary} mb-8 px-12`}>Counting Down to Our Special Day</h3>
        
        {/* Decorative Line */}
        <div className="flex justify-center items-center mb-8">
          <div className={`w-56 h-px ${themeConfig.backgrounds.theme} origin-left`}></div>
          <div className={`w-3 h-3 ${themeConfig.backgrounds.theme} rounded-full mx-4`}></div>
          <div className={`w-56 h-px ${themeConfig.backgrounds.theme} origin-right`}></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className={`text-4xl md:text-5xl font-serif ${themeConfig.text.theme} mb-2 countdown-number`}>
              {countdown.days}
            </div>
            <div className={`${themeConfig.text.secondary} font-medium`}>Days</div>
          </div>
          
          <div className="text-center">
            <div className={`text-4xl md:text-5xl font-serif ${themeConfig.text.theme} mb-2 countdown-number`}>
              {countdown.hours}
            </div>
            <div className={`${themeConfig.text.secondary} font-medium`}>Hours</div>
          </div>
          
          <div className="text-center">
            <div className={`text-4xl md:text-5xl font-serif ${themeConfig.text.theme} mb-2 countdown-number`}>
              {countdown.minutes}
            </div>
            <div className={`${themeConfig.text.secondary} font-medium`}>Minutes</div>
          </div>
          
          <div className="text-center">
            <div className={`text-4xl md:text-5xl font-serif ${themeConfig.text.theme} mb-2 countdown-number`}>
              {countdown.seconds}
            </div>
            <div className={`${themeConfig.text.secondary} font-medium`}>Seconds</div>
          </div>
        </div>
      </div>
      </div>

    </section>
  )
}

export default Counter 