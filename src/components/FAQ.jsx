import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)
  const accordionRef = useRef(null)

  const faqData = [
    {
      question: "What is the dress code for the wedding?",
      answer: "We kindly request elegant, formal attire. For ladies: cocktail dresses, evening gowns, or elegant separates. For gentlemen: suits, sport coats, dress shirts and ties, or dress pants with dress shoes."
    },
    {
      question: "Can I bring a plus one?",
      answer: "Please check your invitation for the specific guest count. If you have any questions about bringing additional guests, please contact us directly."
    },
    {
      question: "What time should I arrive?",
      answer: "We recommend arriving 30 minutes before the ceremony start time to allow for parking and seating. The ceremony will begin promptly at the scheduled time."
    },
    {
      question: "Is there parking available at the venue?",
      answer: "Yes, there is complimentary parking available at both the ceremony and reception venues. Valet parking will also be available at the reception venue."
    },
    {
      question: "Are children welcome at the wedding?",
      answer: "While we love your little ones, we have chosen to make our wedding an adults-only celebration. We hope this advance notice means you can still attend and enjoy a night of celebration."
    },
    {
      question: "What should I do if I can't attend?",
      answer: "If you cannot attend, please RSVP as soon as possible. We understand that circumstances change and appreciate your timely response."
    },
    {
      question: "Is the wedding indoors or outdoors?",
      answer: "The ceremony will be held outdoors (weather permitting), and the reception will be indoors. We recommend checking the weather forecast and dressing accordingly."
    },
    {
      question: "What type of food will be served?",
      answer: "We will be serving a plated dinner with multiple course options. Please indicate any dietary restrictions when you RSVP, and we'll do our best to accommodate your needs."
    }
  ]

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
    tl.fromTo(".faq-title", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    )

    // Accordion items animation with stagger
    tl.fromTo(accordionRef.current.children, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out",
        stagger: 0.1
      },
      "-=0.5"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      ref={sectionRef}
      className={`py-20 ${themeConfig.backgrounds.primary}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-script ${themeConfig.text.accent} mb-16 text-center faq-title`}>
          Frequently Asked Questions
        </h2>
        
        {/* FAQ Accordion */}
        <div ref={accordionRef} className="max-w-4xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`border ${themeConfig.borders.theme} rounded-2xl overflow-hidden transition-all duration-300 hover:${themeConfig.borders.theme}`}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className={`w-full px-6 py-4 text-left flex items-center justify-between hover:${themeConfig.backgrounds.theme}/5 transition-colors duration-200`}
              >
                <h3 className={`text-lg md:text-xl font-serif ${themeConfig.text.theme} pr-4`}>
                  {faq.question}
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 ${themeConfig.text.theme} transition-transform duration-300`}
                  style={{
                    transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                />
              </button>
              
              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4">
                  <p className={`${themeConfig.text.secondary} font-serif leading-relaxed`}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ 