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
      className={`relative min-h-screen w-full overflow-hidden flex items-center justify-center ${themeConfig.backgrounds.theme}`}
    >
      {/* Main Content Container */}
      <div ref={contentRef} className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-8">
        
        {/* Stack of Polaroid Photos */}
        <div className="relative mb-6 md:mb-8">
          {/* Back Photo */}
          <div className="absolute -top-1 -left-1 md:-top-2 md:-left-2 w-56 h-72 md:w-80 md:h-96 bg-white shadow-lg transform rotate-2 opacity-80">
            <div className="w-full h-56 md:h-80 bg-cover bg-center border-8 border-white" style={{backgroundImage: `url(${images.hero})`}}></div>
            <div className="p-3 md:p-4 text-center">
              <div className="text-xs md:text-sm text-gray-600 font-handwriting">Memories</div>
            </div>
          </div>
          
          {/* Middle Photo */}
          <div className="absolute -top-0.5 -left-0.5 md:-top-1 md:-left-1 w-56 h-72 md:w-80 md:h-96 bg-white shadow-lg transform -rotate-1 opacity-90">
            <div className="w-full h-56 md:h-80 bg-cover bg-center border-8 border-white" style={{backgroundImage: `url(${images.hero})`}}></div>
            <div className="p-3 md:p-4 text-center">
              <div className="text-xs md:text-sm text-gray-600 font-handwriting">Together</div>
            </div>
          </div>
          
          {/* Front Photo - Main */}
          <div className="relative w-56 h-72 md:w-80 md:h-96 bg-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <div className="w-full h-56 md:h-80 bg-cover bg-center border-8 border-white" style={{backgroundImage: `url(${images.hero})`}}></div>
            <div className="p-3 md:p-4 text-center">
              <div className="text-sm md:text-lg font-handwriting text-gray-800 mb-1">We're getting married!</div>
              <div className="text-xs md:text-sm font-handwriting text-gray-600">
                {new Date(couples.couple.wedding.date).toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: '2-digit'
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Wedding Day Text */}
        <div className="text-xs md:text-sm text-gray-500 mb-2 font-light tracking-wider">
          wedding day
        </div>

        {/* Couple Names */}
        <h1 className={`text-3xl md:text-4xl lg:text-5xl font-serif ${themeConfig.text.custom} mb-6 md:mb-8 font-bold`}>
          {couples.couple.names.together}
        </h1>

        {/* Music Player Section */}
        <div className="w-full max-w-xs">
          {/* Horizontal Line */}
          <div className="w-full h-px bg-white mb-3 md:mb-4"></div>
          
          {/* Music Controls */}
          <div className="flex items-center justify-center space-x-6 md:space-x-8 mb-2 md:mb-3">
            {/* Previous Button */}
            <button className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white hover:text-gray-200 transition-colors">
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>
            
            {/* Play/Pause Button */}
            <button
              onClick={toggleMusic}
              className={`w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg ${isPlaying ? themeConfig.text.pause : 'text-gray-800'}`}
            >
              {isPlaying ? (
                <svg className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 4a1 1 0 00-1 1v10a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1H6zm6 0a1 1 0 00-1 1v10a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-7 h-7 md:w-8 md:h-8 ml-0.5 md:ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
            
            {/* Next Button */}
            <button className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white hover:text-gray-200 transition-colors">
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </button>
          </div>
          
          {/* Music Text */}
          <div className={`text-xs ${themeConfig.text.custom} text-center`}>
            {isPlaying ? 'Playing...' : 'Play Music'}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero