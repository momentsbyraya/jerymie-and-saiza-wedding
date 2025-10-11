import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { venues, images } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Schedule = () => {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const event1Ref = useRef(null)
  const event2Ref = useRef(null)
  const event3Ref = useRef(null)
  const event4Ref = useRef(null)

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

    // Timeline line expansion from top to bottom
    tl.fromTo(lineRef.current, 
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 1.5, ease: "power2.out" }
    )

    // Events animate in from top to bottom with stagger
    tl.fromTo(event1Ref.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=1.2"
    )
    .fromTo(event2Ref.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(event3Ref.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(event4Ref.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )

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
      <div className="relative z-10 flex items-center justify-center">
        <div className={`${themeConfig.container.maxWidth} ${themeConfig.container.center}`}>
          <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto">
            {/* Section Title */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-script text-gray-800 mb-8 text-center">
              Schedule
            </h2>

            {/* Vertical Timeline */}
            <div ref={timelineRef} className="relative max-w-md sm:max-w-xl lg:max-w-3xl w-full scale-75 sm:scale-100 -my-16 sm:my-16">
              {/* Central Vertical Line */}
              <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-600/30 transform -translate-x-1/2"></div>

              {/* Timeline Events */}
              <div className="space-y-20">
                {/* Event 1 - Right side */}
                <div ref={event1Ref} className="flex items-start">
                  <div className="w-1/2 pr-16 sm:mr-24 text-right">
                    <div className="text-3xl sm:text-5xl font-serif text-gray-800 font-semibold mb-2">
                      4:00<span className="text-xl sm:text-3xl">PM</span>
                    </div>
                    <div className="text-base sm:text-xl font-serif text-gray-700">
                      Guest Gathering
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-gray-600 rounded-full border-2 border-white shadow-lg absolute left-1/2 transform -translate-x-1/2 z-10 mt-6"></div>
                  <div className="w-1/2 pl-8"></div>
                </div>

                {/* Event 2 - Left side */}
                <div ref={event2Ref} className="flex items-start">
                  <div className="w-1/2 pr-24"></div>
                  <div className="w-4 h-4 bg-gray-600 rounded-full border-2 border-white shadow-lg absolute left-1/2 transform -translate-x-1/2 z-10 mt-6"></div>
                  <div className="w-1/2 pl-8">
                    <div className="text-3xl sm:text-5xl font-serif text-gray-800 font-semibold mb-2">
                      4:30<span className="text-xl sm:text-3xl">PM</span>
                    </div>
                    <div className="text-base sm:text-xl font-serif text-gray-700">
                      Wedding Ceremony
                    </div>
                  </div>
                </div>

                {/* Event 3 - Right side */}
                <div ref={event3Ref} className="flex items-start">
                  <div className="w-1/2 pr-24 text-right">
                    <div className="text-3xl sm:text-5xl font-serif text-gray-800 font-semibold mb-2">
                      5:00<span className="text-xl sm:text-3xl">PM</span>
                    </div>
                    <div className="text-base sm:text-xl font-serif text-gray-700">
                      Reception Dinner
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-gray-600 rounded-full border-2 border-white shadow-lg absolute left-1/2 transform -translate-x-1/2 z-10 mt-6"></div>
                  <div className="w-1/2 pl-8"></div>
                </div>

                {/* Event 4 - Left side */}
                <div ref={event4Ref} className="flex items-start">
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-4 h-4 bg-gray-600 rounded-full border-2 border-white shadow-lg absolute left-1/2 transform -translate-x-1/2 z-10 mt-8"></div>
                  <div className="w-1/2 pl-8">
                    <div className="text-3xl sm:text-5xl font-serif text-gray-800 font-semibold mb-2">
                      11:00<span className="text-xl sm:text-3xl">PM</span>
                    </div>
                    <div className="text-base sm:text-xl font-serif text-gray-700">
                      Evening Ends
                    </div>
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

export default Schedule 