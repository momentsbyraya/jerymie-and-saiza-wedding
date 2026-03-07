import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { couples, audio } from '../data'
import { weddingConfig } from '../config/weddingConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(audio.background)
    audioRef.current.loop = audio.loop // Loop the music
    audioRef.current.volume = audio.volume // Set volume from config

    // Add event listeners for progress tracking
    const updateTime = () => setCurrentTime(audioRef.current.currentTime)
    const updateDuration = () => setDuration(audioRef.current.duration)
    
    audioRef.current.addEventListener('timeupdate', updateTime)
    audioRef.current.addEventListener('loadedmetadata', updateDuration)

    // Cleanup audio on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateTime)
        audioRef.current.removeEventListener('loadedmetadata', updateDuration)
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    // Animate content on load - hide initially, then slide in
    if (contentRef.current) {
      // First show the container
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 0.3,
        delay: 0.3
      })
      
      // Then animate children sliding up
      if (contentRef.current.children) {
        gsap.fromTo(contentRef.current.children, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.5, 
            ease: "linear", 
            stagger: 0.3,
            delay: 0.6 // Start after container fades in
          }
        )
      }
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleProgressClick = (e) => {
    if (!audioRef.current || !duration) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const newTime = (clickX / width) * duration
    
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0

  const skipBackward = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.max(0, currentTime - 10) // Skip back 10 seconds
  }

  const skipForward = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.min(duration, currentTime + 10) // Skip forward 10 seconds
  }

  // Format date for display
  const formatWeddingDate = () => {
    const date = new Date(weddingConfig.wedding.date)
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
    const day = date.getDate()
    const month = date.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()
    const year = date.getFullYear()
    
    return `${dayOfWeek}, ${month} ${day}, ${year}`
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center m-0 p-0 pb-24 sm:pb-16 md:pb-0"
    >
      {/* Theme Background */}
      <div className={`absolute inset-0 z-0 ${themeConfig.backgrounds.theme}`}></div>
      
      {/* Crumpled Paper Background on top */}
      <div 
        className="absolute inset-0 opacity-30 z-10"
        style={{
          backgroundImage: 'url(/assets/images/crumpled-paper.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Corner Design - Top Left (larger & more visible on mobile) */}
      <img 
        src="/assets/images/graphics/flower-2.png" 
        alt="" 
        className="absolute z-50 corner-pulse-top-left object-contain
          w-[62vw] h-[50vh] min-w-[200px] min-h-[180px] max-w-[260px] max-h-[240px]
          sm:w-[55vw] sm:min-w-0 sm:max-w-[280px] sm:max-h-[260px]
          md:w-[65vw] md:max-w-[300px] md:max-h-[300px]
          top-[-12px] left-[-8px] sm:top-[-40px] sm:left-[-12px] md:top-[-60px] md:left-[-20px]"
        style={{ objectPosition: 'top left' }}
      />
      
      {/* Corner Design - Bottom Right (larger & more visible on mobile) */}
      <img 
        src="/assets/images/graphics/flower-2.png" 
        alt="" 
        className="absolute z-50 corner-pulse-bottom-right object-contain
          w-[62vw] h-[50vh] min-w-[200px] min-h-[180px] max-w-[260px] max-h-[240px]
          sm:w-[55vw] sm:min-w-0 sm:max-w-[280px] sm:max-h-[260px]
          md:w-[65vw] md:max-w-[300px] md:max-h-[300px]
          bottom-[-12px] right-[-8px] sm:bottom-[-40px] sm:right-[-12px] md:bottom-[-60px] md:right-[-20px]"
        style={{ objectPosition: 'bottom right' }}
      />
      
      {/* Couple Graphic Photo - Bottom Left (smaller on mobile) */}
      <img 
        src="/assets/images/graphics/couple.png" 
        alt="" 
        className="absolute z-10 w-[55vw] max-w-[280px] sm:w-[65vw] sm:max-w-[350px] md:w-[80vw] md:max-w-[450px] h-auto object-contain opacity-40 sm:opacity-50"
        style={{ 
          bottom: '-20px', 
          left: '-30px',
          objectPosition: 'bottom left'
        }}
      />
      
      {/* Content */}
      <div 
        ref={contentRef} 
        className="relative z-20 text-center px-4 sm:px-6 py-6 sm:py-8 md:py-12 lg:py-16 w-full max-w-2xl mx-auto box-border" 
        style={{ transform: 'scale(1.02)', opacity: 0 }}
      >
        {/* Couple Names - Script Font (scales for mobile) */}
        <div className="mb-4 sm:mb-6 md:mb-10">
          <h1 
            className="font-antsvalley leading-tight my-4 sm:my-8 md:my-12"
            style={{ transform: 'rotate(-10deg)', color: '#C46A3A', fontSize: 'clamp(2.5rem, 12vw, 10rem)' }}
          >
            <span className="block">{couples.couple.names.first} &</span>
            <span className="block">{couples.couple.names.second}</span>
          </h1>
        </div>

        {/* Join Us Text - full width on mobile */}
        <div className="text-xs sm:text-sm md:text-base tracking-wider mb-3 sm:mb-6 md:mb-8 font-poppins mx-auto w-[90%] sm:w-4/5 md:w-[60%]" style={{ color: '#5a524a' }}>
          together with our families, we invite you to join us on our wedding
        </div>

        {/* Date */}
        <div className="text-sm sm:text-base md:text-xl uppercase tracking-wider mb-1 font-poppins font-bold break-words" style={{ color: '#C46A3A' }}>
          {formatWeddingDate()}
        </div>

        {/* Time */}
        <div className="text-sm sm:text-base md:text-xl tracking-wider mb-3 sm:mb-6 md:mb-8 font-antsvalley" style={{ color: '#C46A3A' }}>
          at three o'clock in the afternoon
        </div>

        {/* Location */}
        <div className="text-sm sm:text-base md:text-xl uppercase tracking-wider mb-1 font-poppins font-bold break-words px-1" style={{ color: '#C46A3A', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}>
          {weddingConfig.venue.ceremony.name.toUpperCase()}
        </div>
        <div className="text-xs sm:text-sm md:text-lg uppercase tracking-wider mb-4 sm:mb-6 md:mb-8 font-poppins break-words px-1" style={{ color: '#5a524a' }}>
          {[weddingConfig.venue.ceremony.address, weddingConfig.venue.ceremony.city].filter(Boolean).join(', ')}
          {(weddingConfig.venue.ceremony.state || weddingConfig.venue.ceremony.zip) && (
            <>
              <br />
              {[weddingConfig.venue.ceremony.state, weddingConfig.venue.ceremony.zip].filter(Boolean).join(weddingConfig.venue.ceremony.zip ? ', ' : '')}
            </>
          )}
        </div>

        {/* RSVP / Hashtag button - touch-friendly on mobile */}
        <button
          type="button"
          className="min-h-[44px] sm:min-h-0 text-base sm:text-xl md:text-2xl lg:text-3xl tracking-wider font-antsvalley cursor-pointer hover:opacity-80 transition-opacity duration-200 bg-transparent border-none outline-none relative mt-6 sm:mt-12 md:mt-16 px-2 py-3 sm:py-0 break-words text-center max-w-full" 
          style={{ color: '#5a524a', zIndex: 100, position: 'relative' }}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            
            const scrollToRSVP = () => {
              // Direct approach: Find the RSVP section by unique data attribute first
              let targetSection = document.querySelector('section[data-rsvp="true"]')
              
              // If not found, try by ID
              if (!targetSection) {
                targetSection = document.getElementById('rsvp-section-wrapper')
              }
              
              // If still not found, try the inner RSVP section
              if (!targetSection) {
                targetSection = document.getElementById('rsvp-section')
              }
              
              // If still not found, find by data attribute - specifically look for "cta"
              if (!targetSection) {
                const sections = document.querySelectorAll('section[data-section-name="cta"]')
                if (sections.length > 0) {
                  // Verify it's the RSVP section by checking for the data-rsvp attribute inside
                  for (let section of sections) {
                    const innerRSVP = section.querySelector('[data-rsvp="true"]')
                    if (innerRSVP) {
                      targetSection = innerRSVP
                      break
                    }
                    // Or check by text content
                    const text = section.textContent || ''
                    if (text.includes('We Await Your Presence')) {
                      targetSection = section
                      break
                    }
                  }
                }
              }
              
              // Last resort: Find by text content "We Await Your Presence"
              if (!targetSection) {
                const allSections = document.querySelectorAll('section')
                for (let section of allSections) {
                  const text = section.textContent || ''
                  if (text.includes('We Await Your Presence') && text.includes('RSVP')) {
                    targetSection = section
                    break
                  }
                }
              }
              
              if (targetSection) {
                // Check if mobile device
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
                
                if (isMobile) {
                  // For mobile, use scrollIntoView which is more reliable
                  // Wait a bit to ensure section is rendered
                  setTimeout(() => {
                    targetSection.scrollIntoView({ 
                      behavior: 'smooth', 
                      block: 'start',
                      inline: 'nearest'
                    })
                    
                    // Adjust offset after scroll
                    setTimeout(() => {
                      window.scrollBy({
                        top: -20,
                        behavior: 'smooth'
                      })
                    }, 300)
                  }, 100)
                } else {
                  // Desktop: calculate position and scroll
                  const rect = targetSection.getBoundingClientRect()
                  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                  const targetY = rect.top + scrollTop - 20
                  
                  window.scrollTo({
                    top: targetY,
                    behavior: 'smooth'
                  })
                }
                return true
              }
              return false
            }
            
            // Try immediately
            if (!scrollToRSVP()) {
              // Retry with increasing delays if section not found (for lazy loading)
              const retries = [300, 600, 1000, 1500]
              retries.forEach((delay) => {
                setTimeout(() => {
                  scrollToRSVP()
                }, delay)
              })
            }
          }}
        >
          {weddingConfig.details.hashtag}
        </button>
      </div>
    </section>
  )
}

export default Hero
