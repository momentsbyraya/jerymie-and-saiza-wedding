import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { weddingConfig } from '../config/weddingConfig'
import { themeConfig } from '../config/themeConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const floatingElementsRef = useRef(null)
  const [maxHeight, setMaxHeight] = useState('100vh')

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

    // Floating elements animation
    gsap.to(".floating-element-1", {
      y: -15,
      rotation: 5,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    })

    gsap.to(".floating-element-2", {
      y: 15,
      rotation: -5,
      duration: 4,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1
    })

    // Corner elements entrance
    gsap.fromTo(".corner-element", 
      { opacity: 0, scale: 0 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        ease: "back.out(1.7)", 
        stagger: 0.1,
        delay: 2
      }
    )
  }, [])

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
          backgroundImage: `url(${weddingConfig.photos.hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div ref={contentRef} className={`relative z-10 flex items-center justify-center h-full text-center ${themeConfig.text.primary}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
           {/* Wedding Announcement */}
          <div className={`text-lg md:text-xl lg:text-2xl font-serif mb-6 ${themeConfig.text.primary}/60`}>
            We're getting married!
          </div>
          <h2 className={`text-5xl md:text-7xl lg:text-8xl font-script mb-6 ${themeConfig.text.primary}`}>
            {weddingConfig.couple.together}
          </h2>
          {/* Decorative Line */}
          <div className="flex justify-center items-center mb-6">
            <div className="w-24 h-px bg-white/50 origin-left"></div>
            <div className="w-2 h-2 bg-[#ad8369] rounded-full mx-4"></div>
            <div className="w-24 h-px bg-white/50 origin-right"></div>
          </div>
          
          {/* Wedding Date */}
          <div className={`text-xl md:text-2xl lg:text-3xl font-serif ${themeConfig.text.primary}/60`}>
            {weddingConfig.wedding.date.split('-').reverse().join('-')}
          </div>
          </div>
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className={`absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 ${themeConfig.borders.primary.replace('border-', 'border-')}/50 rounded-tl-lg corner-element`}></div>
      <div className={`absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 ${themeConfig.borders.primary.replace('border-', 'border-')}/50 rounded-tr-lg corner-element`}></div>
      <div className={`absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 ${themeConfig.borders.primary.replace('border-', 'border-')}/50 rounded-bl-lg corner-element`}></div>
      <div className={`absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 ${themeConfig.borders.primary.replace('border-', 'border-')}/50 rounded-br-lg corner-element`}></div>

      {/* Floating Elements */}
    </section>
  )
}

export default Hero 