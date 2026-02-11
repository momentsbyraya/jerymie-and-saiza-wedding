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
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center m-0 p-0"
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
      
      {/* Corner Design - Top Left */}
      <img 
        src="/assets/images/graphics/flower-2.png" 
        alt="Corner design top left" 
        className="absolute z-50 corner-pulse-top-left"
        style={{ 
          top: '-100px', 
          left: '-30px', 
          width: '65vw', 
          height: '65vh', 
          maxWidth: '300px', 
          maxHeight: '300px',
          objectFit: 'contain',
          objectPosition: 'top left'
        }}
      />
      
      {/* Corner Design - Bottom Right */}
      <img 
        src="/assets/images/graphics/flower-2.png" 
        alt="Corner design bottom right" 
        className="absolute z-50 corner-pulse-bottom-right"
        style={{ 
          bottom: '-100px', 
          right: '-30px', 
          width: '65vw', 
          height: '65vh', 
          maxWidth: '300px', 
          maxHeight: '300px',
          objectFit: 'contain',
          objectPosition: 'bottom right'
        }}
      />
      
      {/* Couple Graphic Photo - Bottom Left */}
      <img 
        src="/assets/images/graphics/couple.png" 
        alt="Couple graphic" 
        className="absolute z-10"
        style={{ 
          bottom: '-30px', 
          left: '-50px', 
          width: '80vw', 
          maxWidth: '450px',
          height: 'auto',
          objectFit: 'contain',
          objectPosition: 'bottom left',
          opacity: 0.5
        }}
      />
      
      {/* Content */}
      <div ref={contentRef} className="relative z-20 text-center px-4 py-8 sm:py-12 md:py-16" style={{ transform: 'scale(1.02)', opacity: 0 }}>
        {/* Couple Names - Script Font */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <h1 
            className="text-7xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-antsvalley leading-tight my-8 sm:my-12 md:my-16"
            style={{ transform: 'rotate(-10deg)', color: '#1e3a5f', fontSize: 'clamp(4rem, 10vw, 10rem)' }}
          >
            <span className="block">{couples.couple.names.first} &</span>
            <span className="block">{couples.couple.names.second}</span>
          </h1>
        </div>

        {/* Join Us Text */}
        <div className="text-xs sm:text-sm md:text-base tracking-wider mb-4 sm:mb-6 md:mb-8 font-poppins mx-auto" style={{ color: '#666666', width: '60%' }}>
          together with our families, we invite you to join us on our wedding
        </div>

        {/* Date */}
        <div className="text-base sm:text-lg md:text-xl uppercase tracking-wider mb-1 sm:mb-1 md:mb-1 font-poppins font-bold" style={{ color: '#1e3a5f' }}>
          {formatWeddingDate()}
        </div>

        {/* Time */}
        <div className="text-base sm:text-lg md:text-xl tracking-wider mb-4 sm:mb-6 md:mb-8 font-antsvalley" style={{ color: '#1e3a5f' }}>
          at three o'clock in the afternoon
        </div>

        {/* Location */}
        <div className="text-base sm:text-lg md:text-xl uppercase tracking-wider mb-1 sm:mb-1 md:mb-1 font-poppins font-bold" style={{ color: '#1e3a5f', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
          {weddingConfig.venue.ceremony.name.toUpperCase()}
        </div>
        <div className="text-sm sm:text-base md:text-lg uppercase tracking-wider mb-4 sm:mb-6 md:mb-8 font-poppins" style={{ color: '#666666' }}>
          SAN ANTONIO, TIGAON<br />
          CAMARINES SUR
        </div>

        {/* RSVP */}
        <button
          type="button"
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wider font-antsvalley cursor-pointer hover:opacity-80 transition-opacity duration-200 bg-transparent border-none outline-none relative mt-8 sm:mt-12 md:mt-16" 
          style={{ color: '#666666', zIndex: 100, position: 'relative' }}
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
          Ricarte & Gacer
        </button>
      </div>
    </section>
  )
}

export default Hero
