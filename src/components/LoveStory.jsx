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

    // Section title animation - Faster
    tl.fromTo(".love-story-title", 
      { opacity: 0, y: 30, visibility: 'hidden' },
      { opacity: 1, y: 0, visibility: 'visible', duration: 0.3, ease: "power2.out" }
    )

    // Timeline line animation - Faster
    tl.fromTo(".timeline-line", 
      { scaleY: 0, opacity: 0, visibility: 'hidden' },
      { scaleY: 1, opacity: 1, visibility: 'visible', duration: 0.4, ease: "power2.out" },
      "-=0.2"
    )

    // Event markers animation - Faster with reduced stagger
    tl.fromTo(".event-marker", 
      { scale: 0, opacity: 0, visibility: 'hidden' },
      { scale: 1, opacity: 1, visibility: 'visible', duration: 0.3, ease: "back.out(1.7)", stagger: 0.08 },
      "-=0.2"
    )

    // Events animation with stagger - Faster with reduced stagger
    tl.fromTo(".event-content", 
      { opacity: 0, x: (i) => i % 2 === 0 ? -50 : 50, visibility: 'hidden' },
      { 
        opacity: 1, 
        x: 0, 
        visibility: 'visible',
        duration: 0.3, 
        ease: "power2.out",
        stagger: 0.1
      },
      "-=0.2"
    )

    // Image containers animation
    tl.fromTo(".image-container", 
      { opacity: 0, scale: 0.8, visibility: 'hidden' },
      { 
        opacity: 1, 
        scale: 1, 
        visibility: 'visible',
        duration: 0.4, 
        ease: "back.out(1.7)",
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
        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-script ${themeConfig.text.theme} mb-0 [@media(min-width:421px)]:mb-16 text-center love-story-title opacity-0 scale-90 [@media(min-width:421px)]:scale-75 [@media(min-width:576px)]:scale-90 [@media(min-width:768px)]:scale-75 [@media(min-width:992px)]:scale-100 origin-center`} style={{ visibility: 'hidden' }}>
          Our Love Story
        </h2>
        
        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto scale-90 [@media(min-width:421px)]:scale-75 [@media(min-width:576px)]:scale-90 [@media(min-width:768px)]:scale-75 [@media(min-width:992px)]:scale-100 origin-center">
          {/* Central Timeline Line - Centered on desktop, left-aligned on mobile */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-px h-full ${themeConfig.backgrounds.theme} timeline-line origin-top hidden sm:block opacity-0`} style={{ visibility: 'hidden' }}></div>
          {/* Mobile Timeline Line - Left-aligned with dots */}
          <div className={`absolute left-2 w-px h-full ${themeConfig.backgrounds.theme} timeline-line origin-top block sm:hidden opacity-0`} style={{ visibility: 'hidden' }}></div>
          
          {/* Timeline Events */}
          <div ref={timelineRef} className="space-y-20">
            {loveStory.timeline.map((event, index) => (
              <div key={index} className="flex items-center">
                {/* Left Side - Image or Content */}
                <div className="flex-1 pr-8 hidden sm:block">
                  {index % 2 === 0 ? (
                    // Image on the left side for even indices
                    <div className="flex justify-center">
                      <div className={`w-48 h-48 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container opacity-0`} style={{ visibility: 'hidden' }}>
                        <img
                          src={images.couple[event.image]}
                          alt={event.title}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                  ) : (
                    // Content on the left side for odd indices
                    <div className="event-content text-right opacity-0">
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
                <div className={`flex-shrink-0 w-4 h-4 ${themeConfig.backgrounds.theme} rounded-full event-marker relative opacity-0`}>
                  {/* Connecting line from timeline to image/content */}
                  <div className={`absolute ${index % 2 === 0 ? 'right-0' : 'left-0'} top-1/2 transform -translate-y-1/2 w-16 h-px ${themeConfig.backgrounds.theme} origin-${index % 2 === 0 ? 'left' : 'right'} hidden sm:block`}></div>
                </div>

                {/* Right Side - Content or Image */}
                <div className="flex-1 pl-8 sm:pl-8 pl-4">
                  {index % 2 === 0 ? (
                    // Content on the right side for even indices
                    <div className="event-content opacity-0">
                      {/* Mobile Image - Above description */}
                      <div className="block sm:hidden mb-4">
                        <div className={`w-32 h-32 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container opacity-0 mx-auto`} style={{ visibility: 'hidden' }}>
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
                      <div className={`w-48 h-48 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container opacity-0`} style={{ visibility: 'hidden' }}>
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
                        <div className={`w-32 h-32 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container opacity-0 mx-auto`} style={{ visibility: 'hidden' }}>
                          <img
                            src={images.couple[event.image]}
                            alt={event.title}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                      <div className="event-content opacity-0">
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
              {/* Left Side - Content */}
              <div className="flex-1 pr-8 hidden sm:block">
                <div className="event-content text-right opacity-0">
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
              
              {/* Timeline Marker */}
              <div className={`flex-shrink-0 w-4 h-4 ${themeConfig.backgrounds.theme} rounded-full event-marker relative opacity-0`}>
                {/* Connecting line from timeline to image/content */}
                <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-16 h-px ${themeConfig.backgrounds.theme} origin-right hidden sm:block`}></div>
              </div>
              
              {/* Right Side - Image */}
              <div className="flex-1 pl-8 sm:pl-8 pl-4">
                {/* Image on the right side */}
                <div className="hidden sm:flex justify-center">
                  <div className={`w-48 h-48 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container opacity-0`}>
                    <img
                      src={images.hero}
                      alt="Wedding Day"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                
                {/* Mobile Content - Below image */}
                <div className="block sm:hidden">
                  <div className="event-content opacity-0">
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
                  
                  {/* Mobile Image - Below description */}
                  <div className="mt-4">
                    <div className={`w-32 h-32 rounded-full overflow-hidden border-2 ${themeConfig.borders.theme} p-2 image-container opacity-0 mx-auto`}>
                      <img
                        src={images.hero}
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
      </div>
    </section>
  )
}

export default LoveStory 