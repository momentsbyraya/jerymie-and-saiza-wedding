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
    // Get photo elements
    const photosContainer = document.querySelector('.relative.mb-6.md\\:mb-8.scale-110')
    const backPhoto = photosContainer?.querySelector('.absolute.-top-1.-left-1')
    const frontPhoto = photosContainer?.querySelector('.relative.w-48.h-64')
    
    // Set initial positions
    gsap.set(backPhoto, { x: -200, opacity: 0 })
    gsap.set(frontPhoto, { x: 200, opacity: 0 })
    
    // Create timeline for sequential animation
    const tl = gsap.timeline()
    
    // First: slide back photo from left
    tl.to(backPhoto, {
      x: 0,
      opacity: 1,
      duration: 1.5,
      ease: "linear",
      delay: 0.5
    })
    
    // Then: slide front photo from right
    tl.to(frontPhoto, {
      x: 0,
      opacity: 1,
      duration: 1.5,
      ease: "linear"
    }, "-=0.3") // Start 0.3 seconds before back photo finishes
    
    // Animate other content
    gsap.fromTo(contentRef.current.children, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.5, 
        ease: "linear", 
        stagger: 0.3,
        delay: 1.5
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

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen md:h-fit w-full overflow-hidden flex items-center justify-center"
    >
      {/* Theme Background */}
      <div className={`absolute inset-0 ${themeConfig.backgrounds.theme}`}></div>
      
      {/* Crumpled Paper Background on top */}
      <div 
        className="absolute inset-0 opacity-30 z-10"
        style={{
          backgroundImage: 'url(/images/crumpled-paper.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      {/* Main Content Container */}
      <div ref={contentRef} className="relative z-20 flex flex-col items-center justify-center text-center px-4 py-8">
        
        {/* Stack of Polaroid Photos */}
        <div className="relative mb-6 md:mb-8 scale-110">
          {/* Back Photo */}
          <div className="absolute -top-1 -left-1 md:-top-2 md:-left-2 w-48 h-64 md:w-72 md:h-120 bg-white shadow-lg transform -rotate-12 opacity-80">
            <div className="w-full h-52 md:h-96 bg-cover bg-center border-l-8 border-r-8 border-t-8 border-white" style={{backgroundImage: `url(${images.couple.couple2})`}}></div>
            <div className="p-2 md:p-3 text-right">
              <div className="text-sm md:text-lg font-handwritten text-gray-800 mb-1 leading-none">It's our wedding!</div>
              <div className="text-xs md:text-sm font-handwritten text-gray-600 leading-none">
                01/12/2026
              </div>
            </div>
          </div>
          
          {/* Front Photo - Main */}
          <div className="relative w-48 h-64 md:w-72 md:h-120 bg-white shadow-2xl transform -rotate-2 hover:scale-105 transition-transform duration-300">
            <div className="w-full h-52 md:h-96 bg-cover bg-center border-l-8 border-r-8 border-t-8 border-white" style={{backgroundImage: `url(${images.hero})`}}></div>
            <div className="p-2 md:p-3 text-right">
              <div className="text-sm md:text-lg font-handwritten text-gray-800 mb-1 leading-none">It's our wedding!</div>
              <div className="text-xs md:text-sm font-handwritten text-gray-600 leading-none">
                01/12/2026
              </div>
            </div>
          </div>
        </div>

        {/* Wedding Day Text */}
        <div className="text-xs md:text-sm text-gray-500 mb-2 mt-4 font-light tracking-wider">
          wedding day
        </div>

        {/* Couple Names */}
        <h1 className={`text-3xl md:text-4xl lg:text-5xl ${themeConfig.text.custom} mb-6 md:mb-8 font-main`}>
          {couples.couple.names.together}
        </h1>

        {/* Music Player Section */}
        <div className="w-full max-w-xs">
          {/* Progress Bar */}
          <div className="relative w-full mb-3 md:mb-4">
            {/* Background track (thin) */}
            <div className="w-full h-1 bg-white bg-opacity-30 rounded-full"></div>
            
            {/* Progress track (thick) */}
            <div 
              className="absolute top-0 left-0 h-1 bg-white rounded-full transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            ></div>
            
            {/* Progress circle */}
            <div 
              className="absolute top-1/2 w-3 h-3 bg-white rounded-full transform -translate-y-1/2 -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform"
              style={{ left: `${progressPercentage}%` }}
              onClick={handleProgressClick}
            ></div>
            
            {/* Clickable area for seeking */}
            <div 
              className="absolute inset-0 cursor-pointer"
              onClick={handleProgressClick}
            ></div>
          </div>
          
          {/* Music Controls */}
          <div className="flex items-center justify-center space-x-6 md:space-x-8 mb-2 md:mb-3">
            {/* Previous Button */}
            <button 
              onClick={skipBackward}
              className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-white"
            >
              <svg className="w-8 h-8 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>
            
            {/* Play/Pause Button */}
            <button
              onClick={toggleMusic}
              className={`w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg ${themeConfig.text.pause}`}
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
            <button 
              onClick={skipForward}
              className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-white"
            >
              <svg className="w-8 h-8 md:w-9 md:h-9" fill="currentColor" viewBox="0 0 24 24">
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