import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { weddingConfig } from '../config/weddingConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const LoveStory = () => {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)

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
    tl.fromTo(".love-story-title", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    )

    // Timeline line animation
    tl.fromTo(".timeline-line", 
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 1.5, ease: "power2.out" },
      "-=0.5"
    )

    // Event markers animation
    tl.fromTo(".event-marker", 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)", stagger: 0.3 },
      "-=0.5"
    )

    // Events animation with stagger
    tl.fromTo(".event-content", 
      { opacity: 0, x: (i) => i % 2 === 0 ? -50 : 50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1, 
        ease: "power2.out",
        stagger: 0.4
      },
      "-=0.5"
    )

    // Image containers animation with stagger
    tl.fromTo(".image-container", 
      { opacity: 0, scale: 0.95 },
      { 
        opacity: 1, 
        scale: 1,
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
      className="py-20"
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-script text-[#ad8369] mb-16 text-center love-story-title">
          Our Love Story
        </h2>
        
        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-[#ad8369] timeline-line origin-top"></div>
          
          {/* Timeline Events */}
          <div ref={timelineRef} className="space-y-20">
            
            {/* Event 1 - First Meet (Right Side) */}
            <div className="flex items-center">
              <div className="flex-1 pr-8">
                {/* Image on the left side */}
                <div className="flex justify-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-[#ad8369] p-2 image-container">
                    <img
                      src="/images/couple-1.jpg"
                      alt="First Meet"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 w-4 h-4 bg-[#ad8369] rounded-full event-marker relative">
                {/* Connecting line from timeline to image */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-px bg-[#ad8369] origin-left"></div>
              </div>
              <div className="flex-1 pl-8">
                <div className="event-content">
                  <h3 className="text-2xl md:text-3xl font-script text-[#ad8369] mb-3">
                    First Meet
                  </h3>
                  <div className="text-lg font-serif text-[#ad8369] mb-4">
                    Saturday, July 1st, 2023
                  </div>
                  <p className="text-base font-serif text-wedding-800 leading-relaxed">
                    It was a beautiful summer evening when our paths first crossed. A chance encounter at a local café that would change our lives forever. Little did we know that this simple hello would be the beginning of our forever.
                  </p>
                </div>
              </div>
            </div>

            {/* Event 2 - First Date (Left Side) */}
            <div className="flex items-center">
              <div className="flex-1 pr-8">
                <div className="event-content text-right">
                  <h3 className="text-2xl md:text-3xl font-script text-[#ad8369] mb-3">
                    First Date
                  </h3>
                  <div className="text-lg font-serif text-[#ad8369] mb-4">
                    Tuesday, July 4th, 2023
                  </div>
                  <p className="text-base font-serif text-wedding-800 leading-relaxed">
                    Our first official date was filled with laughter, deep conversations, and the undeniable feeling that we had found something special. That evening, we both knew this was the start of something beautiful.
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 w-4 h-4 bg-[#ad8369] rounded-full event-marker relative">
                {/* Connecting line from timeline to image */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-px bg-[#ad8369] origin-right"></div>
              </div>
              <div className="flex-1 pl-8">
                {/* Image on the right side */}
                <div className="flex justify-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-[#ad8369] p-2 image-container">
                    <img
                      src="/images/couple-2.jpg"
                      alt="First Date"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Event 3 - Marriage Proposal (Right Side) */}
            <div className="flex items-center">
              <div className="flex-1 pr-8">
                {/* Image on the left side */}
                <div className="flex justify-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-[#ad8369] p-2 image-container">
                    <img
                      src="/images/couple-3.jpg"
                      alt="Marriage Proposal"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 w-4 h-4 bg-[#ad8369] rounded-full event-marker relative">
                {/* Connecting line from timeline to image */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-px bg-[#ad8369] origin-left"></div>
              </div>
              <div className="flex-1 pl-8">
                <div className="event-content">
                  <h3 className="text-2xl md:text-3xl font-script text-[#ad8369] mb-3">
                    Marriage Proposal
                  </h3>
                  <div className="text-lg font-serif text-[#ad8369] mb-4">
                    Tuesday, July 8th, 2023
                  </div>
                  <p className="text-base font-serif text-wedding-800 leading-relaxed">
                    Under the stars on a perfect summer night, surrounded by the beauty of nature, he got down on one knee and asked the question that would begin our journey to forever. A moment of pure magic and love.
                  </p>
                </div>
              </div>
            </div>

            {/* Event 4 - Wedding Day (Left Side) */}
            <div className="flex items-center">
              <div className="flex-1 pr-8">
                <div className="event-content text-right">
                  <h3 className="text-2xl md:text-3xl font-script text-[#ad8369] mb-3">
                    Wedding Day
                  </h3>
                  <div className="text-lg font-serif text-[#ad8369] mb-4">
                    {weddingConfig.wedding.dayOfWeek}, {weddingConfig.wedding.month} {weddingConfig.wedding.day}, {weddingConfig.wedding.year}
                  </div>
                  <p className="text-base font-serif text-wedding-800 leading-relaxed">
                    The day we've been dreaming of - when we'll officially become husband and wife. A celebration of our love story and the beginning of our happily ever after together.
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 w-4 h-4 bg-[#ad8369] rounded-full event-marker relative">
                {/* Connecting line from timeline to image */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-px bg-[#ad8369] origin-right"></div>
              </div>
              <div className="flex-1 pl-8">
                {/* Image on the right side */}
                <div className="flex justify-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-[#ad8369] p-2 image-container">
                    <img
                      src="/images/hero-couple.jpg"
                      alt="Wedding Day"
                      className="w-full h-full object-cover rounded-full"
                    />
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

export default LoveStory 