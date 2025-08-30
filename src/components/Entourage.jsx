import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Entourage = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

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
    tl.fromTo(".entourage-title", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    )

    // Content animation with stagger
    tl.fromTo(contentRef.current.children, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out",
        stagger: 0.2
      },
      "-=0.5"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const entourageList = [
    {
      category: "Principal Sponsors (Godparents)",
      names: [
        "Lorna Alvarado", 
        "Margarita Perez", 
        "Pedro Fernandez", 
        "Richard Sanchez", 
        "Teddy Yu", 
        "Jamie Chastain", 
        "Dani Martinez", 
        "Isabel Mercado"
      ]
    },
    {
      category: "Secondary Sponsors",
      names: [
        "Hannah Morales", 
        "Yael Amari", 
        "Francisco Andrade", 
        "Sebastian Bennett", 
        "Noah Schumacher", 
        "Chiaki Sato"
      ]
    },
    {
      category: "Groomsmen",
      names: [
        "Morgan Maxwell", 
        "Jonathan Patterson", 
        "Howard Ong", 
        "James Thompson", 
        "David Wilson", 
        "Robert Lee"
      ]
    },
    {
      category: "Bridesmaids",
      names: [
        "Kimberly Nguyen", 
        "Chiaki Sato", 
        "Juliana Silva", 
        "Lars Peeters", 
        "Harper Russo", 
        "Helene Paquet"
      ]
    },
    {
      category: "Ring Bearer",
      names: ["Taylor Alonso"]
    },
    {
      category: "Flower Girl",
      names: ["Henrietta Mitchell"]
    }
  ]

  return (
    <section
      ref={sectionRef}
      className={`py-20 ${themeConfig.backgrounds.primary}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={contentRef} className="text-center mb-20">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-script ${themeConfig.text.theme} mb-6 entourage-title`}>
            Entourage
          </h2>
          <p className={`text-xl ${themeConfig.text.secondary} max-w-3xl mx-auto`}>
            Honoring those who will stand with us on our special day
          </p>
        </div>

        {/* Entourage List - Clean Text Layout */}
        <div className="space-y-12">
          {entourageList.map((item, index) => (
            <div key={index} className="text-center">
              {/* Category Title */}
              <h3 className={`text-2xl font-script ${themeConfig.text.theme} mb-6`}>
                {item.category}
              </h3>
              
              {/* Names List */}
              <div className={`grid ${item.names.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-x-2 gap-y-3`}>
                {item.names.map((name, nameIndex) => (
                  <p key={nameIndex} className={`text-lg font-serif ${themeConfig.text.primary}`}>
                    {name}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Entourage 