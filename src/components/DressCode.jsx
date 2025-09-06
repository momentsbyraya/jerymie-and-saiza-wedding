import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { dresscode } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const DressCode = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 w-full overflow-hidden"
    >
      {/* Content */}
      <div ref={contentRef} className="relative z-10 flex items-center justify-center py-12">
        <div className={`${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding}`}>
          <div className="max-w-5xl w-full mx-auto">
        {/* Content Container with Primary Background */}
            <div className={`${themeConfig.backgrounds.secondary} rounded-3xl p-6 sm:p-8 lg:p-12`}>
          {/* Main Dress Code */}
          <div className="text-center mb-12">
            <h3 className={`text-3xl md:text-4xl font-script ${themeConfig.text.theme} mb-6`}>
              {dresscode.mainDressCode.title}
            </h3>
            <p className={`text-lg md:text-xl font-serif ${themeConfig.text.primary} leading-relaxed mb-8`}>
              {dresscode.mainDressCode.description}
            </p>
            
            {/* Decorative line */}
            <div className="flex justify-center items-center mb-8">
              <div className={`w-24 h-px ${themeConfig.backgrounds.theme} origin-left`}></div>
              <div className={`w-3 h-3 ${themeConfig.backgrounds.theme} rounded-full mx-4`}></div>
              <div className={`w-24 h-px ${themeConfig.backgrounds.theme} origin-right`}></div>
            </div>
          </div>

          {/* Color Theme Circles */}
          <div className="flex justify-center items-center mb-12 space-x-4 sm:space-x-8">
            {dresscode.colorPalette.map((color, index) => (
              <div 
                key={index} 
                className="w-12 h-12 sm:w-16 sm:h-16 aspect-square rounded-full border-4 border-white shadow-lg"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              ></div>
            ))}
          </div>
            </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default DressCode 