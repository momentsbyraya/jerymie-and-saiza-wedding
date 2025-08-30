import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { weddingConfig } from '../config/weddingConfig'
import { themeConfig } from '../config/themeConfig'

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
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )

    // Timeline line animation
    tl.fromTo(".timeline-line", 
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    )

    // Event markers animation
    tl.fromTo(".event-marker", 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)", stagger: 0.15 },
      "-=0.3"
    )

    // Events animation with stagger
    tl.fromTo(".event-content", 
      { opacity: 0, x: (i) => i % 2 === 0 ? -50 : 50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        ease: "power2.out",
        stagger: 0.2
      },
      "-=0.3"
    )

    // Image containers animation with stagger
    tl.fromTo(".image-container", 
      { opacity: 0, scale: 0.95 },
      { 
        opacity: 1, 
        scale: 1,
        duration: 0.5, 
        ease: "power2.out",
        stagger: 0.1
      },
      "-=0.3"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-script ${themeConfig.text.theme} mb-16 text-center love-story-title`}>
          Our Love Story
        </h2>
        
        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Central Timeline Line - Centered on desktop, left-aligned on mobile */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-px h-full ${themeConfig.backgrounds.theme} timeline-line origin-top hidden sm:block`}></div>
          {/* Mobile Timeline Line - Left-aligned with dots */}
          <div className={`absolute left-2 w-px h-full ${themeConfig.backgrounds.theme} timeline-line origin-top block sm:hidden`}></div>
          
          {/* Timeline Events */}
          <div ref={timelineRef} className="space-y-20">
            
            {/* Event 1 - First Meet (Right Side) */}
            <div className="flex items-center">
              <div className="flex-1 pr-8 hidden sm:block">
                {/* Image on the left side - Hidden on mobile */}
                <div className="flex justify-center">
                  <div className={`w-48 h-48 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container`}>
                    <img
                      src="/images/couple-1.jpg"
                      alt="First Meet"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className={`flex-shrink-0 w-4 h-4 ${themeConfig.backgrounds.theme} rounded-full event-marker relative`}>
                {/* Connecting line from timeline to image */}
                <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-px ${themeConfig.backgrounds.theme} origin-left hidden sm:block`}></div>
              </div>
              <div className="flex-1 pl-8 sm:pl-8 pl-4">
                <div className="event-content">
                  {/* Mobile Image - Above description */}
                  <div className="block sm:hidden mb-4">
                    <div className={`w-32 h-32 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container mx-auto`}>
                      <img
                        src="/images/couple-1.jpg"
                        alt="First Meet"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-script ${themeConfig.text.theme} mb-3`}>
                    First Meet
                  </h3>
                  <div className={`text-lg font-serif ${themeConfig.text.theme} mb-4`}>
                    Tuesday, July 1st, 2023
                  </div>
                  <p className={`text-base font-serif ${themeConfig.text.secondary} leading-relaxed`}>
                    It was a chance encounter that would change our lives forever. Our eyes met across the room, and in that moment, we both knew something extraordinary was about to happen.
                  </p>
                </div>
              </div>
            </div>

            {/* Event 2 - First Date (Left Side) */}
            <div className="flex items-center">
              <div className="flex-1 pr-8 hidden sm:block">
                <div className="event-content text-right">
                  <h3 className={`text-2xl md:text-3xl font-script ${themeConfig.text.theme} mb-3`}>
                    First Date
                  </h3>
                  <div className={`text-lg font-serif ${themeConfig.text.theme} mb-4`}>
                    Tuesday, July 4th, 2023
                  </div>
                  <p className={`text-base font-serif ${themeConfig.text.secondary} leading-relaxed`}>
                    Our first official date was filled with laughter, deep conversations, and the undeniable feeling that we had found something special. That evening, we both knew this was the start of something beautiful.
                  </p>
                </div>
              </div>
              <div className={`flex-shrink-0 w-4 h-4 ${themeConfig.backgrounds.theme} rounded-full event-marker relative`}>
                {/* Connecting line from timeline to image */}
                <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-px ${themeConfig.backgrounds.theme} origin-right hidden sm:block`}></div>
              </div>
              <div className="flex-1 pl-8 sm:pl-8 pl-4">
                {/* Image on the right side - Hidden on mobile */}
                <div className="hidden sm:flex justify-center">
                  <div className={`w-48 h-48 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container`}>
                    <img
                      src="/images/couple-2.jpg"
                      alt="First Date"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                {/* Mobile description - Always on right side */}
                <div className="block sm:hidden">
                  {/* Mobile Image - Above description */}
                  <div className="mb-4">
                    <div className={`w-32 h-32 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container mx-auto`}>
                      <img
                        src="/images/couple-2.jpg"
                        alt="First Date"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <div className="event-content">
                    <h3 className={`text-2xl md:text-3xl font-script ${themeConfig.text.theme} mb-3`}>
                      First Date
                    </h3>
                    <div className={`text-lg font-serif ${themeConfig.text.theme} mb-4`}>
                      Tuesday, July 4th, 2023
                    </div>
                    <p className={`text-base font-serif ${themeConfig.text.secondary} leading-relaxed`}>
                      Our first official date was filled with laughter, deep conversations, and the undeniable feeling that we had found something special. That evening, we both knew this was the start of something beautiful.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event 3 - Marriage Proposal (Right Side) */}
            <div className="flex items-center">
              <div className="flex-1 pr-8 hidden sm:block">
                {/* Image on the left side - Hidden on mobile */}
                <div className="flex justify-center">
                  <div className={`w-48 h-48 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container`}>
                    <img
                      src="/images/couple-3.jpg"
                      alt="Marriage Proposal"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className={`flex-shrink-0 w-4 h-4 ${themeConfig.backgrounds.theme} rounded-full event-marker relative`}>
                {/* Connecting line from timeline to image */}
                <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-px ${themeConfig.backgrounds.theme} origin-left hidden sm:block`}></div>
              </div>
              <div className="flex-1 pl-8 sm:pl-8 pl-4">
                <div className="event-content">
                  {/* Mobile Image - Above description */}
                  <div className="block sm:hidden mb-4">
                    <div className={`w-32 h-32 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container mx-auto`}>
                      <img
                        src="/images/couple-3.jpg"
                        alt="Marriage Proposal"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-script ${themeConfig.text.theme} mb-3`}>
                    Marriage Proposal
                  </h3>
                  <div className={`text-lg font-serif ${themeConfig.text.theme} mb-4`}>
                    Tuesday, July 8th, 2023
                  </div>
                  <p className={`text-base font-serif ${themeConfig.text.secondary} leading-relaxed`}>
                    Under the stars on a perfect summer night, surrounded by the beauty of nature, he got down on one knee and asked the question that would begin our journey to forever. A moment of pure magic and love.
                  </p>
                </div>
              </div>
            </div>

            {/* Event 4 - Wedding Day (Left Side) */}
            <div className="flex items-center">
              <div className="flex-1 pr-8 hidden sm:block">
                <div className="event-content text-right">
                  <h3 className={`text-2xl md:text-3xl font-script ${themeConfig.text.theme} mb-3`}>
                    Wedding Day
                  </h3>
                  <div className={`text-lg font-serif ${themeConfig.text.theme} mb-4`}>
                    {weddingConfig.wedding.dayOfWeek}, {weddingConfig.wedding.month} {weddingConfig.wedding.day}, {weddingConfig.wedding.year}
                  </div>
                  <p className={`text-base font-serif ${themeConfig.text.secondary} leading-relaxed`}>
                    The day we've been dreaming of - when we'll officially become husband and wife. A celebration of our love story and the beginning of our happily ever after together.
                  </p>
                </div>
              </div>
              <div className={`flex-shrink-0 w-4 h-4 ${themeConfig.backgrounds.theme} rounded-full event-marker relative`}>
                {/* Connecting line from timeline to image */}
                <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-px ${themeConfig.backgrounds.theme} origin-right hidden sm:block`}></div>
              </div>
              <div className="flex-1 pl-8 sm:pl-8 pl-4">
                {/* Image on the right side - Hidden on mobile */}
                <div className="hidden sm:flex justify-center">
                  <div className={`w-48 h-48 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container`}>
                    <img
                      src="/images/hero-couple.jpg"
                      alt="Wedding Day"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                {/* Mobile description - Always on right side */}
                <div className="block sm:hidden">
                  {/* Mobile Image - Above description */}
                  <div className="mb-4">
                    <div className={`w-32 h-32 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container mx-auto`}>
                      <img
                        src="/images/hero-couple.jpg"
                        alt="Wedding Day"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <div className="event-content">
                    <h3 className={`text-2xl md:text-3xl font-script ${themeConfig.text.theme} mb-3`}>
                      Wedding Day
                    </h3>
                    <div className={`text-lg font-serif ${themeConfig.text.theme} mb-4`}>
                      {weddingConfig.wedding.dayOfWeek}, {weddingConfig.wedding.month} {weddingConfig.wedding.day}, {weddingConfig.wedding.year}
                    </div>
                    <p className={`text-base font-serif ${themeConfig.text.secondary} leading-relaxed`}>
                      The day we've been dreaming of - when we'll officially become husband and wife. A celebration of our love story and the beginning of our happily ever after together.
                    </p>
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