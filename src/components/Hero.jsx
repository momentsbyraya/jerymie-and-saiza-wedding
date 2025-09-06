import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { couples, images, audio } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const floatingElementsRef = useRef(null)
  const [maxHeight, setMaxHeight] = useState('100vh')
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(audio.background)
    audioRef.current.loop = audio.loop // Loop the music
    audioRef.current.volume = audio.volume // Set volume from config

    // Cleanup audio on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const updateMaxHeight = () => {
      if (window.innerWidth > 1300) {
        setMaxHeight('800px')
      } else {
        setMaxHeight('100vh')
      }
    }

    updateMaxHeight()
    window.addEventListener('resize', updateMaxHeight)

    return () => window.removeEventListener('resize', updateMaxHeight)
  }, [])

  useEffect(() => {
    // Initial entrance animation
    gsap.fromTo(heroRef.current, 
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 }
    )

    // Content animation
    gsap.fromTo(contentRef.current.children, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power2.out", 
        stagger: 0.3,
        delay: 1.2
      }
    )
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

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
      style={{
        maxHeight: maxHeight
      }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${images.hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Music Button - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <button
          onClick={toggleMusic}
          className="group flex items-center space-x-3 text-white hover:text-white/90 transition-colors duration-300"
        >
          {/* Play/Pause Icon - No circle container */}
          {isPlaying ? (
            <div className={`w-10 h-10 ${themeConfig.backgrounds.theme} rounded-full flex items-center justify-center`}>
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 4a1 1 0 00-1 1v10a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1H6zm6 0a1 1 0 00-1 1v10a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <div className={`w-10 h-10 ${themeConfig.backgrounds.theme} rounded-full flex items-center justify-center`}>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          )}
          
          {/* Text */}
          <span className="font-medium text-sm">
            {isPlaying ? 'Playing...' : 'Play Music'}
          </span>
        </button>
      </div>

      {/* Content */}
      <div ref={contentRef} className={`relative z-10 flex items-center justify-center h-full text-center ${themeConfig.text.primary}`}>
        <div className={`${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding}`}>
          <div className="max-w-4xl mx-auto">
            {/* Wedding Announcement */}
            <div className={`text-lg md:text-xl lg:text-2xl font-serif mb-6 ${themeConfig.text.primary}/60`}>
              We're getting married!
            </div>
            <h2 className={`text-5xl md:text-7xl lg:text-8xl font-script mb-6 ${themeConfig.text.primary}`}>
              {couples.couple.names.together}
            </h2>
            {/* Decorative Line */}
            <div className="flex justify-center items-center mb-6">
              <div className="w-24 h-px bg-white/50 origin-left"></div>
              <div className="w-2 h-2 bg-[#ad8369] rounded-full mx-4"></div>
              <div className="w-24 h-px bg-white/50 origin-right"></div>
            </div>
            
            {/* Wedding Date */}
            <div className={`text-xl md:text-2xl lg:text-3xl font-serif ${themeConfig.text.primary}/60`}>
              {new Date(couples.couple.wedding.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className={`absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 ${themeConfig.borders.primary.replace('border-', 'border-')}/50 rounded-tl-lg corner-element`}></div>
      <div className={`absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 ${themeConfig.borders.primary.replace('border-', 'border-')}/50 rounded-tr-lg corner-element`}></div>
      <div className={`absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 ${themeConfig.borders.primary.replace('border-', 'border-')}/50 rounded-bl-lg corner-element`}></div>
      <div className={`absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 ${themeConfig.borders.primary.replace('border-', 'border-')}/50 rounded-bl-lg corner-element`}></div>

      {/* Floating Elements */}
    </section>
  )
}

export default Hero