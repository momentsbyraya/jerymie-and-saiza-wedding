import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { loveStory, images, couples } from '../data'

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

  // Format wedding date for display
  const formatWeddingDate = () => {
    const weddingDate = new Date(couples.couple.wedding.date)
    return weddingDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 w-full bg-gray-900"
    >
      <div className={`${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding}`}>
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
            {loveStory.timeline.map((event, index) => (
              <div key={index} className="flex items-center">
                {/* Left Side - Image or Content */}
                <div className="flex-1 pr-8 hidden sm:block">
                  {index % 2 === 0 ? (
                    // Image on the left side for even indices
                    <div className="flex justify-center">
                      <div className={`w-48 h-48 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container`}>
                        <img
                          src={images.couple[event.image]}
                          alt={event.title}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                  ) : (
                    // Content on the left side for odd indices
                    <div className="event-content text-right">
                      <h3 className={`text-2xl md:text-3xl font-script ${themeConfig.text.theme} mb-3`}>
                        {event.title}
                      </h3>
                      <div className={`text-lg font-serif ${themeConfig.text.theme} mb-4`}>
                        {event.date}
                      </div>
                      <p className={`text-base font-serif ${themeConfig.text.secondary} leading-relaxed`}>
                        {event.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Timeline Marker */}
                <div className={`flex-shrink-0 w-4 h-4 ${themeConfig.backgrounds.theme} rounded-full event-marker relative`}>
                  {/* Connecting line from timeline to image/content */}
                  <div className={`absolute ${index % 2 === 0 ? 'right-0' : 'left-0'} top-1/2 transform -translate-y-1/2 w-16 h-px ${themeConfig.backgrounds.theme} origin-${index % 2 === 0 ? 'left' : 'right'} hidden sm:block`}></div>
                </div>

                {/* Right Side - Content or Image */}
                <div className="flex-1 pl-8 sm:pl-8 pl-4">
                  {index % 2 === 0 ? (
                    // Content on the right side for even indices
                    <div className="event-content">
                      {/* Mobile Image - Above description */}
                      <div className="block sm:hidden mb-4">
                        <div className={`w-32 h-32 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container mx-auto`}>
                          <img
                            src={images.couple[event.image]}
                            alt={event.title}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                      <h3 className={`text-2xl md:text-3xl font-script ${themeConfig.text.theme} mb-3`}>
                        {event.title}
                      </h3>
                      <div className={`text-lg font-serif ${themeConfig.text.theme} mb-4`}>
                        {event.date}
                      </div>
                      <p className={`text-base font-serif ${themeConfig.text.secondary} leading-relaxed`}>
                        {event.description}
                      </p>
                    </div>
                  ) : (
                    // Image on the right side for odd indices
                    <div className="hidden sm:flex justify-center">
                      <div className={`w-48 h-48 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container`}>
                        <img
                          src={images.couple[event.image]}
                          alt={event.title}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* Mobile description - Always on right side for odd indices */}
                  {index % 2 === 1 && (
                    <div className="block sm:hidden">
                      {/* Mobile Image - Above description */}
                      <div className="mb-4">
                        <div className={`w-32 h-32 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container mx-auto`}>
                          <img
                            src={images.couple[event.image]}
                            alt={event.title}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                      <div className="event-content">
                        <h3 className={`text-2xl md:text-3xl font-script ${themeConfig.text.theme} mb-3`}>
                          {event.title}
                        </h3>
                        <div className={`text-lg font-serif ${themeConfig.text.theme} mb-4`}>
                          {event.date}
                        </div>
                        <p className={`text-base font-serif ${themeConfig.text.secondary} leading-relaxed`}>
                          {event.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Wedding Day Event - Always at the end */}
            <div className="flex items-center">
              <div className="flex-1 pr-8 hidden sm:block">
                <div className="event-content text-right">
                  <h3 className={`text-2xl md:text-3xl font-script ${themeConfig.text.theme} mb-3`}>
                    Wedding Day
                  </h3>
                  <div className={`text-lg font-serif ${themeConfig.text.theme} mb-4`}>
                    {formatWeddingDate()}
                  </div>
                  <p className={`text-base font-serif ${themeConfig.text.secondary} leading-relaxed`}>
                    The day we've been dreaming of - when we'll officially become husband and wife. A celebration of our love story and the beginning of our happily ever after together.
                  </p>
                </div>
              </div>
              <div className={`flex-shrink-0 w-4 h-4 ${themeConfig.backgrounds.theme} rounded-full event-marker relative`}>
                {/* Connecting line from timeline to image/content */}
                <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-px ${themeConfig.backgrounds.theme} origin-right hidden sm:block`}></div>
              </div>
              <div className="flex-1 pl-8 sm:pl-8 pl-4">
                {/* Image on the right side - Hidden on mobile */}
                <div className="hidden sm:flex justify-center">
                  <div className={`w-48 h-48 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container`}>
                    <img
                      src={images.hero}
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
                        src={images.hero}
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
                      {formatWeddingDate()}
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